'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Lightbulb, TrendingUp, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'

export default function Unit3LabPage() {
    const labModels = [
        {
            id: 'hci-principles',
            title: 'HCI Principles for IR',
            level: 'Beginner',
            duration: '45 mins',
            color: 'bg-blue-500',
            description: 'User-centered design and Fitts\'s Law',
            motivation: 'Making search intuitive',
            limitation: 'Design principles alone insufficient',
            nextModel: 'Information Access Process'
        },
        {
            id: 'search-process',
            title: 'Information Access Process',
            level: 'Intermediate',
            duration: '50 mins',
            color: 'bg-green-500',
            description: 'Berry-Picking model and iterative search',
            motivation: 'Understanding user behavior',
            limitation: 'Need better query formulation',
            nextModel: 'Query Specification'
        },
        {
            id: 'query-specification',
            title: 'Query Specification UI',
            level: 'Intermediate',
            duration: '60 mins',
            color: 'bg-purple-500',
            description: 'Autocomplete, spell-check, and input methods',
            motivation: 'Helping users express intent',
            limitation: 'Need to evaluate results',
            nextModel: 'Result Visualization'
        },
        {
            id: 'result-visualization',
            title: 'Result Visualization',
            level: 'Advanced',
            duration: '75 mins',
            color: 'bg-orange-500',
            description: 'Snippets, clustering, and faceted search',
            motivation: 'Presenting results effectively',
            limitation: 'Static presentation',
            nextModel: 'Complete'
        }
    ]

    return (
        <div className="space-y-8">
            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Labs
                    </Link>
                </Button>
                <Badge variant="outline">Unit 3</Badge>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Unit 3: User Interfaces & Visualization</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Design effective search interfaces that users love
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        NEP 2020 Aligned
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        User-Centered Design
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Interactive Demos
                    </Badge>
                </div>
            </div>

            {/* Unit 3 Quiz Banner */}
            <Card className="border-2 border-purple-500 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                🎓 Unit 3 Assessment Quiz
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Test your understanding of user interfaces and visualization with 10 comprehensive questions. Includes detailed explanations and study resources.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">10 Questions</Badge>
                                <Badge variant="outline">Instant Feedback</Badge>
                                <Badge variant="outline">Study Guide Included</Badge>
                            </div>
                        </div>
                        <Button asChild size="lg">
                            <Link href="/lab/unit-3-quiz">
                                Take Quiz <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Learning Path */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                    <CardTitle>Your Learning Journey</CardTitle>
                    <CardDescription>
                        From HCI principles to effective result presentation
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {labModels.map((model, index) => (
                            <div key={model.id} className="relative">
                                {/* Connector Line */}
                                {index < labModels.length - 1 && (
                                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
                                )}

                                <Card className="hover:shadow-md transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Step Number */}
                                            <div className={`flex-shrink-0 h-12 w-12 rounded-full ${model.color} text-white flex items-center justify-center font-bold text-lg`}>
                                                {index + 1}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold">{model.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{model.description}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Badge variant="secondary">{model.level}</Badge>
                                                        <Badge variant="outline">{model.duration}</Badge>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-primary">💡 Motivation</p>
                                                        <p className="text-muted-foreground">{model.motivation}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-amber-600">⚠️ Limitation</p>
                                                        <p className="text-muted-foreground">{model.limitation}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-green-600">→ Next Step</p>
                                                        <p className="text-muted-foreground">{model.nextModel}</p>
                                                    </div>
                                                </div>

                                                <Button asChild className="mt-2">
                                                    <Link href={`/lab/unit-3/${model.id}`}>
                                                        Start Lab <BookOpen className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Complete Comparison */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-orange/5 to-background">
                <CardHeader>
                    <CardTitle>Complete UI Technique Comparison</CardTitle>
                    <CardDescription>
                        See all user interface techniques side-by-side
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-gradient-to-r from-primary/10 to-purple/10 p-6 rounded-lg border-2 border-primary/20">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Unit 3 Complete Comparison Journey
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Compare HCI principles, query specification, and result visualization techniques.
                            See Fitts&apos;s Law, autocomplete, spell checking, KWIC snippets, and faceted search in action.
                        </p>
                        <Button asChild size="lg" className="w-full">
                            <Link href="/lab/unit-3-comparison">
                                View Complete Comparison <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Lab Structure Info */}
            <Card className="border-none shadow-md">
                <CardHeader>
                    <CardTitle>What You'll Learn in Each Lab</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { icon: '🎯', title: 'Motivation', desc: 'Why good UI matters for search success' },
                            { icon: '📐', title: 'Design Principles', desc: 'HCI laws and usability guidelines' },
                            { icon: '🔍', title: 'User Behavior', desc: 'How people actually search' },
                            { icon: '📊', title: 'Visualization', desc: 'Presenting results effectively' },
                            { icon: '💻', title: 'Interactive Demos', desc: 'Build UI components' },
                            { icon: '⚠️', title: 'Common Pitfalls', desc: 'What not to do in search UI' },
                            { icon: '✅', title: 'Best Practices', desc: 'Industry-proven patterns' },
                            { icon: '🎓', title: 'Assessment', desc: 'UI design challenges' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 p-4 rounded-lg bg-secondary/30">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
