import { axiosConfig } from "../helpers/axios-config";

const getGeneros = () => {
    return axiosConfig.get("/generos");
};

const createGenero = (data) => {
    return axiosConfig.post("/generos", data);
};

const updateGenero = (id, data) => {
    return axiosConfig.put(`/generos/${id}`, data);
};

export { getGeneros, createGenero, updateGenero };
