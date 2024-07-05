import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-hub.ilcs.co.id/my/n'
});

export const getPort = async ({ kd_negara, value_search }) => {
  const response = await api.get(`/pelabuhan?kd_negara=${kd_negara}&ur_pelabuhan=${value_search}`);
  return response.data;
}