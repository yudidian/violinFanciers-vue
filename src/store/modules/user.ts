import { defineStore } from 'pinia';
import { login, selectAllUserBelittle, selectAllUserHide, selectAllUserLike, signOut } from '@/api/main.ts';

const userInfo = JSON.parse(localStorage.getItem('user'));
const useUserStore = defineStore('user', {
	// Store user-related information
	state: () => ({
		account: userInfo ? userInfo.account : undefined,
		token: userInfo ? userInfo.token : undefined,
		user_id: userInfo ? userInfo.user_id : undefined,
	}),
	getters: {
		userInfo: (state) => {
			return { account: state.account, token: state.token, user_id: state.user_id };
		},
	},
	actions: {
		async logoutHandler() {
			await signOut();
			this.token = undefined;
			this.account = undefined;
			this.user_id = undefined;
			localStorage.clear();
			document.cookie = 'jwt=; exdays=Thu, 01 Jan 1970 00:00:00 GMT';
		},
		async userLogin(data) {
			const res = await login(data);
			// Store relevant lists for judgment
			this.account = res.data.account;
			this.token = res.data.token;
			this.user_id = res.data.user_id;
		},
	},
	persist: {
		storage: localStorage,
	},
});

export default useUserStore;
