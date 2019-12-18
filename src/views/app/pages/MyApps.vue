<template>
    <div class="page-wrapper">
        <div class="container-myapps" v-if="this.$route.name === 'app.main.myapps'">
            <el-row class="row-overview" :gutter="16">
                <el-col :span="8">
                    <OverviewCard icon="el-icon-star-on" label="应用总数" :value="applicationCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-s-grid" label="版本总数" :value="versionCount"></OverviewCard>
                </el-col>
                <el-col :span="8">
                    <OverviewCard icon="el-icon-download" label="总下载量" :value="downloadCount"></OverviewCard>
                </el-col>
            </el-row>
            <el-row class="row-applist-title">
                <el-col :span="24">
                    <span id="applist-title">应用列表</span>
                    <el-button class="applist-action" id="btn-addApp" type="primary" @click="showAddAppDialog"><i class="el-icon-plus"></i></el-button>
                    <el-button class="applist-action" id="btn-refreshApp" @click="getList"><i class="el-icon-refresh-right"></i></el-button>
                </el-col>
            </el-row>
            <el-row class="row-applist" :gutter="16" v-loading="appListLoading">
                <el-col :span="6" v-for="(app, index) in apps.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-bind:key="app.id">
                    <AppCard :index="index" :id="app.id" :name="app.displayName" :bundleid="app.bundleId" :icon="app.iconKey" :download="app.downloadCount"
                        @open-context="openContextMenu"></AppCard>
                </el-col>
                <el-col v-if="total - (currentPage - 1) * pageSize < pageSize" :span="6">
                    <NewAppCard @click.native="showAddAppDialog"></NewAppCard>
                </el-col>
            </el-row>
            <el-row class="row-applist-pagination">
                <el-pagination
                    id="app-list-pagination"
                    :total="total"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="listCurrentPageChange"
                    layout="total, prev, pager, next"
                ></el-pagination>
            </el-row>
            <!-- dialog -->
            <el-dialog :title="appFormStatus == 'add' ? '添加应用' : '编辑'" :visible.sync="appDialogVisible" width="30%">
                <el-form ref="appForm" :model="appForm" :rules="appFormRule">
                    <el-form-item prop="bundleId" label="Bundle ID">
                        <el-input v-model="appForm.bundleId" placeholder="com.example.app" :disabled="appFormStatus == 'edit'"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="名称">
                        <el-input v-model="appForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="desc" label="描述">
                        <el-input v-model="appForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
                        <IconUploader
                            ref="app-iconuploader"
                            id="icon-uploader"
                            @upload-success="iconUploadSuccess"
                        ></IconUploader>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="appDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitAppForm" :disabled="!submitAppFormEnabled">确定</el-button>
                </span>
            </el-dialog>
            <div class="context-menu-wrapper">
                <el-card v-if="contextMenuVisible" :style="{top: contextMenuTop+'px', left: contextMenuLeft+'px'}" class="box-card card-context-menu">
                    <el-row class="context-menu-item">
                        <el-col :span="24" @click.native="showEditAppDialog">
                            <span>编辑</span>
                        </el-col>
                    </el-row>
                    <el-row class="context-menu-item">
                        <el-col :span="24" @click.native="deleteApp">
                            <span class="context-menu-danger" style="color: #F56C6C">删除</span>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </div>
        <div class="container-version" v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import OverviewCard from "@/components/app/main/OverviewCard.vue";
import AppCard from "@/components/app/main/AppCard.vue";
import NewAppCard from "@/components/app/main/NewAppCard.vue";
import IconUploader from "@/components/app/main/IconUploader.vue";
import BasePath from "@/config/BasePath.js";

export default {
    name: "app.pages.myapps",
    components: {
        OverviewCard,
        NewAppCard,
        AppCard,
        IconUploader
    },
    data() {
        return {
            // overview
            applicationCount: 0,
            versionCount: 0,
            downloadCount: 0,
            total: 0,
            // app list
            apps: [],
            currentPage: 1,
            pageSize: 12,
            contextMenuVisible: false,
            contextMenuTop: 0,
            contextMenuLeft: 0,
            rightClickedIndex: null,
            appListLoading: false,
            // app form
            appDialogVisible: false,
            appFormStatus: 'add',
            submitAppFormEnabled: true,
            appForm: {
                appId: null,
                bundleId: "",
                name: "",
                desc: "",
                iconKey: ""
            },
            appFormRule: {
                bundleId: [
                    {
                        required: true,
                        message: "Bundle ID 不能为空",
                        trigger: "blur"
                    },
                    {
                        pattern: /^\w+\.\w+.\w+$/,
                        message: "Bundle ID 格式错误",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "名称不能为空",
                        trigger: "blur"
                    },
                    {
                        max: 24,
                        message: '应用名不能长于 24 个字符',
                        trigger: 'blur'
                    }
                ],
                desc: [
                    {
                        max: 100,
                        message: '描述不能长于 100 个字符',
                        trigger: 'blur'
                    }
                ]
            },
        };
    },
    mounted(){
        this.getList()
    },
    watch: {
        contextMenuVisible(value){
            if (value){
                document.body.addEventListener('click', this.closeContextMenu)
            } else {
                document.body.removeEventListener('click', this.closeContextMenu)
            }
        }
    },
    methods: {
        getList() {
            this.appListLoading = true
            this.axios.get('/api/app/getAppList').then((response) => {
                this.appListLoading = false
                if (response.status == 200 && response.data.code == 200){
                    this.apps = response.data.data
                    this.total = this.apps.length
                }
            })
        },
        listCurrentPageChange(currentPage) {
            this.currentPage = currentPage
            this.getList()
        },
        // add app form
        showAddAppDialog() {
            this.appFormStatus = 'add'
            this.appDialogVisible = true
            setTimeout(() => {
                this.clearAppForm()
            }, 0)
        },
        showEditAppDialog() {
            this.appFormStatus = 'edit'
            this.appDialogVisible = true
            setTimeout(() => {
                this.clearAppForm()
                // 填入数据
                let index = this.rightClickedIndex + (this.currentPage - 1) * this.pageSize
                this.appForm.appId = this.apps[index].id
                this.appForm.bundleId = this.apps[index].bundleId
                this.appForm.name = this.apps[index].displayName
                this.appForm.desc = this.apps[index].description
                this.appForm.iconKey = this.apps[index].iconKey
                if (this.appForm.iconKey){
                    this.$refs["app-iconuploader"].setIcon(BasePath.imageBase + this.appForm.iconKey)
                } else {
                    this.$refs["app-iconuploader"].setIcon(null)
                }
            }, 0)
        },
        clearAppForm() {
            this.appForm.appId = null
            this.appForm.bundleId = ""
            this.appForm.name = ""
            this.appForm.desc = ""
            this.appForm.iconKey = ""
            this.$refs["app-iconuploader"].clearIcon()
        },
        submitAppForm() {
            this.$refs['appForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                if (this.appFormStatus == 'add'){
                    this.axios.post("/api/app/addApp", {
                        bundleId: this.appForm.bundleId,
                        name: this.appForm.name,
                        desc: this.appForm.desc,
                        iconKey: this.appForm.iconKey
                    }).then(response => {
                        if (response.status == 200) {
                            if (response.data.code == 200) {
                                this.$message.success("添加成功");
                                this.appDialogVisible = false;
                            } else {
                                this.$message.error(response.data.message);
                            }
                            this.getList();
                        } else {
                            this.$message.error("网络通信错误");
                        }
                    });
                } else if (this.appFormStatus == 'edit') {
                    this.axios.post("/api/app/editApp", {
                        appId: this.appForm.appId,
                        name: this.appForm.name,
                        desc: this.appForm.desc,
                        iconKey: this.appForm.iconKey
                    }).then(response => {
                        if (response.status == 200) {
                            if (response.data.code == 200) {
                                this.$message.success("编辑成功")
                                this.appDialogVisible = false
                            } else {
                                this.$message.error(response.data.message)
                            }
                            this.getList()
                        } else {
                            this.$message.error("网络通信错误")
                        }
                    });
                }
            });
        },
        iconUploadSuccess(filekey) {
            this.appForm.iconKey = filekey;
        },
        openContextMenu(e) {
            this.rightClickedIndex = e.index
            e = e.event
            this.contextMenuLeft = e.clientX
            this.contextMenuTop = e.clientY // fix 位置bug
            this.contextMenuVisible = true
        },
        closeContextMenu(){
            this.contextMenuVisible = false
        },
        deleteApp() {
            let index = this.rightClickedIndex + (this.currentPage - 1) * this.pageSize
            this.$confirm('此操作将永久删除应用 ['+this.apps[index].displayName+'] 及其关联的所有数据，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.axios.post('/api/app/deleteApp', {
                    appId: this.apps[index].id
                }).then((response) => {
                    if (response.status != 200){
                        this.$message.error('网络通信错误')
                        return
                    }
                    if (response.data.code != 200){
                        this.$message.error(response.data.message)
                        return
                    }
                    this.$message.success('删除成功')
                    this.getList()
                })
            }).catch(()=>{
                // catch cancel
                // do nothing
            });
        }
    }
};
</script>

<style lang="less" scoped>
.row-applist > .el-col {
    margin-bottom: 16px;
}
.row-applist-title {
    margin: 12px 0;
    font-size: 18px;
    letter-spacing: 0.05em;
    color: #606266;
    user-select: none;
    -webkit-user-drag: none;
}
#applist-title {
    line-height: 40px;
}
.applist-action {
    float: right;
    padding: 12px;
}
.applist-action > span{
    font-size: 16px;
    font-weight: 600;
}
#btn-addApp{
    margin-left: 10px;
}
.row-applist-pagination {
    margin-top: 8px;
}
#icon-uploader {
    margin-top: 12px;
}
</style>

<style lang="less">
// context-menu
.card-context-menu {
    width: 75px;
    z-index: 999;
    position: fixed;
}
.card-context-menu > .el-card__body {
    padding: 8px 0px;
}
.card-context-menu span{
    line-height: 32px;
    padding-left: 8px;
    font-size: 15px;
    color: #606266;
}
.card-context-menu .context-menu-item{
    padding: 0 8px;
}
.card-context-menu .context-menu-item:hover{
    background: #f8f8f8;
    cursor: pointer;
}
</style>
