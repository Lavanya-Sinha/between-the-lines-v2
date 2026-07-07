export const BookValidation = ({title, author})=>{
const trimTitle = title.trim()
const trimAuthor = author.trim()
if(!trimTitle){
    return {
        success : false,
        error: "Title Cannot Be Empty."
    }
}
if(!trimAuthor){
    return{
        success: false,
        error: " Author Cannot Be Empty!"
    }
}
return{
    success: true,
    data:{
        title: trimTitle,
        author: trimAuthor
    }
}
}