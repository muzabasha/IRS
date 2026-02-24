'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function InvertedIndexLab() {
    const [selectedTerm, setSelectedTerm] = useState<string>('')
    const [queryResult, setQueryResult] = useState<number[]>([])

    const documents = [
        { id: 1, text: 'machine learning algorithms' },
        { id: 2, text: 'deep learning neural networks' },
        { id: 3, text: 'machine vision systems' },
        { id: 4, text: 'learning management systems' },
        { id: 5, text: 'artificial intelligence machine learning' }
    ]

    // Build inverted index
    const invertedIndex: Record<string, number[]> = {}
    documents.forEach(doc => {
        const terms = doc.text.split(' ')
        terms.forEach(term => {
            if (!invertedIndex[term]) {
                invertedIndex[term] = []
            }
            if (!invertedIndex[term].includes(doc.id)) {
                invertedIndex[term].push(doc.id)
            }
        })
    })

    const searchTerm = (term: string) => {
        setSelectedTerm(term)
        setQueryResult(invertedIndex[term] || [])
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Inverted Index Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Build and search with the core data structure of IR systems
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Inverted Index?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Searching billions of documents in milliseconds requires the right data structure. The inverted index
                        is the secret behind Google, Elasticsearch, and every modern search engine.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">The Problem:</p>
                        <p className="text-sm mb-3">
                            Sequential scan: O(N×M) where N=documents, M=terms per doc. For 1 billion docs, this takes hours!
                        </p>
                        <p className="font-semibold mb-2">The Solution:</p>
                        <p className="text-sm">
                            Inverted index: O(1) lookup + O(K) merge where K=matching docs. Same query takes milliseconds!
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Scale:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google: 100+ billion pages, index size ~100 petabytes</li>
                            <li>• Elasticsearch: Can handle 1TB+ indices with sub-second queries</li>
                            <li>• Your laptop: Can index 1 million documents in under 1 minute</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Index Structure */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Inverted Index Structure
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. Vocabulary (Dictionary)</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Sorted list of all unique terms in the collection
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                ["algorithms", "artificial", "deep", "intelligence", "learning", ...]
                            </div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Postings Lists</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                For each term, list of document IDs where it appears
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                "learning" → [1, 2, 4, 5]
                            </div>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Payloads (Optional)</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Additional info: term frequency, positions, field
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                "learning" → [(1, freq:1, pos:[1]), (2, freq:1, pos:[1]), ...]
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Index Viewer */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Inverted Index
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-1 text-sm">
                            {documents.map((doc) => (
                                <div key={doc.id} className="font-mono">
                                    Doc{doc.id}: {doc.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Inverted Index (Vocabulary → Postings):</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-2 max-h-[300px] overflow-y-auto">
                            {Object.entries(invertedIndex).sort().map(([term, postings]) => (
                                <div
                                    key={term}
                                    className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${selectedTerm === term ? 'bg-primary/20 border-2 border-primary' : 'hover:bg-secondary/50'
                                        }`}
                                    onClick={() => searchTerm(term)}
                                >
                                    <span className="font-mono font-semibold">{term}</span>
                                    <div className="flex gap-1">
                                        {postings.map(docId => (
                                            <Badge key={docId} variant="outline">{docId}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Click any term to see which documents contain it
                        </p>
                    </div>

                    {selectedTerm && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">
                                Search Results for "{selectedTerm}" ({queryResult.length} documents):
                            </label>
                            <div className="bg-green-50 dark:bg-green-950 p-4 rounded space-y-2">
                                {queryResult.map(docId => {
                                    const doc = documents.find(d => d.id === docId)
                                    return (
                                        <div key={docId} className="flex items-center gap-2">
                                            <Badge variant="outline">Doc{docId}</Badge>
                                            <span className="text-sm">{doc?.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Lookup time: O(1) - instant retrieval using hash table
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Boolean Query Processing */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Boolean Query Processing
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: "machine AND learning"</p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 1</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Lookup "machine"</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        Postings: [1, 3, 5]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 2</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Lookup "learning"</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        Postings: [1, 2, 4, 5]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5 bg-green-600">Step 3</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Merge (Intersection)</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        [1, 3, 5] ∩ [1, 2, 4, 5] = [1, 5] ✓
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Complexity: O(n + m) where n, m are list lengths
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Gap Encoding */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📦</span> Index Compression: Gap Encoding
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">g_i = d_i - d_(i-1)</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Store differences between consecutive doc IDs instead of absolute values. Smaller numbers = fewer bits.
                    </p>
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: Compress postings list</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                                <span>Original list:</span>
                                <span className="font-mono">[100, 105, 110, 125, 130]</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Gap encoded:</span>
                                <span className="font-mono">[100, 5, 5, 15, 5]</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Original bits (32-bit ints):</span>
                                <span className="font-mono">5 × 32 = 160 bits</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Compressed (variable byte):</span>
                                <span className="font-mono">~40 bits</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-green-600">
                                <span>Space saved:</span>
                                <span>75% reduction!</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`from collections import defaultdict

class InvertedIndex:
    def __init__(self):
        self.index = defaultdict(list)
        self.documents = {}
    
    def add_document(self, doc_id, text):
        """Add document to index"""
        self.documents[doc_id] = text
        terms = text.lower().split()
        
        for position, term in enumerate(terms):
            # Store doc_id and position
            self.index[term].append((doc_id, position))
    
    def search(self, term):
        """Search for a single term"""
        term = term.lower()
        postings = self.index.get(term, [])
        # Return unique doc IDs
        return list(set(doc_id for doc_id, _ in postings))
    
    def search_and(self, term1, term2):
        """Boolean AND query"""
        docs1 = set(self.search(term1))
        docs2 = set(self.search(term2))
        return sorted(docs1 & docs2)
    
    def search_or(self, term1, term2):
        """Boolean OR query"""
        docs1 = set(self.search(term1))
        docs2 = set(self.search(term2))
        return sorted(docs1 | docs2)
    
    def phrase_search(self, phrase):
        """Search for exact phrase"""
        terms = phrase.lower().split()
        if not terms:
            return []
        
        # Get postings for first term
        candidates = defaultdict(list)
        for doc_id, pos in self.index.get(terms[0], []):
            candidates[doc_id].append(pos)
        
        # Check if other terms follow in sequence
        for i, term in enumerate(terms[1:], 1):
            new_candidates = defaultdict(list)
            for doc_id, pos in self.index.get(term, []):
                if doc_id in candidates:
                    # Check if position is consecutive
                    for start_pos in candidates[doc_id]:
                        if pos == start_pos + i:
                            new_candidates[doc_id].append(start_pos)
            candidates = new_candidates
        
        return sorted(candidates.keys())

# Example usage
index = InvertedIndex()
index.add_document(1, "machine learning algorithms")
index.add_document(2, "deep learning neural networks")
index.add_document(3, "machine vision systems")
index.add_document(4, "learning management systems")
index.add_document(5, "artificial intelligence machine learning")

print("Search 'learning':", index.search("learning"))
print("AND query:", index.search_and("machine", "learning"))
print("OR query:", index.search_or("deep", "vision"))
print("Phrase search:", index.phrase_search("machine learning"))`}</code>
                    </pre>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Output:</p>
                        <pre className="text-sm font-mono">
                            Search 'learning': [1, 2, 4, 5]
                            AND query: [1, 5]
                            OR query: [2, 3]
                            Phrase search: [1, 5]
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Index Construction */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🏗️</span> Building the Index
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                            <div className="flex-1">
                                <p className="font-semibold">Parse Documents</p>
                                <p className="text-sm text-muted-foreground">Tokenize, normalize, stem each document</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
                            <div className="flex-1">
                                <p className="font-semibold">Create Term-Doc Pairs</p>
                                <p className="text-sm text-muted-foreground">For each term, record which doc it appears in</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                            <div className="flex-1">
                                <p className="font-semibold">Sort by Term</p>
                                <p className="text-sm text-muted-foreground">Group all occurrences of each term together</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">4</div>
                            <div className="flex-1">
                                <p className="font-semibold">Build Postings Lists</p>
                                <p className="text-sm text-muted-foreground">Create sorted doc ID lists for each term</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">5</div>
                            <div className="flex-1">
                                <p className="font-semibold">Compress & Store</p>
                                <p className="text-sm text-muted-foreground">Apply gap encoding and write to disk</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Complexity Analysis:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Time: O(N × M × log(N × M)) where N=docs, M=avg terms</li>
                            <li>• Space: O(T × D_avg) where T=unique terms, D_avg=avg postings length</li>
                            <li>• For 1M docs with 1000 terms each: ~10 minutes, ~5GB index</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Inverted Index
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. Storage Overhead</p>
                            <p className="text-sm text-muted-foreground">
                                Index can be 20-50% of original document size. For 1TB of text, need 200-500GB for index.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Update Complexity</p>
                            <p className="text-sm text-muted-foreground">
                                Adding/deleting documents requires rebuilding postings lists. Not suitable for real-time updates.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. No Semantic Understanding</p>
                            <p className="text-sm text-muted-foreground">
                                Only matches exact terms (after stemming). Can't understand "car" and "automobile" are related.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. Wildcard Query Inefficiency</p>
                            <p className="text-sm text-muted-foreground">
                                Queries like "*ing" require scanning entire vocabulary. Can't use direct lookup.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Advanced Topics */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🚀</span> Advanced Indexing Techniques
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Modern search engines extend the basic inverted index:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Positional Index</p>
                                <p className="text-sm text-muted-foreground">
                                    Store term positions for phrase queries: "machine learning" (exact order)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Skip Pointers</p>
                                <p className="text-sm text-muted-foreground">
                                    Jump ahead in postings lists during merge, reducing comparisons by 50-70%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Distributed Indexing</p>
                                <p className="text-sm text-muted-foreground">
                                    Shard index across machines (Elasticsearch, Solr) for horizontal scaling
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Real-time Updates</p>
                                <p className="text-sm text-muted-foreground">
                                    Use in-memory buffers + periodic merges for near-instant document indexing
                                </p>
                            </div>
                        </div>
                    </div>
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
                            <p className="font-semibold mb-2">Q1: What are the three main components of an inverted index?</p>
                            <p className="text-sm text-green-600">A: Vocabulary (sorted list of terms), Postings Lists (doc IDs for each term), and optional Payloads (frequencies, positions)</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: How does gap encoding reduce index size?</p>
                            <p className="text-sm text-green-600">A: By storing differences between consecutive doc IDs instead of absolute values, producing smaller numbers that require fewer bits</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What's the time complexity of a Boolean AND query?</p>
                            <p className="text-sm text-green-600">A: O(n + m) where n and m are the lengths of the two postings lists being merged</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Unit Complete */}
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎉</span> Unit 2 Complete!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Congratulations! You've mastered the fundamentals of query processing and indexing:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Query Languages (Keyword, Pattern, Structural)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Relevance Feedback (Rocchio Algorithm)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Text Preprocessing (Stemming, Compression)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Inverted Index (Building & Searching)</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button asChild className="w-full" size="lg">
                            <Link href="/lab">
                                Return to Lab Hub <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-2/text-preprocessing">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Text Preprocessing
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-2">
                        Back to Unit 2 Labs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
