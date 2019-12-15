<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="bundleId" label="Bundle ID" width="220"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="downloadCount" label="下载量"></el-table-column>
            <el-table-column prop="weekDownloadCount" label="7 天内下载量"></el-table-column>
            <el-table-column prop="monthDownloadCount" label="30 天内下载量"></el-table-column>
        </el-table>
        <div class="table-pagination">
            <el-pagination :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="currentPageChange" layout="total, prev, pager, next"></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app.list.reportlist',
    data(){
        return {
            data: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            tableLoading: false
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.tableLoading = true
            this.axios.get('/api/app/getReportList', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((response)=>{
                this.tableLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.total = response.data.data.total
                    this.data = response.data.data.list
                } else {
                    this.total = 0
                    this.data = []
                }
            });
        },
        currentPageChange(page) {
            this.currentPage = page
            this.getList()
        }
    }
}
</script>
<style lang="less">
.table-pagination > .el-pagination {
    padding: 16px 10px 0px 4px;
}
</style>
