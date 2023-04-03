import axios from "axios";
const url = "http://localhost:8000";
export const addUser = async (data) => {
  try {
    let response = await axios.post(`${url}/add`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addTip = async (data) => {
  try {
    let response = await axios.post(`${url}/tip`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkscore = async (user) => {
  try {
    console.log(user);
    let response = await axios.post(`${url}/score`, user);
    return response.data;
  } catch (error) {
    console.log("error while calling Signup API: ", error);
  }
};

export const resetpassword = async (data) => {
  try {
    let response = await axios.post(`${url}/reset`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const modifyTipStatus = async (data) => {
  try {
    let response = await axios.patch(`${url}/modifyTipStatus`, data);
    // let response = await axios.patch(`${url}/modifyTipStatus`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTips = async () => {
  try {
    let response = await axios.get(`${url}/gettip`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
