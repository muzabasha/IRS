import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, ArrowRight, Clock, Target, Sparkles, Activity, Star } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"

export default function Home() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-6 sm:p-8 md:p-12 shadow-sm">
                <div className="relative z-10 flex flex-col items-start gap-4 max-w-2xl">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Welcome back
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Ready to master Information Retrieval?
                    </h1>
                    <p className="text-lg text-muted-foreground/90 leading-relaxed">
                        You're currently making great progress in <span className="font-semibold text-foreground">Unit 1</span>.
                        Let's keep the momentum going!
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                        <Button size="lg" className="rounded-full shadow-lg shadow-primary/20" asChild>
                            <Link href="/unit/unit-1/topic/u1-t3">
                                Resume Topic 3 <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full bg-background/50 backdrop-blur-sm" asChild>
                            <Link href="/unit/unit-1/assessment">
                                Take Unit Quiz
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Decorative background visual */}
                <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px] opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-[80px] opacity-40 pointer-events-none" />
            </div>

            {/* Course Overview Video */}
            <Card className="border-none shadow-md bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-xl">Course Overview</CardTitle>
                    <CardDescription>Get started with Information Retrieval fundamentals</CardDescription>
                </CardHeader>
                <CardContent>
                    <VideoPlayer
                        src="/Information_Retrieval.mp4"
                        title="Information Retrieval Fundamentals"
                        description="A comprehensive introduction to the core concepts and principles of Information Retrieval systems."
                    />
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Course Progress", icon: BookOpen, value: "12%", sub: "3/24 Topics", color: "text-blue-500" },
                    { title: "Current Unit", icon: Trophy, value: "Unit 1", sub: "Intro to IR", color: "text-amber-500" },
                    { title: "Avg. Score", icon: Target, value: "85%", sub: "Unit 1 Quiz", color: "text-green-500" },
                    { title: "Streak", icon: Activity, value: "3 Days", sub: "Personal Best", color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden relative">
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                            <stat.icon className="h-16 w-16 -mr-4 -mt-4 transform rotate-12" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {i === 0 && <Progress value={12} className="mt-2 h-1.5" />}
                            <p className="text-xs text-muted-foreground mt-2">{stat.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Continue Learning Path */}
                <Card className="col-span-4 border-none shadow-md bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Learning Path</CardTitle>
                                <CardDescription>Your roadmap to completion</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Star className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Active Item */}
                        <div className="relative pl-6 border-l-2 border-primary">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                            <div className="bg-secondary/30 p-4 rounded-xl border border-secondary transition-colors hover:bg-secondary/50">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="text-xs font-semibold text-primary mb-1">IN PROGRESS</div>
                                        <h3 className="font-semibold text-lg">Classic IR Models</h3>
                                        <p className="text-sm text-muted-foreground">Unit 1 • Topic 3 • Slide 5/20</p>
                                    </div>
                                    <Button size="sm" className="rounded-full px-6" asChild>
                                        <Link href="/unit/unit-1/topic/u1-t3">Continue</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Items */}
                        <div className="relative pl-6 border-l-2 border-border/50 space-y-6 opacity-60">
                            {[
                                { title: "Set-Theoretic Models", time: "20 mins", num: "04" },
                                { title: "Algebraic Models", time: "25 mins", num: "05" }
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center justify-between relative">
                                    <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-border group-hover:bg-primary/50 transition-colors" />
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                                            {item.num}
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">{item.title}</div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {item.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Unit Mastery Side Panel */}
                <Card className="col-span-3 border-none shadow-md bg-card/80 backdrop-blur-sm flex flex-col h-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Unit Mastery</CardTitle>
                        <CardDescription>
                            Track your proficiency across modules
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-8">
                            {[
                                { name: "Unit 1: Introduction", val: 35, color: "bg-blue-500" },
                                { name: "Unit 2: Query Languages", val: 0, color: "bg-indigo-500" },
                                { name: "Unit 3: User Interfaces", val: 0, color: "bg-purple-500" },
                                { name: "Unit 4: Multimedia IR", val: 0, color: "bg-pink-500" }
                            ].map((unit, i) => (
                                <div key={i}>
                                    <div className="flex items-end justify-between mb-2">
                                        <span className="text-sm font-medium">{unit.name}</span>
                                        <span className="text-xs font-bold text-muted-foreground">{unit.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${unit.color} transition-all duration-1000 ease-out`}
                                            style={{ width: `${unit.val}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                        <div className="rounded-xl bg-linear-to-r from-violet-600/10 to-indigo-600/10 p-4 border border-violet-500/20">
                            <p className="text-xs text-muted-foreground mb-2">Need help?</p>
                            <h4 className="text-sm font-semibold mb-2 text-violet-700 dark:text-violet-300">Access the AI Tutor</h4>
                            <p className="text-xs text-muted-foreground mb-3">Get instant answers to your IR questions.</p>
                            <Button variant="secondary" size="sm" className="w-full text-xs h-8">Launch Assistant</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
