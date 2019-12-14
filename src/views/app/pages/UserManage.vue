<template>
    <div class="page-wrapper">
        <el-row class="row-userlist">
            <el-col :span="24">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>用户列表</span>
                    </div>
                    <AdminUserList></AdminUserList>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import AdminUserList from '@/components/app/list/AdminUserList.vue'
export default {
    name: 'app.admin.user',
    components: {
        AdminUserList
    }
}
</script>
<style lang="less">
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
}
.card-table > .el-card__body {
    padding: 2px 16px 20px 16px;
}
</style>
