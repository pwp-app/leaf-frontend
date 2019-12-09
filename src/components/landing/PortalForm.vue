<template>
    <div class="portal-form-wrapper">
        <el-row class="row-form">
            <el-col :span="24">
                <div id="form-login" v-show="formStatus == 'login'">
                    <div class="form-title">
                        <span>登录</span>
                    </div>
                    <el-form :model="loginForm" :rules="loginFormRules">
                        <el-form-item prop="username">
                            <el-input class="input-dark" v-model="loginForm.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                class="input-dark"
                                v-model="loginForm.password"
                                type="password"
                                placeholder="密码"
                                @keyup.enter.native="onLogin"
                            ></el-input>
                        </el-form-item>
                        <div class="form-beyond-footer">
                            <el-checkbox class="input-dark" v-model="loginForm.rememberMe">记住我</el-checkbox>
                        </div>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="onLogin"
                                class="btn-dark form-footer-btn form-footer-btn-primary"
                                :disabled="captchaStatus"
                            >登录</el-button>
                            <el-button
                                @click="toRegister"
                                class="btn-dark-secondary form-footer-btn form-footer-btn-secondary"
                            >注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="form-register" v-show="formStatus == 'register'">
                    <div class="form-title">
                        <span>注册</span>
                    </div>
                    <el-form :model="registerForm" :rules="registerFormRules">
                        <el-form
                            ref="registerForm"
                            class="portal-form"
                            :model="registerForm"
                            :rules="registerFormRules"
                            label-position="top"
                            label-width="80px"
                        >
                            <el-form-item prop="username">
                                <el-input class="input-dark" v-model="registerForm.username" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    class="input-dark"
                                    v-model="registerForm.password"
                                    type="password"
                                    placeholder="密码"
                                ></el-input>
                            </el-form-item>
                            <el-form-item prop="confirmPassword">
                                <el-input
                                    class="input-dark"
                                    v-model="registerForm.confirmPassword"
                                    type="password"
                                    placeholder="确认密码"
                                    @keyup.enter.native="onRegister"
                                ></el-input>
                            </el-form-item>
                            <el-form-item prop="inviteCode">
                                <el-input
                                    class="input-dark"
                                    v-model="registerForm.inviteCode"
                                    placeholder="邀请码（必填）"
                                    @keyup.enter.native="onRegister"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onRegister"
                                    class="btn-dark form-footer-btn form-footer-btn-primary"
                                    :disabled="captchaStatus"
                                >注册</el-button>
                                <el-button
                                    @click="toLogin"
                                    class="btn-dark-secondary form-footer-btn form-footer-btn-secondary"
                                >已有帐号</el-button>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <div class="recaptcha">
            <reCaptcha ref="recaptcha" @verify="submitRequest"></reCaptcha>
        </div>
    </div>
</template>

<script>
import Han from "@/components/common/Han.vue"
import reCaptcha from '@/components/common/reCaptcha.vue'

export default {
    name: "landing.portalform",
    components: {
        Han,
        reCaptcha
    },
    data() {
        return {
            formStatus: "login",
            captchaStatus: false,
            loginForm: {
                username: "",
                password: "",
                rememberMe: false
            },
            registerForm: {
                username: "",
                password: "",
                confirmPassword: "",
                inviteCode: ""
            },
            loginFormRules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        message: "用户名长度不能低于4个字符",
                        trigger: "blur"
                    },
                    {
                        max: 40,
                        message: "用户名长度不能长于40个字符",
                        trigger: "blur"
                    },
                    {
                        pattern: /^\w+$/,
                        message: "用户名只允许包含数字、字母、下划线",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        message: "密码长度不能低于6位",
                        trigger: "blur"
                    }
                ]
            },
            registerFormRules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        message: "用户名长度不能低于4个字符",
                        trigger: "blur"
                    },
                    {
                        max: 40,
                        message: "用户名长度不能长于40个字符",
                        trigger: "blur"
                    },
                    {
                        pattern: /^\w+$/,
                        message: "用户名只允许包含数字、字母、下划线",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        message: "密码长度不能低于6位",
                        trigger: "blur"
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: "确认密码不能为空"
                    },
                    {
                        min: 6,
                        message: "确认密码长度不能低于6位"
                    }
                ],
                inviteCode: [
                    {
                        required: true,
                        message: "邀请码不能为空"
                    }
                ]
            }
        };
    },
    mounted() {
        if (typeof window.grecatpcha != 'undefined'){
            this.captchaStatus = true
        }
    },
    methods: {
        toLogin() {
            this.formStatus = 'login'
        },
        toRegister() {
            this.formStatus =  'register'
        },
        onLogin(){

        },
        onRegister(){

        },
        submitRequest(){
            if (this.formStatus == 'login'){

            } else if (this.formStatus == 'register') {

            }
        },
        // execute the recaptcha widget
        executeRecaptcha() {
            this.$refs.recaptcha.execute()
        }
    }
};
</script>

<style lang="less" scoped>
.portal-form-wrapper{
    width: 420px;
}
.form-title {
    font-size: 28px;
    letter-spacing: 0.125rem;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
    color: #3E885B;
    font-family: "Pingfang SC"
}
.form-beyond-footer {
    margin-top: 18px;
    margin-bottom: 14px;
}
.form-footer-btn {
    width: 48.75%;
}
.btn-dark{
    font-weight: 600;
    color: #1e1e1e;
    letter-spacing: 0.05em;
}
.btn-dark:hover{
    background-color: darken(#3e885b, 5%);
    border-color: darken(#3e885b, 5%);
    color: #2e2e2e;
}
.btn-dark:focus{
    color: #1e1e1e;
    background-color: darken(#3e885b, 10%);
    border-color: darken(#3e885b, 10%);
}
.btn-dark-secondary{
    font-weight: 600;
    color: #1e1e1e;
    background: #8f8f8f;
    border: #9a9a9a;
    letter-spacing: 0.05em;
}
.btn-dark-secondary:hover{
    background-color: #6a6a6a;
    color: #2e2e2e;
}
.btn-dark-secondary:focus{
    background-color: #4a4a4a;
    color: #1e1e1e;
}
</style>
<style lang="less">
.input-dark > input {
    background-color: #1e1e1e;
    border-color: #6a6a6a;
    color: #3E885B;
    font-weight: 600;
    letter-spacing: 0.025rem;
}
.input-dark > input:hover {
    border-color: #4e4e4e;
}
.input-dark > input::placeholder {
    color: #6a6a6a;
}
.input-dark > .el-checkbox__label {
    color: #9a9a9a;
}
.input-dark > .el-checkbox__input > .el-checkbox__inner {
    background-color: #1e1e1e;
    border-color: #6a6a6a;
}
.input-dark > .el-checkbox__input.is-checked > .el-checkbox__inner {
    background-color: #3E885B;
    border-color: #3E885B;
}
</style>
