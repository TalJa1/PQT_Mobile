import axiosClient from '../services/axiosClient';
import {Dissater, DissaterData} from '../services/model'; // Ensure Dissater is imported

const disasterAPI = {
  getAll: async (): Promise<DissaterData> => {
    const url = '/thientai';
    return axiosClient.get(url);
  },

  getById: async (id: number): Promise<Dissater> => {
    const url = `/thientai/${id}`;
    return axiosClient.get(url);
  },
};

export default disasterAPI;
