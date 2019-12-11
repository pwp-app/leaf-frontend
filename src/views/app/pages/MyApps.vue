<template>
    <div class="page-wrapper">
        <div class="container-myapps">
            <el-row class="row-overview" :gutter="16">
                <el-col :span="8">
                    <OverviewCard icon="el-icon-star-on" label="应用总数" :value="applicationCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-s-grid" label="版本总数" :value="versionCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-download" label="总下载量" :value="downloadCount"></OverviewCard>
                </el-col>
            </el-row>
            <el-row class="row-applist-title">
                <el-col :span="24">
                    <span id="applist-title">应用列表</span>
                    <el-button id="btn-addApp" type="primary">添加应用</el-button>
                </el-col>
            </el-row>
            <el-row class="row-applist" :gutter="16">
                <el-col v-if="total - (currentPage - 1) * pageSize < pageSize" :span="6">
                    <NewAppCard></NewAppCard>
                </el-col>
            </el-row>
            <el-row class="row-applist-pagination">
                <el-pagination id="annoListPagination" :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="listCurrentPageChange" layout="total, prev, pager, next"></el-pagination>
            </el-row>
        </div>
    </div>
</template>

<script>
import OverviewCard from '@/components/app/main/OverviewCard.vue'
import AppCard from '@/components/app/main/AppCard.vue'
import NewAppCard from '@/components/app/main/NewAppCard.vue'

export default {
    name: 'app.pages.myapps',
    components: {
        OverviewCard,
        NewAppCard,
        AppCard
    },
    data(){
        return {
            applicationCount: 0,
            versionCount: 0,
            downloadCount: 0,
            total: 0,
            currentPage: 1,
            pageSize: 12
        }
    },
    methods: {
        getList(){

        },
        listCurrentPageChange(currentPage){
            this.currentPage = currentPage
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
.row-applist-title{
    margin: 12px 0;
    font-size: 18px;
    letter-spacing: 0.05em;
    color: #606266;
    user-select: none;
    -webkit-user-drag: none;
}
#applist-title{
    line-height: 40px;
}
#btn-addApp{
    float: right;
}
.row-applist-pagination {
    margin-top: 8px;
}
</style>
