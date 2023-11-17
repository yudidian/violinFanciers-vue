<template>
	<div class="wrapper">
		<div class="header">
			<div class="title">怎么选一根好的小提琴弓</div>
			<div class="info-content">
				<span class="info-time">2023-10-19 10:01 | </span>
				<span class="info-author">original author: 电子小提琴</span>
			</div>
		</div>
		<div class="message">
			<p>
				先说材料。优质的弓子都要用Pernambuco wood
				即“柏南波哥木”制成。“柏南波哥”是一个巴西的地名，柏南波哥木就是该地产的苏木，是最好的制弓材料。目前这种材料日见稀少，所以国内制弓业采用进口巴西苏木，不一定是产于柏南波哥，用它制弓，也是优质的木料。柏南波哥木也好，产于巴西其他地方的苏木也好，都有着颜色不同的特点。即有的是棕黄色，有的颜色非常深，几乎要接近于黑色。但判定一支弓的好坏，并不一定在其颜色。在木料用对，并且加工时切割方向对头的情况下，一支弓是否合用主要是要考虑以下一些因素：
				1），重量。重量是因人而异的，很多弓子都作成61克重。不过购买时要挑选适合自己使用的重量的弓子。当然也可以备有不同重量的弓子，根据需要取用。
				2），弓杆形状和弹性。总的说来，弓杆的弧度应是弓毛刚拉紧时，正好和弓杆的弯曲最低点接触。当弓毛继续拉紧时，靠弓头部分的弓杆，应和弓杆整体的曲率走向一致，不可有向上突起的现象。关于弹性，这个问题比较微妙，可以在几个方向上弯曲弓杆，挑出自己满意的来。有条件时，最好了解制弓者的工艺状况。一根弓杆，加工时要经过多次烘烤，而这种烘烤要求弓杆烤得彻底，否则用一段时间后，会失去弹性。烘烤时，又以开坯、初步切削时的第一次烘烤要求最彻底，一定要烤足烤透，烤到坯料的外边烧焦甚至起火。这样以后使用后，弓子就不会失去弹性。弓子的弹性也不是越高越好，要求它能满足跳弓要求的同时，要注意拉长弓时在中弓处不会跳动。一支拉长弓时中弓容易自己发颤而跳动的弓子，是不受欢迎的。
				3），重心。这是个各人观点不大一致的问题，这里我说个大概。根据有关文献和业内人士的说法，一般总是说：位于从弓根木靠后那边量起9英寸的地方。还有个说法是从弓螺丝量起，9
				英寸半的地方。我的经验是做不大到，还要略上一点。不过拉琴者自己要对自己习惯于用什么样重心的弓有了解，这样在配备弓子时容易找得准确。
				4），弓根木。又称马尾库，最常见的是乌木制成。配银（银铜合金）镶嵌和鲍壳片的插片。两边一般加上“巴黎装饰圈”。即中心是珠母小圆片，外边再加一个圈。豪华的弓子也可以用象牙或玳瑁壳做弓根。不过这只是豪华和保值，和弓子的使用性能关系不大。
				5），缠柄。一般是银丝和皮革。假如弓根用了象牙或玳瑁壳，那么它就要用鲸须。现在鲸须很少见，所以也有用其他材料仿鲸须的。
				弓杆的截面缠柄以上可以是圆形，也可以是八角形。两种截面都是通用的。弓毛是“易损品”，职业使用的弓子，半年换一次马尾。业余爱好，那就随意一点。当然弓毛要梳理得直、匀，张力一致，数量要足够。
				虽然弓子以巴西苏木的为最好，不过价格也较贵。对于一部分业余演奏者来说，一般的巴西木制的弓（外观和苏木很相似），只要按上述方法来挑选，也是可以应用。不过用花梨木，亚洲红木等制作的弓子还是不能达到要求的。不可购买。
			</p>
		</div>
		<div class="image">
			<el-image style="width: 480px; height: 230px" src="url" fit="cover" />
		</div>
		<div class="button-wrapper">
			<div class="return">
				<el-icon style="font-size: 28px; margin-left: 10px; cursor: pointer"><Back /></el-icon>
				<span style="margin-right: 10px" @click="router.back()">Back</span>
			</div>
			<div :class="!supportFlag ? 'support animate__flip' : 'support animate__flip animate__animated'" @click="supportHandler">
				<span class="iconfont icon-zhichi" style="font-size: 24px; margin-top: 1px"></span>
				<span style="margin-left: 10px">20</span>
			</div>
			<div :class="!opposeFlag ? 'oppose animate__slideInDown' : 'oppose animate__slideInDown animate__animated'" @click="opposeHandler">
				<span class="iconfont icon-buzhichi" style="font-size: 24px; margin-top: 1px"></span>
				<span style="margin-left: 10px">20</span>
			</div>
			<div :class="!hideFlag ? 'hide animate__flipOutY' : 'hide animate__flipOutY animate__animated'" @click="hideHandler">
				<span>Hide:</span>
				<el-icon style="font-size: 28px; margin-left: 10px; cursor: pointer"><Hide /></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { Hide, Back } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user.ts';
import { insertUserHide, insertUserLike } from '@/api/main.ts';
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const articleInfo = ref({
	title: '',
	text: '',
	baseImg: '',
});
const supportFlag = ref(false);
const opposeFlag = ref(false);
const hideFlag = ref(false);
defineComponent({ name: 'PageDetail' });
async function supportHandler() {
	supportFlag.value = true;
	setTimeout(() => {
		supportFlag.value = false;
	}, 500);
	const res = await insertUserLike({
		userId: user.userInfo.id,
		articleId: route.params.id,
	});
}
function opposeHandler() {
	opposeFlag.value = true;
	setTimeout(() => {
		opposeFlag.value = false;
	}, 1000);
}
async function hideHandler() {
	hideFlag.value = true;
	setTimeout(() => {
		hideFlag.value = false;
	}, 500);
	const res = await insertUserHide({
		userId: user.userInfo.id,
		articleId: route.params.id,
	});
}
async function getArticleDetail() {}
function initData() {
	getArticleDetail();
}
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
			font-size: 16px;
			text-indent: 2em;
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
