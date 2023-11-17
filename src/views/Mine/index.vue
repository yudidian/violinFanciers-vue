<template>
	<div class="wrapper">
		<header>
			<div class="image">
				<el-image fit="cover" style="width: 100px; height: 100px" src="/image/user.jpg"></el-image>
			</div>
			<div class="name">
				<span>{{ user.account }}</span>
			</div>
			<div class="other-info">
				<div>
					<span class="iconfont icon-icon" style="margin-right: 10px"></span>Integral：<span style="color: red; margin-right: 20px">{{
						userScore
					}}</span>
				</div>
				<div>
					<span class="iconfont icon-shuliang" style="margin-right: 10px"></span>Number of published articles：<span style="color: red">{{
						userArticleSum
					}}</span>
				</div>
			</div>
		</header>
		<main>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
				<el-tab-pane label="Like List" name="1">
					<div v-if="likeList.length > 0" class="collection-list">
						<div v-for="item in likeList" :key="item.articleId" class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover" :src="item.baseImg"></el-image>
							</div>
							<div class="title" @click="router.push({ name: 'PageDetail', query: { id: item.articleId } })">{{ item.title }}</div>
							<div class="opt">
								<el-button type="danger" :icon="Star" @click="cancelCollection">Cancel</el-button>
							</div>
						</div>
						<div style="display: flex; justify-content: center; width: 100%; margin-top: auto">
							<el-pagination
								layout="prev, pager, next"
								:total="listLikeTotal"
								@current-change="likeListParams.current = $event"
								@prev-click="likeListParams.current = $event"
								@next-click="likeListParams.current = $event"
							/>
						</div>
					</div>
					<div v-else style="display: flex; justify-content: center; width: 100%">
						<el-empty :image-size="200" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="Hidden List" name="2">
					<div v-if="hideList.length > 0" class="collection-list">
						<div v-for="item in hideList" :key="item.articleId" class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title" @click="router.push({ name: 'PageDetail', query: { id: item.articleId } })">{{ item.title }}</div>
							<div class="opt">
								<el-button type="danger" :icon="View" @click="cancelHide">Hide</el-button>
							</div>
						</div>
						<div style="display: flex; justify-content: center; width: 100%; margin-top: auto">
							<el-pagination
								layout="prev, pager, next"
								:total="listHideTotal"
								@current-change="hideListParams.current = $event"
								@prev-click="hideListParams.current = $event"
								@next-click="hideListParams.current = $event"
							/>
						</div>
					</div>
					<div v-else style="display: flex; justify-content: center; width: 100%">
						<el-empty :image-size="200" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="Personal creation" name="3">
					<div class="my-list" style="width: 100%; padding: 10px 0; height: 30px">
						<el-button type="primary" style="margin-left: auto; display: block" :icon="Edit" @click="addNewArticle = true"></el-button>
					</div>
					<div v-if="personalList.length > 0" class="collection-list">
						<div v-for="item in personalList" :key="item.articleId" class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover" :url="item.baseImg"></el-image>
							</div>
							<div class="title" @click="router.push({ name: 'PageDetail', query: { id: item.articleId } })">{{ item.title }}</div>
							<div class="opt">
								<el-button type="danger" :icon="Delete" @click="cancelDelete(item.articleId)">Delete</el-button>
							</div>
						</div>
						<div style="display: flex; justify-content: center; width: 100%; margin-top: auto">
							<el-pagination
								layout="prev, pager, next"
								:total="listPersonalTotal"
								@current-change="personalListParams.current = $event"
								@prev-click="personalListParams.current = $event"
								@next-click="personalListParams.current = $event"
							/>
						</div>
					</div>
					<div v-else style="display: flex; justify-content: center; width: 100%">
						<el-empty :image-size="200" />
					</div>
				</el-tab-pane>
			</el-tabs>
		</main>
		<el-dialog v-model="addNewArticle" :close-on-click-modal="false" :destroy-on-close="true" title="New article" width="560px">
			<el-form ref="ruleFormRef" label-position="top" label-width="100px" :model="formData" style="max-width: 460px; margin: 0 auto" :rules="rules">
				<el-form-item label="Article title" prop="title">
					<el-input v-model="formData.title" placeholder="Please enter the title of your article" />
				</el-form-item>
				<el-form-item label="Image" prop="image">
					<el-upload
						class="avatar-uploader"
						action="/api/violinlovers/article/uploadPicture"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<el-image v-if="imageUrl" :url="imageUrl" style="width: 200px; height: 200px" fit="cover" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="Article content" prop="message">
					<el-input
						v-model="formData.text"
						:autosize="{ minRows: 8, maxRows: 16 }"
						type="textarea"
						maxlength="800"
						placeholder="Please enter the content of the article"
						show-word-limit
					/>
				</el-form-item>
				<el-form-item>
					<div style="margin-left: auto; margin-top: 10px">
						<el-button type="primary" @click="addNewArticleHandler">Confirm</el-button>
						<el-button @click="addNewArticle = false">Cancel</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { View, Delete, Edit, Plus, Star } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormRules, FormInstance } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { getArticleByHide, getArticleByLike, insertArticle, selfArticle, getUserScore, deleteArticle } from '@/api/main.ts';
import useUserStore from '@/store/modules/user.ts';
import { useRouter } from 'vue-router';
interface RuleForm {
	title: string;
	baseImg: string;
	text: string;
}
defineComponent({ name: 'Mine' });
const router = useRouter();
const user = useUserStore();
const likeList = ref([]);
const hideList = ref([]);
const personalList = ref([]);
const listPersonalTotal = ref(0);
const listHideTotal = ref(0);
const listLikeTotal = ref(0);
const likeListParams = ref({
	current: 1,
	size: 10,
});
const hideListParams = ref({
	current: 1,
	size: 10,
});
const personalListParams = ref({
	current: 1,
	size: 10,
});
const ruleFormRef = ref<FormInstance>();
const imageUrl = ref('');
const activeName = ref('1');
const userScore = ref(0);
const userArticleSum = ref(0);
const addNewArticle = ref(false);
const formData = ref({
	title: '',
	baseImg: '',
	text: '',
});
const rules = reactive<FormRules<RuleForm>>({
	title: [
		{ required: true, message: 'Article title is required', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur' },
	],
	text: [
		{ required: true, message: 'Article content is required', trigger: 'blur' },
		{ max: 800, message: 'The maximum length of the article content is 800.', trigger: 'blur' },
	],
});
watch(likeListParams.value, () => {
	getLikeList();
});
watch(hideListParams.value, () => {
	getHideList();
});
watch(personalListParams.value, () => {
	getPersonalList();
});
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
	formData.value.baseImg = response.data;
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	const witheList = ['image/jpeg', 'image/png', 'image/jpg'];
	if (!witheList.includes(rawFile.type)) {
		ElMessage.error('Only upload jpeg、png、jpg!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Picture size can not exceed 2MB!');
		return false;
	}
	return true;
};
async function addNewArticleHandler() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate(async (valid, fields) => {
		if (valid) {
			await insertArticle(formData.value);
			ElMessage.success('Article added successfully');
			addNewArticle.value = false;
			formData.value = {
				title: '',
				baseImg: '',
				text: '',
			};
			await getPersonalList();
		} else {
			console.log('error submit!', fields);
		}
	});
}
async function getLikeList() {
	const res = await getArticleByLike(likeListParams.value);
	likeList.value = res.data.records;
	listLikeTotal.value = res.data.total;
}

async function getHideList() {
	const res = await getArticleByHide(hideListParams.value);
	hideList.value = res.data.records;
	listHideTotal.value = res.data.records.total;
}
async function getPersonalList() {
	const res = await selfArticle(personalListParams.value);
	personalList.value = res.data.records;
	listPersonalTotal.value = res.data.total;
	userArticleSum.value = res.data.records.length;
}

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
			getLikeList();
			break;
		}
		case '2': {
			getHideList();
			break;
		}
		case '3': {
			getPersonalList();
			break;
		}
	}
}
async function getUserScoreHandler() {
	const res = await getUserScore();
	if (typeof res.data === 'number') {
		userScore.value = res.data;
	}
}
async function cancelDelete(article_id: string) {
	ElMessageBox.confirm('Do you want to delete this article?', 'Warning', {
		confirmButtonText: 'OK',
		cancelButtonText: 'Cancel',
		type: 'warning',
	})
		.then(async () => {
			await deleteArticle({
				article_id: article_id,
			});
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
function initData() {
	getLikeList();
	getPersonalList();
	getUserScoreHandler();
}
initData();
</script>

<style scoped lang="scss">
@import '../../assets/style/base.scss';
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
	height: 60vh;
	overflow: hidden;
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
.avatar-uploader {
	:deep(.el-upload) {
		width: 200px;
		height: 200px;
		border: 2px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}
}

.avatar-uploader {
	.el-upload:hover {
		border-color: var(--el-color-primary);
	}
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
