'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function StructuralQueriesLab() {
    const [field, setField] = useState('title')
    const [term, setTerm] = useState('machine')
    const [results, setResults] = useState<any[]>([])

    const documents = [
        {
            id: 1,
            title: 'Machine Learning Basics',
            author: 'John Smith',
            body: 'Introduction to AI and ML concepts'
        },
        {
            id: 2,
            title: 'Deep Learning Guide',
            author: 'Jane Doe',
            body: 'Neural networks and machine learning'
        },
        {
            id: 3,
            title: 'Data Science Handbook',
            author: 'John Smith',
            body: 'Statistics and machine learning algorithms'
        }
    ]

    const executeQuery = () => {
        const filtered = documents
            .filter(doc => {
                const fieldValue = doc[field as keyof typeof doc]
                return fieldValue && typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(term.toLowerCase())
            })
            .map(doc => ({
                id: doc.id,
                matchedField: field,
                matchedValue: doc[field as keyof typeof doc],
                fullDoc: doc
            }))

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
                <Badge>Lab 1c of 6</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Structural Queries Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Search within specific document fields and XML/HTML tags
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation: Why Structural Queries?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Not all parts of a document are equal. Sometimes you only want to search titles, not the entire text.
                        Structural queries let you target specific fields for more precise results.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">Real-world Applications:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Academic search - find papers by author or in title</li>
                            <li>• Email search - from:, to:, subject: fields</li>
                            <li>• E-commerce - search by brand, category, price range</li>
                            <li>• XML/HTML retrieval - search within specific tags</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Field Types */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📐</span> Common Document Fields
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">title: Field</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Search only in document titles - highest precision for topic matching.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Query: title:"machine learning" → Find docs with term in title
                            </div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">author: Field</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Find all documents by a specific author.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Query: author:"John Smith" → Find all papers by John Smith
                            </div>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-6 bg-secondary/20 p-6 rounded">
                            <p className="font-semibold text-2xl mb-2">body: Field</p>
                            <p className="text-lg text-muted-foreground mb-3">
                                Search in the main content of documents.
                            </p>
                            <div className="font-mono text-lg bg-background p-4 rounded">
                                Query: body:"neural networks" → Find term in document body
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Formula Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Structural Query Model
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">R(q, s) = {'{e ∈ E | content(e) matches q ∧ structure(e) matches s}'}</div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-2xl">Components:</h4>
                        <div className="grid gap-4">
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">R(q, s)</span>
                                <span className="text-muted-foreground text-lg">Result set matching query q with structure s</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">E</span>
                                <span className="text-muted-foreground text-lg">Set of all elements (fields, tags) in collection</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">content(e)</span>
                                <span className="text-muted-foreground text-lg">Text content within element e</span>
                            </div>
                            <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                                <span className="font-mono font-bold text-xl">structure(e)</span>
                                <span className="text-muted-foreground text-lg">Structural properties (field name, tag, hierarchy)</span>
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
                            R(q, s) = {'{e ∈ E | content(e) matches q ∧ structure(e) matches s}'}
                        </div>
                        <div className="grid gap-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">R</span>
                                <span className="text-lg">The result set — documents/elements satisfying both content and structure</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">q</span>
                                <span className="text-lg">The content query — the keywords or text being searched for</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">s</span>
                                <span className="text-lg">The structural constraint — which field/tag to search in (title:, author:, body:)</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">E</span>
                                <span className="text-lg">All elements — the complete set of document fields/tags in the collection</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-mono font-bold text-xl bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded">e</span>
                                <span className="text-lg">A single document element being evaluated against the query</span>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded">
                            <p className="font-semibold text-lg mb-2">📊 Field-Weighted Scoring:</p>
                            <div className="font-mono text-lg bg-blue-50 dark:bg-blue-950 p-3 rounded mb-2">
                                Score(d, q) = Σ w_f × score(q, d.f) &nbsp; where w_f = field weight
                            </div>
                            <p className="text-lg text-muted-foreground mb-2">
                                Each field f has a weight w_f. Title matches are weighted higher than body matches.
                            </p>
                            <p className="font-semibold text-lg mb-1">💡 Interpretation:</p>
                            <p className="text-lg text-muted-foreground">
                                Title matches are weighted higher than body matches because a term in the title strongly signals relevance. Fields act as filters that narrow the search space and enable field-weighted ranking for more precise results.
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
                            <p className="font-semibold text-lg">Higher Precision</p>
                            <p className="text-muted-foreground">Search only relevant fields, reducing false matches significantly</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Faster Processing</p>
                            <p className="text-muted-foreground">Smaller search space (one field vs. entire document) means quicker results</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Field-Weighted Ranking</p>
                            <p className="text-muted-foreground">Weight fields differently — title matches rank higher than body matches</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                            <p className="font-semibold text-lg">Supports Faceted Search</p>
                            <p className="text-muted-foreground">Enable drill-down filtering by category, author, date, price, etc.</p>
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
                            <p className="font-semibold text-lg">Requires Structured Documents</p>
                            <p className="text-muted-foreground">Plain text documents without fields cannot use structural queries</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Schema Dependency</p>
                            <p className="text-muted-foreground">Users must know the field names and document schema to query effectively</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Not All Docs Have Fields</p>
                            <p className="text-muted-foreground">Web pages, PDFs, and legacy documents often lack structured metadata</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                            <p className="font-semibold text-lg">Complex Query Syntax</p>
                            <p className="text-muted-foreground">Field-specific syntax (field:value) adds complexity for casual users</p>
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
                            Structural queries power email search (from:, subject:, has:attachment in Gmail), Elasticsearch field queries (multi_match with field boosting), academic search engines (author:, title:, year: in Google Scholar), and e-commerce faceted navigation (filtering by brand, price range, ratings on Amazon).
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Field-Specific Search
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-6 rounded space-y-4 text-lg">
                            {documents.map((doc) => (
                                <div key={doc.id} className="border-l-4 border-primary pl-4">
                                    <div className="font-mono font-bold">Doc{doc.id}:</div>
                                    <div className="ml-4 space-y-1">
                                        <div><span className="font-semibold">title:</span> {doc.title}</div>
                                        <div><span className="font-semibold">author:</span> {doc.author}</div>
                                        <div><span className="font-semibold">body:</span> {doc.body}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Select Field:</label>
                        <div className="flex gap-3">
                            <Button
                                variant={field === 'title' ? 'default' : 'outline'}
                                onClick={() => setField('title')}
                                size="lg"
                                className="text-lg"
                            >
                                title:
                            </Button>
                            <Button
                                variant={field === 'author' ? 'default' : 'outline'}
                                onClick={() => setField('author')}
                                size="lg"
                                className="text-lg"
                            >
                                author:
                            </Button>
                            <Button
                                variant={field === 'body' ? 'default' : 'outline'}
                                onClick={() => setField('body')}
                                size="lg"
                                className="text-lg"
                            >
                                body:
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Enter Search Term:</label>
                        <div className="flex gap-3">
                            <Input
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="e.g., machine, John Smith"
                                className="font-mono text-lg p-6"
                            />
                            <Button onClick={executeQuery} size="lg" className="text-lg">
                                <Play className="h-5 w-5 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Try: "machine" in title, "John Smith" in author, "neural" in body
                        </p>
                    </div>

                    {results.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-xl font-semibold">Results ({results.length} documents):</label>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded space-y-4">
                                {results.map((result, i) => (
                                    <div key={i} className="border-l-4 border-green-600 pl-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge variant="outline" className="text-base">Match in {result.matchedField}</Badge>
                                            <span className="font-mono font-bold">Doc{result.id}</span>
                                        </div>
                                        <div className="text-lg">
                                            <span className="font-semibold">{result.matchedField}:</span> {result.matchedValue}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🎯</span> Next: Relevance Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Now that you understand query formulation, learn how systems can improve queries automatically using relevance feedback.
                    </p>
                    <Button asChild className="w-full mt-4" size="lg">
                        <Link href="/lab/unit-2/relevance-feedback">
                            Next Lab: Relevance Feedback <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/pattern-queries">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Pattern Queries
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/relevance-feedback">
                        Next: Relevance Feedback <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
