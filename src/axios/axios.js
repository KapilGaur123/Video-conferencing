import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export const getUsers = async (url) => await API.get(url);

console.log(getUsers)



export const postUser = (url) => API.post(url, data);

export const putUser = (url) => API.put(url)

export const deleteUser = (url) => API.delete(url);