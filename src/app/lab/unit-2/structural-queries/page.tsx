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

            {/* Advantages */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">✅</span> Advantages of Structural Queries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">1. Higher Precision</p>
                            <p className="text-lg text-muted-foreground">
                                Search only relevant fields, reducing false matches significantly.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">2. Faster Processing</p>
                            <p className="text-lg text-muted-foreground">
                                Smaller search space means quicker results.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                            <p className="font-semibold text-xl mb-2">3. Better Ranking</p>
                            <p className="text-lg text-muted-foreground">
                                Weight fields differently - title matches rank higher than body matches.
                            </p>
                        </div>
                    </div>
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
