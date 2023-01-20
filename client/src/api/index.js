import axios from 'axios';
const apiEndpoint = "http://localhost:5000/posts/";

export const fetchPosts = async () => await axios.get(`${apiEndpoint}`);

export const createPost = async (postData) => await axios.post(`${apiEndpoint}`, postData);

export const updatePost = async (id, updatedPost) => await axios.patch(`${apiEndpoint}${id}`, updatedPost);

export const deletePost = async (id) => await axios.delete(`${apiEndpoint}${id}`);

export const fetchSinglePost = async (id) => await axios.get(`${apiEndpoint}${id}`);