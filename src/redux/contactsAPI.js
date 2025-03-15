import axios from "axios";

axios.defaults.baseURL = `https://65158033dc3282a6a3ce8612.mockapi.io/`;

export const fetchContacts = async () => {
  const response = await axios.get("/contacts");
  return response.data;
};

export const addContacts = async ({ name, number }) => {
  const response = await axios.post("/contacts", { name, number });
  return response.data;
};

export const deleteContacts = async (id) => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
};
