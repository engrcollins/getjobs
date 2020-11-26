import http from "../http-common";

const create = data => {
  console.log(data);
  return http.post("/login", data);
};
export default {
  create
};
