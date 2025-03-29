import axios from "axios";
import Client, { web3 } from "./client";

/**
 *
 *  "allow_headers": [],

    // expose_headers allows an app to specify additional headers that should be
    // exposed from the app, beyond the default set always recognized by Encore.
    //
    // If the list contains "*", then all headers are exposed.
    "expose_headers": ["*"],

    // allow_origins_without_credentials specifies the allowed origins for requests
    // that don't include credentials. If nil it defaults to allowing all domains
    // (equivalent to ["*"]).
    "allow_origins_without_credentials": ["*"],
    "allow_origins_with_credentials": [],
 */
const API_URL = "https://wagmi.brewfury.top";
const API_URL_LOCAL = "http://localhost:8086";
export const getRequestClient = (jwt?: string) => {
    const api = API_URL;
    if (jwt) {
        return new Client(api, {
            // auth: { authorization: jwt },

            requestInit: {
                headers: {
                    Authorization: "Bearer " + jwt,
                },
            },
        });
    }
    return new Client(api);
};
export const getTrendingTokens = (
    timeframe?: "5m" | "15m" | "30m" | "1h" | "2h" | "3h" | "6h" | "12h" | "24h"
) => {
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "insomnia/10.3.0",
            "x-api-key": "3fe0a30d-6829-4a2d-9379-c04c3cd639f7",
        },
    };

    fetch(
        "https://data.solanatracker.io/tokens/trending/" + timeframe || "5m",
        options
    )
        .then((response) => {
            return response.json();
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
};
export interface CreateSettingsInterface {
    tgId: string;
    chainId: web3.Chain;
    tradeSettings: {
        buySlippage?: string;
        sellSlippage?: string;
        autoBuyAmount?: string;
        autoSellAmount?: string;
        BuyWallets?: string[];
        addTakeProfit?: boolean;
        addStopLoss?: boolean;
        presetBuyButtons?: string[];
        presetSellButtons?: string[];
    };
}
export type TradeSettings = Omit<CreateSettingsInterface, "tgId" | "chainId">;

export const getLatestTokens = () => {
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "insomnia/10.3.0",
            "x-api-key": "3fe0a30d-6829-4a2d-9379-c04c3cd639f7",
        },
    };

    fetch("https://data.solanatracker.io/tokens/latest", options)
        .then((response) => {
            return response.json();
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
};

export type Pools = [
    {
        liquidity: {
            quote: number;
            usd: number;
        };
        price: {
            quote: number;
            usd: number;
        };
        tokenSupply: number;
        lpBurn: number;
        tokenAddress: string;
        marketCap: {
            quote: number;
            usd: number;
        };
        market: string;
        quoteToken: string;
        decimals: number;
        security: {
            freezeAuthority: string;
            mintAuthority: string;
        };
        lastUpdated: number;
        createdAt: number;
        poolId: string;
    }
];

export type Events = {
    "1m": {
        priceChangePercentage: number;
    };
    "5m": {
        priceChangePercentage: number;
    };
    "15m": {
        priceChangePercentage: number;
    };
    "30m": {
        priceChangePercentage: number;
    };
    "1h": {
        priceChangePercentage: number;
    };
    "2h": {
        priceChangePercentage: number;
    };
    "3h": {
        priceChangePercentage: number;
    };
    "4h": {
        priceChangePercentage: number;
    };
    "5h": {
        priceChangePercentage: number;
    };
    "6h": {
        priceChangePercentage: number;
    };
    "12h": {
        priceChangePercentage: number;
    };
    "24h": {
        priceChangePercentage: number;
    };
};

export type Risk = {
    rugged: boolean;
    risks: [
        {
            name: string;
            description: string;
            level: string;
            score: number;
        }
    ];
    score: number;
};

export type Token = {
    name: string;
    symbol: string;
    mint: string;
    uri: string;
    decimals: number;
    image: string;
    description: string;
    hasFileMetaData: boolean;
    twitter?: string;
    telegram?: string;
    website?: string;
    extensions?: {
        twitter?: string;
        telegram?: string;
        website?: string;
    };
};

export type TrendinToken = [
    { token: Token; pools: Pools; events: Events; risk: Risk }
];

export async function getSolanaPrice() {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const solanaPrice = response.data.solana.usd;
        console.log(`Current SOL price: $${solanaPrice}`);
        return solanaPrice;
    } catch (error) {
        console.error("Error fetching SOL price:", error);
    }
}
export type TokenInfo = {
    token: {
        name: string;
        symbol: string;
        mint: string;
        uri: string;
        decimals: number;
        image: string;
        description: string;
        twitter?: string;
        telegram?: string;
        website?: string;
        extensions?: {
            twitter?: string;
            telegram?: string;
            website?: string;
        };
        tags: string[];
        creator: {
            name: string;
            site: string;
        };
        hasFileMetaData: boolean;
    };
    pools: [
        {
            liquidity: {
                quote: number;
                usd: number;
            };
            price: {
                quote: number;
                usd: number;
            };
            tokenSupply: number;
            lpBurn: number;
            tokenAddress: string;
            marketCap: {
                quote: number;
                usd: number;
            };
            market: string;
            quoteToken: string;
            decimals: number;
            security: {
                freezeAuthority: string;
                mintAuthority: string;
            };
            lastUpdated: number;
            createdAt: number;
            poolId: string;
        }
    ];
    events: {
        "1m": {
            priceChangePercentage: number;
        };
        "5m": {
            priceChangePercentage: number;
        };
        "15m": {
            priceChangePercentage: number;
        };
        "30m": {
            priceChangePercentage: number;
        };
        "1h": {
            priceChangePercentage: number;
        };
        "24h": {
            priceChangePercentage: number;
        };
    };
    risk: {
        rugged: boolean;
        risks: [
            {
                name: string;
                description: string;
                level: string;
                score: number;
            }
        ];
        score: number;
    };
    buys: number;
    sells: number;
    txns: number;
};
export async function solanaTrackerGetTokenInfo(tokenAddress: string) {
    const options = {
        method: "GET",
        headers: {
            "User-Agent": "insomnia/10.1.1",
            "x-api-key": "3fe0a30d-6829-4a2d-9379-c04c3cd639f7",
        },
    };
    // random sleep between 1-3 seconds

    return fetch(
        "https://data.solanatracker.io/tokens/" + tokenAddress,
        options
    )
        .then((response) => response.json())
        .then(async (response) => {
            //console.log({ dataApiRes: response });
            return response as TokenInfo;
        })
        .catch((err) => null);
}
