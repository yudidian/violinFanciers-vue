<template>
	<div class="wrapper">
		<header>
			<div class="image">
				<el-image src="" fit="cover" style="width: 100px; height: 100px"></el-image>
			</div>
			<div class="name">
				<span>用户名</span>
			</div>
			<div class="other-info">
				<div><span class="iconfont icon-icon"></span>积分：<span style="color: red; margin-right: 20px">45</span></div>
				<div><span class="iconfont icon-shuliang"></span>发表文章数量：<span style="color: red">45</span></div>
			</div>
		</header>
		<main>
			<el-tabs v-model="activeName" class="demo-tabs" @tabChange="tabChange">
				<el-tab-pane label="收藏列表" name="1">
					<div class="collection-list">
						<div class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title">xxxxxxxG</div>
							<div class="opt">
								<el-button type="danger" @click="cancelCollection">取消收藏</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="隐藏列表" name="2">
					<div class="collection-list">
						<div class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title">xxxxxxxG</div>
							<div class="opt">
								<el-button type="danger" @click="cancelHide">取消隐藏</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="发表列表" name="3">
					<div class="collection-list">
						<div class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title">xxxxxxxG</div>
							<div class="opt">
								<el-button type="danger" @click="cancelHide">删除</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</main>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
defineComponent({ name: 'Mine' });
const activeName = ref('1');
function getCollectionList() {}

function getHideList() {}

function cancelHide() {
	ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
		confirmButtonText: 'OK',
		cancelButtonText: 'Cancel',
		type: 'warning',
	})
		.then(() => {
			ElMessage({
				type: 'success',
				message: 'Delete completed',
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: 'Delete canceled',
			});
		});
}
function cancelCollection() {
	ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
		confirmButtonText: 'OK',
		cancelButtonText: 'Cancel',
		type: 'warning',
	})
		.then(() => {
			ElMessage({
				type: 'success',
				message: 'Delete completed',
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: 'Delete canceled',
			});
		});
}

function tabChange(name: string) {
	switch (name) {
		case '1': {
			getCollectionList();
			break;
		}
		case '2': {
			getHideList();
			break;
		}
	}
}
</script>

<style scoped lang="scss">
@import '../../assets/style/base.scss';
header {
	display: flex;
	align-items: center;
	padding: 20px 0;
	.image {
		width: 100px;
		height: 100px;
	}
	.name {
		font-size: 25px;
		font-weight: 900;
		margin-left: 40px;
	}
	.other-info {
		display: flex;
		justify-self: flex-end;
		margin-left: auto;
		color: #a2a0a0;
	}
}
.collection-list {
	display: flex;
	flex-direction: column;
	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left {
			width: 50px;
			height: 50px;
		}
		.title {
			flex: auto;
			margin-left: 20px;
			font-size: 18px;
			font-weight: bold;
			@include show_line(1);
		}
		.opt {
			margin-left: auto;
		}
	}
}
</style>
