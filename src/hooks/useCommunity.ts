import CommunityService from '@/api/community.service';
import { ApiError } from '@/types/common.types';
import { CommunityRes } from '@/types/community.types';
import useSWR from 'swr';
import { CacheKey } from "@/types/caching.types";

const useCommunity = (communityId: string) => {
  const { data, error, isLoading } = useSWR<CommunityRes, ApiError>(`${CacheKey.COMMUNITY}_${communityId}`, () =>
    CommunityService.getCommunity(communityId)
);

  return {
    community: data,
    communityError: error,
    communityLoading: isLoading,
  };
};

export default useCommunity;