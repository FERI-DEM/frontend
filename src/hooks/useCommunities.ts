import CommunityService from '@/api/community.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { CommunityRes } from '@/types/community.types';
import useSWR from 'swr';

const useCommunities = () => {
  const { data, mutate, error, isLoading } = useSWR<CommunityRes[], ApiError>(CacheKey.COMMUNITIES, () =>
    CommunityService.getCommunities()
  );

  return {
    communities: data,
    communitiesMutate: mutate,
    communitiesError: error,
    communitiesLoading: isLoading,
  };
};

export default useCommunities;