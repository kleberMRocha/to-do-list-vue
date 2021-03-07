import Vue from 'vue';
import App from './pages/App.vue';
import store from './vuex/store';
import HeyUI from "heyui";
import "heyui/themes/index.less";
import ptBr from './config/lang';


Vue.config.productionTip = false;
Vue.use(HeyUI)
Vue.use(HeyUI, {locale: ptBr});

store.dispatch('getIntilValues');

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
