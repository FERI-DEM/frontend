import { apiInstance } from './axios';
import { CommunityReq, CommunityRes } from '../types/community.types';

const CommunityService = {
  createCommunity: async (community: CommunityReq) => {
    const response = await apiInstance.post<CommunityRes>('communities', community);
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
  joinCommunity: async (communityId: string, invite: { email: string }) => {
    const response = await apiInstance.patch<unknown>(`communities/invite/${communityId}`, invite);
    return response.data;
  },
  removeCommunityMember: async (communityId: string, memberId: string) => {
    const response = await apiInstance.delete<unknown>(`communities/remove/${communityId}/${memberId}`);
    return response.data;
  },
  leaveCommunity: async (communityId: string) => {
    const response = await apiInstance.delete<unknown>(`communities/leave/${communityId}`);
    return response.data;
  },
};

export default CommunityService;
