import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue', 'src/**/*.tsx', 'src/**/*.jsx'],
		}),
	],
	resolve: {
		// 配置路径别名
		alias: {
			// 这里就是需要配置resolve里的别名
			'@': path.join(__dirname, 'src'), // path记得引入
		},
	},
	server: {
		https: false,
		proxy: {
			'/api': {
				// 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
				target: 'http://127.0.0.1:80', // 目标地址 --> 服务器地址
				changeOrigin: true, // 允许跨域
				ws: true, // 允许websocket代理
				// 重写路径 --> 作用与vue配置pathRewrite作用相同
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
