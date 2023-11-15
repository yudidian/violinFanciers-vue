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
				<el-form label-position="top" class="login-form" size="large">
					<el-form-item label="用户名">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="确定密码">
						<el-input></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto" size="large">立即加入</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="text" style="margin: 0 auto" @click="isRegister = false">已有账号？立即登录</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div v-else class="login-content" :style="{ height: isRegister ? 450 + 'px' : 400 + 'px' }">
				<p class="title">登录</p>
				<el-form label-position="top" class="login-form" size="large">
					<el-form-item label="用户名">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input></el-input>
					</el-form-item>
					<el-form-item>
						<el-button round style="margin-left: auto; width: 120px" size="large">登录</el-button>
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
import { defineComponent, ref } from 'vue';

defineComponent({
	name: 'Login',
});
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
