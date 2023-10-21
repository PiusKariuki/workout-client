import {createApp} from 'vue'
import 'maz-ui/css/main.css'
import './style.css'
import App from './App.vue'
import router from "./shared/router/index.js";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faChartLine,
    faCircleChevronLeft,
    faCircleChevronRight,
    faCirclePlus,
    faFire,
    faHouse,
    faMagnifyingGlass,
    faClock, faDumbbell, faHashtag, faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import {faBell, faCalendarDays, faCircleUser, faSquare, faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import MazInput from 'maz-ui/components/MazInput'
import MazSpinner from 'maz-ui/components/MazSpinner'
import MazPicker from 'maz-ui/components/MazPicker'
import MazSelect from 'maz-ui/components/MazSelect'
import MazDialog from 'maz-ui/components/MazDialog'
import MazCheckbox from 'maz-ui/components/MazCheckbox'
import pinia from "@/shared/store/index.js";


library.add(
    faCircleUser,
    faMagnifyingGlass,
    faBell,
    faClock,
    faHouse,
    faCalendarDays,
    faCirclePlus,
    faChartLine,
    faCircleChevronRight,
    faCircleChevronLeft,
    faFire,
    faDumbbell,
    faHashtag,
    faSquare,
    faSquareCheck,
    faCircleXmark
)

createApp(App)
    .use(router)
    .use(pinia)
    .component('fa-icon', FontAwesomeIcon)
    .component('MazInput', MazInput)
    .component('Picker', MazPicker)
    .component('MazSelect', MazSelect)
    .component('MazCheck', MazCheckbox)
    .component('MazDialog', MazDialog)
    .component('Spinner', MazSpinner)
    .mount('#app')
