<template>
    <el-upload
        class="upload"
        ref="upload"
        action="/api/app/uploadApp"
        :on-preview="handlePreview"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :accept="fileExtension"
        :limit="1">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">选择并上传你的应用安装包</div>
    </el-upload>
</template>

<script>
import BasePath from '@/config/BasePath.js'
export default {
    name: 'app.main.fileuploader',
    data() {
        return {
            fileList: []
        }
    },
    props: ['platform'],
    computed: {
        fileExtension() {
            if (this.platform == 'windows'){
                return '.exe'
            } else if (this.platform == 'linux') {
                return '.deb,.rpm,.tar.gz'
            } else if (this.platform == 'macos'){
                return '.dmg'
            } else if (this.platform == 'android'){
                return '.apk'
            } else if (this.platform == 'ios') {
                return '.ipa'
            }
        }
    },
    methods: {
        handlePreview(file) {
            let downloadTag = document.createElement('a')
            downloadTag.setAttribute('id', 'x-filedownload')
            downloadTag.setAttribute('href', BasePath + file.response.data.key + '?attname='+file.name)
            downloadTag.setAttribute('style', 'display: none')
            document.body.appendChild(downloadTag)
            downloadTag.click()
            document.body.removeChild(downloadTag)
        },
        handleSuccess(response, file, fileList) {
            this.$emit('upload-success', response.data)
        },
        handleError(response){
            response = JSON.parse(response.message)
            this.$message.error(response.message)
        }
    }
}
</script>

<style>

</style>
