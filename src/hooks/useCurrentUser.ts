import UsersService from '@/api/users.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { Me } from '@/types/user.types';
import useSWR from 'swr';

const useCurrentUser = () => {
    const { data, error, isLoading } = useSWR<Me, ApiError>(`${CacheKey.CURRENT_USER}`, () =>
        UsersService.getCurrentUser()
    );

    return {
        currentUser: data,
        currentUserError: error,
        currentUserLoading: isLoading,
    };
};

export default useCurrentUser;
