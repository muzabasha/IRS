'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ModelComparisonPage() {
    const [query, setQuery] = useState('machine learning')
    const [showResults, setShowResults] = useState(false)

    // Sample document collection
    const documents = [
        {
            id: 'D1',
            title: 'Machine Learning Fundamentals',
            body: 'Introduction to machine learning algorithms and techniques for data science applications',
            length: 12
        },
        {
            id: 'D2',
            title: 'Deep Learning Guide',
            body: 'Neural networks and deep learning methods for artificial intelligence',
            length: 10
        },
        {
            id: 'D3',
            title: 'Data Science Handbook',
            body: 'Statistical analysis and machine learning for data-driven decision making',
            length: 11
        },
        {
            id: 'D4',
            title: 'Computer Vision Systems',
            body: 'Image processing and pattern recognition using machine vision techniques',
            length: 10
        },
        {
            id: 'D5',
            title: 'Natural Language Processing',
            body: 'Text analysis and language understanding with computational linguistics',
            length: 9
        }
    ]

    const executeComparison = () => {
        setShowResults(true)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge variant="outline">Model Comparison Journey</Badge>
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl font-bold">IR Models: Complete Comparison Journey</h1>
                <p className="text-lg text-muted-foreground">
                    See how each model processes the same query and documents, and understand the progressive improvements
                </p>
            </div>

            {/* Input Section */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span> Common Input for All Models
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter your query"
                                className="font-mono text-lg"
                            />
                            <Button onClick={executeComparison} size="lg">
                                <Play className="h-4 w-4 mr-2" /> Compare All Models
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-2">
                            {documents.map((doc) => (
                                <div key={doc.id} className="p-3 bg-background rounded border">
                                    <div className="font-mono font-bold text-sm mb-1">{doc.id}</div>
                                    <div className="text-sm">
                                        <span className="font-semibold">Title:</span> {doc.title}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-semibold">Body:</span> {doc.body}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Length: {doc.length} words
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {showResults && (
                <>
                    {/* Model Results Comparison */}
                    <Tabs defaultValue="boolean" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="boolean">Boolean</TabsTrigger>
                            <TabsTrigger value="vsm">VSM</TabsTrigger>
                            <TabsTrigger value="bm25">BM25</TabsTrigger>
                            <TabsTrigger value="structured">Structured</TabsTrigger>
                            <TabsTrigger value="browsing">Browsing</TabsTrigger>
                        </TabsList>

                        {/* Boolean Model Results */}
                        <TabsContent value="boolean" className="space-y-4">
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader>
                                    <CardTitle>Boolean Model Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Query Processing:</p>
                                        <div className="font-mono text-sm">
                                            Query: "machine learning"<br />
                                            Parsed as: "machine" AND "learning"<br />
                                            Logic: Document must contain BOTH terms
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Results (Binary Match):</p>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">D1</span>
                                                    <Badge variant="default">MATCH (Score: 1)</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Contains both "machine" and "learning" ✓</p>
                                            </div>
                                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">D2</span>
                                                    <Badge variant="destructive">NO MATCH (Score: 0)</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Contains "learning" but not "machine" ✗</p>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">D3</span>
                                                    <Badge variant="default">MATCH (Score: 1)</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Contains both "machine" and "learning" ✓</p>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">D4</span>
                                                    <Badge variant="default">MATCH (Score: 1)</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Contains "machine" (in "machine vision") ✓</p>
                                            </div>
                                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">D5</span>
                                                    <Badge variant="destructive">NO MATCH (Score: 0)</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Contains neither term ✗</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Problem with Boolean Model:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• All matching documents get same score (1) - no ranking!</li>
                                            <li>• D1 (highly relevant) = D4 (tangentially relevant)</li>
                                            <li>• Cannot distinguish quality of matches</li>
                                            <li>• User must manually scan all results</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* VSM Results */}
                        <TabsContent value="vsm" className="space-y-4">
                            <Card className="border-l-4 border-l-green-500">
                                <CardHeader>
                                    <CardTitle>Vector Space Model (VSM) Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Query Processing:</p>
                                        <div className="font-mono text-sm">
                                            Query: "machine learning"<br />
                                            TF-IDF Weights Calculated<br />
                                            Cosine Similarity: Measures angle between vectors
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Results (Ranked by Cosine Similarity):</p>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded border-l-4 border-green-600">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 1: D1</span>
                                                    <Badge className="bg-green-600">Score: 0.8165</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Both terms in title + body, high TF-IDF</p>
                                                <div className="text-xs font-mono mt-2 bg-white dark:bg-gray-900 p-2 rounded">
                                                    TF(machine)=0.083, IDF=0.301 → TF-IDF=0.025<br />
                                                    TF(learning)=0.083, IDF=0.176 → TF-IDF=0.015
                                                </div>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 2: D3</span>
                                                    <Badge className="bg-green-500">Score: 0.7071</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Both terms present, moderate frequency</p>
                                            </div>
                                            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded border-l-4 border-yellow-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 3: D4</span>
                                                    <Badge className="bg-yellow-600">Score: 0.4082</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Only "machine" present (partial match)</p>
                                            </div>
                                            <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded border-l-4 border-orange-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 4: D2</span>
                                                    <Badge className="bg-orange-600">Score: 0.3536</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Only "learning" present</p>
                                            </div>
                                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 5: D5</span>
                                                    <Badge variant="destructive">Score: 0.0000</Badge>
                                                </div>
                                                <p className="text-sm mt-1">No matching terms</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Improvement over Boolean:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• ✓ Documents now ranked by relevance (0 to 1 scale)</li>
                                            <li>• ✓ D1 (0.82) clearly better than D4 (0.41)</li>
                                            <li>• ✓ Partial matches included (D2, D4 not discarded)</li>
                                            <li>• ✓ TF-IDF considers term importance</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Remaining Problems:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• TF-IDF is heuristic (no theoretical foundation)</li>
                                            <li>• Doesn't handle document length well</li>
                                            <li>• Term frequency grows linearly (no saturation)</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* BM25 Results */}
                        <TabsContent value="bm25" className="space-y-4">
                            <Card className="border-l-4 border-l-purple-500">
                                <CardHeader>
                                    <CardTitle>Probabilistic Model (BM25) Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Query Processing:</p>
                                        <div className="font-mono text-sm">
                                            Query: "machine learning"<br />
                                            Parameters: k₁=1.5, b=0.75<br />
                                            Probabilistic ranking with length normalization
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Results (Ranked by BM25 Score):</p>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded border-l-4 border-purple-600">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 1: D1</span>
                                                    <Badge className="bg-purple-600">Score: 4.23</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Highest relevance with proper length normalization</p>
                                                <div className="text-xs font-mono mt-2 bg-white dark:bg-gray-900 p-2 rounded">
                                                    Length norm: 1 - 0.75 + 0.75×(12/10.4) = 0.615<br />
                                                    BM25(machine) = 1.38 × [1×2.5]/[1+1.5×0.615] = 2.15<br />
                                                    BM25(learning) = 0.83 × [1×2.5]/[1+1.5×0.615] = 2.08<br />
                                                    Total: 4.23
                                                </div>
                                            </div>
                                            <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded border-l-4 border-purple-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 2: D3</span>
                                                    <Badge className="bg-purple-500">Score: 3.87</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Good match with balanced term distribution</p>
                                            </div>
                                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded border-l-4 border-indigo-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 3: D4</span>
                                                    <Badge className="bg-indigo-600">Score: 1.38</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Partial match, properly penalized</p>
                                            </div>
                                            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 4: D2</span>
                                                    <Badge className="bg-blue-600">Score: 0.83</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Single term match</p>
                                            </div>
                                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 5: D5</span>
                                                    <Badge variant="destructive">Score: 0.00</Badge>
                                                </div>
                                                <p className="text-sm mt-1">No matching terms</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Improvement over VSM:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• ✓ Probabilistic foundation (not heuristic)</li>
                                            <li>• ✓ Better document length normalization (parameter b)</li>
                                            <li>• ✓ Term frequency saturation (parameter k₁)</li>
                                            <li>• ✓ More discriminative scores (4.23 vs 0.83)</li>
                                            <li>• ✓ Tunable for different collections</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Remaining Problems:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Still lexical (no semantic understanding)</li>
                                            <li>• Cannot handle synonyms ("car" ≠ "automobile")</li>
                                            <li>• Ignores document structure (title vs body)</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Structured Results */}
                        <TabsContent value="structured" className="space-y-4">
                            <Card className="border-l-4 border-l-orange-500">
                                <CardHeader>
                                    <CardTitle>Structured Text Retrieval Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Query Processing:</p>
                                        <div className="font-mono text-sm">
                                            Query: title:"machine learning"<br />
                                            Structural constraint: Both terms must be in TITLE<br />
                                            Field weights: title=2.0, body=1.0
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Results (Ranked by Weighted Score):</p>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded border-l-4 border-orange-600">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 1: D1</span>
                                                    <Badge className="bg-orange-600">Score: 8.46</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Both terms in TITLE (2× weight) + body</p>
                                                <div className="text-xs font-mono mt-2 bg-white dark:bg-gray-900 p-2 rounded">
                                                    Title: "Machine Learning Fundamentals" ✓<br />
                                                    Score = (2.0 × 4.23) = 8.46
                                                </div>
                                            </div>
                                            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded border-l-4 border-yellow-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 2: D3</span>
                                                    <Badge className="bg-yellow-600">Score: 3.87</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Terms in body only (1× weight)</p>
                                                <div className="text-xs font-mono mt-2 bg-white dark:bg-gray-900 p-2 rounded">
                                                    Title: "Data Science Handbook" ✗<br />
                                                    Body contains both terms → Score = 3.87
                                                </div>
                                            </div>
                                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded border-l-4 border-red-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono font-bold">Rank 3-5: D2, D4, D5</span>
                                                    <Badge variant="destructive">Score: 0.00</Badge>
                                                </div>
                                                <p className="text-sm mt-1">Don't satisfy structural constraint</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Improvement over BM25:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• ✓ Exploits document structure (title more important)</li>
                                            <li>• ✓ Field-specific queries (title:, abstract:, body:)</li>
                                            <li>• ✓ Higher precision (D1 score 8.46 vs D3 score 3.87)</li>
                                            <li>• ✓ Context-aware retrieval</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Remaining Problems:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Requires structured documents (XML, HTML)</li>
                                            <li>• Complex query syntax (users must know field names)</li>
                                            <li>• Not suitable for exploratory search</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Browsing Results */}
                        <TabsContent value="browsing" className="space-y-4">
                            <Card className="border-l-4 border-l-pink-500">
                                <CardHeader>
                                    <CardTitle>Browsing Model Results</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Browsing Session:</p>
                                        <div className="font-mono text-sm">
                                            User starts with vague need: "learn about ML"<br />
                                            Browses through categories → discovers terms<br />
                                            Iterative refinement (Berry-Picking)
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Browsing Path & Discovery:</p>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded">
                                                <div className="font-semibold mb-2">Step 1: Start at "AI Topics"</div>
                                                <p className="text-sm">User sees categories: Machine Learning, Deep Learning, NLP</p>
                                                <Badge className="mt-2">Berry 🍓: Learned "Machine Learning" is a category</Badge>
                                            </div>
                                            <div className="p-3 bg-pink-50 dark:bg-pink-950 rounded">
                                                <div className="font-semibold mb-2">Step 2: Click "Machine Learning"</div>
                                                <p className="text-sm">Discovers D1, D3 in this category</p>
                                                <Badge className="mt-2">Berry 🍓: Found 2 relevant documents</Badge>
                                            </div>
                                            <div className="p-3 bg-pink-50 dark:bg-pink-950 rounded">
                                                <div className="font-semibold mb-2">Step 3: Read D1, learn new term "algorithms"</div>
                                                <p className="text-sm">Refines understanding, searches "ML algorithms"</p>
                                                <Badge className="mt-2">Berry 🍓: Query evolved through exploration</Badge>
                                            </div>
                                            <div className="p-3 bg-pink-50 dark:bg-pink-950 rounded">
                                                <div className="font-semibold mb-2">Step 4: Follow "Related Topics" link</div>
                                                <p className="text-sm">Discovers D2 (Deep Learning) unexpectedly</p>
                                                <Badge className="mt-2">Berry 🍓: Serendipitous discovery!</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Advantage of Browsing:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• ✓ No need for perfect query formulation</li>
                                            <li>• ✓ Learning happens during exploration</li>
                                            <li>• ✓ Serendipitous discovery (found D2 unexpectedly)</li>
                                            <li>• ✓ Query refinement through interaction</li>
                                            <li>• ✓ Suitable for vague information needs</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <p className="font-semibold mb-2">Metrics:</p>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Recall@4 steps</p>
                                                <p className="text-2xl font-bold">60%</p>
                                                <p className="text-xs">Found 3 of 5 relevant docs</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Berries Collected</p>
                                                <p className="text-2xl font-bold">4 🍓</p>
                                                <p className="text-xs">Pieces of information learned</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                                        <p className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Trade-offs:
                                        </p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Slower than direct search for known items</li>
                                            <li>• Risk of "lost in hyperspace"</li>
                                            <li>• Depends on good link structure</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Comprehensive Comparison Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-6 w-6" />
                                Comprehensive Model Comparison
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2">
                                            <th className="text-left p-3 font-bold">Aspect</th>
                                            <th className="text-left p-3 font-bold bg-blue-50 dark:bg-blue-950">Boolean</th>
                                            <th className="text-left p-3 font-bold bg-green-50 dark:bg-green-950">VSM</th>
                                            <th className="text-left p-3 font-bold bg-purple-50 dark:bg-purple-950">BM25</th>
                                            <th className="text-left p-3 font-bold bg-orange-50 dark:bg-orange-950">Structured</th>
                                            <th className="text-left p-3 font-bold bg-pink-50 dark:bg-pink-950">Browsing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">WHY?<br /><span className="text-xs font-normal text-muted-foreground">Purpose</span></td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Exact matching with Boolean logic</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Ranking by similarity</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Probabilistic relevance ranking</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Context-aware retrieval</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Exploratory discovery</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">WHAT?<br /><span className="text-xs font-normal text-muted-foreground">Core Concept</span></td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Set theory (AND, OR, NOT)</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Vector space + cosine similarity</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Probability ranking principle</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Hierarchical document structure</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Hypertext navigation</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">HOW?<br /><span className="text-xs font-normal text-muted-foreground">Mechanism</span></td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Binary match (1 or 0)</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">TF-IDF weights + cosine</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">BM25 formula with k₁, b params</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Field-specific weighting</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Link following + scent</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">WHERE?<br /><span className="text-xs font-normal text-muted-foreground">Best Use Case</span></td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">
                                                • Legal search<br />
                                                • Database queries<br />
                                                • Exact requirements
                                            </td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">
                                                • Web search<br />
                                                • Document clustering<br />
                                                • General retrieval
                                            </td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">
                                                • Search engines<br />
                                                • Enterprise search<br />
                                                • Academic search
                                            </td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">
                                                • XML/HTML search<br />
                                                • Email search<br />
                                                • Structured docs
                                            </td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">
                                                • Wikipedia<br />
                                                • E-commerce<br />
                                                • Digital libraries
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Score Range</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Binary (0 or 1)</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">0.0 to 1.0</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">0.0 to ∞</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Weighted scores</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Recall@k metric</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Ranking?</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">❌ No</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">✅ Yes</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">✅ Yes (better)</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">✅ Yes (context-aware)</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">N/A (exploration)</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Partial Match?</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">❌ No</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">✅ Yes</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">✅ Yes</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">✅ Yes</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">✅ Yes</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Complexity</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Low (O(n))</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Medium (O(n×m))</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Medium (O(n×m))</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Medium-High</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Variable</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">User Skill Required</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">High (Boolean syntax)</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Low (keywords)</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Low (keywords)</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Medium (field names)</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Low (clicking)</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Main Strength</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Precision, exact control</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Ranking, simplicity</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Theoretical foundation</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Context exploitation</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Discovery, learning</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-semibold">Main Weakness</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">No ranking</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Heuristic TF-IDF</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Still lexical</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">Needs structure</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Slow for known items</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">Real Example</td>
                                            <td className="p-3 bg-blue-50/50 dark:bg-blue-950/50">Legal databases (Westlaw)</td>
                                            <td className="p-3 bg-green-50/50 dark:bg-green-950/50">Early Google (1998-2005)</td>
                                            <td className="p-3 bg-purple-50/50 dark:bg-purple-950/50">Elasticsearch, Bing</td>
                                            <td className="p-3 bg-orange-50/50 dark:bg-orange-950/50">PubMed, arXiv</td>
                                            <td className="p-3 bg-pink-50/50 dark:bg-pink-950/50">Wikipedia, Amazon</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Comparison Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Comparison: Same Query, Different Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="font-semibold">Precision (Top 3 Results)</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">Boolean</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '67%' }}>
                                                        67%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">VSM</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '100%' }}>
                                                        100%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">BM25</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '100%' }}>
                                                        100%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">Structured</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-orange-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '100%' }}>
                                                        100%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Recall (All Relevant Docs)</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">Boolean</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '60%' }}>
                                                        60%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">VSM</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '80%' }}>
                                                        80%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">BM25</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '80%' }}>
                                                        80%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 text-sm">Browsing</div>
                                                <div className="flex-1 bg-secondary rounded-full h-6">
                                                    <div className="bg-pink-500 h-6 rounded-full flex items-center justify-end pr-2 text-xs text-white" style={{ width: '60%' }}>
                                                        60%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <p className="font-semibold mb-2">Key Insights:</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Boolean has lower recall (misses partial matches)</li>
                                        <li>• VSM and BM25 achieve best balance of precision and recall</li>
                                        <li>• Structured retrieval has highest precision when structure is available</li>
                                        <li>• Browsing trades efficiency for discovery and learning</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Decision Guide */}
                    <Card className="border-2 border-primary">
                        <CardHeader>
                            <CardTitle>Decision Guide: Which Model Should You Use?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                        <p className="font-bold mb-2">Use Boolean Model when:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ You need exact, unambiguous matches</li>
                                            <li>✓ Legal or regulatory compliance required</li>
                                            <li>✓ Users are expert searchers</li>
                                            <li>✓ Precision &gt; Recall</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                        <p className="font-bold mb-2">Use VSM when:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ General web search</li>
                                            <li>✓ Document clustering needed</li>
                                            <li>✓ Simple, fast implementation required</li>
                                            <li>✓ Good enough for most cases</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                                        <p className="font-bold mb-2">Use BM25 when:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ Building production search engine</li>
                                            <li>✓ Need best ranking quality</li>
                                            <li>✓ Can tune parameters for your domain</li>
                                            <li>✓ Elasticsearch/Lucene available</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                                        <p className="font-bold mb-2">Use Structured Retrieval when:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ Documents have clear structure (XML/HTML)</li>
                                            <li>✓ Field-specific search needed</li>
                                            <li>✓ Academic/scientific papers</li>
                                            <li>✓ Email or structured data</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                                        <p className="font-bold mb-2">Use Browsing when:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ Users have vague information needs</li>
                                            <li>✓ Discovery and learning important</li>
                                            <li>✓ E-commerce or content exploration</li>
                                            <li>✓ Complement to search</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                                        <p className="font-bold mb-2">Best Practice: Hybrid Approach</p>
                                        <ul className="text-sm space-y-1">
                                            <li>✓ Use BM25 for initial ranking</li>
                                            <li>✓ Add structured filters (facets)</li>
                                            <li>✓ Provide browsing for exploration</li>
                                            <li>✓ Learn from user behavior</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {/* Navigation */}
            <div className="flex justify-center">
                <Button variant="outline" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lab Hub
                    </Link>
                </Button>
            </div>
        </div>
    )
}
