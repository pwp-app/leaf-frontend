<template>
    <div class="table-wrapper">
        <el-table :data="versionData" style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="platform" :formatter="platformFormatter" label="平台"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="downloadCount" label="下载量"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="table-icon-button">
                        <el-button size="mini" type="info" @click="handleDownload(scope.row, scope.$index)"><i class="el-icon-download"></i></el-button>
                        <el-button size="mini" type="primary" @click="handleShare(scope.row, scope.$index)"><i class="el-icon-share"></i></el-button>
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
    name: 'app.list.versionlist',
    props: ['appid'],
    data() {
        return {
            versionData: [],
            tableLoading: false,
            // pagination
            total: 0,
            currentPage: 1,
            pageSize: 15,
        }
    },
    methods: {
        getList() {
            this.tableLoading = true
            this.axios.get('/api/app/getVersionList', {
                params: {
                    appId: this.appid,
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response) => {
                this.tableLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total
                    this.versionData = response.data.data.list
                } else {
                    this.versionData = []
                }
            })
        },
        refreshList() {
            this.getList()
        },
        initList() {
            this.total = 0
            this.currentPage = 1
            this.getList()
        },
        currentPageChange(page){
            this.currentPage = page
            this.getList()
        },
        handleDownload(row, index) {
            this.$emit('download', row)
        },
        handleShare(row, index) {
            this.$emit('share', row)
        },
        handleDelete(row, index){
            this.$confirm('此操作将永久删除该版本，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/app/deleteVersion', {
                    appId: this.appid,
                    versionId: row.id
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
                    this.$emit('version-deleted')
                })
            }).catch(() => {
                // catch cancel
                // do nothing
            });
        },
        platformFormatter(row, column, cellValue, index){
            if (cellValue == 'windows'){
                return 'Windows'
            } else if (cellValue == 'linux'){
                return 'Linux'
            } else if (cellValue == 'macos'){
                return 'macOS'
            } else if (cellValue == 'android'){
                return 'Android'
            } else if (cellValue == 'ios'){
                return 'iOS / iPad OS'
            }
        }
    }
}
</script>
<style lang="less">
.table-icon-button > .el-button--mini{
    padding: 7px 8px;
}
.table-pagination > .el-pagination{
    padding: 16px 10px 0px 10px;
}
</style>
