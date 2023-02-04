import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (bodyData, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', bodyData);
      setToken(data.token);
      return data;
    } catch (error) {
      const errorData = error.response.data.errors;
      let message = '';
      if (error.response.status === 400) {
        if (errorData) {
          for (let err in errorData) {
            if (errorData[err].kind === 'required') {
              message = `${err[0].toUpperCase() + err.slice(1)} is required!`;
            }
            if (errorData[err].kind === 'user defined') {
              message = errorData[err].message;
            }

            if (errorData[err].kind === 'minlength') {
              message =
                'Password is shorter than the minimum allowed length 7!';
            }
          }
        }
      } else if (error.response.status === 500) {
        message = 'Server error!';
      }
      toast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (bodyData, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', bodyData);
      setToken(data.token);
      return data;
    } catch (error) {
      let message = '';
      if (error.response.status === 400) {
        message = 'Invalid email or password!';
      } else if (error.response.status === 500) {
        message = 'Server error!';
      }
      toast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearToken();
  } catch (error) {
    let message = '';
    if (error.response.status === 401) {
      message = 'Unauthorized';
    } else if (error.response.status === 500) {
      message = 'Server error!';
    }
    toast(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      setToken(token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      let message = '';
      if (error.response.status === 401) {
        message = 'Unauthorized';
      } else if (error.response.status === 500) {
        message = 'Server error!';
      }
      toast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
