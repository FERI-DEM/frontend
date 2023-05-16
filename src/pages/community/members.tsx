import DefaultLayout from '@/layouts/DefaultLayout';
import InviteFriend from '@/components/Form/InviteFriend';
import { useEffect, useState } from "react";
import { getCommunities, getCommunity } from "@/api/community.service";
import { CommunityRes } from "@/types/community.types";

export default function Members() {
  const [community, setCommunity] = useState<CommunityRes | null>(null);
  const [communities, setCommunities] = useState<CommunityRes[] | null>(null);
  const fetchCommunities = async () => {
    try {
      const data = await getCommunities();
      //const data = await getCommunity(id);
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching community:', error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (communities) {
      communities.map((community, index) => {
        console.log(`Community ${index}:`, community);
      });
    }
  }, [communities]);
  return (
    <DefaultLayout>
      <div className="pt-10 block bg-white border-r border-gray-200 ml-10 dark:bg-gray-900 dark:border-gray-700 h-screen">
        <InviteFriend/>
        <table className="w-1/2 text-left bg-white border border-gray-200 rounded shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <thead>
          <tr className="border border-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">Age</th>
          </tr>
          </thead>
          <tbody>
          {communities && communities.map((community, index) => (
            <tr className="border border-gray-200" key={index} >
              <td className="p-3">{community.membersIds}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}