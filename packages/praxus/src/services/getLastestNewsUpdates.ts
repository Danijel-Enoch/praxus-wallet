// To install: npm i @tavily/core
import { tavily } from "@tavily/core";

export const createGetLatestNewsUpdatesService = () => {
    const getNewsUpdate = async (site: string) => {
        if (!site) {
            throw new Error("Invalid parameters");
        }

        console.log("Getting Crypto News Updates for site:", site);

        try {
            // Simulate a response for demonstration purposes
            const response = (await webTrending(site)).results;
            return response;
        } catch (error) {
            console.error("Getting Crypto News Error OCCURED:", error.message);
            throw error;
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
