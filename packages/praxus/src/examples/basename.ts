import { ActionExample } from "@elizaos/core";

export const BuyBasenameExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to buy a basename 'cryptomaster' with address 0x123...",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "I'll help you purchase the basename 'cryptomaster'. Initiating the purchase process...",
                action: "BUY_BASENAME",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you help me register a basename?",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "Of course! Please provide the username you'd like to register and the blockchain address to associate with it.",
                action: "BUY_BASENAME",
            },
        },
    ],
];
