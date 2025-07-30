import axios from "axios";

const BASE_URL = "http://localhost:5275/api/Users";

export async function loginUser(credentials) {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function signupUser(userData) {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
