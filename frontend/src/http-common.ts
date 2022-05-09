import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/v1/api', // exposed only for public access reason
  headers: {
    "Content-type": "application/json"
  }
});