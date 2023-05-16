import { User } from '@/types/user.types';
import { apiInstance } from './axios';
import { CommunityRes } from "@/types/community.types";

const UsersService = {
  getCurrentUser: async () => {
    const response = await apiInstance.get<User>('users/me');
    return response.data;
  },
  getUserByMail: async (email: string) => {
    const response = await apiInstance.get<User>(`users/email/${email}`);
    return response.data;
  },
};

export const getUser = async (id: string) => {
  const response = await apiInstance.get<User>(`users/${id}`);
  return response.data;
};

export default UsersService;
