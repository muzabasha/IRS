import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    LineChart,
    BarChart3,
    Clock,
    Target,
    Zap,
    Trophy,
    TrendingUp,
    ChevronUp
} from "lucide-react"

export default function AnalyticsPage() {
    const stats = [
        { title: "Average Score", value: "85.4%", change: "+2.1%", icon: Target, color: "text-emerald-500" },
        { title: "Time Spent", value: "14.5h", change: "+4h", icon: Clock, color: "text-blue-500" },
        { title: "Course Rank", value: "#14", change: "-2", icon: Zap, color: "text-amber-500" },
        { title: "Unit Badges", value: "3/12", change: "+1", icon: Trophy, color: "text-indigo-500" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
                <p className="text-muted-foreground">Detailed insights into your learning trajectory and IR proficiency.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-primary/5 bg-card/50 backdrop-blur-sm shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                                <span className={`flex items-center font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    <ChevronUp className={`h-3 w-3 ${stat.change.startsWith('-') && 'rotate-180'}`} />
                                    {stat.change}
                                </span>
                                vs last week
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Simulated Chart 1: Unit Performance */}
                <Card className="shadow-md border-none bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Unit Performance
                        </CardTitle>
                        <CardDescription>Average quiz scores by unit module</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[240px] flex items-end gap-4 px-8 pb-12">
                        {[
                            { label: "U1", val: 85 },
                            { label: "U2", val: 78 },
                            { label: "U3", val: 92 },
                            { label: "U4", val: 65 },
                            { label: "U5", val: 0 },
                        ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-primary/20 rounded-t-lg transition-all duration-1000 group-hover:bg-primary/40 relative"
                                    style={{ height: `${bar.val}%` }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                        {bar.val}%
                                    </div>
                                </div>
                                <span className="text-xs font-mono font-medium text-muted-foreground">{bar.label}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Performance Curve Visualization */}
                <Card className="shadow-md border-none bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Proficiency Growth
                        </CardTitle>
                        <CardDescription>Learning curve across the semester</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[240px] flex items-center justify-center p-0 overflow-hidden relative">
                        {/* SVG Simulation for a Line Chart */}
                        <svg className="w-full h-full p-4" preserveAspectRatio="none">
                            <path
                                d="M 0 180 Q 50 160 100 120 T 200 100 T 300 60 T 400 40"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                className="animate-in fade-in transition-all duration-1000"
                            />
                            <circle cx="0" cy="180" r="4" fill="hsl(var(--primary))" />
                            <circle cx="100" cy="120" r="4" fill="hsl(var(--primary))" />
                            <circle cx="200" cy="100" r="4" fill="hsl(var(--primary))" />
                            <circle cx="400" cy="40" r="4" fill="hsl(var(--primary))" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                    </CardContent>
                </Card>
            </div>

            {/* Precision/Recall Sandbox Analytics Placeholder */}
            <Card className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg">IR Performance Benchmarks</CardTitle>
                    <CardDescription>Your engine's metrics against standard TREC collections</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Mean Average Precision (MAP)</span>
                            <span className="font-mono text-primary font-bold">0.742</span>
                        </div>
                        <Progress value={74.2} className="h-1" />
                        <div className="flex items-center justify-between text-sm mt-4">
                            <span className="font-medium">F1-Score (Search Quality)</span>
                            <span className="font-mono text-primary font-bold">0.815</span>
                        </div>
                        <Progress value={81.5} className="h-1" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
