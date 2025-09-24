import { axiosConfig } from "../helpers/axios-config";

const getMedia = () => {
    return axiosConfig.get("/medias");
};

const createMedia = (data) => {
    return axiosConfig.post("/medias", data);
};

const updateMedia = (id, data) => {
    return axiosConfig.put(`/medias/${id}`, data);
}

export { getMedia, createMedia, updateMedia };
