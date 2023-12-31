import VueCookies from 'vue-cookies'

// component
import userTrackerComponent from './components/userTracker.vue';

const userTracker = {
  install (Vue, options) {

    Vue.use(VueCookies,{expire: options && options.cookiesExpirationDate ? options.cookiesExpirationDate : '90d'});
    Vue.$cookies.config(options && options.cookiesExpirationDate ? options.cookiesExpirationDate : '90d')
  
    Vue.component('userTracker', userTrackerComponent);

  }
}

export default userTracker;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(userTracker, {cookiesExpirationDate: '90d'});
} 


