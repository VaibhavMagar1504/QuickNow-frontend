import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const adminLogin = async (username, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/adminlogin`, {
      username,
      password,
    });
    return res.data; // success or invalid
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};
