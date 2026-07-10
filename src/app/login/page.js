import LogIn from "../actions/LogIn"
import PasswordInput from "../components/PasswordInput"

const LoginPage = ()=>{
    return(
        <main>
            <h1>LogIn Page</h1>
            <form action={LogIn}>
                <label>Email: </label>
                <input type="email" placeholder="Enter Your Email..." name="email"/>
                <br />
                <label>Password: </label>
                <PasswordInput name="password" placeholder="Enter Your Password"/>
                <button type="submit">Log In</button>
            </form>
        </main>
    )
}
export default LoginPage