import http from "../http-common";

const create = data => {
  console.log(data);
  return http.post("/reg_form", data);
};


export default {
  create,
};
