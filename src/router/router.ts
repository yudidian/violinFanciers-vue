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
		path: '/:pathMatch(.*)',
		redirect: '/404',
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404/index.vue'),
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

const noPermission = ['Login', 'PageView'];
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
	const userInfo = JSON.parse(localStorage.getItem('user'));
	// 判断有没有登录
	if (userInfo === null || userInfo.token === undefined) {
		if (noPermission.includes(to.name as string)) {
			next();
		} else {
			router.replace('/login');
		}
	} else {
		next();
	}
});
export default router;
