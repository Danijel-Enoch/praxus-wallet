import type { Plugin } from "@elizaos/core";
import {
    CreateWalletAction,
    getWalletBalanceAction,
    getWalletPortfolioAction,
    getNewsUpdatesAction,
    validateTranasctionHashAction,
} from "./actions";
import { TokenPriceProvider, tokenPriceProvider } from "./providers";
import {
    LatestBoostedTokensAction,
    latestBoostedTokensAction,
    LatestTokensAction,
    latestTokensAction,
    TokenPriceAction,
    tokenPriceAction,
    TopBoostedTokensAction,
} from "./actions/dexscreener";
import { TokenPriceEvaluator, tokenPriceEvaluator } from "./evaluators";
import { getTopPools, SEARCH } from "./actions/dexpaprika/actions";
import { sendEthAction } from "./actions/send-native";

export const praxusPlugin: Plugin = {
    name: "praxus",
    description: "Praxus plugin",
    actions: [
        getWalletBalanceAction,
        getWalletPortfolioAction,
        CreateWalletAction,
        validateTranasctionHashAction,
        sendEthAction,
        getNewsUpdatesAction,
        new TokenPriceAction(),
        new LatestTokensAction(),
        new LatestBoostedTokensAction(),
        new TopBoostedTokensAction(),
        getTopPools,
    ],
    evaluators: [new TokenPriceEvaluator()],
    providers: [],
};
export default praxusPlugin;

// create wallet  (id)
