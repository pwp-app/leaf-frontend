<template>
    <div id="app">
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less" scoped>
#app {
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: 200ms;
}
.v-enter-to {
    opacity: 1;
}
.v-leave {
    opacity: 1;
}
.v-leave-to {
    opacity: 0;
}
.v-leave-active {
    transition: 200ms;
}
</style>

<style lang="less">
.nav {
    border: none !important;
}
.nav > .el-menu-item{
    height: 80px !important;
    line-height: 80px !important;
    font-size: 15px !important;
    border: none !important;
    letter-spacing: 0.0375rem;
    user-select: none;
    -webkit-user-drag: none;
}
.nav > .is-active > span{
    font-weight: 500 !important;
}
.nav > .el-menu-item:hover{
    background: rgba(247,247,247) !important;
}
.el-dropdown-menu{
    user-select: none;
    -webkit-user-drag: none;
}
// 复写 el-dialog 的样式
.el-dialog__body{
    padding: 4px 20px !important;
}
.el-dialog__body > .el-form > .el-form-item{
    margin-bottom: 8px !important;
}
// 复写 el-popconfirm 的样式
.el-popconfirm__main{
    margin: 8px 0 !important;
}
.el-popconfirm__action{
    float: right !important;
}
// 复写 el-breadcrumb 的样式
.el-breadcrumb__inner{
    font-weight: 500 !important;
    font-size: 18px !important;
}
</style>
