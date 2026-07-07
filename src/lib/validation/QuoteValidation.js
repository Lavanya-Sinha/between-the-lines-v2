export const QuoteValidation = ({text})=>{
    const trimText = text.trim()
    if(!trimText){
        return{
            success: false,
            error: "Please Enter A Quote."
        }
    }
    return{
        success: true,
        data:{
            text: trimText
        }
    }
}