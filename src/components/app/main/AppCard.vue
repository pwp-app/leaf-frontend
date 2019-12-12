<template>
    <el-card class="box-card card-app" @click.native="cardClicked" @contextmenu.prevent.native="openContextMenu($event)">
        <div class="icon-wrapper">
            <img :src="iconPath">
        </div>
        <div class="info-wrapper">
            <div :class="['info-name', name && name.length > 10 ? /^[a-zA-Z0-9]+$/.exec(name) && name.length <= 12 ? '' :'info-name-long': name.length < 6 ? 'info-name-short' :'']">
                <span>{{name}}</span>
            </div>
            <div class="info-bundleId">
                <span>{{bundleid}}</span>
            </div>
            <div class="info-download">
                <span>下载量：<span class="info-download-count">{{download}}</span></span>
            </div>
        </div>
    </el-card>
</template>

<script>
import BasePath from '@/config/BasePath.js'
export default {
    name: 'app.main.appcard',
    props: ['id', 'icon', 'index', 'name', 'bundleid', 'download'],
    computed: {
        iconPath: function () {
            if (this.icon){
                return BasePath.imageBase + this.icon
            } else {
                return BasePath.imageBase + 'leaf/no-icon.png'
            }
        },
        displayName: function (){
            if (name.length < 15){
                return name
            } else {
                return name.substring(0, 16) + '...'
            }
        }
    },
    methods: {
        openContextMenu(e) {
            this.$emit('open-context', {
                event: e,
                index: this.index
            })
        },
        cardClicked(){
            this.$router.push({
                path: '/app/myapps/' + this.id
            })
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
</style>

<style lang="less">
@card-app-height: 145px;
@card-app-icon-width: 80px;

.card-app {
    height: @card-app-height;
}
.card-app:hover {
    background: #fafafa;
    cursor: pointer;
}
.card-app > .el-card__body{
    display: flex;
    flex-direction: row;
    padding: 0;
}
.card-app > .el-card__body > .icon-wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
    width: @card-app-icon-width;
    height: @card-app-icon-width;
    margin: 28.5px 10px 28.5px 28px;
}
.card-app > .el-card__body > .icon-wrapper > img {
    width: @card-app-icon-width;
    height: @card-app-icon-width;
    margin: auto 0;
    border-radius: 4px;
}
.card-app > .el-card__body > .info-wrapper{
    flex: 1 1 auto;
    display: inline-block;
    margin: auto 16px;
}
.card-app > .el-card__body > .info-wrapper > .info-name{
    font-size: 20px;
    letter-spacing: 0.05em;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
}
.card-app > .el-card__body > .info-wrapper > .info-name-short{
    font-size: 22px;
}
.card-app > .el-card__body > .info-wrapper > .info-name-long{
    font-size: 16px;
}
.card-app > .el-card__body > .info-wrapper > .info-bundleId {
    margin-top: 4px;
}
.card-app > .el-card__body > .info-wrapper > .info-bundleId > span {
    color: #606266;
    font-size: 14px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
}
.card-app > .el-card__body > .info-wrapper > .info-download {
    margin-top: 6px;
}
.card-app > .el-card__body > .info-wrapper > .info-download > span {
    color: #606266;
    font-size: 14px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
    letter-spacing: 0.05rem;
}
</style>
