<template>
	<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh">
		<el-empty>
			<el-button type="primary" @click="router.replace('/')">Back to Home</el-button>
		</el-empty>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

defineComponent({ name: '404' });
const router = useRouter();
</script>

<style scoped></style>
