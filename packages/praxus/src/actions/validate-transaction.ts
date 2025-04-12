import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";

import { getNewsSiteTemplate } from "../templates/news";
import { createGetLatestNewsUpdatesService } from "../services/getLastestNewsUpdates";
import { NewsUpdateExamples } from "../examples/news";

export const validateTranasctionHashAction: Action = {
    name: "VALIDATE_TRANSACTION_HASH",
    similes: [
        "VALIDATE_TRANSACTION_HASH",
        "VALIDATE_TRANSACTION",
        "VALIDATE_TRANSACTION_HASH",
        "VALIDATE_TRANSACTION_HASH",
        "TRANSACTION_HASH",
        "TRANSACTION",
        "TRANSACTION_HASH",
        "TRANSACTION_HASH",
    ],
    description: "Validates a transaction hash",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate transaction hash action");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        // state -> context
        const newSiteCtx = composeContext({
            state,
            template: getNewsSiteTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: newSiteCtx,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const site = content?.site && !content?.error;

        if (!site) {
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const newsService = createGetLatestNewsUpdatesService();

        // Fetch weather & respond
        try {
            const news = await newsService.getNewsUpdate(
                String(content?.site || "")
            );
            elizaLogger.success(
                `Successfully Fetched Latest News Updates for ${content.site}`
            );

            let newsContent = `Trending News Updates for ${content.site}`;
            newsContent += `Latest News Update: \n`;

            for (let i = 0; i < news.length; i++) {
                newsContent += `${news[i].title}: ${news[i].content} \n`;
            }

            if (callback) {
                callback({
                    text: newsContent,
                    content: news,
                    action: "GET_NEWS_UPDATES",
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_NEWS_UPDATES handler:", error);

            callback({
                text: `Error fetching news: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: NewsUpdateExamples as ActionExample[][],
} as Action;
