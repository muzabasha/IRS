'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function BooleanModelLab() {
    const [query, setQuery] = useState('machine AND learning')
    const [results, setResults] = useState<string[]>([])

    const documents = [
        'machine learning algorithms',
        'deep learning neural networks',
        'machine vision systems',
        'learning management systems',
        'artificial intelligence and machine learning'
    ]

    const executeQuery = () => {
        const queryLower = query.toLowerCase()
        const filtered = documents.filter(doc => {
            if (queryLower.includes(' and ')) {
                const terms = queryLower.split(' and ').map(t => t.trim())
                return terms.every(term => doc.toLowerCase().includes(term))
            } else if (queryLower.includes(' or ')) {
                const terms = queryLower.split(' or ').map(t => t.trim())
                return terms.some(term => doc.toLowerCase().includes(term))
            } else if (queryLower.includes(' not ')) {
                const [include, exclude] = queryLower.split(' not ').map(t => t.trim())
                return doc.toLowerCase().includes(include) && !doc.toLowerCase().includes(exclude)
            }
            return doc.toLowerCase().includes(queryLower)
        })
        setResults(filtered)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab 1 of 5</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Boolean Model Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master exact matching with set theory and Boolean algebra
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Boolean Model?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        The Boolean Model is the foundation of Information Retrieval. Before we can rank documents by relevance,
                        we need to understand how to filter them using exact matching criteria.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Legal document search (find ALL cases with specific terms)</li>
                            <li>• Database queries (SQL WHERE clauses)</li>
                            <li>• Email filtering (spam detection rules)</li>
                            <li>• Library catalog systems</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Scoring Function */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Scoring Function
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-lg">
                        sim(d, q) = 1 if q ⊆ d, else 0
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">sim(d, q)</span>
                                <span className="text-muted-foreground">Similarity score between document d and query q</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">q ⊆ d</span>
                                <span className="text-muted-foreground">Query terms are a subset of document terms</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">1 or 0</span>
                                <span className="text-muted-foreground">Binary output: match (1) or no match (0)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Equation Interpretation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold">AND Operation (Intersection)</p>
                            <p className="text-sm text-muted-foreground">q = t1 AND t2 → d must contain BOTH t1 AND t2</p>
                            <div className="mt-2 font-mono text-sm bg-secondary/30 p-2 rounded">
                                Result = Set(t1) ∩ Set(t2)
                            </div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="font-semibold">OR Operation (Union)</p>
                            <p className="text-sm text-muted-foreground">q = t1 OR t2 → d must contain EITHER t1 OR t2 (or both)</p>
                            <div className="mt-2 font-mono text-sm bg-secondary/30 p-2 rounded">
                                Result = Set(t1) ∪ Set(t2)
                            </div>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                            <p className="font-semibold">NOT Operation (Complement)</p>
                            <p className="text-sm text-muted-foreground">q = t1 NOT t2 → d must contain t1 but NOT t2</p>
                            <div className="mt-2 font-mono text-sm bg-secondary/30 p-2 rounded">
                                Result = Set(t1) - Set(t2)
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Lab: Try It Yourself
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-1 text-sm">
                            {documents.map((doc, i) => (
                                <div key={i} className="font-mono">Doc{i + 1}: {doc}</div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Enter Boolean Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., machine AND learning"
                                className="font-mono"
                            />
                            <Button onClick={executeQuery}>
                                <Play className="h-4 w-4 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Try: "machine AND learning", "deep OR machine", "learning NOT deep"
                        </p>
                    </div>

                    {results.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Results ({results.length} documents):</label>
                            <div className="bg-green-50 dark:bg-green-950 p-4 rounded space-y-2">
                                {results.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Badge variant="outline">Match</Badge>
                                        <span className="text-sm">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Illustration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📊</span> Step-by-Step Illustration
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="bg-secondary/20 p-4 rounded">
                            <p className="font-semibold mb-2">Example: Query = "machine AND learning"</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 1</Badge>
                                    <div>
                                        <p className="font-semibold">Identify query terms</p>
                                        <p className="text-muted-foreground">Terms: ["machine", "learning"]</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 2</Badge>
                                    <div>
                                        <p className="font-semibold">Find documents containing "machine"</p>
                                        <p className="text-muted-foreground">Set A = {'{Doc1, Doc3, Doc5}'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 3</Badge>
                                    <div>
                                        <p className="font-semibold">Find documents containing "learning"</p>
                                        <p className="text-muted-foreground">Set B = {'{Doc1, Doc2, Doc4, Doc5}'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5 bg-green-600">Step 4</Badge>
                                    <div>
                                        <p className="font-semibold">Compute intersection (A ∩ B)</p>
                                        <p className="text-muted-foreground">Result = {'{Doc1, Doc5}'} ✓</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Boolean Model
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. No Ranking</p>
                            <p className="text-sm text-muted-foreground">
                                All matching documents get score = 1. If 1000 documents match, they're all "equally relevant".
                                How do you decide which to show first?
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Too Strict or Too Loose</p>
                            <p className="text-sm text-muted-foreground">
                                AND can return 0 results (too strict). OR can return thousands (too loose).
                                Users struggle to formulate effective queries.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. No Partial Matching</p>
                            <p className="text-sm text-muted-foreground">
                                A document with "machine" appearing 50 times is treated the same as one with it appearing once.
                                Term frequency is ignored.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. Binary Decision</p>
                            <p className="text-sm text-muted-foreground">
                                Real-world relevance is not binary. A document can be "somewhat relevant" or "highly relevant".
                                Boolean model cannot express this nuance.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Vector Space Model
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        The Vector Space Model (VSM) addresses these limitations by:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Introducing Ranking</p>
                                <p className="text-sm text-muted-foreground">
                                    Documents get continuous scores (0 to 1) based on similarity, not just binary match/no-match
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Considering Term Frequency</p>
                                <p className="text-sm text-muted-foreground">
                                    Documents with more occurrences of query terms get higher scores
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Partial Matching</p>
                                <p className="text-sm text-muted-foreground">
                                    Even if not all query terms are present, document can still be relevant
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/vector-space-model">
                            Next Lab: Vector Space Model <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Assessment */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎓</span> Quick Assessment
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q1: What is the output of Boolean Model?</p>
                            <p className="text-sm text-green-600">A: Binary (1 or 0) - document either matches or doesn't</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why can't Boolean Model rank results?</p>
                            <p className="text-sm text-green-600">A: All matching documents get the same score (1), so there's no basis for ordering them</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: When is Boolean Model still useful?</p>
                            <p className="text-sm text-green-600">A: Legal search, database queries, and scenarios requiring exact matching with no ambiguity</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/vector-space-model">
                        Next: Vector Space Model <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
