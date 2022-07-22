import axios from "axios"


export default axios.create({
  // baseURL: "https://tnzrbxgibadxdoqewstg.supabase.co/rest/v1/users"
    baseURL: "https://localhost:44300/api"
 
})
// axios.defaults.baseURL = "https://oktara-back.herokuapp.com"