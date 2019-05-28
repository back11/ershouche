<template>
    <div class="wrap" v-if="id" @mouseleave="leaveHandle">
        <div class="inner">
            <div class="unit" :style="{left: -230 * nowPage + 'px'}">
                <ul v-for="i in totalPage" :key="i">
                    <li v-for="j in 6" :key="j" v-if="getThePic(i, j)"
                        :class="{cur: (i-1) * 6 + (j-1) == nowIdx}"
                        @click="changeNowIdx((i-1) * 6 + (j-1))"
                    >
                        <LoadingGifImage :src="`${url}/images/carimages_small/${id}/${nowAlbum}/${getThePic(i, j)}`" w="105" h="70" />
                    </li>
                </ul>
            </div>

            <!--  v-if="totalPage != 1"表示只有一页则不显示导航条 -->
            <ol class="pages" v-if="totalPage != 1">
                <li v-for="i in totalPage" :class="{cur: nowPage == (i-1)}"
                    :style="{width: getW + 'px'}"
                    @mouseenter="changeNowPage(i-1)"
                >
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                url: process.env.VUE_APP_URL,
                nowPage: 0  //小图导航的页码
            }
        },
        methods: {
            getThePic(i, j){
                // 获取当前图集中的某张图片
                return this.store.result.images[this.nowAlbum][(i-1) * 6 + (j-1)]
            },
            changeNowIdx(nowIdx){
                // 点击每个小图，切换图片
                this.$store.commit('carpicStore/changeNowIdx', {nowIdx})
            },
            // 点击每个图片，切换图片编号
            changeNowPage(page){
                this.nowPage = page;
            },
            // 离开大盒子恢复当前显示图片的页码位置
            leaveHandle(){
                this.nowPage = parseInt(this.nowIdx / 6)
            }
        },
        computed: {
            getW(){
                return (220 -5 * (this.totalPage-1)) / this.totalPage
            },
            store(){
                return this.$store.state.carpicStore;
            },
            // 当前车辆id
            id(){
                return this.store.id
            },
            // 当前图集
            nowAlbum(){
                return this.store.nowAlbum
            },
            // 当前图片下标
            nowIdx(){
                return this.store.nowIdx
            },
            // 图片总张数
            totalImagesNumber(){
                return this.store.result.images[this.nowAlbum].length
            },
            // 根据图片总数计算出，轮播图总页数
            totalPage(){
                // 当前图集的图片总数量 / 6，向上取整
                return Math.ceil(this.totalImagesNumber / 6)
            }
        },
        // 监听
        watch: {
            // 当store中的nowIdx改变时，说明切换图片，重新计算一个页码
            nowIdx(){
                this.nowPage = parseInt(this.nowIdx / 6)
            },
            // 当换车了，重新计算一个页码
            id(){
                this.nowPage = parseInt(this.nowIdx / 6)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .wrap{ 
        padding 10px
    }
    .inner { 
        overflow hidden
    }
    .unit{
        width:3000px; position: relative; transition: left 0.4s;
        ul{
            float: left; width: 230px;
            li{
                float:left; width:105px; height:70px;
                margin:0 10px 5px 0; overflow:hidden;
                position:relative;cursor:pointer;
                &::before{
                    content:""; position:absolute; z-Index:9999; transition:all 0.6s;
                    width:100%; height:100%; background: rgba(0,0,0,.6);
                }
                &.cur::before{ opacity: 0;}
                img{ width:100%; }
            }
        }
    }
    .pages{
        overflow:hidden; 
        clear:both;
        li {
            list-style none
            float:left; 
            /* width:50px;  */
            height:16px; 
            background: #ccc; 
            margin-right:5px;
            &:last-child{ margin-right:0; }
            &.cur{ background: gold;}
        }
    }
</style>