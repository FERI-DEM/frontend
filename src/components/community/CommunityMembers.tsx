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
            {communities?.map((community, index) => {
                const communityAdmin = communityMembers?.find((x) => x._id === community.adminId);
                return (
                    <div key={`CommunityMembers${community._id}${index}`}>
                        <CommunityList
                            community={community}
                            communityAdmin={communityAdmin}
                            communityMembers={communityMembers}
                            showActions={true}
                        />

                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </div>
                );
            })}
        </>
    );
}
