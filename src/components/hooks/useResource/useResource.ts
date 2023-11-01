import axios from 'axios';

export const useResource = () => {
  const loadResource = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An error occurred while loading the resource.');
    }
  };

  const saveResource = async <T>(url: string, data: T, token: string) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateResource = async <T>(url: string, data: T, token: string) => {
    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteResource = async (url: string, token: string) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { loadResource, saveResource, updateResource, deleteResource };
};
