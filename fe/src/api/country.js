import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-hub.ilcs.co.id/my/n'
});

export const getCountry = async (value) => {
  const response = await api.get(`/negara?ur_negara=${value}`);
  return response.data;
}