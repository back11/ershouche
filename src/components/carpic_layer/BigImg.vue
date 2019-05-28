<template>
    <div v-if="id">
        <LoadingGifImage :src="`${url}/images/carimages/${id}/${nowAlbum}/${pic}`" w="750" h="500" />
        
        <div class="leftBtn" @click="goPrev()"></div>
        <div class="rightBtn" @click="goNext()"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                url: process.env.VUE_APP_URL
            }
        },
        computed: {
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
            // 根据当前图集和当前图片下标获取图片
            pic(){
                return this.store.result.images[this.nowAlbum][this.nowIdx]
            }
        },
        methods: {
            goNext(){
                this.$store.dispatch('carpicStore/goNext')
            },
            goPrev(){
                this.$store.dispatch('carpicStore/goPrev')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .leftBtn {
        position absolute
        top 0
        left 0
        z-index 10000
        width 50%
        height 100%
        cursor url(/images/picture-cursor-left.cur), auto
    }
    .rightBtn {
        position absolute
        top 0
        right 0
        z-index 10000
        width 50%
        height 100%
        cursor url(/images/picture-cursor-right.cur), auto
    }

    img{
        width 750px 
        height 500px
    }

</style>