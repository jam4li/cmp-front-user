// Import Vue
import { createApp } from "vue";
import App from "./src/App.vue";
import router from "./src/router";

// Mount the app to a DOM element
createApp(App).use(router).mount('#app');
