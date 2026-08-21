import Link from "next/link";

import SignUp from "../actions/SignUp";
import PasswordInput from "../components/PasswordInput";
import GoogleSignIn from "../components/GoogleSignIn";

import ThemeBackground from "../components/themes/ThemeBackground";
import ThemeAtmosphere from "../components/themes/ThemeAtmosphere";

import Button from "../components/ui/Button";
import SubmitButton from "../components/ui/Button/SubmitButton";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Divider from "../components/ui/Divider";

const SignUpUser = () => {
  return (
    <ThemeBackground className="min-h-screen overflow-hidden">
      <ThemeAtmosphere
        className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    opacity-20
                "
      />

      <main
        className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    p-6
                    sm:p-8
                "
      >
        <Card
          className="
                        flex
                        w-full
                        max-w-xl
                        flex-col
                        gap-6
                    "
        >
          <div className="flex flex-col gap-2">
            <h1
              style={{
                fontFamily: "var(--font-heading)",

                fontSize: "var(--font-size-3xl)",

                fontWeight: "var(--font-weight-bold)",

                lineHeight: "var(--line-height-heading)",

                letterSpacing: "var(--letter-spacing-heading)",

                color: "var(--text-primary)",
              }}
            >
              Create an account
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-base)",

                fontWeight: "var(--font-weight-regular)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-secondary)",
              }}
            >
              Begin building your own personal library.
            </p>
          </div>

          <form
            action={SignUp}
            className="
                            flex
                            flex-col
                            gap-4
                        "
          >
            <label
              htmlFor="display_name"
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-sm)",

                fontWeight: "var(--font-weight-semibold)",

                color: "var(--text-primary)",
              }}
            >
              Display name
            </label>

            <Input
              id="display_name"
              type="text"
              name="display_name"
              placeholder="Enter your display name"
            />

            <label
              htmlFor="email"
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-sm)",

                fontWeight: "var(--font-weight-semibold)",

                color: "var(--text-primary)",
              }}
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />

            <label
              htmlFor="password"
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-sm)",

                fontWeight: "var(--font-weight-semibold)",

                color: "var(--text-primary)",
              }}
            >
              Password
            </label>

            <PasswordInput name="password" placeholder="Create a password" />

            <label
              htmlFor="confirm_password"
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-sm)",

                fontWeight: "var(--font-weight-semibold)",

                color: "var(--text-primary)",
              }}
            >
              Confirm password
            </label>

            <PasswordInput
              name="confirm_password"
              placeholder="Confirm your password"
            />

            <SubmitButton loadingText="Creating account...">
              Sign Up
            </SubmitButton>
          </form>

          <Divider />

          <GoogleSignIn />

          <div
            className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        "
          >
            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "var(--font-size-base)",

                lineHeight: "var(--line-height-body)",

                color: "var(--text-secondary)",
              }}
            >
              Already have an account?
            </p>

            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
          </div>
        </Card>
      </main>
    </ThemeBackground>
  );
};

export default SignUpUser;
