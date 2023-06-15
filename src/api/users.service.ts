import { Me, User } from '@/types/user.types';
import { apiInstance } from './axios';

const UsersService = {
  getCurrentUser: async () => {
    const response = await apiInstance.get<Me>('users/me');
    return response.data;
  },
  getUser: async (id: string) => {
    const response = await apiInstance.get<User>(`users/${id}`);
    return response.data;
  },
  getUserByMail: async (email: string) => {
    const response = await apiInstance.get<User>(`users/email/${email}`);
    return response.data;
  },
};

export default UsersService;
