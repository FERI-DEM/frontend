import DefaultLayout from '@/layouts/DefaultLayout';
import InviteFriend from '@/components/Form/InviteFriend';

const members = [
  { name: 'John Smith', age: 30 },
  { name: 'Jane Johnson', age: 25 },
  { name: 'Michael Chen', age: 35 },
  { name: 'Sarah Thompson', age: 27 },
  { name: 'David Kim', age: 31 },
  { name: 'Emily Davis', age: 28 },
  { name: 'James Lee', age: 32 },
  { name: 'Jessica Garcia', age: 29 },
  { name: 'Robert Wilson', age: 33 },
  { name: 'Olivia Martinez', age: 26 },
];

export default function Members() {
  return (
    <DefaultLayout>
      <div className="pt-10 text-center justify-center block bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <h1 className="pl-10 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Člani
          </span>{' '}
        </h1>
        <InviteFriend/>
        <table className="ml-15">
          <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
          </thead>
          <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.age}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}