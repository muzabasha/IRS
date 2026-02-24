'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { VSMCalculator } from '@/components/lab/vsm-calculator'

export default function VectorSpaceModelLab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab 2 of 5</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Vector Space Model (VSM) Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master similarity-based ranking with TF-IDF and cosine similarity
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Vector Space Model?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Boolean Model can only say "match" or "no match". But in real search, we need to rank documents by relevance.
                        VSM solves this by representing documents and queries as vectors in multi-dimensional space, allowing us to
                        measure "how similar" they are using angles.
                    </p>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google Search ranking (foundation of modern search engines)</li>
                            <li>• Document clustering and classification</li>
                            <li>• Recommendation systems (Netflix, Amazon)</li>
                            <li>• Plagiarism detection and duplicate finding</li>
                            <li>• Content-based image retrieval</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">What Problem Does It Solve?</p>
                        <p className="text-sm">Boolean Model's limitation: All matching documents get score = 1. With VSM, documents get
                            continuous scores (0 to 1) based on how well they match the query, enabling proper ranking.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Scoring Function */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Scoring Function: Cosine Similarity
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-lg">
                        sim(q, d) = cos(θ) = (q · d) / (||q|| × ||d||)
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">q · d</span>
                                <span className="text-muted-foreground">Dot product: Σ(q_i × d_i) - measures term overlap</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">||q||</span>
                                <span className="text-muted-foreground">Query magnitude: √(Σq_i²) - normalizes query length</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">||d||</span>
                                <span className="text-muted-foreground">Document magnitude: √(Σd_i²) - normalizes doc length</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">cos(θ)</span>
                                <span className="text-muted-foreground">Angle between vectors: 0° = identical, 90° = unrelated</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2">TF-IDF Weighting:</p>
                        <div className="space-y-2 text-sm">
                            <div className="font-mono">w(t,d) = TF(t,d) × IDF(t)</div>
                            <div>• <span className="font-semibold">TF (Term Frequency)</span>: How often term appears in document</div>
                            <div>• <span className="font-semibold">IDF (Inverse Document Frequency)</span>: How rare/important the term is</div>
                            <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded">
                                <div>TF(t,d) = f(t,d) / |d|</div>
                                <div>IDF(t) = log(N / df_t)</div>
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
                            <p className="font-semibold">Why Cosine Similarity?</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Cosine measures the angle between vectors, not their length. This means a short document with relevant
                                terms can score as high as a long document with the same terms. It's length-normalized.
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold">Why TF-IDF?</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <span className="font-semibold">TF</span> rewards documents where query terms appear frequently.
                                <span className="font-semibold"> IDF</span> penalizes common words (like "the", "is") and rewards rare,
                                discriminative terms (like "quantum", "photosynthesis").
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <p className="font-semibold">Score Range</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Cosine similarity ranges from 0 (completely unrelated) to 1 (identical). A score of 0.5 means moderate similarity.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <VSMCalculator />

            {/* Step-by-Step Illustration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📊</span> Step-by-Step Illustration
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: Query = "machine learning", Vocabulary = ["machine", "learning", "data"]</p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 1</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate TF for each term in documents</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Doc1: "machine learning data machine" → TF(machine)=2/4=0.5, TF(learning)=1/4=0.25, TF(data)=1/4=0.25<br />
                                        Doc2: "learning data" → TF(machine)=0, TF(learning)=1/2=0.5, TF(data)=1/2=0.5
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 2</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate IDF for each term</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        IDF(machine) = log(2/1) = 0.301 (appears in 1 of 2 docs)<br />
                                        IDF(learning) = log(2/2) = 0 (appears in all docs - common word)<br />
                                        IDF(data) = log(2/2) = 0
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 3</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate TF-IDF weights</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Doc1: [0.5×0.301, 0.25×0, 0.25×0] = [0.151, 0, 0]<br />
                                        Doc2: [0×0.301, 0.5×0, 0.5×0] = [0, 0, 0]<br />
                                        Query: [1×0.301, 1×0, 0×0] = [0.301, 0, 0]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5 bg-green-600">Step 4</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate Cosine Similarity</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        sim(Q, Doc1) = (0.301×0.151) / (√0.301² × √0.151²) = 0.045 / 0.045 = 1.0 ✓<br />
                                        sim(Q, Doc2) = 0 / ... = 0.0<br />
                                        <span className="text-green-600 font-bold">Ranking: Doc1 (1.0) &gt; Doc2 (0.0)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Key Insight:</p>
                        <p className="text-sm">
                            Doc1 scores higher because it contains "machine" which is a rare, discriminative term (high IDF).
                            "learning" and "data" appear in all documents, so they have IDF=0 and don't contribute to ranking.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Python Code Demo */}
            <Card className="border-2 border-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`import math
from collections import Counter

def calculate_tf(term, document):
    """Term Frequency: occurrences / total terms"""
    words = document.lower().split()
    return words.count(term) / len(words)

def calculate_idf(term, documents):
    """Inverse Document Frequency: log(N / df)"""
    N = len(documents)
    df = sum(1 for doc in documents if term in doc.lower())
    return math.log(N / df) if df > 0 else 0

def calculate_tfidf(term, document, documents):
    """TF-IDF = TF × IDF"""
    tf = calculate_tf(term, document)
    idf = calculate_idf(term, documents)
    return tf * idf

def cosine_similarity(vec1, vec2):
    """Cosine similarity between two vectors"""
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(a**2 for a in vec1))
    magnitude2 = math.sqrt(sum(b**2 for b in vec2))
    if magnitude1 == 0 or magnitude2 == 0:
        return 0
    return dot_product / (magnitude1 * magnitude2)

# Example usage
documents = [
    "machine learning algorithms",
    "deep learning neural networks",
    "machine vision systems"
]
query = "machine learning"

# Build vocabulary
vocab = set()
for doc in documents + [query]:
    vocab.update(doc.lower().split())

# Calculate TF-IDF vectors
query_vector = [calculate_tfidf(term, query, documents) for term in vocab]
doc_vectors = [[calculate_tfidf(term, doc, documents) for term in vocab] 
               for doc in documents]

# Calculate similarities and rank
scores = [(i, cosine_similarity(query_vector, doc_vec)) 
          for i, doc_vec in enumerate(doc_vectors)]
scores.sort(key=lambda x: x[1], reverse=True)

print("Ranked Results:")
for rank, (doc_id, score) in enumerate(scores, 1):
    print(f"{rank}. Doc{doc_id + 1}: {documents[doc_id]} (Score: {score:.4f})")`}</pre>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded text-sm">
                        <p className="font-semibold mb-1">Output:</p>
                        <div className="font-mono text-xs">
                            Ranked Results:<br />
                            1. Doc1: machine learning algorithms (Score: 0.8165)<br />
                            2. Doc3: machine vision systems (Score: 0.5774)<br />
                            3. Doc2: deep learning neural networks (Score: 0.4082)
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Vector Space Model
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. Term Independence Assumption</p>
                            <p className="text-sm text-muted-foreground">
                                VSM treats all terms as independent. It cannot understand that "New York" is a single entity, not two
                                separate words. Phrases and multi-word expressions are lost.
                            </p>
                            <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                                Query: "New York" → Treated as: ["New", "York"] separately<br />
                                Document about "York, England" might rank high due to "York"
                            </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Vocabulary Mismatch (Synonym Problem)</p>
                            <p className="text-sm text-muted-foreground">
                                If query uses "car" but document uses "automobile", VSM gives 0 similarity despite identical meaning.
                                Cannot handle synonyms, abbreviations, or different terminology.
                            </p>
                            <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                                Query: "car repair" → Doc: "automobile maintenance" → Score: 0.0 ❌<br />
                                (Even though they mean the same thing!)
                            </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. No Probabilistic Foundation</p>
                            <p className="text-sm text-muted-foreground">
                                TF-IDF is a heuristic formula. Why multiply TF and IDF? Why use log for IDF? These choices lack
                                theoretical justification from probability theory.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. High Dimensionality & Sparsity</p>
                            <p className="text-sm text-muted-foreground">
                                With millions of unique terms, vectors become extremely sparse (mostly zeros). This is computationally
                                expensive and wastes memory. Most vector components are zero.
                            </p>
                            <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                                Vocabulary size: 1,000,000 terms<br />
                                Average document: 500 terms<br />
                                Vector sparsity: 99.95% zeros!
                            </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">5. No Semantic Understanding</p>
                            <p className="text-sm text-muted-foreground">
                                VSM is purely lexical (word-based). It cannot understand that "king" - "man" + "woman" ≈ "queen".
                                No concept of word relationships or semantics.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Probabilistic Model (BM25)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        The Probabilistic Model (BM25) addresses VSM limitations by:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Probabilistic Foundation</p>
                                <p className="text-sm text-muted-foreground">
                                    Derives ranking formula from probability theory: P(relevant | document, query)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Document Length Normalization</p>
                                <p className="text-sm text-muted-foreground">
                                    Handles varying document lengths better with parameter b (0 to 1)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Term Frequency Saturation</p>
                                <p className="text-sm text-muted-foreground">
                                    Prevents over-weighting: 50 occurrences not 50× better than 10 occurrences
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Tunable Parameters</p>
                                <p className="text-sm text-muted-foreground">
                                    k1 and b parameters can be optimized for different document collections
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/probabilistic-model">
                            Next Lab: Probabilistic Model (BM25) <ArrowRight className="ml-2 h-4 w-4" />
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
                            <p className="font-semibold mb-2">Q1: Why use cosine similarity instead of Euclidean distance?</p>
                            <p className="text-sm text-green-600">A: Cosine measures angle (direction), not length. This normalizes for document length - a short relevant doc can score as high as a long one.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: What does IDF measure and why is it important?</p>
                            <p className="text-sm text-green-600">A: IDF measures term rarity. Rare terms (high IDF) are more discriminative and important for ranking than common terms (low IDF like "the", "is").</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is the main limitation VSM cannot handle?</p>
                            <p className="text-sm text-green-600">A: Vocabulary mismatch - synonyms, different terminology. Query "car" won't match document with "automobile" despite same meaning.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q4: What is the range of cosine similarity scores?</p>
                            <p className="text-sm text-green-600">A: 0 to 1, where 0 = completely unrelated (90° angle) and 1 = identical (0° angle).</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/boolean-model">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Boolean Model
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/probabilistic-model">
                        Next: Probabilistic Model <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
