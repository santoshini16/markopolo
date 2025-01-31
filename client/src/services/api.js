import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

/**
 * Upload a document to the server
 * @param {File} file - The file to be uploaded
 * @returns {Promise} - The response from the server
 */
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export const queryChatbot = async (query) => {
  console.log(query)
  try {
    const response = await axios.post(`${API_BASE_URL}/api/query`, { query });

    return response.data; 
  } catch (error) {
    console.error("Error querying chatbot:", error);
    throw error;
  }
};