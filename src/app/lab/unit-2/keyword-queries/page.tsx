'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function KeywordQueriesLab() {
    const [query, setQuery] = useState('machine learning')
    const [queryLogic, setQueryLogic] = useState<'AND' | 'OR'>('AND')
    const [results, setResults] = useState<string[]>([])

    const documents = [
        { id: 1, text: 'machine learning algorithms and applications' },
        { id: 2, text: 'deep learning neural networks' },
        { id: 3, text: 'machine learning and deep learning' },
        { id: 4, text: 'natural language processing' },
        { id: 5, text: 'artificial intelligence and machine vision' }
    ]

    const executeQuery = () => {
        const terms = query.toLowerCase().split(' ').filter(t => t.length > 0)
        let filtered: string[] = []

        if (queryLogic === 'AND') {
            // All terms must appear
            filtered = documents
                .filter(doc => terms.every(term => doc.text.toLowerCase().includes(term)))
                .map(doc => `Doc${doc.id}: ${doc.text}`)
        } else {
            // Any term can appear
            filtered = documents
                .filter(doc => terms.some(term => doc.text.toLowerCase().includes(term)))
                .map(doc => `Doc${doc.id}: ${doc.text}`)
        }

        setResults(filtered)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 1a of 6</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Keyword Queries Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Master the foundation of information retrieval with simple keyword matching
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation: Why Keyword Queries?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Keyword queries are the most intuitive way to search. Users simply type words they expect to find in relevant documents.
                        Google processes over 8.5 billion keyword searches per day!
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">Real-world Applications:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Web search engines (Google, Bing) - simple word queries</li>
                            <li>• E-commerce search - product names and descriptions</li>
                            <li>• Document management - finding files by content</li>
                            <li>• Email search - finding messages by keywords</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Boolean Logic */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📐</span> Boolean Logic: AND vs OR
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">AND Logic (Intersection)</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Document must contain ALL query terms. Narrows results, increases precision.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Query: "machine learning" → Find docs with BOTH words
                            </div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">OR Logic (Union)</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Document can contain ANY query term. Broadens results, increases recall.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Query: "machine learning" → Find docs with EITHER word
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Formula Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Mathematical Foundation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl mb-4">R(q_AND) = ⋂ Dist(t) for all t in q</div>
                        <div className="text-2xl">R(q_OR) = ⋃ Dist(t) for all t in q</div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-2xl">Components:</h4>
                        <div className="grid gap-4">
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">R(q)</span>
                                <span className="text-muted-foreground text-lg">Result set - documents matching query q</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">⋂</span>
                                <span className="text-muted-foreground text-lg">Intersection (AND) - document must contain ALL terms</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">⋃</span>
                                <span className="text-muted-foreground text-lg">Union (OR) - document can contain ANY term</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">Dist(t)</span>
                                <span className="text-muted-foreground text-lg">Distribution set - all doc IDs where term t occurs</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🧮</span> Equation Interpretation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                        <div className="font-mono text-2xl text-center mb-6">
                            R(q_AND) = ⋂ Dist(t) &nbsp;&nbsp;&nbsp; R(q_OR) = ⋃ Dist(t)
                        </div>
                        <div className="grid gap-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">R(q)</span>
                                <span className="text-lg">The result set — the collection of documents returned for query q</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">Dist(t)</span>
                                <span className="text-lg">The posting list for term t — all document IDs where term t appears</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">⋂</span>
                                <span className="text-lg">Intersection (AND) — only documents containing ALL query terms</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">⋃</span>
                                <span className="text-lg">Union (OR) — documents containing ANY of the query terms</span>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded">
                            <p className="font-semibold text-lg mb-1">💡 Interpretation:</p>
                            <p className="text-lg text-muted-foreground">
                                AND narrows results by requiring all terms (high precision, low recall). OR broadens results by accepting any term (high recall, low precision). The choice between AND/OR fundamentally controls the precision–recall tradeoff.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Advantages & Limitations */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <span className="text-3xl">✅</span> Advantages
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Intuitive for Users</p>
                            <p className="text-muted-foreground">Users naturally think in keywords — no special syntax needed</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Fast Processing via Inverted Index</p>
                            <p className="text-muted-foreground">Posting list lookups are O(1), intersection/union are efficient</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Foundation of All Search</p>
                            <p className="text-muted-foreground">Every modern search engine starts with keyword matching at its core</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Supports Boolean Logic</p>
                            <p className="text-muted-foreground">AND, OR, NOT operators give users control over result sets</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <span className="text-3xl">⚠️</span> Limitations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Vocabulary Mismatch</p>
                            <p className="text-muted-foreground">Query "car" won't find "automobile" — different words, same concept</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">No Word Order</p>
                            <p className="text-muted-foreground">"dog bites man" and "man bites dog" are treated identically</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Ambiguity</p>
                            <p className="text-muted-foreground">"apple" could mean the fruit or the company — context is lost</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">No Ranking (Binary Match)</p>
                            <p className="text-muted-foreground">Documents either match or don't — no notion of "better" matches</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* IR Application */}
            <Card>
                <CardContent className="p-6">
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold text-xl mb-2">🎯 IR Application</p>
                        <p className="text-lg text-muted-foreground">
                            Keyword queries power Google (8.5 billion queries/day), Elasticsearch, email search (Gmail, Outlook), and e-commerce product search (Amazon, eBay). In practice, raw keyword matching is combined with TF-IDF or BM25 scoring to rank results by relevance rather than returning unordered binary matches.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Try Boolean Logic
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-6 rounded space-y-2 text-lg">
                            {documents.map((doc) => (
                                <div key={doc.id} className="font-mono">
                                    Doc{doc.id}: {doc.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Select Boolean Logic:</label>
                        <div className="flex gap-3">
                            <Button
                                variant={queryLogic === 'AND' ? 'default' : 'outline'}
                                onClick={() => setQueryLogic('AND')}
                                size="lg"
                                className="text-lg"
                            >
                                AND (Intersection)
                            </Button>
                            <Button
                                variant={queryLogic === 'OR' ? 'default' : 'outline'}
                                onClick={() => setQueryLogic('OR')}
                                size="lg"
                                className="text-lg"
                            >
                                OR (Union)
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Enter Keywords:</label>
                        <div className="flex gap-3">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., machine learning"
                                className="font-mono text-lg p-6"
                            />
                            <Button onClick={executeQuery} size="lg" className="text-lg">
                                <Play className="h-5 w-5 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Try: "machine learning", "deep learning", "machine", "learning"
                        </p>
                    </div>

                    {results.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-xl font-semibold">Results ({results.length} documents):</label>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded space-y-3">
                                {results.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Badge variant="outline" className="text-base">Match</Badge>
                                        <span className="text-lg">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">✅</span> Solution: Pattern Queries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Pattern queries address some limitations by allowing flexible matching with wildcards and regular expressions.
                    </p>
                    <Button asChild className="w-full mt-4" size="lg">
                        <Link href="/lab/unit-2/pattern-queries">
                            Next Lab: Pattern Queries <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/pattern-queries">
                        Next: Pattern Queries <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
