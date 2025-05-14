import { ActionExample } from "@elizaos/core";

export const BuyBasenameExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to buy a basename 'cryptomaster'",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll help you purchase the basename 'cryptomaster'. First, I'll need your blockchain address to proceed with the registration.",
                action: "CHECK_BASENAME_AVAILABILITY",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Great! The basename 'cryptomaster' is available. To complete the purchase, please confirm your wallet address and I'll initiate the transaction.",
                action: "BUY_BASENAME",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Successfully registered the basename 'cryptomaster'. Your basename is now linked to your address and ready to use on the network.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you help me check if the basename 'defi_trader' is available?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check the availability of the basename 'defi_trader' for you.",
                action: "CHECK_BASENAME_AVAILABILITY",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The basename 'defi_trader' is available! Would you like to proceed with the registration? I'll need your blockchain address to complete the purchase.",
                action: "BUY_BASENAME",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'd like to register multiple basenames: 'crypto_king' and 'nft_master'",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll help you check the availability of both basenames.",
                action: "CHECK_BASENAME_AVAILABILITY",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've checked both basenames. 'crypto_king' is available, but 'nft_master' is already taken. Would you like to proceed with purchasing 'crypto_king'?",
                action: "BUY_BASENAME",
            },
        },
    ],
];
