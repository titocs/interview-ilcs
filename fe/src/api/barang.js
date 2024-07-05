import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-hub.ilcs.co.id/my/n'
});

export const getBarang = async (hs_code) => {
  const response = await api.get(`/barang?hs_code=${hs_code}`);
  return response.data;
}