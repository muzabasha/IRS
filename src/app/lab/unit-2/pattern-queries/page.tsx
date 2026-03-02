'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function PatternQueriesLab() {
    const [pattern, setPattern] = useState('comp*')
    const [results, setResults] = useState<string[]>([])

    const documents = [
        { id: 1, text: 'computer science fundamentals' },
        { id: 2, text: 'computational biology research' },
        { id: 3, text: 'machine learning algorithms' },
        { id: 4, text: 'compiler design principles' },
        { id: 5, text: 'computing in the cloud' }
    ]

    const executePattern = () => {
        // Convert wildcard pattern to regex
        const regexPattern = pattern.replace(/\*/g, '.*').replace(/\?/g, '.')
        const regex = new RegExp(regexPattern, 'i')

        const filtered = documents
            .filter(doc => doc.text.split(' ').some(word => regex.test(word)))
            .map(doc => `Doc${doc.id}: ${doc.text}`)

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
                <Badge>Lab 1b of 6</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Pattern Queries Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Flexible matching with wildcards and regular expressions
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation: Why Pattern Queries?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        What if you want to find 'computer', 'computing', 'computation', and 'computational' all at once?
                        Pattern queries let you match multiple word forms with a single pattern.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">Real-world Applications:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Code search (GitHub) - find variable names with patterns</li>
                            <li>• Spelling variations - 'colo?r' matches color and colour</li>
                            <li>• Morphological variants - 'run*' matches run, runs, running</li>
                            <li>• Exploratory search - discover related terms</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Wildcard Operators */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📐</span> Wildcard Operators
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">* (Asterisk)</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Matches zero or more characters of any type.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Pattern: "comp*" → Matches: computer, compiler, computing, comp
                            </div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">? (Question Mark)</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Matches exactly one character.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Pattern: "wom?n" → Matches: woman, women
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Formula Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Pattern Matching Process
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">M(P, V) = {'{t ∈ V | t matches pattern P}'}</div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-2xl">Steps:</h4>
                        <div className="grid gap-4">
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <Badge className="text-lg">1</Badge>
                                <div>
                                    <p className="font-semibold text-lg">Parse Pattern</p>
                                    <p className="text-muted-foreground">Convert wildcards to regex: 'comp*' → '^comp.*'</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <Badge className="text-lg">2</Badge>
                                <div>
                                    <p className="font-semibold text-lg">Scan Vocabulary</p>
                                    <p className="text-muted-foreground">Check each term in the index against pattern</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <Badge className="text-lg">3</Badge>
                                <div>
                                    <p className="font-semibold text-lg">Retrieve Postings</p>
                                    <p className="text-muted-foreground">Get document lists for all matching terms</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <Badge className="text-lg bg-green-600">4</Badge>
                                <div>
                                    <p className="font-semibold text-lg">Return Results</p>
                                    <p className="text-muted-foreground">Union of all matching documents</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Try Pattern Matching
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
                        <label className="text-xl font-semibold">Enter Pattern:</label>
                        <div className="flex gap-3">
                            <Input
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="e.g., comp*, wom?n"
                                className="font-mono text-lg p-6"
                            />
                            <Button onClick={executePattern} size="lg" className="text-lg">
                                <Play className="h-5 w-5 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Try: "comp*", "comput?ng", "*ing", "machine"
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

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">⚠️</span> Limitations of Pattern Queries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">1. Performance Cost</p>
                            <p className="text-lg text-muted-foreground">
                                Must scan entire vocabulary and apply regex matching - much slower than keyword queries.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">2. Complex Syntax</p>
                            <p className="text-lg text-muted-foreground">
                                Regular expressions are difficult for average users to learn and use correctly.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">3. Over-matching</p>
                            <p className="text-lg text-muted-foreground">
                                Patterns may match unwanted terms. "comp*" matches "complete" and "compare" too.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">✅</span> Solution: Structural Queries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Structural queries add precision by searching within specific document fields or XML/HTML tags.
                    </p>
                    <Button asChild className="w-full mt-4" size="lg">
                        <Link href="/lab/unit-2/structural-queries">
                            Next Lab: Structural Queries <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/keyword-queries">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Keyword Queries
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/structural-queries">
                        Next: Structural Queries <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
