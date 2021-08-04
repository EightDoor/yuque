// vite.config.ts
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import styleImport from "vite-plugin-style-import";
var vite_config_default = defineConfig({
  server: {
    port: 9999,
    host: "0.0.0.0"
  },
  build: {
    outDir: "electron/dist"
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
  },
  logLevel: "info",
  base: "./",
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          }
        }
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHN0eWxlSW1wb3J0IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDk5OTksXG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2VsZWN0cm9uL2Rpc3QnLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6ICcvc3JjJyB9XSxcbiAgfSxcbiAgbG9nTGV2ZWw6ICdpbmZvJyxcbiAgYmFzZTogXCIuL1wiLFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgc3R5bGVJbXBvcnQoe1xuICAgICAgbGliczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGlicmFyeU5hbWU6ICdlbGVtZW50LXBsdXMnLFxuICAgICAgICAgIGVzTW9kdWxlOiB0cnVlLFxuICAgICAgICAgIGVuc3VyZVN0eWxlRmlsZTogdHJ1ZSxcbiAgICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgzKTtcbiAgICAgICAgICAgIHJldHVybiBgZWxlbWVudC1wbHVzL3BhY2thZ2VzL3RoZW1lLWNoYWxrL3NyYy8ke25hbWV9LnNjc3NgO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzb2x2ZUNvbXBvbmVudDogKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgZWxlbWVudC1wbHVzL2xpYi8ke25hbWV9YDtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLEVBRVIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsRUFFVixTQUFTO0FBQUEsSUFDUCxPQUFPLENBQUMsRUFBRSxNQUFNLEtBQUssYUFBYTtBQUFBO0FBQUEsRUFFcEMsVUFBVTtBQUFBLEVBQ1YsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1A7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLE1BQU07QUFBQSxRQUNKO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsVUFDVixpQkFBaUI7QUFBQSxVQUNqQixjQUFjLENBQUMsU0FBUztBQUN0QixtQkFBTyxLQUFLLE1BQU07QUFDbEIsbUJBQU8seUNBQXlDO0FBQUE7QUFBQSxVQUVsRCxrQkFBa0IsQ0FBQyxTQUFTO0FBQzFCLG1CQUFPLG9CQUFvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
