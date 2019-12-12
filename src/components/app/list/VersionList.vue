<template>
    <div class="table-wrapper">
        <el-table :data="versionData" style="width: 100%">
            <el-table-column prop="platform" label="平台"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="downloadCount" label="下载量"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleShare(scope.row, scope.$index)">分享</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'app.list.versionlist',
    props: ['appid'],
    data() {
        return {
            versionData: [],
            // pagination
            total: 0,
            currentPage: 1,
            pageSize: 15,
        }
    },
    methods: {
        getList() {

        },
        refreshList(){

        },
        handleEdit(){

        },
        handleDelete(){

        }
    }
}
</script>
