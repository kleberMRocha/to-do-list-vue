import Vue from 'vue';
import App from './pages/App.vue';
import store from './vuex/store';
import HeyUI from "heyui";
import "heyui/themes/index.less";
import VueI18n from 'vue-i18n';
import en from 'heyui/dist/locale/en-US';
import pt_BR from 'heyui/dist/locale/pt_BR';

const heyuiConfig = () => {
  HeyUI.config('menu', {
    keyName: 'key',
    titleName: 'title',
    childrenName: 'children'
  });
  HeyUI.config('datepicker', {
    startWeek: 7
  });
};

export default heyuiConfig;

heyuiConfig();
Vue.use(VueI18n);

const messages = {
  en: Object.assign({ message: 'hello' }, en),
  pt_BR: Object.assign({ message: 'Olá' }, pt_BR)
};

const i18n = new VueI18n({
  locale: 'Pt-BR',
  fallbackLocale: 'en',
  messages
});

Vue.use(HeyUI, { i18n });

store.dispatch('getIntilValues');

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
