import { defineStore } from 'pinia';
import { login, signOut } from '@/api/main.ts';

const userInfo = JSON.parse(localStorage.getItem('user'));
const useUserStore = defineStore('user', {
	state: () => ({
		account: userInfo ? userInfo.account : undefined,
		token: userInfo ? userInfo.token : undefined,
	}),
	getters: {
		userInfo: (state) => {
			return { account: state.account, token: state.token };
		},
	},
	actions: {
		async logoutHandler() {
			await signOut();
			this.token = undefined;
			this.account = undefined;
			localStorage.clear();
		},
		async userLogin(data) {
			const res = await login(data);
			this.account = res.data.account;
			this.token = res.data.token;
		},
	},
	persist: {
		storage: localStorage,
	},
});

export default useUserStore;
