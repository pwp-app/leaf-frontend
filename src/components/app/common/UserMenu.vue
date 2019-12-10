<template>
    <div class="user-avatar-wrapper">
        <el-dropdown trigger="click" @command="handleCommand">
            <UserAvatar :size="38"></UserAvatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="user-settings">用户设置</el-dropdown-item>
                <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import UserAvatar from '@/components/app/common/UserAvatar.vue'
export default {
    name: "app.common.usermenu",
    components: {
        UserAvatar
    },
    methods: {
        handleCommand(command) {
            if (command == 'user-settings'){
                if (this.$route.name != 'app.page.usersettings'){
                    this.$router.push({
                        name: 'app.main.usersettings'
                    })
                }
            } else if (command == "logout") {
                this.doLogout();
            }
        },
        doLogout() {
            this.axios.get("/api/portal/logout").then(response => {
                if (response.status != 200) {
                    this.$message.error("请求时出现错误");
                    return;
                }
                if (response.data.code != 200) {
                    this.$message.error(response.data.message);
                    return;
                } else {
                    this.$router.push({
                        name: "landing.portal"
                    });
                }
            });
        }
    }
};
</script>

<style lang="less">
.user-avatar-wrapper {
    margin-right: -8px;
    display: table;
    line-height: 80px;
    user-select: none;
    -webkit-user-drag: none;
}
.user-avatar-wrapper > .el-dropdown {
    height: 60px;
}
.user-avatar-wrapper:hover{
    cursor: pointer;
}
.el-avatar {
    margin: 21px 8px;
}
.info {
    display: inline-block;
}
</style>
