import { NotificationType } from './common.types';

interface Community {
    name: string;
    members: CommunityMember[];
    adminId: string;
}

export interface CommunityReq {
    name: string;
    powerPlants: { powerPlantId: string }[];
}

export interface CommunityReqJoin {
    communityId: string;
    powerPlants: string[];
}

export interface CommunityReqUpdate {
    name: string;
}

export interface JoinCommunityRequestProcess {
    notificationId: string;
    accepted: boolean;
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

export interface JoinCommunityNotification {
    id: string;
    receiverId: string;
    senderId: string;
    type: NotificationType;
    data: {
        communityId: string;
        userId: string;
        powerPlants: string[];
        message: string;
    };
    processed: boolean;
    createdAt: string;
}

export interface JoinCommunityRequestProcess {
    notificationId: string;
    accepted: boolean;
}
