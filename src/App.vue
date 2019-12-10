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

<style>
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
</style>
