'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Lightbulb, TrendingUp, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'

export default function Unit4LabPage() {
    const labModels = [
        {
            id: 'multimedia-ir',
            title: 'Multimedia IR',
            level: 'Intermediate',
            duration: '60 mins',
            color: 'bg-blue-500',
            description: 'Image retrieval with color histograms and CBIR',
            motivation: 'Searching beyond text',
            limitation: 'Semantic gap challenge',
            nextModel: 'Web Crawling'
        },
        {
            id: 'web-crawling',
            title: 'Web Crawling & Indexing',
            level: 'Intermediate',
            duration: '50 mins',
            color: 'bg-green-500',
            description: 'Building a web crawler and handling scale',
            motivation: 'Discovering web content',
            limitation: 'No ranking mechanism',
            nextModel: 'PageRank'
        },
        {
            id: 'pagerank',
            title: 'PageRank Algorithm',
            level: 'Advanced',
            duration: '75 mins',
            color: 'bg-purple-500',
            description: 'Link analysis and authority scoring',
            motivation: 'Ranking web pages by importance',
            limitation: 'Vulnerable to manipulation',
            nextModel: 'Meta-search'
        },
        {
            id: 'meta-search',
            title: 'Meta-search Engines',
            level: 'Advanced',
            duration: '60 mins',
            color: 'bg-orange-500',
            description: 'Aggregating results from multiple engines',
            motivation: 'Combining diverse sources',
            limitation: 'Result merging complexity',
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
                <Badge variant="outline">Unit 4</Badge>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Unit 4: Multimedia IR & Web Search</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Search images, crawl the web, and rank pages with PageRank
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        NEP 2020 Aligned
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Advanced Topics
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Real-world Applications
                    </Badge>
                </div>
            </div>

            {/* Unit 4 Quiz Banner */}
            <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                🎓 Unit 4 Assessment Quiz
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Test your understanding of multimedia IR and web search with 10 comprehensive questions. Includes detailed explanations and study resources.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">10 Questions</Badge>
                                <Badge variant="outline">Instant Feedback</Badge>
                                <Badge variant="outline">Study Guide Included</Badge>
                            </div>
                        </div>
                        <Button asChild size="lg">
                            <Link href="/lab/unit-4-quiz">
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
                        From multimedia retrieval to web-scale search engines
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
                                                    <Link href={`/lab/unit-4/${model.id}`}>
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
                            { icon: '🎯', title: 'Motivation', desc: 'Why multimedia and web search matter' },
                            { icon: '📐', title: 'Algorithms', desc: 'PageRank, CBIR, crawling strategies' },
                            { icon: '🔍', title: 'Feature Extraction', desc: 'Color histograms, edge detection' },
                            { icon: '📊', title: 'Visualization', desc: 'Link graphs, similarity matrices' },
                            { icon: '💻', title: 'Implementation', desc: 'Build crawlers and rankers' },
                            { icon: '⚠️', title: 'Challenges', desc: 'Semantic gap, spam, scale' },
                            { icon: '✅', title: 'Solutions', desc: 'Deep learning, distributed systems' },
                            { icon: '🎓', title: 'Assessment', desc: 'Real-world scenarios' },
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
