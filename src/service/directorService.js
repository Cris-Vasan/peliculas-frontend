import { axiosConfig } from "../helpers/axios-config";

const getDirectores = () => {
    return axiosConfig.get("/directores");
};

const createDirector = (data) => {
    return axiosConfig.post("/directores", data);
};

const updateDirector = (id, data) => {
    return axiosConfig.put(`/directores/${id}`, data);
};

export { getDirectores, createDirector, updateDirector };
