import useSWR from 'swr';
import { ApiError } from '@/types/common.types';
import { CacheKey } from '@/types/caching.types';
import UsersService from '@/api/users.service';
import { User } from '@/types/user.types';

const useCommunityMembers = (memberIds?: string[]) => {
    const { data, error, isLoading } = useSWR<User[], ApiError>(
        () => memberIds?.map((memberId) => `${CacheKey.MEMBER}_${memberId}`),
        async () => {
            if (memberIds) {
                const result = await Promise.all(
                    memberIds?.map((memberId) => UsersService.getUser(memberId).catch((e) => e))
                );
                return result.flat();
            }
            return Promise.reject();
        }
    );

    return {
        communityMembers: data,
        communityMembersError: error,
        communityMembersLoading: isLoading,
    };
};

export default useCommunityMembers;
