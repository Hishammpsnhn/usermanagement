import axios from "axios";

const url = "http://localhost:4000";
export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${url}/api/user/getUsers`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
export const createUsers = async (userData) => {
  try {
    const { data } = await axios.post(`${url}/api/user`, userData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
export const editUser = async (userData) => {
  try {
    const { data } = await axios.put(`${url}/api/user`, userData, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
export const deleteUsers = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/api/user/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error("Server Error Message:", errorMessage);
    } else {
      console.error("Generic Error");
    }
  }
};
