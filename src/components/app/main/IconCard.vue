<template>
    <el-card class="box-card card-icons">
        <div class="box-card-icon" :style="{backgroundColor: color}">
            <i :class="icon"></i>
        </div>
        <div class="box-card-right">
            <div class="box-card-title">
                <span>{{title}}</span>
            </div>
            <div class="box-card-desc">
                <span>{{desc}}</span>
            </div>
            <div class="box-card-action">
                <span @click="labelClicked" :style="{color: color}">
                    {{label}}
                    <i class="el-icon-arrow-right"></i>
                </span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'app.main.iconcard',
    props: ['icon', 'color', 'title', 'desc', 'label'],
    methods: {
        labelClicked() {
            this.$emit('label-clicked');
        }
    }
};
</script>

<style lang="less" scoped>
@card-height: 143.5px;
.box-card {
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}
.card-icons {
    height: @card-height;
    padding: 0 !important;
    margin-bottom: 16px;
}
.box-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: @card-height !important;
    height: @card-height;
    color: white;
    font-size: 58px;
}
.box-card-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #606266;
}
.box-card-desc {
    font-size: 14px;
    color: #909399;
}
.box-card-right {
    flex: 1 1 auto;
    padding: 18px 25px;
    display: inline-block;
}
.box-card-action {
    font-size: 14px;
    color: #3E885B;
    margin-top: 26px;
}
.box-card-action > span:hover {
    color: darken(#3E885B, 5%);
    cursor: pointer;
}
</style>
<style lang="less">
.card-icons > .el-card__body {
    display: flex;
    flex-direction: row;
    padding: 0;
}
</style>
