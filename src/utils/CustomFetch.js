// src/utils/CustomFetch.js
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const useCustomFetch = () => {
  const { auth, refreshAccessToken, logout } = useContext(AuthContext);

  const customFetch = async (url, options = {}) => {
    // Add Authorization header if accessToken exists
    if (auth.accessToken) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${auth.accessToken}`,
      };
    }

    try {
      let response = await fetch(url, options);

      // If access token has expired, try to refresh it
      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Retry the original request with the new access token
          options.headers['Authorization'] = `Bearer ${newAccessToken}`;
          response = await fetch(url, options);
        } else {
          // Refresh token failed, logout the user
          logout();
          return response;
        }
      }

      return response;
    } catch (error) {
      console.error('CustomFetch error:', error);
      throw error;
    }
  };

  return customFetch;
};

export default useCustomFetch;
