import CommunityService from '@/api/community.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { CommunityRes } from '@/types/community.types';
import useSWR from 'swr';

const useCommunities = () => {
    const { data, mutate, error, isLoading } = useSWR<CommunityRes[], ApiResponseError>(CacheKey.COMMUNITIES, () =>
        CommunityService.getCommunities()
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        communities: data,
        communitiesMutate: mutate,
        communitiesError: error,
        communitiesLoading: isLoading,
    };
};

export default useCommunities;
