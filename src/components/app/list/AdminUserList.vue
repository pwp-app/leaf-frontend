<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="180"></el-table-column>
            <el-table-column prop="role" :formatter="roleFormatter" label="角色"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="enabled" label="是否可用" :formatter="enabledFormatter" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" v-if="scope.row.role == 'user'" @click="handleSetAdmin(scope.$index, scope.row)">设为管理员</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.role == 'admin'" @click="handleSetUser(scope.$index, scope.row)">设为用户</el-button>
                    <el-button size="mini" type="danger" v-if="scope.row.enabled && scope.row.role != 'admin'" @click="handleBan(scope.$index, scope.row)">封禁</el-button>
                    <el-button size="mini" type="primary" v-if="!scope.row.enabled && scope.row.role != 'admin'" @click="handleUnban(scope.$index, scope.row)">解封</el-button>
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
    name: "app.admin.userlist",
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
            this.axios.get("/api/admin/getUserList", {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(response => {
                this.tableLoading = false
                if (response.status == 200 && response.data.code == 200) {
                    this.total = response.data.data.total
                    this.data = response.data.data.list
                } else {
                    this.data = []
                    this.total = 0
                }
            })
        },
        currentPageChange(currentPage) {
            this.currentPage = currentPage
            this.getList()
        },
        handleSetAdmin(index, row){
            this.$confirm('此操作会将用户 ['+row.username+'] 设为管理员，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/admin/setUserRole', {
                    uid: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('设置成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleSetUser(index, row){
            this.$confirm('此操作会将用户 ['+row.username+'] 设为普通用户，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/setUserRole', {
                    role: 'user',
                    uid: row.id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('设置成功')
                    this.getList()
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        handleBan(index, row){
            this.$confirm('此操作将封禁用户 ['+row.username+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/banUser', {
                    uid: row.id
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
            this.$confirm('此操作将解封用户 ['+row.username+']，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/admin/unbanUser', {
                    uid: row.id
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
        handleDelete(index, row){
            this.$confirm('此操作将删除用户 ['+row.username+']，且数据无法恢复，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/admin/deleteUser', {
                    uid: row.id
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
        },
        getList(){
            this.listLoading = true
            this.axios.get('/api/admin/getUserList', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.listLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total
                    this.data = response.data.data.list
                }
            })
        },
        listCurrentChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        },
        roleFormatter(row, column, cellValue, index){
            if (cellValue == 'user'){
                return '用户'
            } else if (cellValue == 'admin'){
                return '管理员'
            } else {
                return '异常'
            }
        },
        enabledFormatter(row, column, cellValue, index){
            if (cellValue){
                return '是'
            } else {
                return '否'
            }
        }
    }
}
</script>
<style lang="less">
.table-pagination > .el-pagination {
    padding: 16px 10px 0px 4px;
}
</style>
