import axios from "axios";

const BASE_URL = "http://localhost:8071/admin";

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
