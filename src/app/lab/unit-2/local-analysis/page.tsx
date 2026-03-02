'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function LocalAnalysisLab() {
    const [query, setQuery] = useState('machine learning')
    const [expansionTerms, setExpansionTerms] = useState<string[]>([])
    const [expandedQuery, setExpandedQuery] = useState('')

    const topDocuments = [
        'machine learning algorithms for data analysis',
        'deep learning neural networks and machine learning',
        'artificial intelligence and machine learning applications',
        'supervised learning classification algorithms',
        'unsupervised learning clustering methods'
    ]

    const executePRF = () => {
        // Extract terms from top documents
        const allTerms = topDocuments.join(' ').toLowerCase().split(/\s+/)
        const termFreq: Record<string, number> = {}

        allTerms.forEach(term => {
            if (term.length > 3 && !query.toLowerCase().includes(term)) {
                termFreq[term] = (termFreq[term] || 0) + 1
            }
        })

        // Get top 5 terms by frequency
        const sortedTerms = Object.entries(termFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([term]) => term)

        setExpansionTerms(sortedTerms)
        setExpandedQuery(`${query} ${sortedTerms.join(' ')}`)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 5 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Local Analysis Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Automatic query expansion with pseudo-relevance feedback
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
                        What if we could improve queries without asking the user anything? Local analysis (pseudo-relevance feedback) automatically assumes the top K results are relevant and uses them to expand the query.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">How It Works:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Retrieve top K documents (typically K=10-20)</li>
                            <li>• Extract common terms from these documents</li>
                            <li>• Add top M terms to the query (typically M=5-10)</li>
                            <li>• Re-run query with expanded terms</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Process */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📐</span> PRF Process
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <Badge className="text-lg">1</Badge>
                            <div>
                                <p className="font-semibold text-lg">Run Initial Query</p>
                                <p className="text-muted-foreground">Get top K documents from the collection</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <Badge className="text-lg">2</Badge>
                            <div>
                                <p className="font-semibold text-lg">Extract Terms</p>
                                <p className="text-muted-foreground">Find frequent terms in top documents</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <Badge className="text-lg">3</Badge>
                            <div>
                                <p className="font-semibold text-lg">Rank Terms</p>
                                <p className="text-muted-foreground">Sort by frequency or TF-IDF weight</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <Badge className="text-lg bg-green-600">4</Badge>
                            <div>
                                <p className="font-semibold text-lg">Expand Query</p>
                                <p className="text-muted-foreground">Add top M terms to original query</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Pseudo-Relevance Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Original Query:</label>
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter your query"
                            className="text-lg p-6"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Top 5 Retrieved Documents:</label>
                        <div className="bg-secondary/30 p-6 rounded space-y-2">
                            {topDocuments.map((doc, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Badge variant="outline" className="text-base">{i + 1}</Badge>
                                    <p className="text-lg">{doc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={executePRF} size="lg" className="w-full text-lg">
                        <Play className="h-5 w-5 mr-2" /> Apply Pseudo-Relevance Feedback
                    </Button>

                    {expansionTerms.length > 0 && (
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <label className="text-xl font-semibold">Expansion Terms:</label>
                                <div className="flex flex-wrap gap-2">
                                    {expansionTerms.map((term, i) => (
                                        <Badge key={i} variant="secondary" className="text-lg px-4 py-2">
                                            {term}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-semibold">Expanded Query:</label>
                                <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                                    <p className="font-mono text-lg mb-2">{expandedQuery}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Query automatically expanded with terms from top results!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Query Drift Warning */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">⚠️</span> Query Drift Risk
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        The main risk: If initial results are poor, expansion makes it worse!
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded">
                        <p className="font-semibold text-xl mb-3">Example of Query Drift:</p>
                        <div className="space-y-2 text-lg">
                            <p>• Query: "apple" (looking for fruit)</p>
                            <p>• Top results: iPhone, Mac, iPad (tech results)</p>
                            <p>• Expansion adds: "iPhone", "Mac", "iOS"</p>
                            <p>• New query drifts to technology topic!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/relevance-feedback">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Relevance Feedback
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/global-analysis">
                        Next: Global Analysis <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
