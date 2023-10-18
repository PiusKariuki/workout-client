import {defineStore} from "pinia";
import {getTodaysDate} from "@/modules/NewWorkout/helpers/getTodaysDate.js";


export const useNewWorkoutStore = defineStore('new-workout', {
    state: () => ({
        date: getTodaysDate(),
        categoryId: "",
        categoryName: "",
        movements: [{
            movementId: "",
            name: "",
            sets: null,
            reps: null,
            secondsOfRest: null
        }]
    }),

    getters: {
        getPostObject: state => {
            const verifiedWorkouts = state.movements.filter(item => item.movementId && item.name && item.sets && item.reps)
            const formattedWorkouts = verifiedWorkouts?.map((item, index) => ({
                movement_id: item.movementId,
                position: index + 1,
                sets: item.sets,
                reps: item.reps,
                rest_in_seconds: item.secondsOfRest,
            }))
            return {
                category_id: state.categoryId,
                date: new Date(state.date),
                movements: formattedWorkouts
            }
        }
    },

    actions: {
        /**
         * Adds a movement to the array of movements
         * @param movement
         */
        appendMovement({name = "", movementId = "", sets = "", reps = "", secondsOfRest = ""}) {
            this.movements = [...this.movements, {name, movementId, sets, reps, secondsOfRest}]
        },
        /**
         * Remove a movement object
         * @param index
         */
        removeMovement(index) {
            if (this.movements.length > 1)
                this.movements = this.movements.filter((item, idx) => idx !== index)
            else this.movements = [{
                movementId: "",
                name: "",
                sets: null,
                reps: null,
                secondsOfRest: null
            }]
        },
        /**
         *Add a movement name and a movement id to s specific object in the array
         * @param name
         * @param id
         * @param index
         */
        addMovementNameAndID({name, id, index}) {
            this.movements = this.movements.map((item, idx) => idx === index ? ({name: name, movementId: id}) : item)
        },
    },
    persist: true
})