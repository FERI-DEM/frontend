interface Community {
  name: string;
  membersIds: string[];
  members: object[];
  adminId: string;
}

export interface CommunityReq {
  name: string;
  powerPlants: { powerPlantId: string }[];
}

interface CommunityMember {
  userId: string;
  powerPlantName: string;
  powerPlantId: string;
  userName: string;
}

export interface CommunityRes {
  name: string;
  membersIds: string[];
  members: CommunityMember[];
  adminId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  community: Community;
}

export interface UserRes {
  name: string;
  membersIds: string[];
  members: CommunityMember[];
  adminId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  community: Community;
}
