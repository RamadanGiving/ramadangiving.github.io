"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const yearlyData = [
    { year: "2021", foodPacks: 554, meals: 130 },
    { year: "2022", foodPacks: 360, meals: 670 },
    { year: "2023", foodPacks: 530, meals: 759 },
    { year: "2024", foodPacks: 660, meals: 890 },
];

const programData = [
    { name: "Hot Meals & Lunch Bags", value: 2449, fill: "#0a4b59" },
    { name: "Food Packs", value: 2104, fill: "#c0a34e" },
    { name: "Children Supported", value: 335, fill: "#0a4b59" },
    { name: "Community Events", value: 18, fill: "#c0a34e" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="font-semibold text-foreground text-sm">{label || payload[0].name}</p>
                {payload.map((p: any, i: number) => (
                    <p key={i} className="text-muted-foreground text-sm">
                        {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function ImpactCharts() {
    return (
        <section className="py-16 md:py-20 bg-card px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-foreground mb-3">
                        Our Impact
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Real numbers, real change. Growing year after year.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Year-over-year growth */}
                    <Card className="border-border/50 overflow-hidden">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-foreground mb-1 text-lg">
                                Growing Impact Year After Year
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4">Food packs & hot meals served since 2021</p>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis dataKey="year" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                                        <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="foodPacks" name="Food Packs" fill="#0a4b59" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="meals" name="Meals & Lunch Bags" fill="#c0a34e" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#0a4b59] inline-block" /> Food Packs</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#c0a34e] inline-block" /> Meals & Lunch Bags</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cumulative program impact */}
                    <Card className="border-border/50 overflow-hidden">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-foreground mb-1 text-lg">
                                Cumulative Program Impact
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4">Total reach across all programs</p>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={programData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis type="number" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                                        <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} className="fill-muted-foreground" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="value" name="Count" radius={[0, 4, 4, 0]}>
                                            {programData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { value: "$517,000+", label: "Total Raised" },
                        { value: "2,449+", label: "Meals & Lunch Bags" },
                        { value: "100%", label: "Volunteer Led" },
                        { value: "Registered", label: "Non-Profit (NPO)" },
                    ].map((stat) => (
                        <Card key={stat.label} className="border-border/50">
                            <CardContent className="p-4 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
