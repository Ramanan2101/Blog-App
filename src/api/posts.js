import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:3001/posts'
    baseURL: 'https://jsonplaceholder.typicode.com'
})
