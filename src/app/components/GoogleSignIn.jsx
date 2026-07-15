"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const GoogleSignIn = () => {
    const googleButtonRef = useRef(null)
  // Google will call this after a successful login.
  const handleGoogleLogin = async(response) => {
   try {
    const res = await fetch("/api/googleOAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: response.credential,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Google Sign-In failed.");
    }

    window.location.assign("/dashboard");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
  };

  //render google button
const renderGoogleButton = () => {
    if (!window.google || !googleButtonRef.current) return;

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
      }
    )
}

const initializeGoogle = () => {
  //initialize google script
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    })
    renderGoogleButton()
  }

  useEffect(() => {
    renderGoogleButton();
}, []);

  return (
    <>
    {/* Call google script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />
      <div ref={googleButtonRef}></div>
    </>
  );
};

export default GoogleSignIn;