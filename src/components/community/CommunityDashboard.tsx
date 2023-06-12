import CommunityChart from './CommunityChart';

export default function CommunityDashboard() {
    return (
        <div className="pt-10 text-center justify-center block bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
            <div className="flex pl-10"></div>
            <div className="pl-10 chart">
                <CommunityChart />
            </div>
        </div>
    );
}
