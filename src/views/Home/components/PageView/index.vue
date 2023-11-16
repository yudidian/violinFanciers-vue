<template>
	<div class="wrapper">
		<div class="left">
			<div class="left-header" style="display: flex; align-items: center">
				<span class="iconfont icon-zuixingengxin" style="font-size: 24px; color: #0086b3; margin-right: 10px"></span>
				<span style="font-weight: bold">Latest Share</span>
			</div>
			<div class="article-wrapper">
				<div v-for="item in 10" :key="item" class="article-item" @click="toDetail(item)">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="item" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author" style="font-weight: 900">作者</div>
						<div class="info-time" style="color: #a1a1a1">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right-header" style="display: flex; align-items: center">
				<span class="iconfont icon-icon1" style="font-size: 24px; color: #f8001d; margin-right: 10px"></span>
				<span style="font-weight: bold">Highest Rated</span>
			</div>
			<div class="article-wrapper">
				<div v-for="item in 10" :key="item" class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="item" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author" style="font-weight: 900">作者</div>
						<div class="info-time" style="color: #a1a1a1">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
defineComponent({ name: 'PageView' });
function toDetail(item: number) {
	console.log(item);
	router.push({
		path: '/home/page-detail',
		params: {
			id: item,
		},
	});
}
</script>

<style scoped lang="scss">
@import '../../../../assets/style/base.scss';
.wrapper {
	display: flex;
	height: 80vh;
	justify-content: center;
	.left,
	.right {
		flex: 1;
		.article-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			border: 1px solid #dcdcdc;
			margin-top: 10px;
			.article-item {
				width: 45%;
				padding: 10px;
				display: flex;
				flex-direction: column;
				margin-bottom: 10px;
				border: 1px solid #dcdcdc;
				overflow: hidden;
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
						@include show_line(1);
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
