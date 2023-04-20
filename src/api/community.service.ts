import { apiInstance } from './axios';
import { CommunityReq, CommunityRes } from '../types/community.types';

const CommunityService = {
  createCommunity: async (community: CommunityReq) => {
    const response = await apiInstance.post<CommunityRes>(
      'communities',
      community
    );
    return response.data;
  },
  getCommunities: async () => {
    const response = await apiInstance.get<CommunityRes[]>('communities');
    return response.data;
  },
  getCommunity: async (id: string) => {
    const response = await apiInstance.get<CommunityRes>(`communities/${id}`);
    return response.data;
  },
  deleteCommunity: async (id: string) => {
    const response = await apiInstance.delete<unknown>(`communities/${id}`);
    return response.data;
  },
};

export default CommunityService;
