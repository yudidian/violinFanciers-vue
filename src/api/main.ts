import request from './request';

interface Login {
	account: string;
	password: string;
}
interface Register extends Login {
	nextPassword: string;
}
interface ListParams {
	current: number;
	size: number;
}
interface Article {
	title: string;
	text: string;
	baseImg: string;
}
export const login = (data: Login) => {
	return request.axios({
		url: '/violinlovers/user/login',
		method: 'post',
		params: data,
	});
};
export const signOut = () => {
	return request.axios({
		url: '/violinlovers/user/signOut',
		method: 'post',
	});
};
export const register = (data: Register) => {
	return request.axios({
		url: '/violinlovers/user/register',
		method: 'post',
		params: data,
	});
};
export const getArticleByDateOrder = (data: ListParams) => {
	return request.axios({
		url: '/violinlovers/article/getArticleByDateOrder',
		method: 'get',
		params: data,
	});
};
export const getArticleByLike = (data: ListParams) => {
	return request.axios({
		url: '/violinlovers/article/getArticleByLike',
		method: 'get',
		params: data,
	});
};
export const getUpScoreArticleByNotHide = (data: ListParams) => {
	return request.axios({
		url: '/violinlovers/article/getUpScoreArticleByNotHide',
		method: 'get',
		params: data,
	});
};
export const getArticleByHide = (data: ListParams) => {
	return request.axios({
		url: '/violinlovers/article/getArticleByHide',
		method: 'get',
		params: data,
	});
};
export const insertArticle = (data: Article) => {
	return request.axios({
		url: '/violinlovers/article/insertArticle',
		method: 'post',
		data,
	});
};
export const selfArticle = (data: ListParams) => {
	return request.axios({
		url: '/violinlovers/article/selfArticle',
		method: 'get',
		params: data,
	});
};
export const getUserScore = (data: Article) => {
	return request.axios({
		url: '/violinlovers/article/getUserScore',
		method: 'get',
	});
};
export const insertUserLike = (data: Article) => {
	return request.axios({
		url: '/violinlovers/userLike/insertUserLike',
		method: 'get',
	});
};
export const deleteUserLike = (data: Article) => {
	return request.axios({
		url: '/violinlovers/userLike/deleteUserLike',
		method: 'get',
	});
};

export const insertUserHide = (data: Article) => {
	return request.axios({
		url: '/violinlovers/userHide/insertUserHide',
		method: 'post',
	});
};
export const deleteUserHide = (data: Article) => {
	return request.axios({
		url: '/violinlovers/userHide/deleteUserHide',
		method: 'get',
	});
};
