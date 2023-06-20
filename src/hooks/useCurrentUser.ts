import UsersService from '@/api/users.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { Me } from '@/types/user.types';
import useSWR from 'swr';

const useCurrentUser = () => {
    const { data, error, isLoading } = useSWR<Me, ApiResponseError>(`${CacheKey.CURRENT_USER}`, () =>
        UsersService.getCurrentUser()
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        currentUser: data,
        currentUserError: error,
        currentUserLoading: isLoading,
    };
};

export default useCurrentUser;
