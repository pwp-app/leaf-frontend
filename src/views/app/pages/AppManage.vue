<template>
    <div class="page-wrapper">
        <el-row class="row-applist">
            <el-col :span="24">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>应用列表</span>
                    </div>
                    <AdminAppList></AdminAppList>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import AdminAppList from '@/components/app/list/AdminAppList.vue'
export default {
    name: 'app.admin.user',
    components: {
        AdminAppList
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
