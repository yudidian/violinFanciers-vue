<template>
	<div class="common-layout">
		<el-container>
			<el-header class="swpu-header" height="40px">
				<div style="display: flex; align-items: center">
					<span>{{ user.userInfo.account ? user.userInfo.account : 'Visitor' }}</span>
					<el-divider direction="vertical" />
					<el-popconfirm title="Are you sure to log out？" @confirm="logout">
						<template #reference>
							<div style="display: flex; align-items: center">
								<el-icon style="color: red; margin-right: 2px; margin-top: 1px"><SwitchButton /></el-icon>
								<span style="cursor: pointer">Log Out</span>
							</div>
						</template>
					</el-popconfirm>
				</div>
			</el-header>
			<el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal">
				<el-menu-item index="/home/page-view">Home</el-menu-item>
				<el-menu-item index="/home/mine">Mine</el-menu-item>
			</el-menu>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { SwitchButton } from '@element-plus/icons-vue';
import { defineComponent, ref } from 'vue';
import useUserStore from '@/store/modules/user.ts';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

defineComponent({
	name: 'Home',
});
const user = useUserStore();
// 保持刷新菜单选项不变
const activeIndex = ref('/home/page-view');
activeIndex.value = route.fullPath;
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
.el-menu-demo {
	background-color: rgba(229, 243, 245, 0.2);
}
</style>
