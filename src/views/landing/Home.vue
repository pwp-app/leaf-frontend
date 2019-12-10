<template>
    <el-container>
        <el-main :class="[displayFooter ? '' : 'no-footer', 'home-main']">
            <el-row class="row-logo">
                <el-col :span="24">
                    <img id="logo" src="@/assets/logo_256.png"/>
                </el-col>
            </el-row>
            <el-row class="row-name">
                <el-col :span="24">
                    <span>Leaf</span>
                </el-col>
            </el-row>
            <el-row class="row-desc">
                <el-col :span="24">
                    <span>邀请制应用托管分发平台</span>
                </el-col>
            </el-row>
            <el-row class="row-action">
                <el-col :span="24">
                    <el-button class="btn-dark" type="primary" @click="toPortal">开始使用</el-button>
                </el-col>
            </el-row>
        </el-main>
        <el-footer v-if="displayFooter" class="home-footer">
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>

<script>
import Footer from '@/components/common/Footer.vue'
export default {
    name: 'landing.home',
    components: {
        Footer
    },
    data(){
        return {
            displayFooter: true
        }
    },
    mounted(){
        addEventListener('resize',()=>{
            this.windowResize();
        })
        this.windowResize()
    },
    methods: {
        windowResize(){
            if (document.documentElement.clientWidth > 768){
                this.displayFooter = true
            } else {
                this.displayFooter = false
            }
        },
        toPortal(){
            this.$router.push({
                name: 'landing.portal'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home-main {
    background: rgba(250,251,252);
    user-select: none;
    -webkit-user-drag: none;
}
.home-footer{
    background: rgba(250,251,252);
    user-select: none;
    -webkit-user-drag: none;
}
.row-logo {
    text-align: center;
    margin-top: 8.75rem;
}
#logo {
    width: 8.75rem;
}
.row-name{
    text-align: center;
    font-size: 68px;
    color: #3E885B;
    font-weight: 700;
    font-family: "PingFang SC";
    letter-spacing: 0.275rem;
    margin-top: 0.375rem;
}

.row-desc{
    text-align: center;
    font-size: 32px;
    color: #3E885B;
    font-weight: 700;
    font-family: "PingFang SC";
    letter-spacing: 0.25rem;
    margin-top: 1.25rem;
}
.row-action{
    text-align: center;
}
.row-action{
    text-align: center;
    margin-top: 4.75rem;
}
</style>

<style lang="less">
html, body, .el-container{
    height: 100%;
}
body{
    margin: 0;
}
.el-main{
    overflow-x: hidden;
}
.el-footer{
    height: 80px !important;
}
.no-footer{
    padding-bottom: 40px !important;
}
</style>
