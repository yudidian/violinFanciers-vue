import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router/router.ts';

// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
	code: number;
	msg: string;
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
	data?: T;
}

const URL = import.meta.env.VITE_BASE_API;
enum RequestEnums {
	TIMEOUT = 20000,
	OVERDUE = 600, // 登录失效
	FAIL = 999, // 请求失败
	SUCCESS = 200, // 请求成功
}
const config = {
	// 默认地址
	baseURL: URL as string,
	// 设置超时时间
	timeout: RequestEnums.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true,
};

class RequestHttp {
	// 定义成员变量并指定类型
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);
		this.service.defaults.withCredentials = true;

		/**
		 * 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if ((config as any).needLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: '正在请求数据...',
						background: 'rgb(0,0,0,0.5)',
					});
				}
				const userInfo = JSON.parse(localStorage.getItem('user'));
				const token = userInfo ? userInfo.token : undefined; // 保存token到localStorage中
				if (token) {
					document.cookie = 'jwt=' + token;
					// (config as any).headers.Authorization = 'Bearer ' + token; // 携带请求头
				} else {
					document.cookie = '';
				}
				return config;
			},
			(error: AxiosError) => {
				// 请求报错
				return Promise.reject(error);
			}
		);

		/**
		 * 响应拦截器
		 * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				let { data } = response;
				data = JSON.parse(JSON.stringify(data));
				// 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (!data.code) {
					if (data.msg && data.msg === 'success') {
						return data;
					} else {
						if (data.msg) {
							return Promise.reject(data);
						} else {
							return data;
						}
					}
				}
				if (data.code && data.code !== 200) {
					ElMessage.error(data.msg); // 此处也可以使用组件提示报错信息
					return Promise.reject(data);
				}
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				if (response) {
					this.handleCode(response.code);
				}
				if (!window.navigator.onLine) {
					ElMessage.error('Network connection failed');
				}
			}
		);
	}

	handleCode(code: number): void {
		switch (code) {
			case 401:
				// userStore.resetToken()
				ElMessage.error('Login failed, please log in again.' + code);
				router.push({ name: 'Login' });
				break;
			case 500:
				// userStore.resetToken()
				ElMessage.error('Request failed' + code);
				router.push({ name: 'Login' });
				break;
			default:
				ElMessage.error('Request failed');
				break;
		}
	}

	// 常用方法封装
	get<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.get(url, { params });
	}

	post<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.post(url, params);
	}

	put<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.put(url, params);
	}

	delete<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.delete(url, { params });
	}

	axios<T>(params: object): Promise<ResultData<T>> {
		return this.service(params);
	}
}

// 导出一个实例对象
export default new RequestHttp(config);
