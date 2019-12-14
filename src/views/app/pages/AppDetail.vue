<template>
    <div class="detail-wrapper">
        <el-row class="row-overview">
            <el-col :span="24">
                <el-card :class="['box-card','card-info',desc.length > 0 ? 'card-info-desc' : '']">
                    <div class="info-name">
                        <span class="info-name-display">{{name}}</span>
                        <span class="info-name-bundle">{{bundleId}}</span>
                        <div :class="['info-name-disabled', desc.length > 0 ? 'info-name-disabled-desc':'']" v-if="!appEnabled">
                            <span>不可用</span>
                        </div>
                        <span v-if="appEnabled" :class="['info-name-icon', desc.length > 0 ? 'info-name-icon-big' : '']">
                            <img :src="icon ? icon : defaultIcon">
                        </span>
                    </div>
                    <div class="info-desc" v-if="desc.length > 0">
                        <span class="info-desc">{{desc}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="row-detail" :gutter="16">
            <el-col :span="8" class="row-detail-left">
                <NumberCard label="版本数" :value="versionCount"></NumberCard>
                <NumberCard label="下载量" :value="downloadCount"></NumberCard>
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>当前版本</span>
                    </div>
                    <CurrentVersionList :data="currentVersionData"></CurrentVersionList>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header versionlist-header clearfix">
                        <span>版本列表</span>
                        <div class="table-header-operation">
                            <el-button size="small" @click="refreshVersionList">刷新</el-button>
                            <el-button size="small" type="primary" @click="showAddVersionDialog" :disabled="!appEnabled">添加版本</el-button>
                        </div>
                    </div>
                    <VersionList ref="versionList" :appid="$route.params.appId" @download="handleDownload" @share="handleShare" @version-deleted="handleDeleted"></VersionList>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :title="versionFormStatus == 'add' ? '添加版本' : '编辑版本'" :visible.sync="versionFormVisible" width="30%">
            <el-form ref="versionForm" :model="versionForm" :rules="versionFormRule">
                <el-form-item prop="platform" label="平台">
                    <el-select class="form-select" v-model="versionForm.platform" placeholder="请选择">
                        <el-option
                            v-for="item in platformOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="version" label="版本">
                    <el-input v-model="versionForm.version" placeholder="例: 1.0.0"></el-input>
                </el-form-item>
                <el-form-item prop="fileKey" class="file-uploader" label="安装文件">
                    <FileUploader :platform="versionForm.platform" @upload-success="appUploadSuccess"></FileUploader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="versionFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitVersionForm" :disabled="!submitVersionEnabled">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="生成分享链接" :visible.sync="shareDialogVisible" width="30%">
            <el-form ref="shareForm" :model="shareForm">
                <el-form-item prop="expires" label="有效期">
                    <el-select class="form-select" v-model="shareForm.expires">
                        <el-option
                            v-for="item in expiresOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" style="float: right;margin-top: 8px;" @click="generateKey" :disabled="generateKeyDisabled">生成</el-button>
                </el-form-item>
                <el-form-item prop="version" label="分享链接" v-show="share.key">
                    <el-input v-model="share.key"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" style="padding: 8px 0;">
            </span>
        </el-dialog>
    </div>
</template>

<script>
import CurrentVersionList from "@/components/app/list/CurrentVersionList.vue"
import VersionList from "@/components/app/list/VersionList.vue"
import NumberCard from "@/components/app/main/NumberCard.vue"
import FileUploader from "@/components/app/main/FileUploader.vue"
import { Loading } from 'element-ui'
import BasePath from "@/config/BasePath.js"

export default {
    name: "app.main.myapps.detail",
    components: {
        CurrentVersionList,
        NumberCard,
        FileUploader,
        VersionList
    },
    data() {
        return {
            // overview
            name: "",
            bundleId: "",
            desc: "",
            downloadCount: 0,
            appEnabled: true,
            icon: null,
            defaultIcon: BasePath.imageBase + 'leaf/no-icon.png',
            // detail
            currentVersionData: [],
            versionCount: 0,
            // version form
            versionFormVisible: false,
            versionFormStatus: '',
            submitVersionEnabled: true,
            versionForm: {
                platform: '',
                version: '',
                fileKey: ''
            },
            versionFormRule: {
                platform: [{
                    required: true,
                    message: '请选择平台'
                }],
                version: [{
                    required: true,
                    message: '请填入版本'
                }, {
                    pattern: /^[0-9]+\.[0-9]+\.[0-9]+$/,
                    message: '版本号格式错误',
                    trigger: 'blur'
                }],
                fileKey: [{
                    required: true,
                    message: '请上传版本对应的安装包',
                    trigger: 'blur'
                }]
            },
            platformOptions: [{
                value: 'windows',
                label: 'Windows'
            }, {
                value: 'linux',
                label: 'Linux'
            }, {
                value: 'macos',
                label: 'macOS'
            }, {
                value: 'android',
                label: 'Android'
            }, {
                value: 'ios',
                label: 'iOS / iPad OS'
            }],
            // share
            shareDialogVisible: false,
            generateKeyDisabled: false,
            share: {
                versionId: null,
                version: null,
                key: null
            },
            shareForm: {
                expires: 0
            },
            expiresOptions: [{
                value: 0,
                label: '永久'
            },{
                value: 5,
                label: '5 分钟',
            }, {
                value: 30,
                label: '30 分钟',
            }, {
                value: 60,
                label: '1 小时',
            }, {
                value: 180,
                label: '3 小时',
            }, {
                value: 360,
                label: '6 小时',
            }, {
                value: 480,
                label: '8 小时',
            }, {
                value: 720,
                label: '12 小时',
            }, {
                value: 1440,
                label: '1 天',
            }, {
                value: 4320,
                label: '3 天',
            }, {
                value: 10080,
                label: '7 天',
            }, {
                value: 20160,
                label: '14 天',
            }, {
                value: 43200,
                label: '30 天',
            }, {
                value: 86400,
                label: '60 天',
            }, {
                value: 129600,
                label: '90 天',
            }, {
                value: 259200,
                label: '180 天',
            }, {
                value: 388800,
                label: '270 天',
            }, {
                value: 518400,
                label: '360 天',
            }]
        }
    },
    watch: {
        $route: "getData"
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.getInfo()
            this.initVersionList()
        },
        getInfo() {
            let loadingInstance = Loading.service({
                target: document.getElementsByClassName("detail-wrapper")[0],
                fullscreen: false,
                background: '#f4f4f4'
            });
            this.axios.get("/api/app/getInfo", {
                params: {
                    appId: this.$route.params.appId
                }
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        this.name = response.data.data.displayName
                        this.bundleId = response.data.data.bundleId
                        this.desc = response.data.data.description
                        this.appEnabled = response.data.data.isEnabled
                        this.downloadCount = response.data.data.downloadCount
                        this.icon = (response.data.data.iconKey ? BasePath.imageBase + response.data.data.iconKey : null)
                        this.versionCount = (response.data.data.versionCount ? response.data.data.versionCount : 0)
                        // current version
                        this.currentVersionData = []
                        for (var c in response.data.data.currentVersion) {
                            this.currentVersionData.push({
                                platform: c,
                                version: response.data.data.currentVersion[c]
                            })
                        }
                    } else {
                        this.$router.push({
                            name: "error.404"
                        })
                    }
                    loadingInstance.close()
                }
            })
        },
        initVersionList() {
            this.$refs.versionList.initList()
        },
        refreshVersionList() {
            this.$refs.versionList.refreshList()
        },
        // version form
        showAddVersionDialog() {
            this.versionFormVisible = true
            this.clearVersionForm()
            this.versionFormStatus = 'add'
        },
        clearVersionForm() {
            this.versionForm.platform = ''
            this.versionForm.version = ''
            this.versionForm.fileKey = ''
        },
        submitVersionForm() {
            this.$refs['versionForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                if (this.versionFormStatus == 'add'){
                    this.axios.post('/api/app/addVersion', {
                        appId: this.$route.params.appId,
                        platform: this.versionForm.platform,
                        version: this.versionForm.version,
                        fileKey: this.versionForm.fileKey
                    }).then((response) => {
                        if (response.status != 200){
                            this.$message.error("网络通信错误");
                            return;
                        }
                        if (response.data.code != 200){
                            this.$message.error(response.data.message)
                            return;
                        }
                        this.$message.success('添加成功')
                        this.versionFormVisible = false
                        this.refreshVersionList()
                        this.getInfo()
                    })
                }
            });
        },
        handleDownload(row){
            let downloadTag = document.createElement('a')
            downloadTag.setAttribute('id', 'x-filedownload')
            downloadTag.setAttribute('href', BasePath.appBase + row.fileKey + '?attname='+this.name + ' '+row.version+row.fileKey.replace(row.fileKey.split('.')[0],''))
            downloadTag.setAttribute('style', 'display: none')
            document.body.appendChild(downloadTag)
            downloadTag.click()
            document.body.removeChild(downloadTag)
        },
        handleShare(row){
            // 清空
            this.resetShare()
            this.clearShareForm()
            // 设置值
            this.share.versionId = row.id
            this.share.version = row.version
            // 弹出对话框
            this.shareDialogVisible = true
        },
        resetShare(){
            this.share.versionId = null
            this.share.version = ''
            this.share.key = ''
        },
        clearShareForm() {
            this.shareForm.expires = 0
        },
        generateKey(){
            this.generateKeyDisabled = true
            this.axios.post('/api/app/getDownloadKey', {
                appId: this.$route.params.appId,
                versionId: this.share.versionId,
                expires: this.shareForm.expires
            }).then((response) => {
                if (response.status != 200){
                    this.$message.error("网络通信错误");
                    return;
                }
                if (response.data.code != 200){
                    this.$message.error(response.data.message)
                    return;
                }
                this.share.key = window.location.protocol + "//" + window.location.host + "/download/" + response.data.data
            })
        },
        handleDeleted(){
            this.getInfo()
        },
        appUploadSuccess(res) {
            this.versionForm.fileKey = res.key
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}

// overview
.card-info {
    height: 72px;
}
.card-info-desc {
    height: 92px;
}
.info-name {
    height: 28px;
    line-height: 28px;
}
.info-name-icon {
    float: right;
}
.info-name-icon > img{
    width: 48px;
    transform: translateY(-8px);
    border-radius: 4px;
}
.info-name-icon-big > img{
    width: 52px;
    transform: none;
}
.info-name-display {
    font-size: 24px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
    color: #606266;
    font-weight: 600 !important;
    letter-spacing: 0.05rem;
}

.info-name-bundle {
    font-size: 14px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
    color: #909399;
    margin-left: 12px;
    letter-spacing: 0.05rem;
}

.info-desc {
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-top: 8px;
    color: #909399;
    letter-spacing: 0.05rem;
}

.info-name-disabled {
    display: flex;
    align-content: center;
    float: right;
    background: #f56c6c;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    padding: 0 8px;
}
.info-name-disabled-desc {
    transform: translateY(12px);
}

// detail
.row-detail {
    margin-top: 16px;
}
// table
.table-header-operation {
    float: right;
}
.versionlist-header > span{
    line-height: 32px
}
</style>
<style lang="less">
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
}
.card-table > .el-card__body {
    padding: 2px 16px 20px 16px;
}
.row-detail-left > div {
    margin-bottom: 16px !important;

    &:last-child {
        margin-bottom: 0px !important;
    }
}
.form-select {
    display: block;
}
.form-select .el-input__suffix{
    top: 50%;
    height: 50%;
}
.file-uploader .el-form-item__label {
    float: none;
}
</style>
