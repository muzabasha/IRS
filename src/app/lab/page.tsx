import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function LabPage() {
    const labModels = [
        {
            id: 'boolean-model',
            title: 'Boolean Model',
            level: 'Beginner',
            duration: '45 mins',
            color: 'bg-blue-500',
            description: 'Learn exact matching with set theory',
            motivation: 'Why exact matching matters',
            limitation: 'No ranking capability',
            nextModel: 'Vector Space Model'
        },
        {
            id: 'vector-space-model',
            title: 'Vector Space Model (VSM)',
            level: 'Intermediate',
            duration: '60 mins',
            color: 'bg-green-500',
            description: 'Understand similarity-based ranking',
            motivation: 'Solving Boolean limitations',
            limitation: 'Term independence assumption',
            nextModel: 'Probabilistic Model'
        },
        {
            id: 'probabilistic-model',
            title: 'Probabilistic Model (BM25)',
            level: 'Intermediate',
            duration: '60 mins',
            color: 'bg-purple-500',
            description: 'Learn probability-based relevance',
            motivation: 'Statistical foundations of IR',
            limitation: 'Parameter tuning complexity',
            nextModel: 'Language Model'
        },
        {
            id: 'language-model',
            title: 'Language Model',
            level: 'Advanced',
            duration: '75 mins',
            color: 'bg-orange-500',
            description: 'Query likelihood estimation',
            motivation: 'Generative approach to IR',
            limitation: 'Smoothing challenges',
            nextModel: 'Neural IR'
        },
        {
            id: 'neural-ir',
            title: 'Neural IR (BERT/Dense Retrieval)',
            level: 'Advanced',
            duration: '90 mins',
            color: 'bg-red-500',
            description: 'Deep learning for semantic search',
            motivation: 'Beyond keyword matching',
            limitation: 'Computational cost',
            nextModel: 'Complete'
        }
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">IR Models Lab</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Hands-on learning journey through Information Retrieval models - from basic to advanced
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
                        Learn by Doing
                    </Badge>
                </div>
            </div>

            {/* Learning Path */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                    <CardTitle>Your Learning Journey</CardTitle>
                    <CardDescription>
                        Each model builds upon the previous one, addressing its limitations and introducing new concepts
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
                                                    <Link href={`/lab/${model.id}`}>
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
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { icon: '🎯', title: 'Motivation', desc: 'Why this model exists and what problem it solves' },
                            { icon: '📐', title: 'Scoring Function', desc: 'Mathematical formula and its components' },
                            { icon: '🔍', title: 'Equation Analysis', desc: 'Step-by-step interpretation of the formula' },
                            { icon: '📊', title: 'Illustration', desc: 'Visual examples with real data' },
                            { icon: '💻', title: 'Hands-on Code', desc: 'Interactive Python implementation' },
                            { icon: '⚠️', title: 'Limitations', desc: 'Understanding what the model cannot do' },
                            { icon: '✅', title: 'Solution', desc: 'How the next model addresses these issues' },
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
