import axios from 'axios';

export const useResource = () => {
  const loadResource = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveResource = async <T>(url: string, data: T) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteResource = async (url: string) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { loadResource, saveResource, deleteResource };
};
