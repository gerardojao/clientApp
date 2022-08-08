import axios from "axios"


export default axios.create({
  //baseURL: process.env.REACT_APP_SUPABASE_URL
   // baseURL: "https://localhost:44300/api"
  baseURL: "http://projectfsmongo.somee.com?api"
   
})
// axios.defaults.baseURL = "https://oktara-back.herokuapp.com"