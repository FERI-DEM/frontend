import DefaultLayout from '@/layouts/DefaultLayout';
import InviteFriend from '@/components/Form/InviteFriend';
import useGetCommunityMembers from "@/hooks/useCommunityMembers";
import useCommunities from "@/hooks/useCommunities";

export default function Members() {
  const {communities, communitiesError, communitiesLoading } = useCommunities();

  const {communityMembers, communityMembersError, communityMembersLoading } = useGetCommunityMembers(
  ...(communities??[])?.map((x) => x.membersIds)
  );

  return (
    <DefaultLayout>
      <div className="pt-10 block bg-white border-r border-gray-200 ml-10 dark:bg-gray-900 dark:border-gray-700 h-screen">
        <InviteFriend/>
        <table className="w-1/2 text-left bg-white border border-gray-200 rounded shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <thead>
          <tr className="border border-gray-200">
            <th className="p-3">Email</th>
          </tr>
          </thead>
          <tbody>
          {communityMembers && communityMembers.map((member, index) => (
            <tr className="border border-gray-200" key={index} >
              <td className="p-3">{member.email}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}