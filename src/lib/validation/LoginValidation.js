export const LoginValidation = ({email,password})=>{
const trimEmail = email.trim().toLowerCase()
const trimPassword = password.trim()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!trimEmail){
  return{
    success: false,
    error: "Enter Your Email"
  }
  }
if (!emailRegex.test(trimEmail)) {
    return {
        success: false,
        error: "Please enter a valid email address."
    };
}
if(!trimPassword){
return{
    success: false,
    error: "Enter Your Password."
}
}
return{
    success: true,
    data:{
        email: trimEmail,
        password: trimPassword
    }
}
}