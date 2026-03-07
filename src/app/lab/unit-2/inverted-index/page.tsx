'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function InvertedIndexLab() {
    const [documents] = useState({
        1: 'machine learning algorithms',
        2: 'deep learning neural networks',
        3: 'machine learning and deep learning'
    })

    const [index, setIndex] = useState<Record<string, Array<[number, number]>>>({})
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<Array<[number, number]>>([])
    const [activeTab, setActiveTab] = useState<'dictionary' | 'postings' | 'payloads'>('dictionary')

    const buildIndex = () => {
        const newIndex: Record<string, Array<[number, number]>> = {}
        Object.entries(documents).forEach(([docId, text]) => {
            const terms = text.toLowerCase().split(/\s+/)
            const termFreq: Record<string, number> = {}
            terms.forEach(term => {
                termFreq[term] = (termFreq[term] || 0) + 1
            })
            Object.entries(termFreq).forEach(([term, freq]) => {
                if (!newIndex[term]) newIndex[term] = []
                newIndex[term].push([Number(docId), freq])
            })
        })
        Object.keys(newIndex).forEach(term => {
            newIndex[term].sort((a, b) => a[0] - b[0])
        })
        setIndex(newIndex)
    }

    const handleSearch = () => {
        const term = searchTerm.toLowerCase().trim()
        if (term && index[term]) {
            setSearchResults(index[term])
        } else {
            setSearchResults([])
        }
    }

    const tabs = [
        { key: 'dictionary' as const, label: 'Dictionary', emoji: '📖' },
        { key: 'postings' as const, label: 'Postings Lists', emoji: '📋' },
        { key: 'payloads' as const, label: 'Payloads', emoji: '📦' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 10 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Inverted Index Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Build the core data structure for search
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
                        Searching without an index is like reading every book in the library to find one quote. The inverted index enables instant term lookup — it maps every term to the documents containing it.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Build Time */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Index Construction
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">T<sub>build</sub> = O(N · L · log(V))</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">T<sub>build</sub></span>: Time to construct the inverted index
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">N</span>: Number of documents in the collection
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">L</span>: Average document length (in tokens)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">V</span>: Vocabulary size (unique terms)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">log(V)</span>: Dictionary lookup cost (sorted/hash)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Building an inverted index scans every token in every document (N·L), inserting each into the dictionary with log(V) lookup. For a 1M-document corpus with avg 500 tokens and 500K vocabulary, this is ~500M operations — feasible in minutes with modern hardware.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Index Size */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Index Size
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">S<sub>index</sub> = V · S<sub>term</sub> + Σ df(t) · S<sub>posting</sub></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S<sub>index</sub></span>: Total index size in bytes
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">V · S<sub>term</sub></span>: Dictionary size (vocabulary × bytes per term entry)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">df(t)</span>: Document frequency of term t
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S<sub>posting</sub></span>: Bytes per posting entry (docID + freq + positions)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            The index size is dominated by postings lists (typically 10–30% of original text size). Compression (gap encoding, variable-byte) can reduce this to 5–10%. The dictionary is small (V entries) but must fit in RAM for fast lookup.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Component Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Index Components
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.key}
                                variant={activeTab === tab.key ? 'default' : 'outline'}
                                onClick={() => setActiveTab(tab.key)}
                                className="text-lg px-6 py-4"
                            >
                                {tab.emoji} {tab.label}
                            </Button>
                        ))}
                    </div>

                    {activeTab === 'dictionary' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📖 Dictionary (Lexicon)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Maps each unique term to its postings list. Stored as a sorted array, hash table, or B-tree for O(log V) or O(1) lookup.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Sorted Array</p>
                                        <p className="text-muted-foreground">Binary search O(log V). Good for static collections.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Hash Table</p>
                                        <p className="text-muted-foreground">O(1) lookup. No prefix/range queries.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">B-Tree / Trie</p>
                                        <p className="text-muted-foreground">Supports prefix queries. Used in Lucene.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'postings' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📋 Postings Lists</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    For each term, a sorted list of document IDs where the term appears. Sorted order enables efficient merge operations for Boolean queries.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>&quot;machine&quot; → [1, 3]</p>
                                    <p>&quot;learning&quot; → [1, 2, 3]</p>
                                    <p>&quot;deep&quot; → [2, 3]</p>
                                    <p>&quot;neural&quot; → [2]</p>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border border-yellow-400 mt-4">
                                    <p className="font-semibold">Skip Pointers:</p>
                                    <p className="text-muted-foreground">For long postings lists, skip pointers allow jumping ahead during merge — reducing comparisons from O(n) to O(√n).</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payloads' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📦 Payloads (Stored Data)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Each posting can store additional data beyond the document ID — enabling richer retrieval and ranking.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Term Frequency (tf)</p>
                                        <p className="text-muted-foreground">How many times the term appears in the document. Essential for TF-IDF scoring.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Positions</p>
                                        <p className="text-muted-foreground">Exact positions of each occurrence. Enables phrase queries and proximity search.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Field Info</p>
                                        <p className="text-muted-foreground">Which field (title, body, anchor) the term appeared in. Enables field-weighted scoring.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Offsets</p>
                                        <p className="text-muted-foreground">Character offsets for highlighting search results in the original text.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Demo */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Index Building Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Document Collection:</label>
                        <div className="space-y-2">
                            {Object.entries(documents).map(([id, text]) => (
                                <div key={id} className="p-4 bg-secondary/30 rounded border-2">
                                    <span className="font-semibold text-lg">Doc {id}:</span>
                                    <span className="ml-2 text-lg">{text}</span>
                                </div>
                            ))}
                        </div>
                        <Button onClick={buildIndex} size="lg" className="text-xl">
                            Build Inverted Index
                        </Button>
                    </div>

                    {Object.keys(index).length > 0 && (
                        <>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Inverted Index:</p>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {Object.entries(index).sort().map(([term, postings]) => (
                                        <div key={term} className="flex items-start gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">{term}</Badge>
                                            <div className="flex-1">
                                                <span className="text-muted-foreground mr-2">df={postings.length}</span>
                                                {postings.map(([docId, freq], idx) => (
                                                    <span key={idx} className="mr-4">
                                                        Doc {docId} (tf: {freq})
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-semibold">Search Term:</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Enter term to search"
                                        className="text-2xl p-6 border-2"
                                    />
                                    <Button onClick={handleSearch} size="lg" className="text-xl">
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                    <p className="font-semibold text-xl mb-3">Search Results for &quot;{searchTerm}&quot;:</p>
                                    <div className="space-y-2">
                                        {searchResults.map(([docId, freq]) => (
                                            <div key={docId} className="text-lg">
                                                • Document {docId}: tf = {freq}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchTerm && searchResults.length === 0 && (
                                <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded border-2 border-yellow-500">
                                    <p className="text-xl">No results found for &quot;{searchTerm}&quot;</p>
                                </div>
                            )}
                        </>
                    )}
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
                            <li>• O(1) or O(log V) term lookup</li>
                            <li>• Efficient Boolean query processing via merge</li>
                            <li>• Supports ranked retrieval (TF-IDF, BM25)</li>
                            <li>• Compressible (gap encoding, VByte)</li>
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
                            <li>• Expensive to build for large collections</li>
                            <li>• Updates require re-indexing or merge</li>
                            <li>• Memory-intensive for real-time indexing</li>
                            <li>• Does not capture term order (without positions)</li>
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
                        The inverted index is the backbone of every modern search engine. Google indexes hundreds of billions of web pages using distributed inverted indices. Lucene/Elasticsearch use segment-based inverted indices with periodic merging. Database full-text search (PostgreSQL GIN index) is built on inverted index principles. Even email search (Gmail) uses inverted indices for instant keyword lookup.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/text-compression">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Text Compression
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/boolean-search">
                        Next: Boolean Search <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
