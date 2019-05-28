import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'

import VueBus from 'vue-bus'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App.vue'
import routerConfig from './router/'
import storeConfig from './store/'

import LoadingGifImage from './components/LoadingGifImage'

Vue.use(VueBus)
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(Vuex)

const router = new VueRouter(routerConfig)
const store = new Vuex.Store(storeConfig)

// 路由后置钩子
router.afterEach((to, from) => {
	// 告诉store我切换了路由，每个路由的meta都有一个column属性，声明着路由的名称
	store.commit('routerStore/changeColumn', {
		column: to.meta.column,
		scolumn: to.meta.scolumn,
		scolumnc: to.meta.scolumnc
	})
})

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://192.168.1.88'

// 全局过滤器
Vue.filter('wan', function(value) {
	return Math.round(value / 10000); //将公里数过滤万单位
})

// 定义全局组件
Vue.component('LoadingGifImage', LoadingGifImage)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
