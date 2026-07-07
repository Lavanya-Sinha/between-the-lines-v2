export const MoodTagValidation = ({tagName})=>{
const trimTagName = tagName.trim()
if(!trimTagName){
    return{
        success: false,
        error: "Please Enter A Tag."
    }
}
if(trimTagName.length > 30){
    return{
        success: false,
        error: "Mood tags cannot exceed 30 characters."
    }
}
return{
    success:true,
    data:{
        tagName: trimTagName
    }
}
}