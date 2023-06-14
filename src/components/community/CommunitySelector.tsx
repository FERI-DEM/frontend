import { CommunityRes } from '@/types/community.types';
import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';

interface Props {
    communities: CommunityRes[] | undefined;
    selectedCommunityOutput: (output: CommunityRes) => void;
}

export default function CommunitySelector({ communities, selectedCommunityOutput }: Props) {
    const [selectedCommunity, setSelectedCommunity] = useState<CommunityRes | null>();

    useEffect(() => {
        if (communities && communities.length > 0) {
            setSelectedCommunity(communities[0]);
            selectedCommunityOutput(communities[0]);
        }
    }, [communities]);

    return (
        <>
            {communities && communities.length > 0 && (
                <Dropdown
                    label={
                        <span className="inline-flex items-center text-lg font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <mark className="inline-flex items-center px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                                {selectedCommunity?.name}
                                <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
                            </mark>
                        </span>
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    {communities?.map((community, index) => {
                        return (
                            <Dropdown.Item
                                key={`CommunitySelector${community._id}${index}`}
                                onClick={() => {
                                    setSelectedCommunity(community);
                                    selectedCommunityOutput(community);
                                }}
                            >
                                {community.name}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
            )}
        </>
    );
}
