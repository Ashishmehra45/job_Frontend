import axios from "axios";



const isLocalhost = 
  window.location.hostname === "localhost" || 
  window.location.hostname === "127.0.0.1";


export const API_BASE_URL = isLocalhost 
  ? "http://localhost:8000/api"                                 
  : "https://job-backend-4691.onrender.com/api";
  
  export default API_BASE_URL;

