'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function RelevanceFeedbackLab() {
    const [selectedRelevant, setSelectedRelevant] = useState<number[]>([])
    const [selectedNonRelevant, setSelectedNonRelevant] = useState<number[]>([])
    const [modifiedQuery, setModifiedQuery] = useState<number[]>([])

    const originalQuery = [1.0, 0.0, 0.0]
    const documents = [
        { id: 1, vector: [0.8, 0.2, 0.0], text: 'Machine learning algorithms' },
        { id: 2, vector: [0.9, 0.3, 0.0], text: 'Deep learning neural networks' },
        { id: 3, vector: [0.1, 0.9, 0.0], text: 'Database management systems' },
        { id: 4, vector: [0.0, 0.1, 0.9], text: 'Web development frameworks' }
    ]

    const toggleRelevant = (id: number) => {
        if (selectedRelevant.includes(id)) {
            setSelectedRelevant(selectedRelevant.filter(x => x !== id))
        } else {
            setSelectedRelevant([...selectedRelevant, id])
            setSelectedNonRelevant(selectedNonRelevant.filter(x => x !== id))
        }
    }

    const toggleNonRelevant = (id: number) => {
        if (selectedNonRelevant.includes(id)) {
            setSelectedNonRelevant(selectedNonRelevant.filter(x => x !== id))
        } else {
            setSelectedNonRelevant([...selectedNonRelevant, id])
            setSelectedRelevant(selectedRelevant.filter(x => x !== id))
        }
    }

    const applyRocchio = () => {
        const alpha = 1.0, beta = 0.75, gamma = 0.15

        // Start with original query
        let newQuery = originalQuery.map(x => alpha * x)

        // Add relevant documents centroid
        if (selectedRelevant.length > 0) {
            const relDocs = documents.filter(d => selectedRelevant.includes(d.id))
            const relCentroid = [0, 0, 0]
            relDocs.forEach(doc => {
                doc.vector.forEach((val, i) => {
                    relCentroid[i] += val
                })
            })
            relCentroid.forEach((val, i) => {
                newQuery[i] += (beta * val) / relDocs.length
            })
        }

        // Subtract non-relevant documents centroid
        if (selectedNonRelevant.length > 0) {
            const nonRelDocs = documents.filter(d => selectedNonRelevant.includes(d.id))
            const nonRelCentroid = [0, 0, 0]
            nonRelDocs.forEach(doc => {
                doc.vector.forEach((val, i) => {
                    nonRelCentroid[i] += val
                })
            })
            nonRelCentroid.forEach((val, i) => {
                newQuery[i] -= (gamma * val) / nonRelDocs.length
            })
        }

        setModifiedQuery(newQuery.map(x => Math.max(0, x)))
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Relevance Feedback Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Learn from user judgments with the Rocchio algorithm
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
                        Search is not a one-step process - it's a conversation. Relevance feedback lets users teach the system what they want by marking results as relevant or non-relevant.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">The Rocchio Algorithm:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Moves query toward relevant documents</li>
                            <li>• Moves query away from non-relevant documents</li>
                            <li>• Automatically improves query without user rewriting</li>
                            <li>• Overcomes vocabulary mismatch problem</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Formula */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📐</span> Rocchio Formula
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">q_new = α·q_old + β·centroid(relevant) - γ·centroid(non-relevant)</div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <span className="font-mono font-bold text-xl">α</span>
                            <span className="text-muted-foreground text-lg">Weight for original query (typically 1.0)</span>
                        </div>
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <span className="font-mono font-bold text-xl">β</span>
                            <span className="text-muted-foreground text-lg">Weight for relevant docs (typically 0.75)</span>
                        </div>
                        <div className="flex gap-4 p-6 bg-secondary/20 rounded">
                            <span className="font-mono font-bold text-xl">γ</span>
                            <span className="text-muted-foreground text-lg">Weight for non-relevant docs (typically 0.15)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">q_new = α·q_old + β·centroid(Dr) - γ·centroid(Dnr)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">q_new</span>: Modified query vector after feedback
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">q_old</span>: Original query vector before feedback
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">α (=1.0)</span>: Weight preserving original query intent
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">β (=0.75)</span>: Weight pulling query toward relevant documents
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">γ (=0.15)</span>: Weight pushing query away from non-relevant documents
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Dr</span>: Set of documents marked relevant by user
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Dnr</span>: Set of documents marked non-relevant
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">centroid()</span>: Average vector of a document set
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            The Rocchio algorithm moves the query vector in vector space — toward the centroid of relevant documents and away from non-relevant ones. Higher β means stronger attraction to relevant docs. The asymmetry (β &gt;&gt; γ) reflects that positive evidence is more reliable than negative.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Apply Rocchio
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Original Query Vector:</label>
                        <div className="bg-secondary/30 p-6 rounded font-mono text-lg">
                            [{originalQuery.join(', ')}]
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Mark Documents:</label>
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className="border-2 p-6 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="space-y-3">
                                            <Button
                                                variant={selectedRelevant.includes(doc.id) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => toggleRelevant(doc.id)}
                                                className="w-24"
                                            >
                                                Relevant
                                            </Button>
                                            <Button
                                                variant={selectedNonRelevant.includes(doc.id) ? "destructive" : "outline"}
                                                size="sm"
                                                onClick={() => toggleNonRelevant(doc.id)}
                                                className="w-24"
                                            >
                                                Not Relevant
                                            </Button>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg mb-2">Doc {doc.id}: {doc.text}</p>
                                            <p className="font-mono text-sm text-muted-foreground">Vector: [{doc.vector.join(', ')}]</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={applyRocchio} size="lg" className="w-full text-lg">
                        <Play className="h-5 w-5 mr-2" /> Apply Rocchio Algorithm
                    </Button>

                    {modifiedQuery.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-xl font-semibold">Modified Query Vector:</label>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                                <p className="font-mono text-lg mb-2">[{modifiedQuery.map(x => x.toFixed(3)).join(', ')}]</p>
                                <p className="text-sm text-muted-foreground">
                                    The query has been moved toward relevant documents and away from non-relevant ones!
                                </p>
                            </div>
                        </div>
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
                            <li>• Automatic query improvement</li>
                            <li>• Overcomes vocabulary mismatch</li>
                            <li>• Theoretically grounded (optimal in VSM)</li>
                            <li>• Works with any vector space model</li>
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
                            <li>• Requires user interaction (effort)</li>
                            <li>• Cold start problem (no feedback initially)</li>
                            <li>• Assumes user judgments are correct</li>
                            <li>• Computationally expensive for large collections</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* IR Application */}
            <Card className="bg-secondary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🌐</span> IR Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">
                        Rocchio feedback is used in SMART system (pioneering IR), medical literature search (PubMed relevance feedback), patent search (refining complex technical queries), and modern recommendation systems (implicit feedback from clicks/dwell time).
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/structural-queries">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Structural Queries
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/local-analysis">
                        Next: Local Analysis <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
