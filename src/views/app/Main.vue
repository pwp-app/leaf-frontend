<template>
    <el-container class="container-base">
        <el-header class="header" height="80px">
            <div class="title-wrapper" @click="toMyApps">
                <div class="title">
                    <span>Leaf</span>
                </div>
            </div>
            <div class="title-icon-wrapper">
                <div class="title-icon">
                    <i class="el-icon-arrow-right title-icon"></i>
                </div>
            </div>
            <Navigator class="nav"></Navigator>
            <div class="user-panel">
                <UserMenu></UserMenu>
            </div>
        </el-header>
        <el-container>
            <el-main class="container-main">
                <div class="breadcrumb">
                    <Breadcrumb></Breadcrumb>
                </div>
                <transition mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Navigator from '@/components/app/common/Navigator.vue'
import UserMenu from '@/components/app/common/UserMenu.vue'
import Breadcrumb from '@/components/app/common/Breadcrumb.vue'
export default {
    name: 'app.main',
    components: {
        Navigator,
        UserMenu,
        Breadcrumb
    },
    created(){
        // 拉取用户的基本信息
        if(this.$route.name == 'app.main'){
            this.$router.push({
                name: 'app.main.myapps'
            })
        }
    },
    mounted(){
        this.axios.get('/api/user/fetchUserInfo').then((response) => {
            if (response.status == 200){
                if (response.data.data != null){
                    this.$store.commit('userinfo/setUserInfo', response.data.data)
                }
            }
        });
    },
    methods: {
        toMyApps() {
            this.$router.push({
                name: 'app.main.myapps'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container-base {
    background: rgba(252,253,254);
}
.container-main {
    background: #f4f4f4;
    padding: 0 16rem 2rem 16rem;
}
.header{
    padding: 0 16rem;
}
.title-wrapper{
    display: inline-block;
    height: 100%;
    user-select: none;
    -webkit-user-drag: none;
}
.title-wrapper:hover {
    cursor: pointer;
}
.title-icon-wrapper {
    display: inline-block;
    margin-left: 32px;
    user-select: none;
    -webkit-user-drag: none;
}
.title-icon{
    display: table;
    line-height: 80px;
    color:#cacaca;
    font-size: 18px;
}
.title {
    font-size: 30px;
    letter-spacing: 0.1rem;
    color: #3e885b;
    font-weight: 700;
    display: table;
    line-height: 80px;
}
.user-panel{
    height: 100%;
    float: right;
}
.nav {
    margin-left: 1rem;
}

// breadcrumb
.breadcrumb{
    margin: 24px 0;
}

// anim
.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: 50ms;
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
    transition: 50ms;
}
</style>
