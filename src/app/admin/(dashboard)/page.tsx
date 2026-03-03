export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tableau de Bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats cards placeholder */}
                <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Propriétés Actives</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Total Leads VIP</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
                <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Ventes (Mois)</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
            </div>
        </div>
    );
}
