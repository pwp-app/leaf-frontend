<template>
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
                <span>应用列表</span>
            </el-col>
        </el-row>
        <el-row class="row-applist" :gutter="16">

        </el-row>
    </div>
</template>

<script>
import OverviewCard from '@/components/app/main/OverviewCard.vue'
export default {
    name: 'app.pages.myapps',
    components: {
        OverviewCard
    },
    data(){
        return {
            applicationCount: 0,
            versionCount: 0,
            downloadCount: 0
        }
    }
}
</script>

<style lang="less" scoped>
.row-applist-title{
    margin: 24px 0;
    font-size: 18px;
    letter-spacing: 0.05em;
    color: #606266;
    user-select: none;
    -webkit-user-drag: none;
}
.row-applist{
    margin-bottom: 16px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
