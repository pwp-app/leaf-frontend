<template>
    <el-menu
        class="nav-menu"
        :default-active="defaultActive"
        :unique-opened="false"
        mode="horizontal"
        background-color="rgba(252,253,254)"
        text-color="#9a9a9a"
        active-text-color="#3E885B"
        router
    >
        <el-menu-item index="/app/myapps">
            <span slot="title">我的应用</span>
        </el-menu-item>
        <el-menu-item index="/app/report">
            <span slot="title">数据报表</span>
        </el-menu-item>
        <template v-if="showAdmin">
            <el-submenu index="sub-admin">
                <template slot="title">
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item index="/app/admin/user">用户管理</el-menu-item>
                <el-menu-item index="/app/admin/apps">应用管理</el-menu-item>
                <el-menu-item index="/app/admin/invitecode">邀请码管理</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
export default {
    name: "app.common.Navigator",
    data() {
        return {
            showAdmin: false,
            defaultActive: ''
        };
    },
    watch: {
        "$store.state.userinfo.role": 'canShowAdmin',
        "$route.path": 'pathChanged'
    },
    mounted() {
        if (this.$route.path == '/app'){
            this.defaultActive = '/app/dashboard';
        } else {
            this.defaultActive = /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path).length > 0 ? /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path)[0] : null
        }
    },
    methods: {
        canShowAdmin(){
            if (this.$store.state.userinfo.role == 'admin'){
                this.showAdmin = true
            } else {
                this.showAdmin = false
            }
        },
        pathChanged(){
            if (this.$route.path == '/app'){
                this.defaultActive = '/app/dashboard';
            } else {
                this.defaultActive = /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path).length > 0 ? /(\/[a-zA-Z]+\/[a-zA-Z]+)/.exec(this.$route.path)[0] : null
            }
        }
    }
};
</script>

<style lang="less" scoped>
span {
    font-weight: 500;
}
.nav-menu {
    height: 100%;
    display: inline-block;
}
</style>
