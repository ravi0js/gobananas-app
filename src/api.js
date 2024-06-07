import axios from "axios";

const JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com";
const RANDOMUSER_URL = "https://randomuser.me/api";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_URL}/posts`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};


export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${RANDOMUSER_URL}/?results=100`);
    console.log(response.data.result);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
