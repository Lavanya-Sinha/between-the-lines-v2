"use client";

import { useState } from "react";

import Input from "./ui/Input";

const PasswordInput = ({
  name,
  placeholder,
  disabled = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`pr-12 ${className}`}
      />
   <button
    type="button"
    onClick={() =>
        setShowPassword((value) => !value)
    }
>
    {showPassword ? "Visible" : "Hidden"}
</button>
    </div>
  );
};

export default PasswordInput;
