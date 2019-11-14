import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";

export default {
    input: "./src/mod.ts",
    output: {
        file: "dist/main.js",
        format: "esm",
    },
    external: [ "react", "react-dom", "styled-components" ],
    plugins: [
        resolve({
            extensions: [ '.js', '.ts', '.tsx' ],
        }),
        commonjs({
            include: "node_modules/**",
        }),
        typescript(),
    ],
};
