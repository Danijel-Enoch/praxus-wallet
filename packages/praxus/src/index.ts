import type { Plugin } from "@elizaos/core";

export * as actions from "./actions";
export * as evaluators from "./evaluators";
export * as providers from "./providers";

export const praxusPlugin: Plugin = {
    name: "praxus",
    description: "Praxus plugin",
    actions: [],
    evaluators: [],
    providers: [],
};
export default praxusPlugin;

// create wallet  (id)
