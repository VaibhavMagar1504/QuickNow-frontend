import axios from "axios";

const BASE_URL= "http://localhost:8071/user";

 export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/userReg`, userData);
};

export const loginUser = async (loginData) => {
  return await axios.post(`${BASE_URL}/userLogin`, loginData);
};


export const getUserById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

export const updateUser =async (id, data)=>{
   return await axios.put(`${BASE_URL}/updateProfile/${id}`,data);
};

export const getAllUsers =async ()=>{
  return await axios.get(`${BASE_URL}/showuser`);
};

export const deleteUser=async(id)=>{
    return await axios.delete(`${BASE_URL}/deleteuser/${id}`);
};
