
// --------------------
// REGISTER VALIDATION
// --------------------
export const validateRegisterForm = (data) => {
  const errors = {};

  // -------- NAME --------
  // Only alphabets, allow one space
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?$/;

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(data.name)) {
    errors.name = "Name must contain only letters and one space allowed";
  } else if (data.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }


  // -------- EMAIL --------
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }


  // -------- PASSWORD --------
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      "Password must be 8+ chars, include uppercase, lowercase, number, special character";
  }


  // -------- MOBILE --------
  // Must start with 9, 8, or 7 and contain only digits
  const mobileRegex = /^[987]\d{9}$/;

  if (!data.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(data.mobile)) {
    errors.mobile = "Invalid mobile number (must start with 9, 8, or 7 and be 10 digits)";
  }


  // -------- ADDRESS --------
  if (!data.address.trim()) {
    errors.address = "Address is required";
  } else if (data.address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  return errors;
};
