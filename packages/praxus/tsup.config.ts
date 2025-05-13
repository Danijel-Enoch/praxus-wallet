import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"],
    platform: "node",
    target: "node18",
    bundle: true,
    splitting: false,
    dts: true,
    treeshake: true,
    external: [
        "dotenv",
        "fs",
        "path",
        "@reflink/reflink",
        "@node-llama-cpp",
        "https",
        "http",
        "agentkeepalive",
        "@elizaos/core",
    ],
    noExternal: [
        "combined-stream",
        "form-data",
        "proxy-from-env",
        "follow-redirects",
    ],
    esbuildOptions(options) {
        options.banner = {
            js: `import { createRequire } from 'module';
const require = createRequire(import.meta.url);`,
        };
    },
});
