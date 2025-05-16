import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";

import { createWalletTemplate } from "../templates/wallet";
import { CreateNewWalletExmaples } from "../examples/walletBalance";
import { createNewWalletService } from "../services/createWallet";

export const CreateWalletAction: Action = {
    name: "CREATE_WALLET",
    similes: [
        "CREATE_WALLET",
        "CREATE",
        "GENERATE_WALLET",
        "ADD_WALLET",
        "WALLET",
    ],
    description: "Create a new wallet",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate CreateWalletAction");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);
        console.log(" starting to compose context");
        // state -> context
        const newWalletCtx = composeContext({
            state,
            template: createWalletTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: newWalletCtx,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const chain = content?.chain && !content?.error;

        if (!chain) {
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const walletService = createNewWalletService();

        // Fetch weather & respond
        try {
            const walletData = await walletService.createWallet(
                String(content?.chain || "")
            );
            elizaLogger.success(
                `Successfully fetched weather for ${content.city}, ${content.country}`
            );

            if (callback) {
                callback({
                    text: `Your wallet address is ${walletData.publicKey} \nyour private key is ${walletData.privateKey} \nyour mnemonic is ${walletData.mnemonic}\n Wallet Generate here is for temporary use only Pls keep it safe, import it to your wallet`,
                    content: walletData,
                    action: "CREATE_WALLET",
                    customButtons: ["Buy", "Sell", "Transfer"],
                });
                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in CREATE_WALLET handler:", error);

            callback({
                text: `Error creating wallet: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: CreateNewWalletExmaples as ActionExample[][],
} as Action;
