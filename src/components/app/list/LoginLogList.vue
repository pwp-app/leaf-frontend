<template>
    <div class="table-wrapper">
        <el-table :data="loginLog" style="width: 100%" v-loading="loginLogLoading">
            <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
            <el-table-column prop="geo" label="位置"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'app.list.loginlog'
}
</script>

<style>

</style>
