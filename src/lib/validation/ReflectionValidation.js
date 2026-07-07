export const ReflectionValidation = ({content})=>{
const trimContent = content.trim()
if(!trimContent){
    return{
        success: false,
        error: "Please Enter Your Reflection"
    }
}
return{
    success: true,
    data:{
        content : trimContent
    }
}
}