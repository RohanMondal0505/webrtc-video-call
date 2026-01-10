import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	define: {
		global: "globalThis",
		"process.env": {},
	},
	resolve: {
		alias: {
			process: "process/browser",
			buffer: "buffer",
			util: "util",
			events: "events",
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
		},
		include: ["buffer", "process", "events", "util"],
	},
});
