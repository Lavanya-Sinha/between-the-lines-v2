import LogIn from "../actions/LogIn";
import PasswordInput from "../components/PasswordInput";
import GoogleSignIn from "../components/GoogleSignIn";
import Link from "next/link";


const LoginPage = async({searchParams}) => {
      const { email = "", registered } = await searchParams;
  return (
    <main>
      <h1>LogIn Page</h1>
      {registered && (
        <p>Account created successfully! Please log in to continue.</p>
      )}
      <form action={LogIn}>
        <label>Email: </label>
        <input type="email" placeholder="Enter Your Email..." name="email" defaultValue={email} />
        <br />
        <label>Password: </label>
        <PasswordInput name="password" placeholder="Enter Your Password" />
        <button type="submit">Log In</button>
      </form>
      <strong>OR</strong>
      <GoogleSignIn />
      Been Here For The FIrst Time?
      <br />
      <Link href="/signup">Sign Up →</Link>
    </main>
  );
};
export default LoginPage;
