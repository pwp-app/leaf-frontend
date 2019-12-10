<template>
    <div class="container-usersettings">
        <el-row class="row-hello">
            <el-col :span="24">
                <el-card class="box-card card-hello">
                    <div class="hello">
                        <p>你好，{{ username }}！</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="row-settings" :gutter="16">
            <el-col :span="14">
                <el-card class="box-card card-form" id="card-avatar">
                    <div slot="header" class="card-header clearfix">
                        <span>头像</span>
                    </div>
                    <div class="form-wrapper">
                        <el-form
                            label-width="80px"
                            width="240px"
                            :model="infoForm"
                            id="form-avatar"
                        >
                            <el-form-item label="当前头像" class="avatar-item">
                                <UserAvatar :size="avatarSize"></UserAvatar>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    id="btn-setMail"
                                    @click="setEmail"
                                >设置邮箱</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="avatar-desc">
                            <div class="avatar-desc-label">
                                <label>提示</label>
                            </div>
                            <div class="avatar-desc-text">
                                <p>
                                    我们使用的是<Han />Gravatar<Han />的头像服务，头像由邮箱确定
                                </p>
                                <p>设置邮箱后，头像才能够正确显示</p>
                                <p>上传新头像、绑定邮箱等需前往<Han />Gravatar</p>
                            </div>
                            <div class="avatar-desc-action">
                                <el-button type="primary" @click="goGravatar">
                                    前往<Han />Gravatar
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card card-form" id="card-basic">
                    <div slot="header" class="card-header clearfix">
                        <span>基本信息</span>
                        <template v-if="!infoFormEnabled">
                            <el-button
                                style="float: right; padding: 3px 0"
                                type="text"
                                @click="doEdit"
                            >编辑</el-button>
                        </template>
                        <template v-else>
                            <el-button
                                style="float: right; padding: 3px 0px 3px 12px"
                                type="text"
                                :disabled="submitInfoEnaled"
                                @click="submitEdit"
                            >保存</el-button>
                            <el-button
                                style="float: right; padding: 3px 0"
                                type="text"
                                @click="cancelEdit"
                            >取消</el-button>
                        </template>
                    </div>
                    <el-form label-width="80px" :model="infoForm">
                        <el-form-item label="用户名">
                            <el-input v-model="infoForm.username" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址">
                            <el-input
                                ref="input-email"
                                v-model="infoForm.email"
                                :disabled="!infoFormEnabled"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input
                                v-model="infoForm.phone"
                                :disabled="!infoFormEnabled"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="10">
                <IconCard
                    icon="el-icon-lock"
                    color="#3e885b"
                    title="修改密码"
                    desc="定期修改密码可为你的帐号提供高强度的保护"
                    label="立即修改"
                    @label-clicked="modPasswordDialog"
                ></IconCard>
                <IconCard
                    icon="el-icon-warning"
                    color="#E6A23C"
                    title="注销帐号"
                    desc="将您正在使用的帐号彻底废弃，从平台上注销"
                    label="注销"
                    @label-clicked="cancelAccountDialog"
                ></IconCard>
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>最近登录记录</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UserAvatar from "@/components/app/common/UserAvatar.vue";
import Han from '@/components/common/Han.vue';
import IconCard from '@/components/app/main/IconCard.vue';

export default {
    name: "app.pages.usersettings",
    components: {
        UserAvatar,
        IconCard,
        Han
    },
    data() {
        return {
            // edit info
            infoFormEnabled: false,
            infoForm: {
                username: "",
                phone: "",
                email: ""
            },
            submitInfoEnaled: false,
            avatarSize: 95
        }
    },
    computed: {
        username() {
            return this.$store.state.userinfo.username;
        }
    },
    watch: {
        "$store.state.userinfo.username": function(newValue) {
            this.infoForm.username = newValue;
        },
        "$store.state.userinfo.email": function(newValue) {
            this.infoForm.email = newValue;
        },
        "$store.state.userinfo.phone": function(newValue) {
            this.infoForm.phone = newValue;
        }
    },
    methods: {
        goGravatar() {
            window.open('https://en.gravatar.com/emails/')
        },
        // info form
        doEdit(){
            this.infoFormEnabled = true
        },
        cancelEdit(){
            this.infoFormEnabled = false
        },
        setEmail(){
            this.doEdit()
            setTimeout(()=>{
                this.$refs['input-email'].focus()
            },0)
        },
        submitEdit(){

        },
        // mod password
        modPasswordDialog(){

        },
        // cancel account
        cancelAccountDialog(){

        }
    }
};
</script>

<style lang="less" scoped>
.box-card {
    padding: 0 8px;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}

// hello
.row-hello {
    margin-bottom: 16px;
}
.hello > p {
    margin: 0;
}

// avatar
.form-wrapper{
    display: flex;
}
#form-avatar {
    width: 260px;
}
#card-avatar {
    margin-bottom: 16px;
}
.avatar-item{
    margin-bottom: 0;
}
.avatar-desc {
    flex: 1 2 auto;
}
.avatar-desc-label {
    float: left;
    font-size: 14px;
    color: #606266;
}
.avatar-desc-label > label {
    line-height: 40px;
}
.avatar-desc-text {
    display: block;
    margin-left: 50px;
    margin-top: 10px;
    font-size: 15px;
    color: #606266;
}
.avatar-desc-text > p{
    margin-top: 0;
    margin-bottom: 8px;
}
.avatar-desc-action {
    margin-top: 60px;
    margin-left: 48px;
}
#form-avatar > .el-form-item > .el-form-item__content {
    line-height: 0 !important;
}
#btn-setMail {
    margin-left: 8px;
}
</style>
<style lang="less">
.card-form > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
}
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
}
</style>
