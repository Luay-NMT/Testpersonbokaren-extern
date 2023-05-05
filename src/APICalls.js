import Axios from "axios";
const config = require('./config');

const axiosClient = Axios.create({
  baseURL: config.apiURL,

});


export const getAllBookings = async () => {
    try {
      const res = await axiosClient.get("/bookings");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export const getAllGroups = async () => {
    try {
      const res = await axiosClient.get("/groups");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function searchBookingsBasedOnTestpersonId(testpersonId) {
    try {
      const res = await axiosClient.get(`/search/bookings/${testpersonId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  export async function searchBookingsBasedOnGroup(group) {
    try {
      const res = await axiosClient.get(`/search/basedOnGroup/${group}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
