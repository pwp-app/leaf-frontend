<template>
    <el-card class="box-card card-newapp">
        <div class="icon">
            <i class="el-icon-plus"></i>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'app.main.NewAppCard',
}
</script>

<style lang="less" scoped>
@card-app-height: 145px;
.box-card {
    padding: 0 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}
.card-newapp {
    height: @card-app-height;
    margin-bottom: 16px;
}
.card-newapp:hover {
    background: #f8f8f8;
    cursor: pointer;
}
.icon {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 32px;
    font-weight: 700;
    color: #909399;
}
.icon > i{
    line-height: @card-app-height - 40;
}
</style>
