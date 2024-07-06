import axios from "axios";

// const url = "localhost:8080";
const url = "ec2-16-170-253-71.eu-north-1.compute.amazonaws.com:8080";
// const url = "healthiuspring-production.up.railway.app";

export default axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: `http://${url}/api`,
    // baseURL: "https://healthiuspring-production.up.railway.app/api",
})

export {url}