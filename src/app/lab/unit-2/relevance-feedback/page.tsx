'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'

export default function RelevanceFeedbackLab() {
    const [alpha, setAlpha] = useState(1.0)
    const [beta, setBeta] = useState(0.75)
    const [gamma, setGamma] = useState(0.15)
    const [queryVector, setQueryVector] = useState([0.5, 0.3])
    const [newQuery, setNewQuery] = useState<number[]>([])

    const relevantDocs = [[0.8, 0.6], [0.7, 0.5]]
    const nonRelevantDocs = [[0.1, 0.8], [0.2, 0.9]]

    const calculateRocchio = () => {
        // Rocchio formula implementation
        const q_new = [...queryVector]

        // Alpha * original query
        q_new[0] = alpha * queryVector[0]
        q_new[1] = alpha * queryVector[1]

        // Beta * average of relevant docs
        const relAvg = [
            relevantDocs.reduce((sum, doc) => sum + doc[0], 0) / relevantDocs.length,
            relevantDocs.reduce((sum, doc) => sum + doc[1], 0) / relevantDocs.length
        ]
        q_new[0] += beta * relAvg[0]
        q_new[1] += beta * relAvg[1]

        // Gamma * average of non-relevant docs
        const nonRelAvg = [
            nonRelevantDocs.reduce((sum, doc) => sum + doc[0], 0) / nonRelevantDocs.length,
            nonRelevantDocs.reduce((sum, doc) => sum + doc[1], 0) / nonRelevantDocs.length
        ]
        q_new[0] -= gamma * nonRelAvg[0]
        q_new[1] -= gamma * nonRelAvg[1]

        setNewQuery([Math.max(0, q_new[0]), Math.max(0, q_new[1])])
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 2 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Relevance Feedback Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Interactive query refinement using the Rocchio Algorithm
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Relevance Feedback?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Users often struggle to formulate perfect queries. Relevance feedback turns search into a conversation:
                        the system learns from what you like and dislike, automatically improving the query.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google's "More like this" feature</li>
                            <li>• Spotify's "Discover Weekly" (implicit feedback)</li>
                            <li>• Amazon's "Customers who bought this also bought"</li>
                            <li>• Academic search engines (PubMed, Google Scholar)</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">The Problem It Solves:</p>
                        <p className="text-sm">
                            Initial query: "car" → Results include automobiles, but also toy cars and car insurance.
                            User marks automobile articles as relevant → System learns to add terms like "vehicle", "automotive", "engine"
                            → Next search finds better results without user typing those words!
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Rocchio Formula */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> The Rocchio Algorithm
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-sm">
                        q_new = α × q_original + β × (avg of relevant docs) - γ × (avg of non-relevant docs)
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">q_new</span>
                                <span className="text-muted-foreground">Modified query vector after feedback</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">α (alpha)</span>
                                <span className="text-muted-foreground">Weight for original query (typical: 1.0) - trust in initial query</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">β (beta)</span>
                                <span className="text-muted-foreground">Weight for relevant docs (typical: 0.75) - move toward relevant</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">γ (gamma)</span>
                                <span className="text-muted-foreground">Weight for non-relevant docs (typical: 0.15) - move away from irrelevant</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Intuition:</p>
                        <p className="text-sm">
                            Imagine your query as a point in space. Relevant documents pull it toward them (positive force).
                            Non-relevant documents push it away (negative force). The new query is the balanced result.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Rocchio Calculator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Rocchio Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Original Query Vector:</label>
                                <div className="bg-secondary/30 p-3 rounded font-mono">
                                    [{queryVector[0].toFixed(2)}, {queryVector[1].toFixed(2)}]
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Relevant Documents:</label>
                                <div className="bg-green-50 dark:bg-green-950 p-3 rounded space-y-1">
                                    {relevantDocs.map((doc, i) => (
                                        <div key={i} className="font-mono text-sm">
                                            Doc{i + 1}: [{doc[0]}, {doc[1]}]
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Non-Relevant Documents:</label>
                                <div className="bg-red-50 dark:bg-red-950 p-3 rounded space-y-1">
                                    {nonRelevantDocs.map((doc, i) => (
                                        <div key={i} className="font-mono text-sm">
                                            Doc{i + 1}: [{doc[0]}, {doc[1]}]
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">α (Alpha): {alpha.toFixed(2)}</label>
                                <Slider
                                    value={[alpha]}
                                    onValueChange={(v) => setAlpha(v[0])}
                                    min={0}
                                    max={2}
                                    step={0.05}
                                />
                                <p className="text-xs text-muted-foreground">Trust in original query</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">β (Beta): {beta.toFixed(2)}</label>
                                <Slider
                                    value={[beta]}
                                    onValueChange={(v) => setBeta(v[0])}
                                    min={0}
                                    max={2}
                                    step={0.05}
                                />
                                <p className="text-xs text-muted-foreground">Pull toward relevant docs</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">γ (Gamma): {gamma.toFixed(2)}</label>
                                <Slider
                                    value={[gamma]}
                                    onValueChange={(v) => setGamma(v[0])}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                />
                                <p className="text-xs text-muted-foreground">Push away from non-relevant docs</p>
                            </div>

                            <Button onClick={calculateRocchio} className="w-full" size="lg">
                                <RefreshCw className="mr-2 h-4 w-4" /> Calculate New Query
                            </Button>

                            {newQuery.length > 0 && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">New Query Vector:</label>
                                    <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                                        <div className="font-mono text-lg text-center">
                                            [{newQuery[0].toFixed(3)}, {newQuery[1].toFixed(3)}]
                                        </div>
                                        <div className="mt-2 text-sm text-center text-muted-foreground">
                                            Change: [{(newQuery[0] - queryVector[0]).toFixed(3)}, {(newQuery[1] - queryVector[1]).toFixed(3)}]
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Step-by-Step Illustration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📊</span> Step-by-Step Calculation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: Updating Query Vector</p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 1</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Original Query</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        q_0 = [0.5, 0.3]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 2</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate Relevant Centroid</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        avg_rel = ([0.8, 0.6] + [0.7, 0.5]) / 2 = [0.75, 0.55]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 3</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate Non-Relevant Centroid</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1">
                                        avg_non = ([0.1, 0.8] + [0.2, 0.9]) / 2 = [0.15, 0.85]
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5 bg-green-600">Step 4</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Apply Rocchio Formula (α=1.0, β=0.75, γ=0.15)</p>
                                    <div className="font-mono bg-background p-2 rounded mt-1 space-y-1">
                                        <div>q_new[0] = 1.0×0.5 + 0.75×0.75 - 0.15×0.15 = 1.04</div>
                                        <div>q_new[1] = 1.0×0.3 + 0.75×0.55 - 0.15×0.85 = 0.54</div>
                                        <div className="text-green-600 font-bold">Result: [1.04, 0.54] ✓</div>
                                    </div>
                                </div>
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
                        <code>{`import numpy as np

def rocchio_feedback(q_original, relevant_docs, non_relevant_docs, 
                     alpha=1.0, beta=0.75, gamma=0.15):
    """
    Rocchio Algorithm for Relevance Feedback
    
    Args:
        q_original: Original query vector
        relevant_docs: List of relevant document vectors
        non_relevant_docs: List of non-relevant document vectors
        alpha: Weight for original query
        beta: Weight for relevant documents
        gamma: Weight for non-relevant documents
    
    Returns:
        Modified query vector
    """
    q_new = alpha * np.array(q_original)
    
    # Add centroid of relevant documents
    if len(relevant_docs) > 0:
        rel_centroid = np.mean(relevant_docs, axis=0)
        q_new += beta * rel_centroid
    
    # Subtract centroid of non-relevant documents
    if len(non_relevant_docs) > 0:
        non_rel_centroid = np.mean(non_relevant_docs, axis=0)
        q_new -= gamma * non_rel_centroid
    
    # Ensure non-negative weights
    q_new = np.maximum(q_new, 0)
    
    return q_new

# Example usage
q_orig = np.array([0.5, 0.3])
rel_docs = np.array([[0.8, 0.6], [0.7, 0.5]])
non_rel_docs = np.array([[0.1, 0.8], [0.2, 0.9]])

q_modified = rocchio_feedback(q_orig, rel_docs, non_rel_docs)
print(f"Original Query: {q_orig}")
print(f"Modified Query: {q_modified}")
print(f"Change: {q_modified - q_orig}")`}</code>
                    </pre>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Output:</p>
                        <pre className="text-sm font-mono">
                            Original Query: [0.5 0.3]
                            Modified Query: [1.04 0.54]
                            Change: [0.54 0.24]
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Types of Feedback */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔄</span> Types of Relevance Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold">1. Explicit Feedback</p>
                        <p className="text-sm text-muted-foreground">
                            User explicitly marks documents as relevant/non-relevant (thumbs up/down).
                            Most accurate but requires user effort.
                        </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold">2. Implicit Feedback</p>
                        <p className="text-sm text-muted-foreground">
                            System infers relevance from user behavior (clicks, time spent, scrolling).
                            No extra effort but less accurate.
                        </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold">3. Pseudo-Relevance Feedback (Blind Feedback)</p>
                        <p className="text-sm text-muted-foreground">
                            System assumes top K results are relevant without asking user.
                            Fully automatic but risky if initial results are poor.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Relevance Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. Query Drift</p>
                            <p className="text-sm text-muted-foreground">
                                If initial results are poor, feedback can move the query in the wrong direction entirely.
                                Example: Searching "jaguar" (animal) but getting car results → feedback makes it worse.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. User Effort Required</p>
                            <p className="text-sm text-muted-foreground">
                                Explicit feedback requires users to mark documents. Most users won't do this extra work.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. Computational Cost</p>
                            <p className="text-sm text-muted-foreground">
                                Recalculating query vectors and re-ranking documents takes time. Not suitable for real-time search.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. Cold Start Problem</p>
                            <p className="text-sm text-muted-foreground">
                                Needs initial results to learn from. If the first query returns nothing, feedback can't help.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Text Preprocessing
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Text preprocessing addresses vocabulary mismatch and improves feedback effectiveness:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Stemming & Lemmatization</p>
                                <p className="text-sm text-muted-foreground">
                                    Reduce words to root forms: "running", "runs", "ran" → "run". Helps match related terms.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Stopword Removal</p>
                                <p className="text-sm text-muted-foreground">
                                    Remove common words ("the", "is", "and") that don't carry meaning, reducing noise in feedback.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Thesaurus Expansion</p>
                                <p className="text-sm text-muted-foreground">
                                    Automatically add synonyms: "car" → also search "automobile", "vehicle". Improves recall.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/unit-2/text-preprocessing">
                            Next Lab: Text Preprocessing <ArrowRight className="ml-2 h-4 w-4" />
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
                            <p className="font-semibold mb-2">Q1: What does the Rocchio algorithm do?</p>
                            <p className="text-sm text-green-600">A: It modifies the query vector by moving it toward relevant documents and away from non-relevant ones using weighted averages</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why is beta typically larger than gamma?</p>
                            <p className="text-sm text-green-600">A: Because moving toward relevant documents is more reliable than moving away from non-relevant ones (which might be diverse)</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is pseudo-relevance feedback?</p>
                            <p className="text-sm text-green-600">A: Automatically assuming the top K results are relevant without user input, then using them for query expansion</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-2/query-languages">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Query Languages
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-2/text-preprocessing">
                        Next: Text Preprocessing <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
