import type { Plugin } from "@elizaos/core";
import { getWalletBalanceAction } from "./actions/wallet-balance";

export const praxusPlugin: Plugin = {
    name: "praxus",
    description: "Praxus plugin",
    actions: [getWalletBalanceAction],
    evaluators: [],
    providers: [],
};
export default praxusPlugin;

// create wallet  (id)
