import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

console.log("API instance created with baseURL:", api.defaults.baseURL)

export default api