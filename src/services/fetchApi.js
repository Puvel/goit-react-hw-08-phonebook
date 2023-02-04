import axios from 'axios';

axios.defaults.baseURL = 'https://63dae9e99748c323b52bbd3d.mockapi.io';

export const fetchGet = () => axios.get('/contacts');
export const fetchAdd = body => axios.post('/contacts', body);
export const fetchRemove = id => axios.delete(`/contacts/${id}`);
