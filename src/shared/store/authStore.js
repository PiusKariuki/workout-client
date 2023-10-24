import {defineStore} from "pinia";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: "",
        token_type: ""
    }),
    actions: {
        loadToken({access_token, token_type}) {
            this.access_token = access_token
            this.token_type = token_type
        }
    },
    persist: true
})