export const getWalletAddressTemplate = `Respond with a JSON object containing wallet address information.
Extract the address from the most recent message. If no specific address is provided, respond with an error.

The response must include:
- address: The wallet address

Example response:
\`\`\`json
{
    "address": "0x1234567890123456789012345678901234567890"
}
\`\`\`
{{recentMessages}}
Extract the  address from the most recent message.
Respond with a JSON markdown block containing the wallet address.`;
