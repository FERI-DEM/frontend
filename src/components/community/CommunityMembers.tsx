import { Card } from 'flowbite-react';

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

export default function CommunityMembers() {
    return (
        <>
            {members.map((member, index) => (
                <Card className="max-w-sm" href="#" key={index}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>
                            {member.name} {member.age}
                        </p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        <p>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                            chronological order.
                        </p>
                    </p>
                </Card>
            ))}
        </>
    );
}
