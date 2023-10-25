import axios from 'axios';

export const axiosInstance = axios.create({baseURL: 'https://dev-mrp.insby.tech/api'})