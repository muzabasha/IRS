'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Lightbulb, TrendingUp, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'

export default function Unit2LabPage() {
    const labModels = [
        {
            id: 'query-languages',
            title: 'Query Languages',
            level: 'Beginner',
            duration: '45 mins',
            color: 'bg-blue-500',
            description: 'Learn keyword, pattern, and structural queries',
            motivation: 'How to express search intent',
            limitation: 'Static queries lack context',
            nextModel: 'Query Operations'
        },
        {
            id: 'relevance-feedback',
            title: 'Relevance Feedback',
            level: 'Intermediate',
            duration: '60 mins',
            color: 'bg-green-500',
            description: 'Interactive query refinement with Rocchio',
            motivation: 'Learning from user feedback',
            limitation: 'Requires user interaction',
            nextModel: 'Text Operations'
        },
        {
            id: 'text-preprocessing',
            title: 'Text Preprocessing',
            level: 'Intermediate',
            duration: '50 mins',
            color: 'bg-purple-500',
            description: 'Tokenization, stemming, and compression',
            motivation: 'Preparing text for indexing',
            limitation: 'Information loss in stemming',
            nextModel: 'Inverted Index'
        },
        {
            id: 'inverted-index',
            title: 'Inverted Index',
            level: 'Advanced',
            duration: '75 mins',
            color: 'bg-orange-500',
            description: 'Building and searching with inverted files',
            motivation: 'Fast retrieval at scale',
            limitation: 'Storage overhead',
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
                <Badge variant="outline">Unit 2</Badge>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Unit 2: Query Languages & Operations</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Master query formulation, refinement, text processing, and indexing techniques
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        NEP 2020 Aligned
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Progressive Learning
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Hands-on Practice
                    </Badge>
                </div>
            </div>

            {/* Unit 2 Quiz Banner */}
            <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                🎓 Unit 2 Assessment Quiz
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Test your understanding of query operations and indexing with 10 comprehensive questions. Includes detailed explanations and study resources.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">10 Questions</Badge>
                                <Badge variant="outline">Instant Feedback</Badge>
                                <Badge variant="outline">Study Guide Included</Badge>
                            </div>
                        </div>
                        <Button asChild size="lg">
                            <Link href="/lab/unit-2-quiz">
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
                        From expressing queries to building efficient search indices
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
                                                    <Link href={`/lab/unit-2/${model.id}`}>
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

            {/* Lab Structure Info */}
            <Card className="border-none shadow-md">
                <CardHeader>
                    <CardTitle>What You'll Learn in Each Lab</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { icon: '🎯', title: 'Motivation', desc: 'Why this technique exists and what problem it solves' },
                            { icon: '📐', title: 'Algorithm/Formula', desc: 'Mathematical foundation and components' },
                            { icon: '🔍', title: 'Step-by-Step', desc: 'Detailed walkthrough with examples' },
                            { icon: '📊', title: 'Visualization', desc: 'Visual examples with real data' },
                            { icon: '💻', title: 'Interactive Demo', desc: 'Hands-on Python implementation' },
                            { icon: '⚠️', title: 'Limitations', desc: 'Understanding constraints and trade-offs' },
                            { icon: '✅', title: 'Solution', desc: 'How the next technique addresses issues' },
                            { icon: '🎓', title: 'Assessment', desc: 'Quiz and practical exercises' },
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
