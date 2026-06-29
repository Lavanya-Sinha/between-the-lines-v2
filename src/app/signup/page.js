import SignUp from "../actions/SignUp"
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
        <input type="password" name="password" placeholder="Create Password" required/>
        <br />
        <label>Confirm Password: </label>
        <input type="password" name="confirm_password" placeholder="Confirm Password" required/>
        <button type="submit">Create Account</button>
    </form>
</main>
    )
}
export default SignUpUser