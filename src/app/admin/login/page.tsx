"use client";

import { useState, useTransition } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { signIn } from "@/app/actions/auth-actions";

export default function AdminLogin() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await signIn(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[#111827] p-8 text-center">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                        <Lock className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <h2 className="text-2xl font-serif text-white tracking-wider uppercase">
                        EUROMAR <span className="text-[#d4af37]">IMMO</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">Accès restreint au panneau de gestion</p>
                </div>

                <div className="p-8">
                    <form action={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all outline-none"
                                placeholder="admin@euromarimmo.ma"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#111827] text-white py-3 rounded-lg font-medium hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
