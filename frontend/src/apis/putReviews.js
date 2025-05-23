import axios from "axios";

const serverBaseUrl = "http://127.0.0.1:5000";

export default async function putReview(review, rating, site) {
  try {
    const url = serverBaseUrl + "/putreview";
    const date = new Date().toISOString().split('T')[0];
    const body = { "review": review, "rating": rating, "date": date, "site": site };
    const res = await axios.post(url, body);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}