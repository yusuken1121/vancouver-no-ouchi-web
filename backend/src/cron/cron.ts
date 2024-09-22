import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

export const setUpCronJobs = () => {
  cron.schedule("*/14 * * * *", async () => {
    try {
      await axios.get(process.env.API_PUBLIC_API_BASEURL!);
      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error sending request", error);
    }
  });
};
