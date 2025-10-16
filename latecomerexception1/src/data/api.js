import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(BASE_URL, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
