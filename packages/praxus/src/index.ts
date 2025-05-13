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

export const praxusPlugin: Plugin = {
    name: "praxus",
    description: "Praxus plugin",
    actions: [
        getWalletBalanceAction,
        getWalletPortfolioAction,
        CreateWalletAction,
        validateTranasctionHashAction,
        getNewsUpdatesAction,
        new TokenPriceAction(),
        new LatestTokensAction(),
        new LatestBoostedTokensAction(),
        new TopBoostedTokensAction(),
        getTopPools,
    ],
    evaluators: [new TokenPriceEvaluator()],
    providers: [new TokenPriceProvider()],
};
export default praxusPlugin;

// create wallet  (id)
