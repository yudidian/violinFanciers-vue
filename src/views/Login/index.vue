<template>
	<div class="login-wrapper">
		<div class="wrapper-left">
			<div class="left-content">
				<h1 class="title animate__slideInLeft animate__animated">Join our family now</h1>
				<p class="message animate__backInUp animate__animated">Make music better</p>
			</div>
		</div>
		<div class="wrapper-right">
			<div v-if="isRegister" class="login-content">
				<p class="title">Join our family now</p>
				<el-form ref="formRegister" :model="formRegisterData" label-position="top" class="login-form" size="large" :rules="rulesRegister">
					<el-form-item label="username" prop="account">
						<el-input v-model="formRegisterData.account" placeholder="Please enter your username"></el-input>
					</el-form-item>
					<el-form-item label="password" prop="password">
						<el-input v-model="formRegisterData.password" show-password type="password" placeholder="Please enter your password"></el-input>
					</el-form-item>
					<el-form-item label="confirm password" prop="nextPassword">
						<el-input
							v-model="formRegisterData.nextPassword"
							show-password
							type="password"
							placeholder="Please confirm your password again"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto" size="large" @click="registerHandler">Join Now</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="text" style="margin: 0 auto" @click="isRegister = false">Already have an account? Log in now</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div v-else class="login-content" :style="{ height: isRegister ? 450 + 'px' : 400 + 'px' }">
				<p class="title">Login</p>
				<el-form ref="formLogin" :model="formLoginData" label-position="top" class="login-form" size="large" :rules="rulesLogin">
					<el-form-item label="username" prop="account">
						<el-input v-model="formLoginData.account" placeholder="Please enter your username"></el-input>
					</el-form-item>
					<el-form-item label="password" prop="password">
						<el-input v-model="formLoginData.password" show-password type="password" placeholder="Please enter your password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto; width: 120px" size="large" @click="loginHandler">Login</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="text" style="margin: 0 auto" @click="isRegister = true">Don't have an account? Register now</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormRules, FormInstance, ElMessage } from 'element-plus';
import { register } from '@/api/main.ts';
import useUserStore from '@/store/modules/user.ts';
import { useRouter } from 'vue-router';

interface RuleLogin {
	account: string;
	password: string;
}
interface RuleRegister extends RuleLogin {
	nextPassword: string;
}
defineComponent({
	account: 'Login',
});
const router = useRouter();
const user = useUserStore();
const formLogin = ref<FormInstance>();
const formRegister = ref<FormInstance>();
const formLoginData = ref({
	account: '',
	password: '',
});
const formRegisterData = ref({
	account: '',
	password: '',
	nextPassword: '',
});
const rulesLogin = reactive<FormRules<RuleLogin>>({
	account: [
		{ required: true, message: 'Username is required', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur' },
	],
	password: [
		{ required: true, message: 'Password is required', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur' },
	],
});
const rulesRegister = reactive<FormRules<RuleRegister>>({
	account: [
		{ required: true, message: 'Username is required', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur' },
	],
	password: [
		{ required: true, message: 'Password is required', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur' },
	],
	nextPassword: [
		{ required: true, message: 'Please enter your password again', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				if (value !== formRegisterData.value.password) {
					callback(new Error('The passwords entered twice are inconsistent'));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
});
function registerHandler() {
	if (!formRegister.value) return;
	formRegister.value.validate(async (valid) => {
		if (valid) {
			await register(formRegisterData.value);
			isRegister.value = false;
			formLoginData.value.account = formRegisterData.value.account;
			formLoginData.value.password = formRegisterData.value.password;
			formRegisterData.value = { account: '', password: '', nextPassword: '' };
			ElMessage({
				message: 'Successful registration',
				type: 'success',
			});
		} else {
			return false;
		}
	});
}
function loginHandler() {
	if (!formLogin.value) return;
	formLogin.value.validate((valid) => {
		if (valid) {
			user.userLogin(formLoginData.value);
			router.replace('/');
		} else {
			return false;
		}
	});
}
const isRegister = ref(false);
</script>
<style scoped lang="scss">
.login-wrapper {
	display: flex;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: url('/image/login.jpg') no-repeat;
	background-size: cover;
	.wrapper-left,
	.wrapper-right {
		flex: 1;
		position: relative;
	}
	.wrapper-left {
		.left-content {
			position: absolute;
			top: 55%;
			left: 55%;
			transform: translate(-50%, -50%);
			width: 600px;
			height: 600px;
			color: #ffffff;
			.title {
				margin-top: 40px;
				font-size: 80px;
				font-weight: bold;
			}
			.message {
				margin-top: 20px;
				font-size: 40px;
			}
		}
	}
	.login-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
		height: 480px;
		background-color: white;
		border-radius: 10px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		box-shadow: #555555 0 1px 20px;
		.title {
			margin-top: 50px;
			text-align: center;
			font-size: 30px;
			font-weight: bold;
		}
		.login-form {
			width: 450px;
			margin: 0 auto;
			padding: 10px;
		}
	}
}
</style>
