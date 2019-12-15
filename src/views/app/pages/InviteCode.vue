<template>
    <div class="page-wrapper">
        <el-row class="row-userlist">
            <el-col :span="24">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>邀请码列表</span>
                        <div class="table-header-operation">
                            <el-button size="small" @click="refreshTable">刷新</el-button>
                            <el-button size="small" type="primary" @click="showCodeDialog">添加邀请码</el-button>
                        </div>
                    </div>
                    <InviteCodeList ref="list"></InviteCodeList>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="生成邀请码" :visible.sync="inviteCodeDialogVisible" width="30%" close-on-click-modal="false">
            <el-form ref="inviteCodeForm" :model="inviteCodeForm">
                <el-form-item prop="prefix" label="前缀">
                    <el-input v-model="inviteCodeForm.prefix"></el-input>
                </el-form-item>
                <el-form-item prop="count" label="数量">
                    <el-input type="number" v-model="inviteCodeForm.count"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" style="float: right;margin-top: 8px;" @click="generateCode" :disabled="generateCodeDisabled">生成</el-button>
                </el-form-item>
                <el-form-item prop="code" label="指定邀请码">
                    <el-input v-model="inviteCodeForm.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" style="float: right;margin-top: 8px;" @click="addCode" :disabled="addCodeDisabled">添加</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" style="padding: 8px 0;">
            </span>
        </el-dialog>
    </div>
</template>
<script>
import InviteCodeList from '@/components/app/list/InviteCodeList.vue'
export default {
    name: 'app.admin.invitecode',
    components: {
        InviteCodeList
    },
    data() {
        return {
            inviteCodeDialogVisible: false,
            generateCodeDisabled: false,
            addCodeDisabled: false,
            inviteCodeForm: {
                prefix: '',
                count: 0,
                code: ''
            }
        }
    },
    methods: {
        refreshTable(){
            this.$refs.list.getList()
        },
        showCodeDialog(){
            this.clearCodeForm()
            this.inviteCodeDialogVisible = true
        },
        clearCodeForm(){
            this.inviteCodeForm.prefix = ''
            this.inviteCodeForm.code = ''
            this.inviteCodeForm.count = 0
        },
        addCode(){
            if (!this.inviteCodeForm.code || this.inviteCodeForm.code.length < 1){
                this.$message.error('请填写指定的邀请码')
                return
            }
            this.axios.post('/api/admin/addInviteCode', {
                code: this.inviteCodeForm.code
            }).then((response)=>{
                if (response.status != 200){
                    this.$message.error('网络通信错误')
                    return
                }
                if (response.data.code != 200){
                    this.$message.error(response.data.message)
                    return
                }
                this.$message.success('添加成功')
                this.inviteCodeDialogVisible = false
                this.refreshTable()
            })
        },
        generateCode(){
            if (this.inviteCodeForm.count < 1){
                this.$message.error('数量不正确')
                this.inviteCodeDialogVisible = false
                return
            }
            if (this.inviteCodeForm.prefix && this.inviteCodeForm.length < 1){
                this.inviteCodeForm.prefix = null;
            }
            this.axios.post('/api/admin/generateInviteCode', {
                prefix: this.inviteCodeForm.prefix,
                count: this.inviteCodeForm.count,
            }).then((response)=>{
                if (response.status != 200){
                    this.$message.error('网络通信错误')
                    return
                }
                if (response.data.code != 200){
                    this.$message.error(response.data.message)
                    return
                }
                this.$message.success('生成成功')
                this.inviteCodeDialogVisible = false
                this.refreshTable()
            })
        }
    }
}
</script>
<style lang="less" scoped>
.table-header-operation {
    float: right;
}
</style>
<style lang="less">
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
    line-height: 32px;
}
.card-table > .el-card__body {
    padding: 2px 16px 20px 16px;
}
</style>

