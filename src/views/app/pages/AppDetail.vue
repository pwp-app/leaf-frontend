<template>
    <div class="detail-wrapper">
        <el-row class="row-overview">
            <el-col :span="24">
                <el-card :class="['box-card','card-info',desc.length > 0 ? 'card-info-desc' : '']">
                    <div class="info-name">
                        <span class="info-name-display">{{name}}</span>
                        <span class="info-name-bundle">{{bundleId}}</span>
                        <div :class="['info-name-disabled', desc.length > 0 ? 'info-name-disabled-desc':'']" v-if="!appEnabled">
                            <span>不可用</span>
                        </div>
                        <span v-if="appEnabled" :class="['info-name-icon', desc.length > 0 ? 'info-name-icon-big' : '']">
                            <img :src="icon ? icon : defaultIcon">
                        </span>
                    </div>
                    <div class="info-desc" v-if="desc.length > 0">
                        <span class="info-desc">{{desc}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="row-detail" :gutter="16">
            <el-col :span="8" class="row-detail-left">
                <NumberCard label="版本数" :value="versionCount"></NumberCard>
                <NumberCard label="下载量" :value="downloadCount"></NumberCard>
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header clearfix">
                        <span>当前版本</span>
                    </div>
                    <CurrentVersionList></CurrentVersionList>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card card-table">
                    <div slot="header" class="card-header versionlist-header clearfix">
                        <span>版本列表</span>
                        <div class="table-header-operation">
                            <el-button size="small" @click="refreshVersionList">刷新</el-button>
                            <el-button size="small" type="primary" @click="showAddVersionDialog">添加版本</el-button>
                        </div>
                    </div>
                    <VersionList :id="$route.params.appId"></VersionList>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CurrentVersionList from "@/components/app/list/CurrentVersionList.vue"
import VersionList from "@/components/app/list/VersionList.vue"
import NumberCard from "@/components/app/main/NumberCard.vue"
import { Loading } from 'element-ui'
import BasePath from "@/config/BasePath.js"

export default {
    name: "app.main.myapps.detail",
    components: {
        CurrentVersionList,
        NumberCard,
        VersionList
    },
    data() {
        return {
            // overview
            name: "",
            bundleId: "",
            desc: "",
            downloadCount: 0,
            appEnabled: true,
            icon: null,
            defaultIcon: BasePath.imageBase + 'leaf/no-icon.png',
            // detail
            currentVersionData: [],
            versionCount: 0
        }
    },
    watch: {
        $route: "getData"
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.getInfo()
        },
        getInfo() {
            let loadingInstance = Loading.service({
                target: document.getElementsByClassName("detail-wrapper")[0],
                fullscreen: false,
                background: '#f4f4f4'
            });
            this.axios.get("/api/app/getInfo", {
                params: {
                    appId: this.$route.params.appId
                }
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        this.name = response.data.data.displayName
                        this.bundleId = response.data.data.bundleId
                        this.desc = response.data.data.description
                        this.appEnabled = response.data.data.isEnabled
                        this.downloadCount = response.data.data.downloadCount
                        this.icon = (response.data.data.iconKey ? BasePath.imageBase + response.data.data.iconKey : null)
                        this.versionCount = (response.data.data.versionCount ? response.data.data.versionCount : 0)
                        // current version
                        this.currentVersionData = []
                        for (var c in response.data.data.currentVersion) {
                            this.currentVersionData.push({
                                platform: c,
                                version: response.data.data.currentVersion[c]
                            })
                        }
                    } else {
                        this.$router.push({
                            name: "error.404"
                        })
                    }
                    loadingInstance.close()
                }
            })
        },
        refreshVersionList() {},
        showAddVersionDialog() {}
    }
}
</script>

<style lang="less" scoped>
.box-card {
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05) !important;
    user-select: none;
    -webkit-user-drag: none;
}

// overview
.card-info {
    height: 72px;
}
.card-info-desc {
    height: 92px;
}
.info-name {
    height: 28px;
    line-height: 28px;
}
.info-name-icon {
    float: right;
}
.info-name-icon > img{
    width: 48px;
    transform: translateY(-8px);
    border-radius: 4px;
}
.info-name-icon-big > img{
    width: 52px;
    transform: none;
}
.info-name-display {
    font-size: 24px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
    color: #606266;
    font-weight: 600 !important;
    letter-spacing: 0.05rem;
}

.info-name-bundle {
    font-size: 14px;
    font-family: "PingFang", "Microsoft Yahei", "Arial";
    color: #909399;
    margin-left: 12px;
    letter-spacing: 0.05rem;
}

.info-desc {
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-top: 8px;
    color: #909399;
    letter-spacing: 0.05rem;
}

.info-name-disabled {
    display: flex;
    align-content: center;
    float: right;
    background: #f56c6c;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    padding: 0 8px;
}
.info-name-disabled-desc {
    transform: translateY(10px);
}

// detail
.row-detail {
    margin-top: 16px;
}
// table
.table-header-operation {
    float: right;
}
.versionlist-header > span{
    line-height: 32px
}
</style>
<style lang="less">
.card-table > .el-card__header {
    padding: 14px 20px;
    font-size: 15px;
}
.card-table > .el-card__body {
    padding: 2px 16px 20px 16px;
}
.row-detail-left > div {
    margin-bottom: 16px !important;

    &:last-child {
        margin-bottom: 0px !important;
    }
}
</style>
