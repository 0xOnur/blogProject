import axios from 'axios';
const apiEndpoint = "http://localhost:5000/posts/";

export const fetchPosts = async () => await axios.get(`${apiEndpoint}`);

export const createPost = async (postData) => await axios.post(`${apiEndpoint}`, postData);