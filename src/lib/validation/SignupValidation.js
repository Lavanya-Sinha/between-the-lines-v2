export const SignupValidation = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => {
  const trimDisplayName = displayName.trim();
  const trimEmail = email.trim().toLowerCase();
  const trimPassword = password.trim();
  const trimConfirmPassword = confirmPassword.trim();
  if (!trimDisplayName) {
    return {
      success: false,
      error: "Enter A Display Name.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(trimEmail)) {
    return {
        success: false,
        error: "Please enter a valid email address."
    };
}
  if (!trimEmail) {
    return {
      success: false,
      error: "Email Is Required.",
    };
  }
  if (password.length < 8) {
    return {
      success: false,
      error: "Password Must Be Atleast 8 Characters.",
    };
  }
  if (!trimConfirmPassword) {
    return {
      success: false,
      error: "Please confirm your password.",
    };
  }
  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Password Mismatch.",
    };
  }
  return {
    success: true,
    data: {
      displayName: trimDisplayName,
      email: trimEmail,
      password: trimPassword
    },
  };
};
