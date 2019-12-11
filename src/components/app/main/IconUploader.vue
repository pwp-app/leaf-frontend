<template>
    <el-upload
        class="icon-uploader"
        action="/api/app/uploadIcon"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :limit="1"
        accept=".jpg,.png"
    >
        <img v-if="imageUrl" :src="imageUrl" class="icon" />
        <i v-else class="el-icon-plus icon-uploader-icon"></i>
    </el-upload>
</template>

<script>
import BasePath from '@/config/BasePath.js'

export default {
    name: "app.main.iconuploader",
    prop: ['imageUrl'],
    data() {
        return {
            imageUrl: this.imageUrl,
            imageKey: null
        };
    },
    methods: {
        clearIcon(){
            this.imageUrl = null
            this.imageKey = null
        },
        handleAvatarSuccess(res, file) {
            if (res.code != 200){
                this.$message.error(res.data.message)
                return;
            }
            this.imageUrl = BasePath.imageBase + res.data.key
            this.imageKey = res.data.key
            this.$message.success('上传成功')
            this.$emit('upload-success', this.imageKey)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 1;
            const isSize = new Promise(function(resolve, reject) {
                let width = 512
                let height = 512
                let _URL = window.URL || window.webkitURL
                let img = new Image()
                img.onload = function() {
                    let valid = img.width <= width && img.height <= height
                    valid ? resolve() : reject()
                };
                img.src = _URL.createObjectURL(file)
            }).then(
                () => {
                    return file;
                },
                () => {
                    this.$message.error("图片分辨率不能超过 512*512!")
                    return promise.reject();
                }
            );
            if (!isJPG && !isPNG) {
                this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!")
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 1MB!")
            }
            return (isJPG || isPNG) && isLt2M && isSize
        }
    }
};
</script>

<style lang="less">
.icon-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.icon-uploader .el-upload:hover {
    border-color: #3e885b;
}
.icon-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 72px;
    height: 72px;
    line-height: 72px;
    text-align: center;
}
.icon {
    width: 72px;
    height: 72px;
    display: block;
}
</style>
