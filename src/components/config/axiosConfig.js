import axios from "axios";

// const url = "localhost:8080";
const url = "healthiuspring-production.up.railway.app";

export default axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "https://healthiuspring-production.up.railway.app",
})

export {url}