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
    name: 'app.list.loginlog',
    data() {
        return {
            loginLog: [],
            loginLogLoading: false
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList(){
            this.axios.get("/api/user/getLoginLog").then(response => {
                if (response.status == 200) {
                    this.loginLog = response.data.data;
                }
                this.loginLogLoading = false;
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>
