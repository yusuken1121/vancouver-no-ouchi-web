import cron from "node-cron";
import axios from "axios";
import { API_PUBLIC_BASEURL } from "../env";

export const setUpCronJobs = () => {
  cron.schedule("*/14 * * * *", async () => {
    try {
      await axios.get(API_PUBLIC_BASEURL);
      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error sending request", error);
    }
  });
};
