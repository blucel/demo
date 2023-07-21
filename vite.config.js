/*
 * @Author: 李佐宁 lizuoning@yuan-info.com
 * @Date: 2022-07-11 09:26:03
 * @LastEditors: 曹文丽 caowenli@yuan-info.com
 * @LastEditTime: 2023-07-21 14:03:01
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from "unplugin-auto-import/vite";
// import qiankun from 'vite-plugin-qiankun'
import { resolve } from "path";
//方法
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

// useDevMode 开启时与热更新插件冲突
const useDevMode = true;

export default defineConfig({
  base: "./",
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },

  plugins: [
    vue({
      // https://vuejs.org/guide/extras/reactivity-transform.html
      reactivityTransform: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue/macros", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: process.env.NODE_ENV !== 'production',
    }),
  ],

  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_debugger: true,
      },
    },
  },

  server: {
    open: true,
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      // 集成日志
      "/api": {
        target: "http://192.168.15.120:9090/",
        changeOrigin: true,
        ws: false,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
