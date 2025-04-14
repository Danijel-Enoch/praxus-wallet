import type { Plugin } from "@elizaos/core";
import {
    CreateWalletAction,
    getWalletBalanceAction,
    getWalletPortfolioAction,
    getNewsUpdatesAction,
    validateTranasctionHashAction,
} from "./actions";

export const praxusPlugin: Plugin = {
    name: "praxus",
    description: "Praxus plugin",
    actions: [
        getWalletBalanceAction,
        getWalletPortfolioAction,
        CreateWalletAction,
        validateTranasctionHashAction,
        getNewsUpdatesAction,
    ],
    evaluators: [],
    providers: [],
};
export default praxusPlugin;

// create wallet  (id)
