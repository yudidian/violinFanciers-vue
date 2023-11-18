<template>
	<div class="wrapper">
		<div class="header">
			<div class="title">{{ articleInfo.title }}</div>
			<div class="info-content">
				<span class="info-time">{{ articleInfo.time }} | </span>
				<span class="info-author">original author: {{ articleInfo.author }}</span>
			</div>
		</div>
		<div class="message">
			<p>
				{{ articleInfo.text }}
			</p>
		</div>
		<div v-if="articleInfo.baseImg" class="image">
			<el-image style="width: 480px; height: 230px" :src="articleInfo.baseImg" fit="cover" />
		</div>
		<div class="button-wrapper">
			<div class="return">
				<el-icon style="font-size: 28px; margin-left: 10px; cursor: pointer"><Back /></el-icon>
				<span style="margin-right: 10px" @click="router.back()">Back</span>
			</div>
			<div :class="!supportFlag ? 'support animate__flip' : 'support animate__flip animate__animated'" @click="supportHandler">
				<span class="iconfont icon-zhichi" style="font-size: 24px; margin-top: 1px" :style="{ color: isLikeFlag ? 'red' : 'black' }"></span>
				<span style="margin-left: 10px">{{ articleInfo.supportCount }}</span>
			</div>
			<div :class="!opposeFlag ? 'oppose animate__flip' : 'oppose animate__flip animate__animated'" @click="opposeHandler">
				<span class="iconfont icon-buzhichi" style="font-size: 24px; margin-top: 1px" :style="{ color: isBelittle ? 'red' : 'black' }"></span>
				<span style="margin-left: 10px">{{ articleInfo.opposeCount }}</span>
			</div>
			<div :class="!hideFlag ? 'hide animate__shakeX' : 'hide animate__shakeX animate__animated'" @click="hideHandler">
				<el-icon style="font-size: 28px; margin-left: 10px; cursor: pointer">
					<Hide v-if="isHideFlag" />
					<View v-else />
				</el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { Hide, Back, View } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user.ts';
import moment from 'moment';
import {
	deleteArticle,
	deleteUserHide,
	deleteUserLike,
	insertUserBelittle,
	insertUserHide,
	insertUserLike,
	selectAllUserBelittle,
	selectAllUserHide,
	selectAllUserLike,
	selectOneArticle,
} from '@/api/main.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const isHideFlag = ref(false);
const isLikeFlag = ref(false);
const isBelittle = ref(false);
const articleInfo = ref({
	title: '',
	text: '',
	baseImg: '',
	author: '',
	time: moment().format('YYYY-MM-DD HH:mm:ss'),
	supportCount: 0,
	opposeCount: 0,
});
const supportFlag = ref(false);
const opposeFlag = ref(false);
const hideFlag = ref(false);
defineComponent({ name: 'PageDetail' });
async function supportHandler() {
	if (isLikeFlag.value || isBelittle.value) {
		ElMessage.info('You have already evaluated');
	} else {
		supportFlag.value = true;
		setTimeout(() => {
			supportFlag.value = false;
		}, 500);
		ElMessageBox.confirm('You only have one chance to choose high-quality articles. Do you want to continue?', 'Warning', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
			type: 'warning',
		})
			.then(async () => {
				await insertUserLike({
					userId: user.userInfo.user_id,
					articleId: route.query.id,
				});
				const listLike = await selectAllUserLike();
				localStorage.setItem('listLike', JSON.stringify(listLike.data));
				initData();
				ElMessage({
					type: 'success',
					message: 'Completed',
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: 'Cancele',
				});
			});
	}
}
async function opposeHandler() {
	if (isLikeFlag.value || isBelittle.value) {
		ElMessage.info('You have already evaluated');
	} else {
		opposeFlag.value = true;
		setTimeout(() => {
			opposeFlag.value = false;
		}, 1000);
		ElMessageBox.confirm('You only have one chance to evaluate high-quality articles. Do you want to continue?', 'Warning', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
			type: 'warning',
		})
			.then(async () => {
				await insertUserBelittle({
					userId: user.userInfo.user_id,
					articleId: route.query.id,
				});
				const listBelittle = await selectAllUserBelittle();
				localStorage.setItem('listBelittle', JSON.stringify(listBelittle.data));
				initData();
				ElMessage({
					type: 'success',
					message: 'Completed',
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: 'Cancele',
				});
			});
	}
}
async function hideHandler() {
	hideFlag.value = true;
	setTimeout(() => {
		hideFlag.value = false;
	}, 500);
	if (isHideFlag.value) {
		await deleteUserHide({
			userId: user.userInfo.user_id,
			articleId: route.query.id,
		});
		isHideFlag.value = false;
		const listHide = await selectAllUserHide();
		localStorage.setItem('listHide', JSON.stringify(listHide.data));
		await getArticleDetail();
		ElMessage.success('Article unHide');
	} else {
		await insertUserHide({
			userId: user.userInfo.user_id,
			articleId: route.query.id,
		});
		isHideFlag.value = true;
		ElMessage.success('Article Hide Success');
	}
}
async function getArticleDetail() {
	const res = await selectOneArticle({
		article_id: route.query.id,
	});
	const data = res.data;
	articleInfo.value = {
		title: data.title,
		text: data.text,
		baseImg: data.baseImg,
		author: data.account,
		time: data.datetime,
		supportCount: data.upScore,
		opposeCount: data.lowScore,
	};
}
// initialization data
function initData() {
	const listLike = JSON.parse(localStorage.getItem('listLike'));
	const listHide = JSON.parse(localStorage.getItem('listHide'));
	const listBelittle = JSON.parse(localStorage.getItem('listBelittle'));
	isLikeFlag.value = listLike.findIndex((item: any) => item.articleId === route.query.id) !== -1;
	isBelittle.value = listBelittle.findIndex((item: any) => item.articleId === route.query.id) !== -1;
	console.log(listBelittle, route.query.id);
	isHideFlag.value = listHide.findIndex((item: any) => item.articleId === route.query.id) !== -1;
	getArticleDetail();
}
initData();
</script>

<style scoped lang="scss">
.wrapper {
	height: 85vh;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0 10px;
	.header {
		.title {
			padding: 10px;
			text-align: center;
			font-size: 30px;
			font-weight: bold;
		}
		.info-content {
			padding: 10px;
			display: flex;
			justify-content: center;
			font-size: 14px;
			color: #a2a0a0;
			.info-author {
				margin-left: 10px;
			}
		}
	}
	.message {
		p {
			text-indent: 2em;
			letter-spacing: 2pt;
			font-family: 微软雅黑;
			font-size: 22px;
			text-align: justify;
			line-height: 30px;
			color: #000000;
		}
	}
	.image {
		padding: 10px 0;
		text-align: center;
	}
	.button-wrapper {
		display: flex;
		padding: 10px;
		width: 100%;
		height: 60px;
		align-items: center;
		justify-content: right;
		.support,
		.oppose,
		.hide,
		.return,
		.collection {
			margin-right: 20px;
			display: flex;
			align-items: center;
			cursor: pointer;
			span {
				font-size: 20px;
			}
		}
		.return {
			margin-right: auto;
		}
	}
}
</style>
