import querystring from "querystring"
import axios from "axios"
export default {
    namespaced: true,
    state: {
        page: 1, //默认页码
        pagesize: 10,  //默认每页显示数量
        // 默认排序条件
        sort: {
            sortby: 'id',
            sortdirection: 1
        },
        results: [],     //请求到的数据（来自于服务器）
        total: 0,        //数据总数量
        //存储筛选过滤的结果数组
        filters: [
            // { k: 'color', v: '红v蓝' },
            // { k: 'brand', v: '奥迪v大众v奔驰' },
            // { k: 'engine', v: '1.6L' },
            // { k: 'price', v: '0to100' },
            // { k: 'km', v: '0to500000' },
            // { k: 'buydate', v: '1325139200000to1551369600000' }
        ]
    },
    mutations: {
        // 修改页码
        changePage(state, payload) {
            state.page = payload.page
        },
        // 修改每页显示数量
        changePageSize(state, payload) {
            state.pagesize = payload.pagesize
        },
        // 修改排序条件
        changeSort(state, payload) {
            state.sort = payload.sort
        },
        // 修改数据总数量
        changeTotal(state, payload) {
            state.total = payload.total
        },
        // 存储数据结果
        changeResults(state, payload) {
            state.results = payload.results
        },
        // 修改筛选条件，根据k从filters数组中修改v值
        updateFilter(state, { k, v }) {
            state.filters = state.filters.map(item=> item.k === k ? {...item, v} : item)
        },
        // 删除筛选条件，根据k从filters数组中删除
        removeFilter(state, { k }) {
            state.filters = state.filters.filter(item=>item.k !== k)
        },
        // 增加筛选条件，将新的k：v对象添加到filters数组中
        addFilter(state, { k, v }) {
            state.filters.push({k, v})
        },
    },
    actions: {
        async init({ commit, state }) {
            // 查询对象
            const queryObj = {
                page: state.page,
                pagesize: state.pagesize,
                sortby: state.sort.sortby,
                sortdirection: state.sort.sortdirection
            }

            // 遍历filters数组，为查询对象添加查询条件
            for (let i = 0; i < state.filters.length; i++) {
                queryObj[state.filters[i].k] = state.filters[i].v
            }

            // 请求汽车接口数据
            const { results, total } = await axios('/findcar?' + querystring.stringify(queryObj)).then(res => res.data);

            // 请求接口拿到数据后，存储到state中
            commit('changeResults', { results })
            commit('changeTotal', { total })
        },
        changePage({ commit, dispatch }, { page }) {
            commit('changePage', { page })
            dispatch('init')
        },
        changePageSize({ commit, dispatch }, { pagesize }) {
            commit('changePageSize', { pagesize })
            dispatch('init')
        },
        changeSort({ commit, dispatch }, { sort }) {
            commit('changeSort', { sort })
            dispatch('init')
        },
        // 改变筛选条件
        changeFilter({ commit, dispatch, state }, { k, v }) {
            // 判断用户的意图是增加、删除、修改？要判断filters数组中是否已经存在同名的k
            let isExist = false;  //表示filters默认为空

            // 如果遍历结果有k，则修改为true
            state.filters.forEach(item => {
                if (item.k == k) {
                    isExist = true;
                }
            })

            // 判断是否已经存在某项
            if (isExist) {
                // 能执行到这，说明有k，根据k看看v是否不为空，不为空则修改v值
                if (v !== '') {
                    commit('updateFilter', { k, v })
                } else {
                    // 如果v为空，则删除当前筛选条件
                    commit('removeFilter', { k })
                }
            } else {
                // 如果k不存在，则添加新的k和v到filters数组中
                commit('addFilter', { k, v })
            }

            commit('changePage', { page: 1 })
            dispatch('init')
        }
    }
}