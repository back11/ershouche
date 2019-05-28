<template>
    <div>
        <Header>
            <Menu mode="horizontal" theme="dark" 
                :active-name="$store.state.routerStore.column" 
                @on-select="changeMenu">
                <div class="layout-logo">
                    <a href="/index">
                        <img src="http://aiqianduan.com/assets/images/logo.png" width="170">
                    </a>
                </div>
                <div class="layout-nav">
                    <MenuItem name="index">
                        <Icon type="ios-navigate"></Icon>
                        首页
                    </MenuItem>
                    <MenuItem name="buy">
                        <Icon type="ios-keypad"></Icon>
                        买车
                    </MenuItem>
                    <MenuItem name="sale">
                        <Icon type="ios-analytics"></Icon>
                        卖车
                    </MenuItem>
                    <MenuItem name="transfer">
                        <Icon type="ios-paper"></Icon>
                        过户
                    </MenuItem>
                    <MenuItem name="insurance">
                        <Icon type="ios-paper"></Icon>
                        保险
                    </MenuItem>
                    <MenuItem name="parking">
                        <Icon type="ios-paper"></Icon>
                        停车场
                    </MenuItem>
                </div>
            </Menu>
        </Header>

        <!-- 二级页面的路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            changeMenu(name){
                this.$router.push({name})
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 10px;
        left: 20px;
    }
    .layout-nav{
        width: 750px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .ivu-layout-header{
        background: -webkit-linear-gradient(left top, #137dba, #77cbd7b0 20%, #5a6ce3);
    }
    .ivu-menu-dark{
        background: transparent;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active{
        background-color: gold;
    }
    .ivu-menu-item{
        font-size:18px;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item{
        color:#fff;
    }
</style>