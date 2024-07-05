import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-hub.ilcs.co.id/my/n'
});

export const getBeaMasuk = async (hs_code) => {
  const response = await api.get(`/tarif?hs_code=${hs_code}`);
  return response.data;
}