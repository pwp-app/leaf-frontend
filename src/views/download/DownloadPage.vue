<template>
    <el-container class="container-base" v-loading="pageLoading">
        <el-main class="container-main">
            <el-card class="card-app">
                <div class="hole"></div>
                <el-row class="row-logo">
                    <el-col :span="24">
                        <div class="logo-wrapper">
                            <img class="logo" :src="logoPath">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-name">
                    <el-col :span="24">
                        <div class="name-wrapper">
                            <span>{{name}}</span>
                        </div>
                        <div class="version-wrapper">
                            <span>{{platformName}} - {{version}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-desc">
                    <el-col :span="24">
                        <div class="desc-header">
                            <span>应用描述</span>
                        </div>
                        <div class="desc-wrapper">
                            <span>{{desc}}</span>
                        </div>
                        <div class="desc-header">
                            <span>版本说明</span>
                        </div>
                        <div class="desc-wrapper">
                            <span>{{}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :class="['row-download', ((platform != 'ios' && platform != 'android') || isMobile()) ? 'row-download-button': '']">
                    <el-col :span="24">
                        <div class="time-wrapper">
                            <span>更新于 : {{createTime}}</span>
                        </div>
                        <div class="download-action download-action-button" v-if="(platform != 'ios' && platform != 'android') || isMobile()">
                            <el-button type="secondary" round><i class="el-icon-bottom"></i><a class="button-text">点我下载</a></el-button>
                        </div>
                        <div class="download-action" v-else>
                            <div class="qrcode-wrapper">
                                <img :src="qrcode">
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="from">
                    <span>Powered by <span class="from-brand" @click="toHome">Leaf</span></span>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>
import BasePath from '@/config/BasePath.js'
import QRCode from 'qrcode'

export default {
    name: 'download.main',
    data(){
        return {
            logoPath: '',
            name: '',
            version: '',
            desc: '',
            createTime: '',
            platform: '',
            platformName: '',
            pageLoading: false,
            qrcode: ''
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.pageLoading = true
            this.axios.get('/api/download/getInfo', {
                params: {
                    key: this.$route.params.key
                }
            }).then((response) => {
                this.pageLoading = false
                if (response.status != 200 || response.data.code != 200){
                    this.$router.push({
                        name: 'error.default'
                    })
                    return
                }
                this.logoPath = BasePath.imageBase + response.data.data.iconKey
                this.name = response.data.data.name
                this.desc = (response.data.data.desc && response.data.data.desc.length > 0  ? response.data.data.desc : '无')
                this.createTime = response.data.data.createTime
                this.version = response.data.data.version
                this.platform = response.data.data.platform
                this.platformName = this.platformFormatter(this.platform)
                if (this.platform == 'android' || this.platform == 'ios'){
                    QRCode.toDataURL(window.location.href).then(url => {
                        this.qrcode = url
                    })
                }
            });
        },
        isMobile(){
            return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        },
        platformFormatter(value){
            if (value == 'windows'){
                return 'Windows'
            } else if (value == 'linux'){
                return 'Linux'
            } else if (value == 'macos'){
                return 'macOS'
            } else if (value == 'android'){
                return 'Android'
            } else if (value == 'ios'){
                return 'iOS / iPad OS'
            }
        },
        toHome(){
            this.$router.push({
                name: 'landing.home'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.container-base {
    background: darken(#fff, 5%);
}
.container-main {
    display: flex;
}
.card-app{
    width: 432px;
    height: 760px;
    margin: auto;
    border-radius: 16px;
    background-color: darken(#fff, 1.75%);
}
.hole{
    width: 18px;
    height: 18px;
    background: darken(#fff, 5%);
    box-shadow: 3px 3px 3px 0 rgba(0,0,0,.075) inset;
    border: #eeeeee 1px solid;
    border-radius: 14px;
}
// logo
.row-logo {
    margin-top: 28px;
}
.logo-wrapper {
    width: 96px;
    height: 96px;
    margin: 0 auto;
    border-radius: 12px;
}
.logo-wrapper > img{
    width: 96px;
    height: 96px;
    border-radius: 12px;
}
// name
.row-name {
    margin-top: 14px;
}
.name-wrapper {
    text-align: center;
    color: #606266;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.05em;
    font-family: "PingFang", "Microsoft Yahei";
}
.version-wrapper{
    text-align: center;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #909399;
    font-family: "PingFang", "Microsoft Yahei";
}
.row-desc {
    margin-top: 24px;
}
.desc-header {
    height: 40px;
    font-size: 15px;
    font-weight: 500;
    color: #909399;
    font-family: "PingFang", "Microsoft Yahei";
    line-height: 36px;
    letter-spacing: 0.05em;
    border-bottom: #cecece 2px dashed;
    margin: 0 24px;
}
.desc-wrapper {
    height: 76px;
    font-weight: 500;
    color: #909399;
    font-family: "PingFang", "Microsoft Yahei";
    line-height: 26px;
    font-size: 14px;
    margin: 8px 24px;
    overflow-y: auto;
}
.desc-wrapper::-webkit-scrollbar {
    width: 6px;
    z-index: 10;
}
.desc-wrapper::-webkit-scrollbar-track-piece {
    background: darken(#fff, 1.75%);
}
.desc-wrapper::-webkit-scrollbar-thumb {
    border-radius: 9px;
    background-color: #cecece;
}
.desc-wrapper::-webkit-scrollbar-button {
    display: none;
}
.row-download {
    margin-top: 8px;
}
.row-download-button {
    margin-top: 46px;
}
.time-wrapper {
    text-align: center;
    font-weight: 500;
    color: #909399;
    font-family: "PingFang", "Microsoft Yahei";
    line-height: 32px;
    font-size: 13px;
}
.download-action {
    text-align: center;
    margin-top: 8px;
}
.download-action-button {
    margin-top: 12px;
}
.download-action > button{
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 60px;
    font-size: 16px;
    transition: 0.15s;
}
.download-action > button:hover{
    width: 110px;
    height: 48px;
    padding: 0;
    border-radius: 60px;
    font-size: 14px;
}
.download-action > button:hover i{
    display: none;
}
.button-text {
    display: none;
}
.download-action > button:hover .button-text{
    display: block !important;
}
.from{
    position: absolute;
    bottom: 64px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-drag: none;
}
.from > span{
    font-weight: 500;
    color: #cecece;
    font-family: "PingFang", "Microsoft Yahei";
    line-height: 36px;
    font-size: 12px;
    letter-spacing: 0.05em;
}
.from-brand {
    transition: 0.2s;
}
.from-brand:hover{
    color: #3e885b;
    cursor: pointer;
}
.qrcode-wrapper{
    width: 130px;
    height: 130px;
    margin: 0 auto;
}
.qrcode-wrapper > img {
    width: 130px;
    height: 130px;
    border-radius: 12px;
}
@media (max-width: 1024px) {
    .from{
        display: none;
    }
}
</style>
