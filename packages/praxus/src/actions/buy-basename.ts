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
import { buyBasenameTemplate } from "../templates/basename";
import { BuyBasenameExamples } from "../examples/basename";
import { createBasenameService } from "../services/basename";

export const BuyBasenameAction: Action = {
    name: "BUY_BASENAME",
    similes: [
        "BUY_BASENAME",
        "PURCHASE_BASENAME",
        "GET_BASENAME",
        "REGISTER_BASENAME",
        "ACQUIRE_BASENAME",
        "ORDER_BASENAME",
        "OBTAIN_BASENAME",
        "SECURE_BASENAME",
        "CLAIM_BASENAME",
        "BUY_BASE_DOMAIN",
        "GET_BASE_DOMAIN",
        "REGISTER_BASE_DOMAIN",
    ],
    description: "Purchase a basename",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate BuyBasenameAction");
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
        const { danierieieiie }: any = state;
        let walletAddress: string | undefined = danierieieiie?.x.userId;
        state = await runtime.updateRecentMessageState(state);

        // Compose context using template
        const basenameCtx = composeContext({
            state,
            template: buyBasenameTemplate,
        });

        // Generate response using the context
        const content = await generateMessageResponse({
            runtime,
            context: basenameCtx,
            modelClass: ModelClass.SMALL,
        });

        // Extract username and address
        const username = content?.username || state.username;

        if (!username || !walletAddress) {
            callback({
                text: "Please provide both a username and address to purchase a basename",
                content: { error: "Missing required fields" },
            });
            return false;
        }

        try {
            // Instantiate and use basename service
            const basename = createBasenameService();
            const purchaseResult = await basename.registerDomain(
                username as string,
                walletAddress as string
            );

            elizaLogger.success(
                `Successfully initiated basename purchase for ${username}`
            );

            const text = `Initiating basename purchase for ${username} with address ${walletAddress}. Please wait for confirmation.\nTransaction Hash: https://basescan.com/tx/${purchaseResult.transactionHash}`;
            callback({
                text,
                content: text,
                action: "BUY_BASENAME",
                customButtons: ["Check Status", "View Details"],
                data: {
                    hash: purchaseResult.transactionHash,
                    username: username,
                    address: walletAddress,
                },
            });
            return true;
        } catch (error) {
            elizaLogger.error("Error in BUY_BASENAME handler:", error);

            callback({
                text: `Error purchasing basename: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }
    },
    examples: BuyBasenameExamples as ActionExample[][],
} as Action;
