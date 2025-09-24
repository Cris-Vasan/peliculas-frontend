import { axiosConfig } from "../helpers/axios-config";

const getTipos = () => {
    return axiosConfig.get("/tipos");
};

const createTipo = (data) => {
    return axiosConfig.post("/tipos", data);
};

const updateTipo = (id, data) => {
    return axiosConfig.put(`/tipos/${id}`, data);
};

export { getTipos, createTipo, updateTipo };
