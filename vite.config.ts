import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "./src/index.ts"),
      		name: "V-Treeview"
		},
		rollupOptions: {
			external: ["vue"],
			output: {
			  	inlineDynamicImports: true,
			  	globals: {
					vue: "Vue",
				},
			},
		},
	}
})
