import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/Styles/Styles.scss';  


createApp(App)
  .use(router)
  .mount('#app');  