export default {
    namespaced: true,
    state: {
        column: '',  //当前所在二级路由栏目
        scolumn: '', //三级路由的英文名称
        scolumnc: '' //三级路由的中文名称
    },
    mutations: {
        // 改变栏目的属性
        changeColumn(state, { column, scolumn, scolumnc  }){
            state.column = column;
            state.scolumn = scolumn;
            state.scolumnc = scolumnc;
        }
    }
}