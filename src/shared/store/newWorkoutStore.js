import {defineStore} from "pinia";


export const newWorkoutStore = defineStore('new-workout-store', {
    state: () => ({
        date: "",
        categoryId: "",
        categoryName: "",
        movements: []
    }),
    actions: {
        /**
         * Adds a movement to the array of movements
         * @param movement
         */
        appendMovement(movement) {
            this.movements = [...this.movements, movemnt]
        },
        addCategoryId(categoryId) {
          this.categoryId = categoryId
        }
    },
    persist: true
})