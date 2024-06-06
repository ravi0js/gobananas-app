import axios from "axios";

const JSONPLACEHOLDER_URL = process.env.REACT_APP_JSONPLACEHOLDER_URL;
const RANDOMUSER_URL = process.env.REACT_APP_RANDOMUSER_URL;

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
    const response = await axios.get(`${RANDOMUSER_URL}/?results=10`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};
