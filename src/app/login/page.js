import LogIn from "../actions/LogIn"

const LoginPage = ()=>{
    return(
        <main>
            <h1>LogIn Page</h1>
            <form action={LogIn}>
                <label>Email: </label>
                <input type="email" placeholder="Enter Your Email..." name="email" required/>
                <br />
                <label>Password: </label>
                <input type="password" placeholder="Enter Your Password" name="password" required/>
                <button type="submit">Log In</button>
            </form>
        </main>
    )
}
export default LoginPage