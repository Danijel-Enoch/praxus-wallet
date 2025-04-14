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

export const getNewsUpdatesAction: Action = {
    name: "GET_NEWS_UPDATES",
    similes: [
        "NEWS_UPDATES",
        "NEWS",
        "UPDATES",
        "NEWS_FEED",
        "NEWS_UPDATE",
        "LATEST_NEWS",
        "LATEST_UPDATES",
        "LATEST_NEWS_UPDATES",
        "LATEST_NEWS_FEED",
        "LATEST_NEWS_UPDATE",
        "LATEST_UPDATES_FEED",
        "CRYPTO_NEWS",
        "CRYPTO_UPDATES",
        "CRYPTO_NEWS_UPDATES",
        "CRYPTO_NEWS_FEED",
        "CRYPTO_NEWS_UPDATE",
        "CRYPTO_LATEST_NEWS",
    ],
    description: "Get User's Wallet Balance",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate getNewsUpdatesAction");
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
                newsContent += `${news[i].title} \n\n`;
            }

            //             const aiFormatedContent = await generateMessageResponse({
            //                 runtime,
            //                 context:
            //                     `rewrite this and format it properly to look presentable, remove link and add headers and also remove unecessary symbols
            //                     remove this Already a subscriber? Log in.
            // Want all of The Times? Subscribe.
            // Advertisement
            // SKIP ADVERTISEMENT
            // Site Index
            //  ------------------------------------------------
            // ` + newsContent,
            //                 modelClass: ModelClass.SMALL,
            //             });

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
