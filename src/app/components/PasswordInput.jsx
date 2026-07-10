"use client"
import { useState } from "react";

const PasswordInput = ({name, placeholder})=>{
    const [showPassword, setShowPassword] = useState(false);
    return(
    <>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "👀" : "👁"}
      </button>
    </>
    )
}
export default PasswordInput