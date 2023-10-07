import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./shared/router/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faChartLine, faCirclePlus, faHouse, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faBell, faCalendarDays, faCircleUser, faClock} from "@fortawesome/free-regular-svg-icons";

library.add(faCircleUser, faMagnifyingGlass, faBell, faClock, faHouse, faCalendarDays, faCirclePlus, faChartLine)

createApp(App)
    .use(router)
    .component('fa-icon', FontAwesomeIcon)
    .mount('#app')
