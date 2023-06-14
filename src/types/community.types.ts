interface Community {
    name: string;
    members: CommunityMember[];
    adminId: string;
}

export interface CommunityReq {
    name: string;
    powerPlants: { powerPlantId: string }[];
}

interface CommunityMember {
    userId: string;
    powerPlantId: string;
}

export interface CommunityRes {
    name: string;
    members: CommunityMember[];
    adminId: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
