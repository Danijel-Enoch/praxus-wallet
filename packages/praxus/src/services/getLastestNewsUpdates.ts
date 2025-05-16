// To install: npm i @tavily/core
import { tavily } from "@tavily/core";
import { elizaLogger } from "@elizaos/core";

export const createGetLatestNewsUpdatesService = () => {
    const getNewsUpdate = async (site: string) => {
        if (!site) {
            throw new Error("Site parameter is required");
        }

        elizaLogger.info("Getting Crypto News Updates for site:", site);

        try {
            const response = await webTrending(site);

            if (!response?.results) {
                throw new Error("No results found");
            }

            elizaLogger.success(
                `Successfully retrieved news updates for ${site}`
            );
            return response.results;
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            elizaLogger.error("Error retrieving news updates:", {
                site,
                error: errorMessage,
            });

            // Add specific error handling for common cases
            if (errorMessage.includes("rate limit")) {
                throw new Error(
                    "API rate limit exceeded. Please try again later."
                );
            }

            if (errorMessage.includes("not found")) {
                throw new Error(`Could not find news for site: ${site}`);
            }

            // Rethrow with more context
            throw new Error(`Failed to get news updates: ${errorMessage}`);
        }
    };

    return { getNewsUpdate };
};

async function webTrending(media: string) {
    console.log(" Performing Web Search for Trending Tokens.....");
    const client = tavily({
        apiKey: "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",
    });
    return await client.search(
        `What is the latest crypto news, ai news and updates on  ${media} ?`,
        {
            topic: "news",
            searchDepth: "advanced",
        }
    );
}
