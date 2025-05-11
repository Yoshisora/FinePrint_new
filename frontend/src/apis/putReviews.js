import axios from "axios";

const serverBaseUrl = "http://127.0.0.1:5000";

export default async function putReview(review, site) {
  try {
    const url = serverBaseUrl + "/putreview";
    const body = { "review": review, "site": site };
    const res = await axios.post(url, body);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}