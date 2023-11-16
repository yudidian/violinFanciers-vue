import request from './request';

interface Login {
	account: string;
	password: string;
}
interface Register extends Login{
	nextPassword: string;
}
export const login = (data: Login) => {
	return request.post('/violinlovers/user/login', data);
};
export const register = (data: Register) => {
	return request.post('/violinlovers/user/register', data);
};
