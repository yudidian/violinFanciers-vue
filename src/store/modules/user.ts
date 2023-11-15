import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
	state: () => ({
		nickname: '',
	}),
	getters: {
		nickname: (state) => state.nickname,
	},
	actions: {
		logoutHandler() {
			localStorage.clear();
		},
	},
	persist: {
		storage: localStorage,
	},
});

export default useUserStore;
