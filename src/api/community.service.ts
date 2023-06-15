import { apiInstance } from './axios';
import { CommunityReq, CommunityReqJoin, CommunityRes, JoinCommunityRequestProcess } from '../types/community.types';

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
    removeCommunityMember: async (id: string, memberId: string, powerPlantId: string) => {
        const response = await apiInstance.delete<unknown>(`communities/remove/${id}/${memberId}`, {
            data: { powerPlantIds: [powerPlantId] },
        });
        return response.data;
    },
    leaveCommunity: async (communityId: string, powerPlantId: string) => {
        const response = await apiInstance.delete<unknown>(`communities/leave/${communityId}`, {
            data: { powerPlantIds: [powerPlantId] },
        });
        return response.data;
    },
    joinCommunity: async (community: CommunityReqJoin) => {
        const response = await apiInstance.post<CommunityRes>(`communities/request-to-join`, community);
        return response.data;
    },
    processJoinCommunity: async (data: JoinCommunityRequestProcess) => {
        const response = await apiInstance.patch<unknown>(`communities/process-request`, data);
        return response.data;
    },
};

export default CommunityService;
