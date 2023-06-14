import { CommunityRes } from '@/types/community.types';
import { User } from '@/types/user.types';
import CommunityList from './CommunityList';

interface Props {
    communities: CommunityRes[] | undefined;
    communityMembers: User[] | undefined;
}

export default function CommunityMembers({ communities, communityMembers }: Props) {
    return (
        <>
            {communities?.map((community) => {
                const communityAdmin = communityMembers?.find((x) => x._id === community.adminId);
                return (
                    <CommunityList
                        key={community._id}
                        community={community}
                        communityAdmin={communityAdmin}
                        communityMembers={communityMembers}
                    />
                );
            })}
        </>
    );
}
