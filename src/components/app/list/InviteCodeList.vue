<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="phone" label="申请人"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="code" label="邀请码"></el-table-column>
            <el-table-column prop="email" label="使用状态"></el-table-column>
            <el-table-column prop="phone" label="使用人"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="table-icon-button">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row, scope.$index)"><i class="el-icon-delete-solid"></i></el-button>
                    </div>
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
    name: 'app.list.invitecodelist',
    data() {
        return {
            data: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            tableLoading: false
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        getList(){
            this.tableLoading = true
            this.axios.get('/api/admin/getInviteCodeList', {
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
        currentPageChange(page){
            this.currentPage = page
            this.getList()
        },
        handleDelete(row, index){
            this.$confirm('此操作将永久删除该邀请码，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/admin/deleteInviteCode',{
                    id: row.id
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
            });
        }
    }
}
</script>
<style lang="less">
.table-pagination > .el-pagination {
    padding: 16px 10px 0px 4px;
}
</style>
