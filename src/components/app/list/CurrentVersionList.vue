<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="platform" :formatter="platformFormatter" label="平台"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'app.list.currentversionlist',
    props: ['data'],
    methods: {
        platformFormatter(row, column, cellValue, index){
            if (cellValue == 'windows'){
                return 'Windows'
            } else if (cellValue == 'linux'){
                return 'Linux'
            } else if (cellValue == 'macos'){
                return 'macOS'
            } else if (cellValue == 'android'){
                return 'Android'
            } else if (cellValue == 'ios'){
                return 'iOS / iPad OS'
            }
        }
    }
}
</script>
