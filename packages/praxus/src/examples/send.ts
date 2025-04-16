import { ActionExample } from "@elizaos/core";

export const SendEthExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you send 1 ETH to 0xabc123def456?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me process the transaction to send 1 ETH to 0xabc123def456.",
                action: "SEND_ETH",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The transaction to send 1 ETH to 0xabc123def456 has been successfully completed. Here is the transaction hash: 0x789xyz123uvw.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Please transfer 0.5 ETH to 0xdef456abc789.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will initiate the transfer of 0.5 ETH to 0xdef456abc789.",
                action: "SEND_ETH",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The transfer of 0.5 ETH to 0xdef456abc789 was successful. Transaction hash: 0x123abc456def.",
            },
        },
    ],
];
