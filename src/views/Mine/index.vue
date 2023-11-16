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
				<div><span class="iconfont icon-icon" style="margin-right: 10px"></span>积分：<span style="color: red; margin-right: 20px">45</span></div>
				<div><span class="iconfont icon-shuliang" style="margin-right: 10px"></span>发表文章数量：<span style="color: red">45</span></div>
			</div>
		</header>
		<main>
			<el-tabs v-model="activeName" class="demo-tabs" @tabChange="tabChange">
				<el-tab-pane label="喜欢列表" name="1">
					<div class="collection-list">
						<div class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title">xxxxxxxG</div>
							<div class="opt">
								<el-button type="danger" :icon="Star" @click="cancelCollection">取消</el-button>
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
								<el-button type="danger" :icon="View" @click="cancelHide">取消</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="发布列表" name="3">
					<div class="my-list" style="width: 100%; padding: 10px 0; height: 30px">
						<el-button type="primary" style="margin-left: auto; display: block" :icon="Edit" @click="addNewArticle = true"></el-button>
					</div>
					<div class="collection-list">
						<div class="list-item">
							<div class="left">
								<el-image style="width: 50px; height: 50px" fit="cover"></el-image>
							</div>
							<div class="title">xxxxxxxG</div>
							<div class="opt">
								<el-button type="danger" :icon="Delete" @click="cancelHide">删除</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</main>
		<el-dialog v-model="addNewArticle" :close-on-click-modal="false" :destroy-on-close="true" title="新增文章" width="560px">
			<el-form ref="ruleFormRef" label-position="top" label-width="100px" :model="formData" style="max-width: 460px; margin: 0 auto" :rules="rules">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="formData.title" />
				</el-form-item>
				<el-form-item label="图片" prop="image">
					<el-upload
						class="avatar-uploader"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="文章内容" prop="message">
					<el-input
						v-model="formData.message"
						:autosize="{ minRows: 8, maxRows: 16 }"
						type="textarea"
						maxlength="800"
						placeholder="请输入文章内容"
						show-word-limit
					/>
				</el-form-item>
				<el-form-item>
					<div style="margin-left: auto; margin-top: 10px">
						<el-button type="primary" @click="addNewArticleHandler">确定</el-button>
						<el-button @click="addNewArticle = false">取消</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { View, Delete, Edit, Plus, Star } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormRules, FormInstance } from 'element-plus';
import type { UploadProps } from 'element-plus';
interface RuleForm {
	title: string;
	image: string;
	message: string;
}
defineComponent({ name: 'Mine' });
const ruleFormRef = ref<FormInstance>();
const imageUrl = ref('');
const activeName = ref('1');
const addNewArticle = ref(false);
const formData = ref({
	title: '',
	image: '',
	message: '',
});
const rules = reactive<FormRules<RuleForm>>({
	title: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 30, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	image: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
	message: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ max: 800, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
});
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('Avatar picture must be JPG format!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!');
		return false;
	}
	return true;
};
async function addNewArticleHandler() {
	if (!ruleFormRef.value) return;
	await ruleFormRef.value.validate((valid, fields) => {
		if (valid) {
			console.log('submit!');
		} else {
			console.log('error submit!', fields);
		}
	});
}
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
.avatar-uploader {
	:deep(.el-upload) {
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
