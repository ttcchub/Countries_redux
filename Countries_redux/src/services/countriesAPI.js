import axios from "axios";

const baseURL = "https://restcountries.com/v3.1/all";

const getAll = async () =>{
    const res = await axios.get(baseURL)
    return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll};