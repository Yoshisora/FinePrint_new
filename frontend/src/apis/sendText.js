import axios from "axios";

const serverBaseUrl = "http://127.0.0.1:5000";

export default async function sendText(text, site) {
  try {
    const url = serverBaseUrl + "/text";
    const body = { "text": text, "site": site };
    const res = await axios.post(url, body);
    return res;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
}