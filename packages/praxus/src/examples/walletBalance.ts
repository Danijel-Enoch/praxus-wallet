import { ActionExample } from "@elizaos/core";

export const WalletBalanceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's my wallet balance?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check your wallet balance.",
                action: "GET_WALLET_BALANCE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Your wallet balance is $1,250.00.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you tell me the balance of my savings wallet?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me check your savings wallet balance.",
                action: "GET_WALLET_BALANCE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Your savings wallet balance is $5,430.75.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "How much money do I have in my travel wallet?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve the balance of your travel wallet.",
                action: "GET_WALLET_BALANCE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Your travel wallet balance is $820.50.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What was my last transaction?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check your last transaction.",
                action: "GET_LAST_TRANSACTION",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Your last transaction was a debit of $150.00 for 'Grocery Store' on October 5th.",
            },
        },
    ],
];
