<template>
    <el-container>
        <el-main class="portal-main">
            <div class="portal-background" v-lazy:background-image="portalBackground">
                <div class="portal-background-overlay"></div>
            </div>
            <el-row class="row-form">
                <el-col :span="24">
                    <PortalForm class="portal-form"></PortalForm>
                </el-col>
                <el-col :span="24">
                    <div class="portal-back">
                        <span @click="toHome">&lt;-<i style="margin: 0 8px"></i>返回主页</span>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import PortalForm from '@/components/landing/PortalForm.vue'
export default {
    name: 'landing.portal',
    components: {
        PortalForm
    },
    data(){
        return {
            portalBackground: 'https://img.backrunner.top/leaf/portal-bg.jpg'
        }
    },
    methods: {
        toHome(){
            this.$router.push({
                name: 'landing.home'
            })
        }
    }
}
</script>
<style lang="less" scoped>
.portal-main {
    background: #1e1e1e;
    padding: 0;
}
.row-form {
    z-index: 99;
}
.portal-background {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    animation:fadeIn 250ms;
    filter: blur(3px);
}
.portal-background-overlay {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.75) 25%, rgba(0, 0, 0, 0.925) 37.5%, rgba(0, 0, 0, 0.925) 62.5%, rgba(0, 0, 0, 0.75) 75%, rgba(0, 0, 0, 0.5) 100%);
}
.portal-form {
    margin: 14rem auto 7.5rem auto;
}
.portal-back{
    text-align: center;
    font-size: 14px;
    color: #4a4a4a;
    transition: 200ms;
}
.portal-back:hover{
    color: #6a6a6a;
    cursor: pointer;
}
@keyframes fadeIn {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
