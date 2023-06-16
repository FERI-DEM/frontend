import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseDatabase } from '../config/firebase';
import { JoinCommunityNotification } from '@/types/community.types';
import useCurrentUser from './useCurrentUser';

const useNotifications = () => {
    const [notifications, setNotifications] = useState<JoinCommunityNotification[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();

    const getNotifications = async () => {
        setLoading(true);
        if (currentUser) {
            try {
                const querySnapshot = await getDocs(
                    query(collection(firebaseDatabase, 'notifications'), where('receiverId', '==', currentUser?.userId))
                );
                const notifications: JoinCommunityNotification[] = [];
                querySnapshot.forEach((doc) => {
                    notifications.push(doc.data() as JoinCommunityNotification);
                });
                setNotifications(notifications.length === 0 ? undefined : notifications);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        return () => null;
    };

    const subscribeToNotifications = () => {
        if (currentUser) {
            const q = query(
                collection(firebaseDatabase, 'notifications'),
                where('receiverId', '==', currentUser?.userId)
            );
            return onSnapshot(q, (querySnapshot) => {
                const notifications: JoinCommunityNotification[] = [];
                querySnapshot.forEach((doc) => {
                    notifications.push(doc.data() as JoinCommunityNotification);
                });
                setNotifications(notifications.length === 0 ? undefined : notifications);
            });
        }
        return () => null;
    };

    useEffect(() => {
        getNotifications();
        const unsubscribe = subscribeToNotifications();
        return () => unsubscribe();
    }, [currentUser]);

    return { notifications, notificationsLoading: loading };
};
export default useNotifications;
