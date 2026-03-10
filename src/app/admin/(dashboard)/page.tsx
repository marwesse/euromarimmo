import { Suspense } from "react";
import { getProperties } from "@/app/actions/property-actions";
import { getLeads } from "@/app/actions/lead-actions";
import AdminCharts from "@/components/admin/AdminCharts";
import { BarChart3, Building2, TrendingUp, Users, Eye, Clock, Mail } from "lucide-react";

async function DashboardStats() {
    // In parallel, fetch actual counts
    const [propertiesData, leadsData] = await Promise.all([
        getProperties(),
        getLeads()
    ]);

    const properties = propertiesData || [];
    const leads = leadsData || [];

    // KPI 1: Total Propriétés
    const totalProperties = properties.length;

    // KPI 2: Valeur du Portfolio (Ventes)
    const propertiesForSale = properties.filter((p: any) => p.transactiontype === 'Vente' || p.type === 'Vente');
    const portfolioValue = propertiesForSale.reduce((acc: number, p: any) => {
        const priceStr = String(p.price || "0");
        const price = p.priceNumeric || parseInt(priceStr.replace(/\D/g, '') || "0", 10);
        return acc + (isNaN(price) ? 0 : price);
    }, 0);
    const formattedPortfolioValue = new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(portfolioValue);

    // KPI 3: Vues Estimées (Mock calcul basé sur le volume)
    const estimatedViews = totalProperties * 342 + leads.length * 15;

    // KPI 4: Total Leads VIP
    const totalLeads = leads.length;

    // --- CHART DATA PREPARATION ---
    const propertiesForRent = properties.filter((p: any) => p.transactiontype === 'Location' || p.type === 'Location');

    const propertySplit = [
        { name: 'Vente', value: propertiesForSale.length, color: '#d4af37' },
        { name: 'Location', value: propertiesForRent.length, color: '#1a202c' }
    ].filter(item => item.value > 0);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            dateStr: d.toISOString().split('T')[0],
            displayFormatter: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })
        };
    });

    const leadsByDate = last7Days.map(day => {
        const count = leads.filter((l: any) => l.created_at && l.created_at.startsWith(day.dateStr)).length;
        return { date: day.displayFormatter, count };
    });

    // --- RECENT ACTIVITY DATA ---
    const recentLeads = leads.slice(0, 5).map((l: any) => ({
        id: `lead-${l.id}`,
        type: 'lead',
        title: `Nouveau Contact: ${l.name}`,
        subtitle: l.source || 'Formulaire web',
        date: new Date(l.created_at).getTime(),
        icon: Mail
    }));

    const recentProps = properties.slice(0, 5).map((p: any) => ({
        id: `prop-${p.id}`,
        type: 'property',
        title: `Propriété Ajoutée: ${p.title || 'Sans titre'}`,
        subtitle: p.transactiontype || 'Catalogue',
        date: new Date(p.created_at).getTime(),
        icon: Building2
    }));

    const recentActivity = [...recentLeads, ...recentProps]
        .sort((a, b) => b.date - a.date)
        .slice(0, 6);

    const timeAgo = (timestamp: number) => {
        const diffHours = Math.floor((new Date().getTime() - timestamp) / (1000 * 60 * 60));
        if (diffHours < 1) return "À l'instant";
        if (diffHours < 24) return `Il y a ${diffHours}h`;
        return `Il y a ${Math.floor(diffHours / 24)}j`;
    };

    return (
        <div className="space-y-8">
            {/* KPI CARDS (Responsive Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white dark:bg-[#1a202c] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 dark:bg-accent/10 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">Total Propriétés</h3>
                        <div className="p-2 bg-primary/5 dark:bg-accent/10 rounded-xl">
                            <Building2 className="w-5 h-5 text-primary dark:text-accent" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalProperties}</p>
                    <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +3 ajoutées ce mois
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1a202c] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 dark:bg-accent/10 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">Valeur du Portfolio</h3>
                        <div className="p-2 bg-primary/5 dark:bg-accent/10 rounded-xl">
                            <BarChart3 className="w-5 h-5 text-primary dark:text-accent" />
                        </div>
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate" title={formattedPortfolioValue}>{formattedPortfolioValue}</p>
                    <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Basé sur les Ventes
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1a202c] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 dark:bg-accent/10 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">Vues Estimées</h3>
                        <div className="p-2 bg-primary/5 dark:bg-accent/10 rounded-xl">
                            <Eye className="w-5 h-5 text-primary dark:text-accent" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat('fr-FR').format(estimatedViews)}</p>
                    <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +24% trafic global
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1a202c] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 dark:bg-accent/10 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">Total Leads VIP</h3>
                        <div className="p-2 bg-primary/5 dark:bg-accent/10 rounded-xl">
                            <Users className="w-5 h-5 text-primary dark:text-accent" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalLeads}</p>
                    <p className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-1">
                        Contacts WhatsApp/Forms
                    </p>
                </div>

            </div>

            {/* INTERACTIVE CHARTS */}
            <AdminCharts leadsByDate={leadsByDate} propertySplit={propertySplit} />

            {/* RECENT ACTIVITY */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Activité Récente</h3>

                {/* Mobile horizontal scroll / Desktop flex wrap */}
                <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4 snap-x">
                    {recentActivity.map((activity) => (
                        <div
                            key={activity.id}
                            className="bg-white dark:bg-[#1a202c]/50 min-w-[300px] flex-shrink-0 snap-start p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors"
                        >
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full shrink-0">
                                <activity.icon className={`w-5 h-5 ${activity.type === 'lead' ? 'text-blue-500' : 'text-primary'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{activity.title}</p>
                                <p className="text-xs text-gray-500 truncate">{activity.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0 mt-1 whitespace-nowrap">
                                <Clock className="w-3 h-3" />
                                {timeAgo(activity.date)}
                            </div>
                        </div>
                    ))}
                    {recentActivity.length === 0 && (
                        <div className="col-span-full p-8 text-center text-gray-500 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                            Aucune activité récente.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

function StatsSkeleton() {
    return (
        <div className="w-full space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm h-32">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
            <div className="h-80 w-full bg-white dark:bg-[#1a202c]/50 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm"></div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tableau de Bord</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Aperçu en temps réel de votre activité immobilière.</p>
            <Suspense fallback={<StatsSkeleton />}>
                <DashboardStats />
            </Suspense>
        </div>
    );
}
