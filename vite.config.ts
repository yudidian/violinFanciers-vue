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
});
