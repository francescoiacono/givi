import axios from 'axios';

export const useResource = () => {
  /**
   * Loads a resource from the specified URL.
   *
   * @param url - The URL of the resource to load.
   * @returns A Promise that resolves to the loaded resource data.
   * @throws If an error occurs while loading the resource.
   */
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

  /**
   * Saves a resource by making a POST request to the specified URL with the provided data and token.
   * @param url - The URL to send the POST request to.
   * @param data - The data to be sent in the request body.
   * @param token - The authorization token to be included in the request headers.
   * @returns A Promise that resolves to the response data if the request is successful, otherwise logs the error and returns undefined.
   */
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

  /**
   * Updates a resource by making a PUT request to the specified URL with the provided data and token.
   * @param url - The URL to send the PUT request to.
   * @param data - The data to be sent in the request body.
   * @param token - The authorization token to be included in the request headers.
   * @returns A Promise that resolves to the response data if the request is successful, or logs the error if the request fails.
   */
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

  /**
   * Deletes a resource from the specified URL using the provided token for authorization.
   *
   * @param url - The URL of the resource to delete.
   * @param token - The authorization token to use for the request.
   * @returns A Promise that resolves to the data returned by the server, or undefined if an error occurs.
   */
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
