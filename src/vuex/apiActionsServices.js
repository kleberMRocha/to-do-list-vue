import api from '../services/api';

export const GetValues = async () => {
 const response = await api.get('tasks');
 return response.data;
};

export const alterValue = async (data) => {
    const {id, ...rest} = data;
    const response = await api.patch(`tasks/${id}`,rest);
    return response.data;
};