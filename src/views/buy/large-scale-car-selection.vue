<template>
    <div>
        <h1>大表选车</h1>
        <!-- 筛选器组件 -->
        <FilterBox />

        <br>
        <Row>
            <Col span="18">
                <h3>根据当前查询条件，共找到{{total}}辆车符合条件</h3>
            </Col>
        </Row>
        <br>

        <RadioGroup v-model="view" type="button" size="large">
            <Radio label="table_view">表格视图</Radio>
            <Radio label="grid_view">网格视图</Radio>
        </RadioGroup>
        <br>
        <br>

        <!-- 表格汽车列表组件 -->
        <BigTable v-if="view == 'table_view'" />
        <BigGrid v-if="view == 'grid_view'" />

        <!-- 自定义分页条组件 -->
        <MyPage></MyPage>
    </div>
</template>

<script>
    import FilterBox from "./components/FilterBox.vue"
    import BigTable from "./components/BigTable.vue"
    import MyPage from "./components/MyPage.vue"
    import BigGrid from "./components/BigGrid.vue"
    export default {
        data(){
            return {
                view: 'table_view'
            }
        },
        components: {
            FilterBox,
            BigTable,
            MyPage,
            BigGrid
        },
        created(){
            this.$store.dispatch('largeTableStore/init')
        },
        computed: {
            total(){
                return this.$store.state.largeTableStore.total
            }
        }
    }
</script>

<style scoped>

</style>