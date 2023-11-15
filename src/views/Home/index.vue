<template>
	<div class="common-layout">
		<el-container>
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
			<el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="/home/page-view">首页</el-menu-item>
				<el-menu-item index="/mine">我的</el-menu-item>
			</el-menu>
			<el-main>
				<router-view></router-view>
			</el-main>
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
const activeIndex = ref('/home/page-view');
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
.common-layout {
	width: 1160px;
	margin: 0 auto;
	height: 100vh;
}
</style>
