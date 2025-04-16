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

export const sendETHTemplate = `Respond with a JSON object containing amount of Eth to send and the address of the reciever information.
Extract the amount and reciever address from the most recent message. If no specific amount or address is provided, respond with an error.

The response must include:
- amount: The amount of Eth to send
- address: The address of the reciever

Example response:
\`\`\`json
{
    "amount": "0.01",
    "address": "0x1234567890123456789012345678901234567890"
}
\`\`\`
{{recentMessages}}
Extract the  address from the most recent message.
Respond with a JSON markdown block containing the amount and address.`;

export const sendERC20Template = `Respond with a JSON object containing amount of Token to send and the address of the reciever and token symbol or address and sender address information.
Extract the amount and reciever address and token symbol or address and sender address from the most recent message. If no specific amount or address or token or sender is provided, respond with an error.

The response must include:
- amount: The amount of Eth to send
- address: The address of the reciever
- token: The token symbol or address
- sender: The address of the sender

Example response:
\`\`\`json
{
    "amount": "0.01",
    "address": "0x1234567890123456789012345678901234567890",
    "token": "0x1234567890123456789012345678901234567890" || "USDT",
    "sender": "0x1234567890123456789012345678901234567890"
}
\`\`\`
{{recentMessages}}
Extract the  address and amount and token and sender  from the most recent message.
Respond with a JSON markdown block containing the amount and address and token and sender .`;
