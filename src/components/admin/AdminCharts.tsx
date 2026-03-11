"use client";

import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface AdminChartsProps {
    revenueByMonth: { name: string, revenue: number }[];
    propertyTypeSplit: { name: string, value: number, color: string }[];
}

const CustomTooltipArea = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-2xl">
                <p className="text-sm text-zinc-400 mb-1">{label}</p>
                <p className="font-bold text-[#D4AF37] text-lg">
                    {new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

const CustomTooltipPie = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl shadow-2xl">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
                    <p className="text-sm text-zinc-300 font-medium">{payload[0].name}</p>
                </div>
                <p className="font-bold text-white mt-1 pl-5">
                    {payload[0].value} {payload[0].value > 1 ? 'Biens' : 'Bien'}
                </p>
            </div>
        );
    }
    return null;
};

export default function AdminCharts({ revenueByMonth, propertyTypeSplit }: AdminChartsProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-80 w-full animate-pulse bg-zinc-900 rounded-2xl border border-zinc-800"></div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* Area Chart: Evolution du Chiffre d'Affaires */}
            <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden">
                {/* Subtle Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-wide">Évolution du Chiffre d'Affaires</h3>
                    <p className="text-sm text-zinc-500 mt-1">Projection et revenus confirmés sur les 6 derniers mois</p>
                </div>

                <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={revenueByMonth}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717a', fontSize: 12 }}
                                tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                                dx={-10}
                            />
                            <Tooltip content={<CustomTooltipArea />} cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#D4AF37"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorGold)"
                                activeDot={{ r: 6, fill: '#D4AF37', stroke: '#18181b', strokeWidth: 3 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie/Donut Chart: Répartition par Type */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-wide">Typologie des Biens</h3>
                    <p className="text-sm text-zinc-500 mt-1">Répartition actuelle du catalogue</p>
                </div>

                <div className="flex-1 min-h-[250px] w-full relative flex items-center justify-center z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={propertyTypeSplit}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={4}
                            >
                                {propertyTypeSplit.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltipPie />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value, entry: any) => <span className="text-zinc-400 text-sm">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Centered Total inside Donut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                        <span className="text-3xl font-bold text-white">
                            {propertyTypeSplit.reduce((a, b) => a + b.value, 0)}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Biens</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
