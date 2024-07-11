import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
    schema: "./src/schema.graphql",
    generates: {
        "./src/schema.types.ts": {
            config: {
                defaultMapper: "Partial<{T}>",
            },
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
} satisfies CodegenConfig;
