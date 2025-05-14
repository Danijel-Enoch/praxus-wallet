import {
    createPublicClient,
    createWalletClient,
    http,
    encodeFunctionData,
    getContract,
    parseEther,
    formatEther,
    keccak256,
    toHex,
    type Abi,
    namehash,
    TransactionReceipt,
} from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { registrarControllerAbi } from "../utils/abis";

// Relevant ABI for L2 Resolver Contract.
export const L2_RESOLVER_ABI: Abi = [
    {
        inputs: [
            { internalType: "bytes32", name: "node", type: "bytes32" },
            { internalType: "address", name: "a", type: "address" },
        ],
        name: "setAddr",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "node", type: "bytes32" },
            { internalType: "string", name: "newName", type: "string" },
        ],
        name: "setName",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

// Relevant ABI for Basenames Registrar Controller Contract.
export const REGISTRAR_ABI = [
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "duration",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "resolver",
                        type: "address",
                    },
                    {
                        internalType: "bytes[]",
                        name: "data",
                        type: "bytes[]",
                    },
                    {
                        internalType: "bool",
                        name: "reverseRecord",
                        type: "bool",
                    },
                ],
                internalType: "struct RegistrarController.RegisterRequest",
                name: "request",
                type: "tuple",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];

// Main function to register the domain
async function registerDomainOnBehalf(domain: string, ownerAddress: string) {
    // Configuration
    const config = {
        // Replace with the actual RegistrarController contract address
        registrarAddress: "0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5" as const,
        // Resolver address from your input
        resolverAddress: "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD" as const,
        // Base mainnet RPC URL
        rpcUrl: "https://base-mainnet.infura.io/v3/7c160b7a7c22491fbf0cd3e2c70ccd9d",
        // Your wallet private key (loaded from .env)
        privateKey:
            "2f370490aa5e95b4b5fe5ddad7fbae3fa4a550119110c9b0c4f830326cc1cd52",
        // Domain details
        domainName: domain + "-praxus",
        ownerAddress,
        duration: 31557600, // ~2 years in seconds
        reverseRecord: true,
    };
    try {
        // Set up clients
        const publicClient = createPublicClient({
            chain: base,
            transport: http(config.rpcUrl),
        });

        const account = privateKeyToAccount(`0x${config.privateKey}`);
        const walletClient = createWalletClient({
            chain: base,
            transport: http(config.rpcUrl),
            account,
        });

        // Check domain availability
        const isAvailable = await publicClient.readContract({
            address: config.registrarAddress,
            abi: registrarControllerAbi,
            functionName: "available",
            args: [config.domainName + ".base.eth"],
        });

        if (!isAvailable) {
            throw new Error(
                `Domain ${config.domainName}.praxus is not available`
            );
        }
        console.log(`Domain ${config.domainName}.praxus is available`);

        // Get registration price
        const price = (await publicClient.readContract({
            address: config.registrarAddress,
            abi: registrarControllerAbi,
            functionName: "registerPrice",
            args: [config.domainName, BigInt(config.duration)],
        })) as bigint;
        console.log(`Registration price: ${formatEther(price)} ETH`);

        // Calculate namehash for the domain
        const baseName = `${config.domainName}.base.eth`;
        const addressId = config.ownerAddress;
        const labelHash = namehash(`${config.domainName}.base.eth`);

        // Prepare resolver data
        const addressData = encodeFunctionData({
            abi: L2_RESOLVER_ABI,
            functionName: "setAddr",
            args: [labelHash, addressId],
        });
        const nameData = encodeFunctionData({
            abi: L2_RESOLVER_ABI,
            functionName: "setName",
            args: [labelHash, baseName],
        });
        // Prepare registration request
        const request: any = {
            name: config.domainName,
            owner: config.ownerAddress.startsWith("0x")
                ? config.ownerAddress
                : `0x${config.ownerAddress}`,
            duration: BigInt(config.duration),
            resolver: config.resolverAddress,
            data: [addressData, nameData],
            reverseRecord: config.reverseRecord,
        };

        // Send registration transaction
        const value = (price * 110n) / 100n; // Add 10% buffer
        const hash = await walletClient.writeContract({
            address: config.registrarAddress,
            abi: registrarControllerAbi,
            functionName: "register",
            args: [request],
            value,
            chain: base,
            account: account,
        });

        console.log(`Transaction sent: ${hash}`);

        // Wait for transaction confirmation
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
        console.log(
            `Domain ${config.domainName}.praxus registered successfully for ${config.ownerAddress}!`
        );
        return receipt;
    } catch (error: any) {
        console.error("Error registering domain:", error.message);
    }
}

export const createBasenameService = () => {
    return {
        registerDomain: async (
            domain: string,
            ownerAddress: string
        ): Promise<TransactionReceipt> => {
            return await registerDomainOnBehalf(domain, ownerAddress);
        },
    };
};
