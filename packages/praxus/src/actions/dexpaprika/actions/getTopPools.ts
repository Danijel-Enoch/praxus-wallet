import {
    type ActionExample,
    composeContext,
    type Content,
    elizaLogger,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    type State,
    type Action,
    generateMessageResponse,
    ModelClass,
} from "@elizaos/core";
import axios from "axios";
import { z } from "zod";
import { getConfig } from "../config";

// Define the schema for the GET_TOP_POOLS action
export const GetTopPoolsSchema = z.object({
    page: z
        .number()
        .optional()
        .default(0)
        .describe("Page number for pagination"),
    limit: z
        .number()
        .optional()
        .default(10)
        .describe("Number of items per page"),
    orderBy: z
        .enum([
            "volume_usd",
            "price_usd",
            "transactions",
            "last_price_change_usd_24h",
            "created_at",
        ])
        .optional()
        .default("volume_usd")
        .describe("Field to order by"),
    sort: z
        .enum(["asc", "desc"])
        .optional()
        .default("desc")
        .describe("Sort order"),
});

export type GetTopPoolsContent = z.infer<typeof GetTopPoolsSchema> & Content;

const createApiClient = (baseURL: string, apiKey?: string) => {
    const client = axios.create({ baseURL });
    if (apiKey) {
        client.interceptors.request.use((config) => {
            config.headers["Authorization"] = `Bearer ${apiKey}`;
            return config;
        });
    }
    return client;
};

const getDexPaprikaService = (config: any) => {
    const client = createApiClient(
        config.DEXPAPRIKA_API_URL,
        config.DEXPAPRIKA_API_KEY
    );

    return {
        async getTopPools(params: GetTopPoolsContent) {
            const response = await client.get("/pools", {
                params: {
                    page: params.page,
                    limit: params.limit,
                    order_by: params.orderBy,
                    sort: params.sort,
                },
            });

            if (!response.data) {
                throw new Error("No data received from DexPaprika API");
            }

            return response.data;
        },
    };
};

const formatPoolsResponse = (pools: any[], page_info: any) => {
    const formattedPools = pools.map((pool, index) => {
        const token0 = pool.tokens?.[0]?.symbol || "Token1";
        const token1 = pool.tokens?.[1]?.symbol || "Token2";
        const volumeFormatted = `$${Number(pool.volume_usd).toLocaleString()}`;
        const priceFormatted = `$${Number(pool.price_usd).toLocaleString()}`;
        const priceChange = pool.last_price_change_usd_24h
            ? `${(pool.last_price_change_usd_24h * 100).toFixed(2)}%`
            : "N/A";

        return {
            position: index + 1,
            name: `${token0}-${token1}`,
            dex: pool.dex_name,
            network: pool.chain,
            volume: volumeFormatted,
            price: priceFormatted,
            price_change_24h: priceChange,
        };
    });

    const orderingText = `${page_info.order_by?.replace("_", " ")} (${
        page_info.sort === "desc" ? "highest to lowest" : "lowest to highest"
    })`;

    const responseText = [
        `Top Liquidity Pools Across All Networks (Page ${
            page_info.page + 1
        } of ${page_info.total_pages})`,
        `Ordered by: ${orderingText}`,
        `Total pools: ${page_info.total_items}`,
        "",
        ...formattedPools.map((pool) => {
            return [
                `${pool.position}. ${pool.name} (${pool.dex} on ${pool.network})`,
                `   Volume: ${pool.volume}`,
                `   Price: ${pool.price} (24h change: ${pool.price_change_24h})`,
            ].join("\n");
        }),
    ].join("\n");

    return {
        text: responseText,
        formattedPools,
        page_info,
    };
};

export const getTopPools: Action = {
    name: "GET_TOP_POOLS",
    similes: [
        "TOP_LIQUIDITY_POOLS",
        "LIST_BEST_POOLS",
        "HIGHEST_VOLUME_POOLS",
        "MOST_ACTIVE_POOLS",
    ],
    description:
        "Get a paginated list of top liquidity pools from all networks",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        const content = message.content;
        return GetTopPoolsSchema.safeParse(content).success;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting DexPaprika GET_TOP_POOLS handler...");

        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        try {
            const content = message.content as GetTopPoolsContent;
            const config = getConfig(runtime);
            const dexPaprikaService = getDexPaprikaService(config);

            elizaLogger.log(
                `Fetching top ${content.limit} pools ordered by ${content.orderBy} ${content.sort}...`
            );

            const responseData = await dexPaprikaService.getTopPools(content);
            const formattedResponse = formatPoolsResponse(
                responseData.pools,
                responseData.page_info
            );

            elizaLogger.success(
                `Successfully retrieved ${responseData.pools.length} top pools!`
            );

            if (callback) {
                callback({
                    text: formattedResponse.text,
                    content: {
                        timestamp: new Date()
                            .toISOString()
                            .replace("T", " at ")
                            .substring(0, 19),
                        pools: formattedResponse.formattedPools,
                        page_info: formattedResponse.page_info,
                        order_by: content.orderBy,
                        sort: content.sort,
                    },
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error("Error in GET_TOP_POOLS handler:", error);

            let errorMessage = "Error fetching top pools";

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    errorMessage =
                        "Rate limit exceeded. Please try again later.";
                } else {
                    errorMessage = `API error: ${error.response?.status} - ${
                        error.response?.data?.error || error.message
                    }`;
                }
            } else if (error instanceof Error) {
                errorMessage = `Error: ${error.message}`;
            }

            if (callback) {
                callback({
                    text: errorMessage,
                    content: {
                        error:
                            error instanceof Error
                                ? error.message
                                : "Unknown error",
                        statusCode: axios.isAxiosError(error)
                            ? error.response?.status
                            : undefined,
                    },
                });
            }
            return false;
        }
    },
    examples: [
        // ...existing examples...
    ] as ActionExample[][],
};
