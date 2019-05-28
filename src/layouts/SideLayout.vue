<template>
    <div>
        <Layout>
            <Breadcrumb :style="{margin: '16px'}">
                <BreadcrumbItem>
                    <router-link to="/index/index">首页</router-link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <router-link :to="'/index/' + getTheOne.columnEnglish">
                        {{getTheOne.columnChinese}}
                    </router-link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <router-link :to="'/index/' + $store.state.routerStore.scolumn">
                        {{$store.state.routerStore.scolumnc}}
                    </router-link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                <Layout>
                    <Sider hide-trigger :style="{background: '#fff'}">
                        <Menu theme="light" width="auto" :open-names="['1']"
                            :active-name="$store.state.routerStore.scolumn"
                            @on-select="changeMenu"
                        >
                            <MenuItem v-for="item in getTheOne.children" :name="item.en"  :key="item.en">
                                {{item.cn}}
                            </MenuItem>
                        </Menu>
                    </Sider>
                    <Content :style="{padding:'24px', minHeight: '280px', background: '#fff'}">
                        <!-- 三级路由的内容 -->
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </div>
</template>

<script>
    import buyRoute from "../router/buyRoute.js"
    import transferRoute from "../router/transferRoute.js"

    // 路由对象名称
    const obj = {
        buy: buyRoute,
        transfer: transferRoute
    }
    
    export default {
        computed: {
            // 动态获取当前栏目的路由对象
            getTheOne(){
               return obj[this.$store.state.routerStore.column]
            }
        },
        methods: {
            // 切换三级路由
            changeMenu(name){
                this.$router.push({name})
            }
        }
    }
</script>

<style scoped>

</style>