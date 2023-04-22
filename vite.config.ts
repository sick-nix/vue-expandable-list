import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/components/index.ts"),
			name: "VueExpandableList",
			fileName: (format) => `vue-expandable-list.${format}.js`,
		},
	},
	plugins: [vue()],
})
