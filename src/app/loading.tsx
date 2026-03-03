export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0f12]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
