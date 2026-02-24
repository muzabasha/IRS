'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ProbabilisticModelLab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab 3 of 5</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Probabilistic Model (BM25) Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master probability-based relevance ranking with BM25 (Best Match 25)
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Probabilistic Model?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        VSM uses TF-IDF heuristically without theoretical justification. The Probabilistic Model asks:
                        "What is the probability that this document is relevant given the query?" This provides a solid
                        mathematical foundation based on probability theory.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Elasticsearch and Lucene (default ranking algorithm)</li>
                            <li>• Microsoft Bing search engine</li>
                            <li>• Academic search engines (Google Scholar, Semantic Scholar)</li>
                            <li>• Enterprise search systems</li>
                            <li>• Question answering systems</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">What Problem Does It Solve?</p>
                        <p className="text-sm">VSM's TF-IDF is ad-hoc. BM25 derives its formula from the Probability Ranking Principle:
                            rank documents by P(relevant|doc, query). It also handles document length better and prevents term frequency saturation.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Scoring Function */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Scoring Function: BM25
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-sm text-center overflow-x-auto">
                        BM25(d, q) = Σ IDF(t) × [f(t,d) × (k₁ + 1)] / [f(t,d) + k₁ × (1 - b + b × |d|/avgdl)]
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">IDF(t)</span>
                                <span className="text-muted-foreground">Inverse Document Frequency: log((N - df + 0.5) / (df + 0.5))</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">f(t,d)</span>
                                <span className="text-muted-foreground">Term frequency: how many times term t appears in document d</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">k₁</span>
                                <span className="text-muted-foreground">Term frequency saturation parameter (typical: 1.2-2.0)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">b</span>
                                <span className="text-muted-foreground">Document length normalization (0 to 1, typical: 0.75)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">|d|</span>
                                <span className="text-muted-foreground">Length of document d (number of terms)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">avgdl</span>
                                <span className="text-muted-foreground">Average document length in the collection</span>
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
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="font-semibold">Term Frequency Saturation (k₁)</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                As term frequency increases, the contribution diminishes. 50 occurrences is not 50× better than 10.
                                The saturation function prevents spam (keyword stuffing).
                            </p>
                            <div className="mt-2 text-xs font-mono bg-secondary/30 p-2 rounded">
                                f=1 → score ≈ 0.55 | f=5 → score ≈ 0.83 | f=50 → score ≈ 0.98 (diminishing returns)
                            </div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold">Document Length Normalization (b)</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                b=0: No normalization (long docs favored). b=1: Full normalization (penalize long docs).
                                b=0.75: Balanced (typical default).
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <p className="font-semibold">Probabilistic Foundation</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                BM25 is derived from the Binary Independence Model (BIM) using probability theory.
                                It estimates P(relevant | document contains terms).
                            </p>
                        </div>
                    </div>
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
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: Query = "machine learning", k₁=1.5, b=0.75</p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 1</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate IDF for query terms</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        N=100 docs, df(machine)=20, df(learning)=30<br />
                                        IDF(machine) = log((100-20+0.5)/(20+0.5)) = 1.38<br />
                                        IDF(learning) = log((100-30+0.5)/(30+0.5)) = 0.83
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 2</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">For Doc1: |d|=50, avgdl=100, f(machine)=3, f(learning)=2</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Length norm = 1 - 0.75 + 0.75 × (50/100) = 0.625<br />
                                        Score(machine) = 1.38 × [3×2.5] / [3 + 1.5×0.625] = 1.38 × 1.94 = 2.68<br />
                                        Score(learning) = 0.83 × [2×2.5] / [2 + 1.5×0.625] = 0.83 × 1.79 = 1.49<br />
                                        <span className="text-green-600 font-bold">Total BM25(Doc1) = 2.68 + 1.49 = 4.17</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5 bg-green-600">Step 3</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Repeat for all documents and rank by score</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Doc1: 4.17 (Rank 1) ✓<br />
                                        Doc2: 3.82 (Rank 2)<br />
                                        Doc3: 2.15 (Rank 3)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Code */}
            <Card className="border-2 border-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`import math
from collections import Counter

def bm25_score(query_terms, document, all_documents, k1=1.5, b=0.75):
    """Calculate BM25 score for a document given a query"""
    N = len(all_documents)
    avgdl = sum(len(doc.split()) for doc in all_documents) / N
    doc_len = len(document.split())
    doc_terms = document.lower().split()
    
    score = 0
    for term in query_terms:
        # Calculate IDF
        df = sum(1 for doc in all_documents if term in doc.lower())
        if df == 0:
            continue
        idf = math.log((N - df + 0.5) / (df + 0.5))
        
        # Calculate term frequency
        tf = doc_terms.count(term)
        
        # Calculate BM25 component for this term
        numerator = tf * (k1 + 1)
        denominator = tf + k1 * (1 - b + b * (doc_len / avgdl))
        score += idf * (numerator / denominator)
    
    return score

# Example
documents = [
    "machine learning algorithms for data science",
    "deep learning neural networks",
    "machine vision and computer graphics"
]
query = "machine learning"
query_terms = query.lower().split()

# Calculate scores
scores = [(i, bm25_score(query_terms, doc, documents)) 
          for i, doc in enumerate(documents)]
scores.sort(key=lambda x: x[1], reverse=True)

print("BM25 Ranked Results:")
for rank, (doc_id, score) in enumerate(scores, 1):
    print(f"{rank}. Doc{doc_id+1}: {score:.4f}")`}</pre>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of BM25
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">1. Still Lexical (No Semantics)</p>
                        <p className="text-sm text-muted-foreground">
                            Like VSM, BM25 is word-based. Cannot handle synonyms, paraphrases, or semantic similarity.
                            "car" ≠ "automobile" in BM25.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">2. Parameter Tuning Required</p>
                        <p className="text-sm text-muted-foreground">
                            k₁ and b need to be tuned for each collection. Optimal values vary by domain (news vs academic papers).
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">3. Term Independence</p>
                        <p className="text-sm text-muted-foreground">
                            Treats query terms independently. Cannot capture phrases or term dependencies.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Language Models & Neural IR
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Advanced models address BM25 limitations:</p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Language Models (Query Likelihood)</p>
                                <p className="text-sm text-muted-foreground">
                                    Model documents as language generators. P(query | document language model)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Neural IR (BERT, Dense Retrieval)</p>
                                <p className="text-sm text-muted-foreground">
                                    Learn semantic representations. "car" and "automobile" have similar embeddings
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/language-model">
                            Next Lab: Language Model <ArrowRight className="ml-2 h-4 w-4" />
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
                <CardContent className="space-y-3">
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q1: What does k₁ parameter control?</p>
                        <p className="text-sm text-green-600">A: Term frequency saturation - how quickly additional term occurrences stop adding value</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q2: What does b=0 vs b=1 mean?</p>
                        <p className="text-sm text-green-600">A: b=0: no length normalization (favors long docs), b=1: full normalization (penalizes long docs)</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q3: How is BM25 better than TF-IDF?</p>
                        <p className="text-sm text-green-600">A: Probabilistic foundation, better length normalization, term frequency saturation, tunable parameters</p>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/vector-space-model">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Vector Space Model
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/language-model">
                        Next: Language Model <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
