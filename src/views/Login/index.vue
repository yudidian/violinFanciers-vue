<template>
	<div class="login-wrapper">
		<div class="wrapper-left">
			<div class="left-content">
				<h1 class="title">立即加入我们的大家庭</h1>
				<p class="message">让音乐变得更好听</p>
			</div>
		</div>
		<div class="wrapper-right">
			<div v-if="isRegister" class="login-content">
				<p class="title">立即加入我们的大家庭</p>
				<el-form ref="formRegister" :model="formRegisterData" label-position="top" class="login-form" size="large" :rules="rulesRegister">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formRegisterData.name" placeholder="请输入您的用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formRegisterData.password" show-password type="password" placeholder="请输入您的密码"></el-input>
					</el-form-item>
					<el-form-item label="确定密码" prop="repeatPassword">
						<el-input v-model="formRegisterData.repeatPassword" show-password type="password" placeholder="请再次确认您的密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto" size="large" @click="registerHandler">立即加入</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="text" style="margin: 0 auto" @click="isRegister = false">已有账号？立即登录</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div v-else class="login-content" :style="{ height: isRegister ? 450 + 'px' : 400 + 'px' }">
				<p class="title">登录</p>
				<el-form ref="formLogin" :model="formLoginData" label-position="top" class="login-form" size="large" :rules="rulesLogin">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formLoginData.name" placeholder="请输入您的用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formLoginData.password" show-password type="password" placeholder="请输入您的密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto; width: 120px" size="large" @click="loginHandler">登录</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="text" style="margin: 0 auto" @click="isRegister = true">没有账号？立即注册</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormRules, FormInstance } from 'element-plus';
interface RuleLogin {
	name: string;
	password: string;
}
interface RuleRegister {
	name: string;
	password: string;
	repeatPassword: string;
}
defineComponent({
	name: 'Login',
});
const formLogin = ref<FormInstance>();
const formRegister = ref<FormInstance>();
const formLoginData = ref({
	name: '',
	password: '',
});
const formRegisterData = ref({
	name: '',
	password: '',
	repeatPassword: '',
});
const rulesLogin = reactive<FormRules<RuleLogin>>({
	name: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	password: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
});
const rulesRegister = reactive<FormRules<RuleRegister>>({
	name: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	password: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	repeatPassword: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{
			validator: (rule: any, value: any, callback: any) => {
				if (value !== formRegisterData.value.password) {
					callback(new Error('两次输入的密码不一致'));
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
	formRegister.value.validate((valid) => {
		if (valid) {
			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	});
}
function loginHandler() {
	console.log(formLogin.value);
	if (!formLogin.value) return;
	formLogin.value.validate((valid) => {
		if (valid) {
			console.log('submit!');
		} else {
			console.log('error submit!');
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
			top: 50%;
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
