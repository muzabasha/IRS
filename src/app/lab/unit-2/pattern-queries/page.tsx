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
                            M(P, V) = {'{t ∈ V | t matches P}'}
                        </div>
                        <div className="grid gap-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">M</span>
                                <span className="text-lg">The match set — all vocabulary terms that satisfy the pattern</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">P</span>
                                <span className="text-lg">The pattern with wildcards (e.g., comp*, wom?n)</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">V</span>
                                <span className="text-lg">The vocabulary — the set of all unique terms in the index</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">t</span>
                                <span className="text-lg">A single term from the vocabulary being tested against the pattern</span>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded">
                            <p className="font-semibold text-lg mb-2">🔄 Permuterm Index Optimization:</p>
                            <p className="text-lg text-muted-foreground mb-2">
                                For &quot;hel*o&quot; → rotate to &quot;*ohel&quot; and lookup in permuterm index. This avoids scanning the entire vocabulary.
                            </p>
                            <p className="font-semibold text-lg mb-1">💡 Interpretation:</p>
                            <p className="text-lg text-muted-foreground">
                                Wildcards expand to regex patterns that are matched against every term in the vocabulary. The permuterm index pre-rotates terms so that wildcard lookups become efficient prefix searches instead of full vocabulary scans.
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
                            <p className="font-semibold text-lg">Flexible Matching</p>
                            <p className="text-muted-foreground">A single pattern can match many related terms at once</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Handles Morphological Variants</p>
                            <p className="text-muted-foreground">"run*" captures run, runs, running, runner without stemming</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Supports Exploratory Search</p>
                            <p className="text-muted-foreground">Discover unknown terms by searching with partial patterns</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Regex Power</p>
                            <p className="text-muted-foreground">Full regular expression support for complex matching needs</p>
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
                            <p className="font-semibold text-lg">Performance Cost</p>
                            <p className="text-muted-foreground">Must scan entire vocabulary — much slower than keyword lookups</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Complex Syntax for Users</p>
                            <p className="text-muted-foreground">Regex and wildcards are difficult for average users to learn</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Over-matching Risk</p>
                            <p className="text-muted-foreground">"comp*" matches computer, complete, compare, and complaint</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">No Semantic Understanding</p>
                            <p className="text-muted-foreground">Matches are purely syntactic — no understanding of meaning</p>
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
                            Pattern queries power GitHub code search (finding function names and variables), spell-check suggestion systems (matching misspelled words to dictionary entries), bioinformatics (searching DNA/protein sequences with wildcards), and log analysis with regex (filtering server logs for error patterns like &quot;ERROR.*timeout&quot;).
                        </p>
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
