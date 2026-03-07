'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ResultVisualizationLab() {
    const [viewMode, setViewMode] = useState<'list' | 'grid' | 'cluster'>('list')
    const [activeTab, setActiveTab] = useState<'kwic' | 'faceted' | 'clustering' | 'thumbnails'>('kwic')

    const results = [
        { id: 1, title: 'Machine Learning Basics', snippet: 'Introduction to ML algorithms and concepts...', category: 'Tutorial', relevance: 0.95 },
        { id: 2, title: 'Deep Learning with Python', snippet: 'Build neural networks using TensorFlow...', category: 'Tutorial', relevance: 0.88 },
        { id: 3, title: 'ML Research Paper 2024', snippet: 'Latest advances in transformer models...', category: 'Research', relevance: 0.82 },
        { id: 4, title: 'Machine Learning Jobs', snippet: 'Top ML engineer positions available...', category: 'Jobs', relevance: 0.75 },
        { id: 5, title: 'ML Course Syllabus', snippet: 'Complete curriculum for ML certification...', category: 'Education', relevance: 0.70 },
    ]

    const clusters: Record<string, typeof results> = {
        'Tutorial': results.filter(r => r.category === 'Tutorial'),
        'Research': results.filter(r => r.category === 'Research'),
        'Jobs': results.filter(r => r.category === 'Jobs'),
        'Education': results.filter(r => r.category === 'Education'),
    }

    const tabs = [
        { key: 'kwic' as const, label: 'KWIC Snippets', emoji: '📝' },
        { key: 'faceted' as const, label: 'Faceted Navigation', emoji: '🏷️' },
        { key: 'clustering' as const, label: 'Result Clustering', emoji: '📁' },
        { key: 'thumbnails' as const, label: 'Visual Thumbnails', emoji: '🖼️' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Result Visualization Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Presenting search results effectively
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Users judge relevance in 2–3 seconds per result. Good visualization helps users quickly identify relevant documents through snippets, highlighting, clustering, and faceted navigation.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: NDCG */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: NDCG (Result Quality)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">NDCG@k = DCG@k / IDCG@k</div>
                        <div className="text-xl mt-2">DCG@k = Σ<sub>i=1</sub><sup>k</sup> (2<sup>rel<sub>i</sub></sup> - 1) / log₂(i + 1)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">NDCG@k</span>: Normalized DCG at position k (0 to 1)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">rel<sub>i</sub></span>: Relevance grade of result at position i
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">log₂(i+1)</span>: Position discount (later results worth less)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">IDCG@k</span>: Ideal DCG (perfect ranking)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            NDCG measures how well the result presentation matches the ideal ordering. Higher NDCG means relevant results appear earlier — which is exactly what good visualization should support. Position discount reflects that users rarely look past the first few results.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Visualization Techniques
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'outline'} onClick={() => setActiveTab(tab.key)} className="text-lg px-6 py-4">
                                {tab.emoji} {tab.label}
                            </Button>
                        ))}
                    </div>

                    {activeTab === 'kwic' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📝 KWIC (Keyword-In-Context) Snippets</p>
                                <p className="text-lg text-muted-foreground mb-4">Show query terms within surrounding text. Users judge relevance from context without opening the document.</p>
                                <div className="bg-secondary/20 p-4 rounded text-lg">
                                    <p className="font-semibold text-blue-600">Machine Learning Basics</p>
                                    <p className="text-muted-foreground">...the science of <span className="bg-yellow-200 dark:bg-yellow-800 px-1 font-bold">machine</span> <span className="bg-yellow-200 dark:bg-yellow-800 px-1 font-bold">learning</span> involves algorithms that improve...</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded text-lg mt-3">
                                    <p className="font-semibold text-blue-600">Deep Learning with Python</p>
                                    <p className="text-muted-foreground">...build neural networks for <span className="bg-yellow-200 dark:bg-yellow-800 px-1 font-bold">machine</span> <span className="bg-yellow-200 dark:bg-yellow-800 px-1 font-bold">learning</span> tasks using TensorFlow...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'faceted' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🏷️ Faceted Navigation</p>
                                <p className="text-lg text-muted-foreground mb-4">Filter results by multiple dimensions. Each facet narrows the result set interactively.</p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Category</p>
                                        <div className="space-y-1 mt-2">
                                            <p className="text-muted-foreground">Tutorial (2)</p>
                                            <p className="text-muted-foreground">Research (1)</p>
                                            <p className="text-muted-foreground">Jobs (1)</p>
                                            <p className="text-muted-foreground">Education (1)</p>
                                        </div>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Date</p>
                                        <div className="space-y-1 mt-2">
                                            <p className="text-muted-foreground">Past 24 hours</p>
                                            <p className="text-muted-foreground">Past week</p>
                                            <p className="text-muted-foreground">Past month</p>
                                            <p className="text-muted-foreground">Past year</p>
                                        </div>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Format</p>
                                        <div className="space-y-1 mt-2">
                                            <p className="text-muted-foreground">PDF (3)</p>
                                            <p className="text-muted-foreground">HTML (5)</p>
                                            <p className="text-muted-foreground">Video (2)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'clustering' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📁 Result Clustering</p>
                                <p className="text-lg text-muted-foreground mb-4">Group similar results automatically. Helps users explore different aspects of ambiguous queries.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Scatter-Gather</p>
                                        <p className="text-muted-foreground">Show clusters → user selects → re-cluster selected group. Iterative refinement.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Carrot2 / Clusty</p>
                                        <p className="text-muted-foreground">Real-time clustering of search results with labeled groups.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'thumbnails' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🖼️ Visual Thumbnails & Rich Snippets</p>
                                <p className="text-lg text-muted-foreground mb-4">Preview images, ratings, prices, and structured data. Increases click-through by 30%.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Rich Snippets</p>
                                        <p className="text-muted-foreground">Star ratings, prices, availability, recipe times — structured data from Schema.org markup.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Knowledge Panels</p>
                                        <p className="text-muted-foreground">Google&apos;s sidebar with entity info, images, key facts — direct answers without clicking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive View Mode Demo */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Result Visualization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-2">
                        <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')} className="text-lg">List View</Button>
                        <Button variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')} className="text-lg">Grid View</Button>
                        <Button variant={viewMode === 'cluster' ? 'default' : 'outline'} onClick={() => setViewMode('cluster')} className="text-lg">Clustered View</Button>
                    </div>

                    {viewMode === 'list' && (
                        <div className="space-y-3">
                            {results.map((result) => (
                                <div key={result.id} className="border-2 rounded-lg p-6 hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-blue-600">{result.title}</h3>
                                            <p className="text-lg text-muted-foreground mt-1">{result.snippet}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline" className="text-base">{result.category}</Badge>
                                                <span className="text-muted-foreground">Relevance: {(result.relevance * 100).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {viewMode === 'grid' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.map((result) => (
                                <div key={result.id} className="border-2 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="text-4xl mb-3 text-center">📄</div>
                                    <h3 className="font-semibold text-lg text-blue-600 mb-2">{result.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2">{result.snippet}</p>
                                    <div className="mt-3"><Badge variant="outline">{result.category}</Badge></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {viewMode === 'cluster' && (
                        <div className="space-y-4">
                            {Object.entries(clusters).map(([category, items]) => (
                                items.length > 0 && (
                                    <div key={category} className="border-2 rounded-lg p-6">
                                        <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                            <span className="text-2xl">📁</span> {category} ({items.length})
                                        </h3>
                                        <div className="space-y-2">
                                            {items.map((result) => (
                                                <div key={result.id} className="pl-4 border-l-4 border-primary">
                                                    <p className="font-semibold text-lg text-blue-600">{result.title}</p>
                                                    <p className="text-muted-foreground">{result.snippet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📊</span> Visualization Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                            <thead>
                                <tr className="bg-secondary/30">
                                    <th className="border-2 p-3 text-left">Technique</th>
                                    <th className="border-2 p-3 text-left">Best For</th>
                                    <th className="border-2 p-3 text-left">CTR Impact</th>
                                    <th className="border-2 p-3 text-left">Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="border-2 p-3 font-semibold">KWIC Snippets</td><td className="border-2 p-3">Quick relevance judgment</td><td className="border-2 p-3">+15–20%</td><td className="border-2 p-3">Google, Bing</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Faceted Navigation</td><td className="border-2 p-3">Narrowing large result sets</td><td className="border-2 p-3">+25–40%</td><td className="border-2 p-3">Amazon, eBay</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Result Clustering</td><td className="border-2 p-3">Ambiguous queries</td><td className="border-2 p-3">+10–15%</td><td className="border-2 p-3">Carrot2, Clusty</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Rich Snippets</td><td className="border-2 p-3">Product/recipe/review search</td><td className="border-2 p-3">+30%</td><td className="border-2 p-3">Google Rich Results</td></tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Advantages & Limitations */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-green-100 dark:bg-green-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <span className="text-3xl">✅</span> Advantages
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-lg">
                            <li>• KWIC reduces time-to-relevance judgment</li>
                            <li>• Facets enable precise filtering</li>
                            <li>• Clustering reveals query ambiguity</li>
                            <li>• Rich snippets increase click-through 30%</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-red-100 dark:bg-red-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <span className="text-3xl">⚠️</span> Limitations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-lg">
                            <li>• Snippet generation is computationally expensive</li>
                            <li>• Too many facets overwhelm users (Hick&apos;s Law)</li>
                            <li>• Clustering labels may be unclear</li>
                            <li>• Rich snippets require structured markup</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* IR Application */}
            <Card className="bg-secondary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🎯</span> IR Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">
                        Result visualization is central to every search interface. Google uses KWIC snippets with bold query terms, Amazon uses faceted navigation for product filtering, Carrot2 clusters web results into labeled groups, and Google&apos;s Knowledge Panels provide direct answers with rich visual content.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-3/query-specification">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Query Specification
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-3">
                        Back to Unit 3 Labs <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
