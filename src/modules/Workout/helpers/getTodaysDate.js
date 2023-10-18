

export const getTodaysDate = () =>{
    const dateObject = new Date()
    const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}`: dateObject.getMonth() + 1
    const year = dateObject.getFullYear()
    const date = dateObject.getDate() < 10 ? `0${dateObject.getDate()}`: dateObject.getDate()

    return `${year}-${month}-${date}`
}