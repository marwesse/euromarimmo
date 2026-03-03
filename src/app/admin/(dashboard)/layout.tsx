import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-[#0f131a] overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pt-20 md:pt-8 dark:text-gray-100 min-w-0">
                {children}
            </main>
        </div>
    );
}
