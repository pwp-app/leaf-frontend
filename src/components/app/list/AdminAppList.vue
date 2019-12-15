<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="id" label="ID" width="75"></el-table-column>
            <el-table-column prop="uid" label="UID" width="75"></el-table-column>
            <el-table-column prop="bundleId" label="Bundle ID" width="320"></el-table-column>
            <el-table-column prop="displayName" label="名称" width="200"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="lastUpdateTime" label="最后更新时间" width="180"></el-table-column>
            <el-table-column prop="downloadCount" label="下载量" width="100"></el-table-column>
            <el-table-column prop="enabled" label="可用状态" :formatter="enabledFormatter" width="120"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" v-if="scope.row.enabled" @click="handleBan(scope.$index, scope.row)">封禁</el-button>
                    <el-button size="mini" type="primary" v-if="!scope.row.enabled" @click="handleUnban(scope.$index, scope.row)">解封</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination">
            <el-pagination :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="currentPageChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app.admin.applist',
    data() {
        return {
            data: [],
            tableLoading: false,
            total: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.tableLoading = true
            this.axios.get('/api/admin/getAppList', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.tableLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total
                    this.data = response.data.data.list
                } else {
                    this.data = []
                    this.total = 0
                }
            })
        },
        currentPageChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        },
        handleBan(index, row){
            this.$confirm('此操作将禁用应用 ['+row.displayName+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/banApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('封禁成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleUnban(index, row){
            this.$confirm('此操作将解封应用 ['+row.displayName+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/unbanApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('解封成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除应用 ['+row.displayName+']，且数据不可恢复，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/admin/deleteApp', {
                    appId: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('删除成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        }
    }
}
</script>
<style lang="less">
.table-pagination > .el-pagination{
    padding: 16px 10px 0px 4px;
}
</style>
