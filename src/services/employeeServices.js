import axios from "axios";
import { getToken } from "./authService";

//const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = "http://localhost:5275/api/Users";

export async function FetchAllEmp() {
  const token = getToken();
  try {
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Unable to fetch the employees");
  }
}

export async function FetchEmpById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Unable to fetch the ${id} employee`);
  }
}

export async function PostEmp(empData) {
  try {
    const res = await axios.post(BASE_URL, empData);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Unable to post a new employee");
  }
}

export async function UpdateEmp(id, updatedEmpData) {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}`, updatedEmpData);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Unable to update the employee ${id}`);
  }
}

export async function DeleteEmp(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Unable to delete employee ${id}`);
  }
}
