export const getTransactionHashTemplate = `Respond with a JSON object containing transaction hash information.
Extract the transaction hash from the most recent message. If no specific transaction hash is provided, respond with an error.

The response must include:
- transactionHash: The transaction hash

Example response:
\`\`\`json
{
    "transactionHash": "0x6b5667beb259b2bec404053679a26a1bf671b7adb388091f4995b56b81a5ea66"
}
\`\`\`
{{recentMessages}}
Extract the  address from the most recent message.
Respond with a JSON markdown block containing the transaction hash.`;

export { swapTemplate } from "./swap";
