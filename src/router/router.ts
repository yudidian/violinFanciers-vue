import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login/index.vue'),
	},
	{
		path: '/',
		redirect: '/home/page-view',
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/Home/index.vue'),
		children: [
			{
				path: 'page-view',
				name: 'PageView',
				component: () => import('@/views/Home/components/PageView/index.vue'),
			},
			{
				path: 'page-detail',
				name: 'PageDetail',
				component: () => import('@/components/PageDetail/index.vue'),
			},
			{
				path: 'mine',
				name: 'Mine',
				component: () => import('@/views/Mine/index.vue'),
			},
		],
	},
];

const router = createRouter({
	// history: createWebHistory(),
	history: createWebHashHistory(),
	routes,
});

export default router;
