import SignUp from "../actions/SignUp"
import PasswordInput from "../components/PasswordInput"
const SignUpUser = ()=>{
    return(
<main>
    <h1>Sign Up Page</h1>
    <form action={SignUp}>
        <label>Display Name: </label>
        <input type="text" name="display_name" placeholder="Enter Display Name..." required/>
        <br />
        <label>Email: </label>
        <input type="email" name="email" placeholder="Enter Email..." required/>
        <br />
        <label>Password: </label>
        <PasswordInput name="password" placeholder="Create Password" />
        <br />
        <label>Confirm Password: </label>
       <PasswordInput name="confirm_password" placeholder="Confirm Password" />
        <button type="submit">Create Account</button>
    </form>
</main>
    )
}
export default SignUpUser