import { axiosConfig } from "../helpers/axios-config";

const getProductoras = () => {
    return axiosConfig.get("/productoras");
};

const createProductora = (data) => {
    return axiosConfig.post("/productoras", data);
};

const updateProductora = (id, data) => {
    return axiosConfig.put(`/productoras/${id}`, data);
};

export { getProductoras, createProductora, updateProductora };
