import axios from 'axios';


function getTokenFromLocalStorage() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return null;  
    }
  } catch (error) {
    console.error('Error retrieving token from local storage:', error);
    return null;  // Or handle the error differently
  }
}
const token = getTokenFromLocalStorage();
if (token) {
  console.log('Found token:', token);
  // Use the token for authorization purposes
} else {
  console.log('No token found in local storage');

}

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API
export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/login/', { username, password });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

// Signup API
export const signup = async (username: string, password: string, email: string) => {
  try {
    const response = await apiClient.post('/signup/', { username, password, email });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

// Forgot Password API
export const forgotPassword = async (email:string) => {
  try {
    const response = await apiClient.post('/forgot-password/', { email });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};


// Reset Password API
export const resetPassword = async (uidb64: string,  password: string) => {
  try {
    const response = await apiClient.post(`/reset-password/${uidb64}/${token}/`, { password });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};


export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.get('/user/', {
      headers: {
        Authorization: `Bearer  ${token}` 
      }
    });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

// Obtain JWT Token API
export const getJWTToken = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/api/token/', { username, password });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

// Refresh JWT Token API
export const refreshJWTToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post('/api/token/refresh/', { refresh: refreshToken });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};
