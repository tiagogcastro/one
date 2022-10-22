import axios from 'axios';

export const nouApi = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const nouApiStorageKey = '@nou:token';
