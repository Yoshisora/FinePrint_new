import axios from "axios";

const serverBaseUrl = "http://127.0.0.1:5000";

export default async function getReviews(site) {
  try {
    const url = serverBaseUrl + "/getreviews";
    const body = { "site": site };
    const res = await axios.post(url, body);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}