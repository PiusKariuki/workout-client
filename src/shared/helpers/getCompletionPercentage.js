export const percentage = (splits) => {
    const completed = splits?.filter(split => split?.complete === true)
    return Math.round(completed?.length / splits?.length * 100)
}