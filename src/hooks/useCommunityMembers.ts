import useSWR from "swr";
import { ApiError } from "@/types/common.types";
import { CacheKey } from "@/types/caching.types";
import UsersService from "@/api/users.service";
import { User } from "@/types/user.types";

const useGetCommunityMembers = (memberIds?: string[]) => {
  const { data, error, isLoading } = useSWR <User[], ApiError>(
    () => memberIds?.map((memberId) => `${CacheKey.COMMUNITY}_${memberId}`),
    async () => {
      if (memberIds) {
        const result = await Promise.all(
          memberIds?.map((memberId) => UsersService.getUser(memberId))
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

export default useGetCommunityMembers;
