import { CommunityRes } from '@/types/community.types';
import { User } from '@/types/user.types';
import CommunityListCard from './CommunityListCard';

interface Props {
    community: CommunityRes;
    communityAdmin: User | undefined;
    communityMembers: User[] | undefined;
}

export default function CommunityList({ community, communityAdmin, communityMembers }: Props) {
    return (
        <>
            <div>
                <h1 className="text-lg font-extrabold dark:text-white mb-2 ml-1">
                    <mark className="px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                        {community?.name}
                    </mark>
                    <small className="ml-2 text-xs font-thin text-gray-500 dark:text-gray-400">
                        (Administrator: {communityAdmin?.email})
                    </small>
                </h1>

                {community?.members?.map((member, index) => {
                    const memberDetail = communityMembers?.find((x) => x._id === member.userId);
                    const memberPowerPlantDetail = memberDetail?.powerPlants?.find(
                        (x) => x._id === member.powerPlantId
                    );
                    return (
                        <CommunityListCard
                            key={community?._id + index}
                            memberDetail={memberDetail}
                            memberPowerPlantDetail={memberPowerPlantDetail}
                        />
                    );
                })}
            </div>
        </>
    );
}
