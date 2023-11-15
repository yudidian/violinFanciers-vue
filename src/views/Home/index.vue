<template>
	<div class="common-layout">
		<el-container style="height: 100vh">
			<el-header class="swpu-header" height="40px">
				<div style="width: 326px">
					<span>{{ user.nickname }}用户</span>
					<el-divider direction="vertical" />
					<span>我的消息</span>
					<el-divider direction="vertical" />
					<el-popconfirm title="是否确定退出登录？" @confirm="logout">
						<template #reference>
							<span style="cursor: pointer">退出登录</span>
						</template>
					</el-popconfirm>
				</div>
			</el-header>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">首页</el-menu-item>
				<el-menu-item index="2">首页</el-menu-item>
				<el-menu-item index="3">首页</el-menu-item>
				<el-menu-item index="4">首页</el-menu-item>
			</el-menu>
			<el-main> main </el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import useUserStore from '@/store/modules/user.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

defineComponent({
	name: 'Home',
});
const user = useUserStore();
const activeIndex = ref(1);
// 退出登录
function logout() {
	user.logoutHandler();
	router.replace('/login');
}
</script>
<style scoped lang="scss">
.swpu-header {
	display: flex;
	justify-content: right;
	align-items: center;
}
</style>
