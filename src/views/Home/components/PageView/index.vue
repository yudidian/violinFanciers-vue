<template>
	<div class="wrapper">
		<div class="left">
			<div class="left-header" style="display: flex; align-items: center">
				<span class="iconfont icon-zuixingengxin" style="font-size: 24px; color: #0086b3; margin-right: 10px"></span>
				<span style="font-weight: bold">Latest Share</span>
			</div>
			<div v-if="listByDate.length > 0" class="article-wrapper">
				<div v-for="item in listByDate" :key="item.articleId" class="article-item" @click="toDetail(item.articleId)">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="item.baseImg" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author" style="font-weight: 900">
							<div class="info-author" style="font-weight: 900">
								<el-tooltip effect="dark" :content="item.account" placement="top">
									{{ item.account }}
								</el-tooltip>
							</div>
						</div>
						<div class="info-time" style="color: #a1a1a1">{{ item.datetime }}</div>
					</div>
					<div class="item-message">{{ item.title }}</div>
				</div>
				<div style="display: flex; justify-content: center; width: 100%; margin-top: auto">
					<el-pagination
						layout="prev, pager, next"
						:total="listDateTotal"
						:current-page="listParamsDate.current"
						:page-size="listParamsDate.size"
						@current-change="listParamsDate.current = $event"
						@prev-click="listParamsDate.current = $event"
						@next-click="listParamsDate.current = $event"
					/>
				</div>
			</div>
			<div v-else style="display: flex; justify-content: center; width: 100%">
				<el-empty :image-size="200" />
			</div>
		</div>
		<div class="right">
			<div class="right-header" style="display: flex; align-items: center">
				<span class="iconfont icon-icon1" style="font-size: 24px; color: #f8001d; margin-right: 10px"></span>
				<span style="font-weight: bold">Highest Rated</span>
			</div>
			<div v-if="listByLike.length > 0" class="article-wrapper">
				<div v-for="item in listByLike" :key="item.articleId" class="article-item" @click="toDetail(item.articleId)">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="item.baseImg" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author" style="font-weight: 900">
							<el-tooltip effect="dark" :content="item.account" placement="top">
								{{ item.account }}
							</el-tooltip>
						</div>
						<div class="info-time" style="color: #a1a1a1">{{ item.datetime }}</div>
					</div>
					<div class="item-message">{{ item.title }}</div>
				</div>
				<div style="display: flex; justify-content: center; width: 100%; margin-top: auto">
					<el-pagination
						layout="prev, pager, next"
						:total="listLikeTotal"
						:current-page="listParamsLike.current"
						:page-size="listParamsLike.size"
						@current-change="listParamsLike.current = $event"
						@prev-click="listParamsLike.current = $event"
						@next-click="listParamsLike.current = $event"
					/>
				</div>
			</div>
			<div v-else style="display: flex; justify-content: center; width: 100%">
				<el-empty :image-size="200" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getArticleByDateOrder, getArticleByLike, getArticleByLikeAndOrder } from '@/api/main.ts';

const router = useRouter();
const listDateTotal = ref(0);
const listLikeTotal = ref(0);
const listParamsDate = ref({
	current: 1,
	size: 4,
});
const listParamsLike = ref({
	current: 1,
	size: 4,
});
watch(listParamsDate.value, () => {
	getListByDate();
});
watch(listParamsLike.value, () => {
	getListByLike();
});
const listByDate = ref([]);
const listByLike = ref([]);
defineComponent({ name: 'PageView' });
function toDetail(articleId: number) {
	router.push({
		name: 'PageDetail',
		query: {
			id: articleId,
		},
	});
}

async function getListByDate() {
	const res = await getArticleByDateOrder(listParamsDate.value);
	listByDate.value = res.data.records;
	listDateTotal.value = res.data.total * 1;
}
async function getListByLike() {
	const res = await getArticleByLikeAndOrder(listParamsDate.value);
	listByLike.value = res.data.records;
	listLikeTotal.value = res.data.total;
}
function initData() {
	getListByLike();
	getListByDate();
}
initData();
</script>

<style scoped lang="scss">
@import '../../../../assets/style/base.scss';
:deep(.el-pager) {
	li {
		background-color: transparent;
	}
}
:deep(.el-pagination) {
	button {
		background-color: transparent;
	}
}
.wrapper {
	display: flex;
	height: 80vh;
	margin-top: 20px;
	justify-content: center;
	.left,
	.right {
		flex: 1;
		.article-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			border: 1px solid #dcdcdc;
			margin-top: 10px;
			height: 640px;
			padding: 10px;
			.article-item {
				width: 45%;
				height: 260px;
				padding: 10px;
				display: flex;
				flex-direction: column;
				margin-bottom: 10px;
				border: 1px solid #dcdcdc;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					border: 1px solid #d90429;
				}
				.item-image {
					width: 240px;
					height: 160px;
				}
				.item-info {
					display: flex;
					padding: 10px;
					justify-content: space-between;
					.info-author {
						width: 62px;
						margin-right: 10px;
						@include show_line(1);
					}
					.info-time {
						font-size: 12px;
					}
				}
				.item-message {
					padding: 0 10px;
					@include show_line(2);
				}
			}
		}
	}
	.left {
		margin-right: 5px;
		&-header {
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			border-bottom: 1px solid #555555;
		}
	}
	.right {
		&-header {
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			border-bottom: 1px solid #555555;
		}
	}
}
</style>
