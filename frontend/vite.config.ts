import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWAOptions } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

const pwaOptions: Partial<VitePWAOptions> = {
    mode: "production",
    base: "/",
    workbox: {
        disableDevLogs: true,
        globPatterns: ["**/*.{js,css,scss,html,svg,png}"]
    },
    manifest: {
        name: "Student-Sphere",
        short_name: "Student-Sphere",
        description: "",
        theme_color: "#ffffff",
        icons: [
            {
                src: "android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
            }
        ]
    },
    devOptions: {
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html"
    }
};
pwaOptions.registerType = "autoUpdate";

export default defineConfig(({ mode }) => {
    // @ts-ignore

    const plugins = [react(), tsconfigPaths()];

    return {
        server: {
            port: 3000
        },
        preview: {
            port: 3000
        },
        plugins
    };
});
