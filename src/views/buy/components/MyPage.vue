<template>
    <div>
        <Page :total="total" show-elevator show-sizer show-total
            :current="page" :page-size="pagesize" 
            @on-change="changePage"
            @on-page-size-change="changePageSize"
        />
    </div>
</template>

<script>
    export default {
        computed: {
            results(){
                return this.$store.state.largeTableStore.results
            },
            total(){
                return this.$store.state.largeTableStore.total
            },
            page(){
                return this.$store.state.largeTableStore.page
            },
            pagesize(){
                return this.$store.state.largeTableStore.pagesize
            }
        },
        methods: {
             // 改变页面
            changePage(page){
                this.$store.dispatch('largeTableStore/changePage', {page})
            },
            // 改变每页显示数量
            changePageSize(pagesize){
                this.$store.dispatch('largeTableStore/changePageSize', {pagesize})
            }
        }
    }
</script>

<style scoped>

</style>