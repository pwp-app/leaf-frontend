<template>
    <div class="page-wrapper">
        <el-row class="row-userlist">
            <el-col :span="24">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>用户列表</span>
                        <div class="table-header-operation">
                            <el-button size="small" @click="refreshTable">刷新</el-button>
                        </div>
                    </div>
                    <AdminUserList ref="list"></AdminUserList>
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
    },
    methods: {
        refreshTable(){
            this.$refs.list.getList()
        }
    }
}
</script>
<style lang="less" scoped>
.table-header-operation {
    float: right;
}
</style>
<style lang="less">
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
    line-height: 32px;
}
.card-table > .el-card__body {
    padding: 2px 16px 20px 16px;
}
</style>
