import { ActionExample } from "@elizaos/core";

export const TransactionHashValidationExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you validate this transaction hash: 0x123abc456def?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me validate the transaction hash for you.",
                action: "VALIDATE_TRANSACTION_HASH",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The transaction hash 0x123abc456def is valid and corresponds to a successful transaction.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is this transaction hash valid: 0x789xyz123uvw?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the validity of the transaction hash.",
                action: "VALIDATE_TRANSACTION_HASH",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The transaction hash 0x789xyz123uvw is invalid. Please check and try again.",
            },
        },
    ],
];
