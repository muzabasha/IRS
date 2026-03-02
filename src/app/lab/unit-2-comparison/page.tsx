'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Play, RefreshCw } from 'lucide-react'

export default function Unit2ComparisonPage() {
    const [documents, setDocuments] = useState([
        'machine learning algorithms for data analysis',
        'deep learning neural networks',
        'machine vision and image processing',
        'natural language processing techniques',
        'artificial intelligence and machine learning'
    ])
    const [query, setQuery] = useState('machine learning')
    const [results, setResults] = useState<any>(null)

    // Tokenization
    const tokenize = (text: string) => {
        return text.toLowerCase().split(/\W+/).filter(t => t.length > 0)
    }

    // Stopword removal
    const stopwords = ['and', 'or', 'the', 'a', 'an', 'for', 'in', 'on', 'at', 'to', 'of']
    const removeStopwords = (tokens: string[]) => {
        return tokens.filter(t => !stopwords.includes(t))
    }

    // Simple stemming (Porter-like)
    const stem = (word: string) => {
        if (word.endsWith('ing')) return word.slice(0, -3)
        if (word.endsWith('ed')) return word.slice(0, -2)
        if (word.endsWith('s') && word.length > 3) return word.slice(0, -1)
        return word
    }

    // Build inverted index
    const buildInvertedIndex = (docs: string[]) => {
        const index: Record<string, number[]> = {}
        docs.forEach((doc, docId) => {
            const tokens = tokenize(doc)
            const cleaned = removeStopwords(tokens)
            const stemmed = cleaned.map(stem)
            stemmed.forEach(term => {
                if (!index[term]) index[term] = []
                if (!index[term].includes(docId)) {
                    index[term].push(docId)
                }
            })
        })
        return index
    }

    const executeComparison = () => {
        const queryTokens = tokenize(query)
        const queryCleaned = removeStopwords(queryTokens)
        const queryStemmed = queryCleaned.map(stem)

        // Build inverted index
        const invertedIndex = buildInvertedIndex(documents)

        // Keyword query (simple OR)
        const keywordResults = new Set<number>()
        queryStemmed.forEach(term => {
            if (invertedIndex[term]) {
                invertedIndex[term].forEach(docId => keywordResults.add(docId))
            }
        })

        // Boolean AND query
        let booleanResults: number[] = []
        if (queryStemmed.length > 0) {
            booleanResults = invertedIndex[queryStemmed[0]] || []
            for (let i = 1; i < queryStemmed.length; i++) {
                const termDocs = invertedIndex[queryStemmed[i]] || []
                booleanResults = booleanResults.filter(docId => termDocs.includes(docId))
            }
        }

        // Proximity search (within 3 words)
        const proximityResults: number[] = []
        documents.forEach((doc, docId) => {
            const tokens = tokenize(doc).map(stem)
            for (let i = 0; i < tokens.length; i++) {
                if (queryStemmed.includes(tokens[i])) {
                    // Check if other query terms are within 3 positions
                    const nearby = tokens.slice(Math.max(0, i - 3), Math.min(tokens.length, i + 4))
                    const matchCount = queryStemmed.filter(qt => nearby.includes(qt)).length
                    if (matchCount >= 2 && !proximityResults.includes(docId)) {
                        proximityResults.push(docId)
                    }
                }
            }
        })

        // Wildcard query (prefix matching)
        const wildcardResults = new Set<number>()
        queryStemmed.forEach(term => {
            Object.keys(invertedIndex).forEach(indexTerm => {
                if (indexTerm.startsWith(term.replace('*', ''))) {
                    invertedIndex[indexTerm].forEach(docId => wildcardResults.add(docId))
                }
            })
        })

        setResults({
            preprocessing: {
                original: queryTokens,
                afterStopwords: queryCleaned,
                afterStemming: queryStemmed
            },
            invertedIndex,
            keyword: Array.from(keywordResults),
            boolean: booleanResults,
            proximity: proximityResults,
            wildcard: Array.from(wildcardResults)
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2
                    </Link>
                </Button>
                <Badge variant="outline">Unit 2 Comparison</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Unit 2: Complete Comparison</h1>
                <p className="text-2xl text-muted-foreground">
                    Compare query languages, text preprocessing, and indexing techniques side-by-side
                </p>
            </div>

            {/* Study Resources */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Study Resources
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-lg text-muted-foreground">
                        Comprehensive presentations covering all Unit 2 topics:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <a
                            href="https://gamma.app/docs/Keyword-Querying-Pattern-Matching-Structural-Queries-opydi91t7ipoymj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 border-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <span className="text-2xl">🔍</span>
                            <div>
                                <p className="font-semibold">Keyword, Pattern & Structural Queries</p>
                                <p className="text-xs text-muted-foreground">Query language fundamentals</p>
                            </div>
                        </a>
                        <a
                            href="https://gamma.app/docs/Query-Protocols-g355wn4q5txahms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 border-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <span className="text-2xl">🔌</span>
                            <div>
                                <p className="font-semibold">Query Protocols</p>
                                <p className="text-xs text-muted-foreground">Z39.50, SRU/SRW, OpenSearch</p>
                            </div>
                        </a>
                        <a
                            href="https://gamma.app/docs/Query-Operations-in-Information-Retrieval-c0lj4cjoegwnq54"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 border-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <span className="text-2xl">⚙️</span>
                            <div>
                                <p className="font-semibold">Query Operations</p>
                                <p className="text-xs text-muted-foreground">Relevance feedback, local/global analysis</p>
                            </div>
                        </a>
                        <a
                            href="https://gamma.app/docs/Trends-Research-Issues-in-Query-Systems-9n1dyfy92xwnoe3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 border-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <span className="text-2xl">🔬</span>
                            <div>
                                <p className="font-semibold">Trends & Research Issues</p>
                                <p className="text-xs text-muted-foreground">Current challenges and future directions</p>
                            </div>
                        </a>
                    </div>
                </CardContent>
            </Card>

            {/* Input Section */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle>Input Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection:</label>
                        <Textarea
                            value={documents.join('\n')}
                            onChange={(e) => setDocuments(e.target.value.split('\n').filter(d => d.trim()))}
                            rows={5}
                            className="font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter your query"
                                className="font-mono"
                            />
                            <Button onClick={executeComparison}>
                                <Play className="h-4 w-4 mr-2" /> Compare
                            </Button>
                            <Button variant="outline" onClick={() => {
                                setQuery('machine learning')
                                setResults(null)
                            }}>
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {results && (
                <>
                    {/* Text Preprocessing Comparison */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🔧</span> Text Preprocessing Pipeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Card className="bg-blue-50 dark:bg-blue-950">
                                        <CardContent className="p-4">
                                            <p className="font-semibold mb-2">1. Tokenization</p>
                                            <div className="space-y-1">
                                                {results.preprocessing.original.map((token: string, i: number) => (
                                                    <Badge key={i} variant="outline" className="mr-1">{token}</Badge>
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Split text into individual tokens
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-green-50 dark:bg-green-950">
                                        <CardContent className="p-4">
                                            <p className="font-semibold mb-2">2. Stopword Removal</p>
                                            <div className="space-y-1">
                                                {results.preprocessing.afterStopwords.map((token: string, i: number) => (
                                                    <Badge key={i} variant="outline" className="mr-1">{token}</Badge>
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Remove common words (and, the, for, etc.)
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-purple-50 dark:bg-purple-950">
                                        <CardContent className="p-4">
                                            <p className="font-semibold mb-2">3. Stemming</p>
                                            <div className="space-y-1">
                                                {results.preprocessing.afterStemming.map((token: string, i: number) => (
                                                    <Badge key={i} variant="outline" className="mr-1">{token}</Badge>
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Reduce words to root form
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Inverted Index */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📇</span> Inverted Index Structure
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-secondary/30 p-4 rounded font-mono text-sm space-y-2 max-h-64 overflow-y-auto">
                                {Object.entries(results.invertedIndex).slice(0, 15).map(([term, docIds]: [string, any]) => (
                                    <div key={term} className="flex justify-between">
                                        <span className="font-bold text-primary">{term}</span>
                                        <span className="text-muted-foreground">→ [{docIds.join(', ')}]</span>
                                    </div>
                                ))}
                                {Object.keys(results.invertedIndex).length > 15 && (
                                    <p className="text-xs text-muted-foreground italic">
                                        ... and {Object.keys(results.invertedIndex).length - 15} more terms
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Query Language Comparison */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🔍</span> Query Language Comparison
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="keyword" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="keyword">Keyword</TabsTrigger>
                                    <TabsTrigger value="boolean">Boolean</TabsTrigger>
                                    <TabsTrigger value="proximity">Proximity</TabsTrigger>
                                    <TabsTrigger value="wildcard">Wildcard</TabsTrigger>
                                </TabsList>

                                <TabsContent value="keyword" className="space-y-4">
                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <h4 className="font-semibold mb-2">Keyword Query (OR Logic)</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Returns documents containing ANY of the query terms
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold">Results: {results.keyword.length} documents</p>
                                            {results.keyword.map((docId: number) => (
                                                <div key={docId} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                    <Badge className="mb-1">Doc {docId}</Badge>
                                                    <p className="text-sm">{documents[docId]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="boolean" className="space-y-4">
                                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                                        <h4 className="font-semibold mb-2">Boolean Query (AND Logic)</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Returns documents containing ALL query terms
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold">Results: {results.boolean.length} documents</p>
                                            {results.boolean.length > 0 ? results.boolean.map((docId: number) => (
                                                <div key={docId} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                    <Badge className="mb-1">Doc {docId}</Badge>
                                                    <p className="text-sm">{documents[docId]}</p>
                                                </div>
                                            )) : (
                                                <p className="text-sm text-muted-foreground italic">No documents match all terms</p>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="proximity" className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <h4 className="font-semibold mb-2">Proximity Query (NEAR/3)</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Returns documents where query terms appear within 3 words of each other
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold">Results: {results.proximity.length} documents</p>
                                            {results.proximity.length > 0 ? results.proximity.map((docId: number) => (
                                                <div key={docId} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                    <Badge className="mb-1">Doc {docId}</Badge>
                                                    <p className="text-sm">{documents[docId]}</p>
                                                </div>
                                            )) : (
                                                <p className="text-sm text-muted-foreground italic">No documents with terms in proximity</p>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="wildcard" className="space-y-4">
                                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded">
                                        <h4 className="font-semibold mb-2">Wildcard Query (Prefix Match)</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Returns documents with terms starting with query prefix
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold">Results: {results.wildcard.length} documents</p>
                                            {results.wildcard.map((docId: number) => (
                                                <div key={docId} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                    <Badge className="mb-1">Doc {docId}</Badge>
                                                    <p className="text-sm">{documents[docId]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Key Insights */}
                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">💡</span> Key Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Text Preprocessing Impact</p>
                                    <p className="text-sm text-muted-foreground">
                                        Stemming reduces "learning" and "learn" to the same root, improving recall.
                                        Stopword removal reduces index size by ~30-40%.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Query Language Trade-offs</p>
                                    <p className="text-sm text-muted-foreground">
                                        Keyword (OR) has high recall but low precision. Boolean (AND) has high precision but low recall.
                                        Proximity balances both.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Inverted Index Efficiency</p>
                                    <p className="text-sm text-muted-foreground">
                                        O(1) term lookup instead of O(n) document scanning. Essential for web-scale search with billions of documents.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Progressive Refinement</p>
                                    <p className="text-sm text-muted-foreground">
                                        Start with keyword search (broad), refine with Boolean (precise), or use proximity (contextual).
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}
