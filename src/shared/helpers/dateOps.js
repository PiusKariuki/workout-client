export const getDateString =(dateObject) =>{
    const newDate = new Date(dateObject)
    return newDate.toLocaleDateString()
}