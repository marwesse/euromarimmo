export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats cards placeholder */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm mb-1">Propriétés Actives</h3>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm mb-1">Total Leads VIP</h3>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-gray-500 font-medium text-sm mb-1">Ventes (Mois)</h3>
                    <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
            </div>
        </div>
    );
}
