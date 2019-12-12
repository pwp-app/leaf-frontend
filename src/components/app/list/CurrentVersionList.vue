<template>
    <div class="table-wrapper">
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="platform" label="平台"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'app.list.currentversionlist',
    props: ['data']
}
</script>
