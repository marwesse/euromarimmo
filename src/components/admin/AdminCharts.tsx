"use client";

import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface AdminChartsProps {
    leadsByDate: { date: string, count: number }[];
    propertySplit: { name: string, value: number, color: string }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-[#1a202c] border border-gray-100 dark:border-white/10 p-3 rounded-lg shadow-lg">
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="font-bold text-gray-900 dark:text-white">
                    {payload[0].value} {payload[0].name === "count" ? "Contacts" : ""}
                </p>
            </div>
        );
    }
    return null;
};

export default function AdminCharts({ leadsByDate, propertySplit }: AdminChartsProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Prevent hydration mismatch for Recharts
    if (!isClient) {
        return <div className="h-80 w-full animate-pulse bg-gray-50 dark:bg-white/5 rounded-2xl"></div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* Area Chart: Evolution des Contacts */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1a202c]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Évolution des Contacts</h3>
                    <p className="text-sm text-gray-500">Acquisition de leads sur les 7 derniers jours</p>
                </div>

                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={leadsByDate}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#d4af37"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCount)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie/Donut Chart: Répartition du Portfolio */}
            <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Répartition Portfolio</h3>
                    <p className="text-sm text-gray-500">Vente vs Location</p>
                </div>

                <div className="flex-1 min-h-[250px] w-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={propertySplit}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {propertySplit.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(26, 32, 44, 0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Centered Total inside Donut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {propertySplit.reduce((a, b) => a + b.value, 0)}
                        </span>
                        <span className="text-xs text-gray-500">Biens</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
