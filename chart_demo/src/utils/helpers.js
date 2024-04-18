export const convertAndFix = (value='',fixCount=2) =>{
    return parseFloat(value)?.toFixed(fixCount)
}