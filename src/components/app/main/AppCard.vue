<template>
    <el-card class="box-card card-app">
        <div class="icon-wrapper">
            <img :src="icon">
        </div>
        <div class="info-wrapper">
            <div class="info-name">
                <span>{{name}}</span>
            </div>
            <div class="info-download">
                <span>下载量：<span class="info-download-count">{{download}}</span></span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'app.main.appcard',
    props: ['icon', 'name', 'download']
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
    background: #f8f8f8;
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
    padding: 4px;
    margin: 28.5px 28px 28.5px 32px;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1) !important;
    border-radius: 4px;
}
.card-app > .el-card__body > .icon-wrapper > img {
    width: @card-app-icon-width - 16;
    height: @card-app-icon-width - 16;
    margin: auto 0;
}
.card-app > .el-card__body > .info-wrapper{
    flex: 1 1 auto;
    display: inline-block;
    margin: auto 4px;
}
.card-app > .el-card__body > .info-wrapper > .info-name{
    font-size: 24px;
    letter-spacing: 0.05em;
}
.card-app > .el-card__body > .info-wrapper > .info-download {
    margin-top: 4px;
}
.card-app > .el-card__body > .info-wrapper > .info-download > span {
    color: #606266;
    font-size: 16px;
    font-family: "Nunito";
    font-weight: 600;
    letter-spacing: 0.05rem;
}
</style>
