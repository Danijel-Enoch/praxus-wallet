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

export const createWalletTemplate = `Respond with a JSON object containing chain information.
Extract the chain from the most recent message. If no specific chain is provided, respond with an error.

The response must include:
- chain: The chain name

Example response:
\`\`\`json
{
    "chain": "ethereum"
}
\`\`\`
{{recentMessages}}
Extract the  chain from the most recent message.
Respond with a JSON markdown block containing the chain`;
export const walletPortfolioTemplate = `Respond with a JSON object containing chain information and wallet address.
Extract the chain from the most recent message. If no specific address and chain  is provided, respond with an error.

The response must include:
- chain: The chain name
- address: The wallet address

Example response:
\`\`\`json
{
    "chain": "ethereum"
    "address": "0x1234567890123456789012345678901234567890"
}
\`\`\`
{{recentMessages}}
Extract the  address from the most recent message.
Respond with a JSON markdown block containing the  address and chain.`;
