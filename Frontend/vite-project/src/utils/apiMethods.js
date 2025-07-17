import axios from "axios";

export const postApi = async ({ url, data = {}, headers = {} }) => {
  try {
    const response = await axios.post(url, data, { headers });
    console.log("response", response.data);
    return response.data; // optionally return the response
  } catch (error) {
    console.error("error",  error);
    throw error; // optional: re-throw for caller to handle
  }
};

export const getApi = async ({ url,data={}, headers = {} }) => {
  try {
    const response = await axios.get(url, data={}, { headers });
    console.log("response", response.data);
    return response.data; // optionally return the response
  } catch (error) {
    console.error("error", error.response ? error.response.data : error.message);
    throw error; // optional: re-throw for caller to handle
  }
};



// import axios from "axios";
// export const postApi = async ({ url }) => {
  
//      try {
//         //  async (url, data) => {
//       const response = await axios.post(url);
//       console.log(response,"resp0nseee");

//     // }
//      } catch (error) {
//         console.log("error ",error);
//      } 
// };