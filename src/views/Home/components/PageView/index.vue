<template>
	<div class="wrapper">
		<div class="left">
			<div class="left-header">最新文章</div>
			<div class="article-wrapper">
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right-header">评分最高</div>
			<div class="article-wrapper">
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
				<div class="article-item">
					<div class="item-image">
						<el-image style="width: 240px; height: 160px" :src="url" fit="cover" />
					</div>
					<div class="item-info">
						<div class="info-author">作者</div>
						<div class="info-time">2023-10-10 12:50:20</div>
					</div>
					<div class="item-message">文章孙菲菲深粉色粉色粉色飞逝飞逝肺栓塞粉色</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({ name: 'PageView' });
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
			.article-item {
				width: 45%;
				padding: 10px;
				display: flex;
				flex-direction: column;
				margin-bottom: 10px;
				border-bottom: 1px solid #dcdcdc;
				.item-image {
					width: 240px;
					height: 160px;
				}
				.item-info {
					display: flex;
					padding: 10px;
					justify-content: space-between;
					.info-author {
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
