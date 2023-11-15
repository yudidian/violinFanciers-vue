<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
	name: 'Login',
});
</script>

<template>
	<div class="login-wrapper">
		<div class="left">
			<h1>Violin Fanciers</h1>
			<p>让音乐变得更好听</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.login-wrapper {
	width: 100vw;
	height: 100vh;
	background: url('/image/login.jpg') no-repeat;
	background-size: cover;
}
</style>
