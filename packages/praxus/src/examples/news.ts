import { ActionExample } from "@elizaos/core";

export const NewsUpdateExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you give me the latest news updates?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me fetch the latest news updates for you.",
                action: "GET_NEWS_UPDATE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are the latest news updates: 1. Stock markets rally today. 2. Weather forecast predicts heavy rain tomorrow. 3. Local sports team wins championship.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the latest in technology news?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the latest technology news for you.",
                action: "GET_NEWS_UPDATE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are the latest updates in technology: 1. New AI model released by a leading tech company. 2. Breakthrough in quantum computing announced. 3. Smartphone sales hit record highs this quarter.",
            },
        },
    ],
];
