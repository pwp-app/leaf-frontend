<template>
    <el-container class="container-error">
        <div class="error-wrapper">
            <div class="error-code">
                <span>ERROR</span>
            </div>
            <div class="error-desc">
                <span>页面似乎未能正确加载</span>
            </div>
            <div class="error-action">
                <el-button type="primary" class="btn-dark" @click="toBack">返回上一页</el-button>
            </div>
        </div>
    </el-container>
</template>
<script>
export default {
    name: "error.404",
    methods: {
        toBack(){
            this.$router.back(-1)
        }
    }
};
</script>
<style lang="less" scoped>
.container-error {
    background: rgba(250,251,252);
}
.error-wrapper {
    position: absolute;
    top: 28%;
    left: 50%;
    transform: translateX(-50%);
}
.error-code {
    font-weight: 700;
    font-size: 115px;
    font-family: consolas;
    color: #3E885B;
    letter-spacing: 0.175em;
    text-align: center;
    margin-left: 20px;
    user-select: none;
    -webkit-user-drag: none;
}
.error-desc {
    font-weight: 700;
    font-size: 24px;
    color:#606266;
    font-family: consolas;
    letter-spacing: 0.05em;
    text-align: center;
    user-select: none;
    -webkit-user-drag: none;
}
.error-action {
    text-align: center;
    margin-top: 72px;
}
</style>
