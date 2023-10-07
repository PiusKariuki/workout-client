import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./shared/router/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faBell, faCircleUser, faClock} from "@fortawesome/free-regular-svg-icons";

library.add(faCircleUser, faMagnifyingGlass, faBell, faClock)

createApp(App)
    .use(router)
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app')
