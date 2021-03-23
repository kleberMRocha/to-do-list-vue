import api from '../services/api';
import {uuid} from 'uuidv4';

export const GetValues = async () => {
 const response = await api.get('tasks');
 return response.data;
};

export const alterValue = async (data) => {
    const {id, ...rest} = data;
    const response = await api.patch(`tasks/${id}`,rest);
    return response.data;
};

export const addValue = async (data) => {
    const constUI = uuid();
    const task = {id:constUI, ...data };
    const response = await api.post(`tasks`, task);
    return response.data;
};

export const deleteValue = async (id) => {
    const response = await api.delete(`tasks/${id}`);
    return response.data;
};


