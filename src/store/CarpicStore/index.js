import axios from "axios"
export default {
    namespaced: true,
    state: {
        id: 0,
        nowAlbum: 'view', 
        nowIdx: 0,
        result: {}
    },
    mutations: {
        // 存储数据结果
        changeResult(state, payload){
            state.result = payload.result
        },
        // 改变当前车辆id
        changeId(state, payload){
            state.id = payload.id
        },
        // 改变当前显示的图集
        changeNowAlbum(state, payload){
            state.nowAlbum = payload.nowAlbum
        },
        // 改变当前图集的图片下标
        changeNowIdx(state, payload){
            state.nowIdx = payload.nowIdx
        }
    },
    actions: {
        async init({commit}, {id}){
            // 请求当前车辆的接口
            const { result } = await axios.get(`/car/${id}`).then(res=>res.data)
            // 存储请求成功的车辆数据
            commit('changeResult', {result})
            // 改变当前显示的车辆id
            commit('changeId', {id})
            // 切换图片为默认的view
            commit('changeNowAlbum', { nowAlbum: 'view'})
            // 当前图片编号归0
            commit('changeNowIdx', { nowIdx: 0})
        },
        changeNowAlbum({ commit }, { nowAlbum}){
            // 切换图集
            commit('changeNowAlbum', { nowAlbum })
            // 当前图片编号归0
            commit('changeNowIdx', { nowIdx: 0 })
        },

        // 切换下一张图片
        goNext({ commit, state}){
            // 如果当前图片下标没超出当前图集下标，则切换图片
            if (state.nowIdx < state.result.images[state.nowAlbum].length-1){
                commit('changeNowIdx', { nowIdx: state.nowIdx + 1 })
            }else{
                // 下标超过了当前图集的总张数，切换下一个图集
                switch (state.nowAlbum){
                    case 'view': 
                        commit('changeNowAlbum', { nowAlbum:'inner' })
                        break;
                    case 'inner':
                        commit('changeNowAlbum', { nowAlbum: 'engine' })
                        break;
                    case 'engine':
                        commit('changeNowAlbum', { nowAlbum: 'more' })
                        break;
                    case 'more':
                        commit('changeNowAlbum', { nowAlbum: 'view' })
                        break;
                }

                // 当前图片编号归0
                commit('changeNowIdx', { nowIdx: 0 })
            }
        },

        // 切换下一张图片
        goPrev({ commit, state }) {
            // 如果当前图片下标没超出当前图集下标，则切换图片
            if (state.nowIdx > 0) {
                commit('changeNowIdx', { nowIdx: state.nowIdx - 1 })
            } else {
                // 下标超过了当前图集的总张数，切换下一个图集
                // switch (state.nowAlbum) {
                //     case 'view':
                //         commit('changeNowAlbum', { nowAlbum: 'more' })
                //         break;
                //     case 'more':
                //         commit('changeNowAlbum', { nowAlbum: 'engine' })
                //         break;
                //     case 'engine':
                //         commit('changeNowAlbum', { nowAlbum: 'inner' })
                //         break;
                //     case 'inner':
                //         commit('changeNowAlbum', { nowAlbum: 'view' })
                //         break;
                // }

                var arr = ['view', 'inner', 'engine', 'more'];
                // 检查数组中是否存储某项，存储则返回当前项的下标
                var index = arr.indexOf(state.nowAlbum)

                index = index <= 0 ? 3 : index-1
                // 根据下标选择图集
                var nowAlbum = arr[index]
                // 切换图集
                commit('changeNowAlbum', { nowAlbum })

                // 当前图片下标要回到最后一张
                commit('changeNowIdx', { nowIdx: state.result.images[state.nowAlbum].length - 1 })
            }
        }
    }
}