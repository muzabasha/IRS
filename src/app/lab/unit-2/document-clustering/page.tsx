'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function DocumentClusteringLab() {
    const [activeTab, setActiveTab] = useState<'kmeans' | 'hierarchical' | 'dbscan'>('kmeans')

    const documents = [
        { id: 1, text: 'machine learning algorithms', cluster: 'A', x: 0.8, y: 0.9 },
        { id: 2, text: 'neural networks deep learning', cluster: 'A', x: 0.9, y: 0.85 },
        { id: 3, text: 'database management systems', cluster: 'B', x: 0.2, y: 0.15 },
        { id: 4, text: 'SQL database queries', cluster: 'B', x: 0.15, y: 0.2 },
        { id: 5, text: 'web development frameworks', cluster: 'C', x: 0.5, y: 0.1 },
        { id: 6, text: 'frontend React applications', cluster: 'C', x: 0.55, y: 0.05 },
    ]

    const [iterations, setIterations] = useState(0)
    const [showClusters, setShowClusters] = useState(false)

    const runKMeans = () => {
        setIterations(3)
        setShowClusters(true)
    }

    const tabs = [
        { key: 'kmeans' as const, label: 'K-Means', emoji: '🎯' },
        { key: 'hierarchical' as const, label: 'Hierarchical', emoji: '🌳' },
        { key: 'dbscan' as const, label: 'DBSCAN', emoji: '🔵' },
    ]

    const clusterColors: Record<string, string> = {
        A: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
        B: 'border-green-500 bg-green-50 dark:bg-green-950',
        C: 'border-purple-500 bg-purple-50 dark:bg-purple-950',
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 8 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Document Clustering Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Group similar documents automatically
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
                        Birds of a feather flock together — so do documents about the same topic. Clustering helps organize results, speed up search, and discover document relationships.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: K-Means Objective */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: K-Means Objective
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">J = Σ<sub>k=1</sub><sup>K</sup> Σ<sub>x∈C<sub>k</sub></sub> ‖x - μ<sub>k</sub>‖²</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">J</span>: Total within-cluster sum of squared distances (minimize this)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">K</span>: Number of clusters (user-specified)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">C<sub>k</sub></span>: Set of documents assigned to cluster k
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">x</span>: Document vector (TF-IDF or embedding)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">μ<sub>k</sub></span>: Centroid (mean vector) of cluster k
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">‖·‖²</span>: Squared Euclidean distance
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            K-Means iteratively assigns each document to the nearest centroid, then recomputes centroids. It converges when assignments stabilize. The objective J always decreases — but may find a local minimum, so multiple random restarts are recommended.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Silhouette Score */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Silhouette Score
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">s(i) = (b(i) - a(i)) / max(a(i), b(i))</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">s(i)</span>: Silhouette score for document i (range: -1 to +1)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">a(i)</span>: Average distance to documents in same cluster (cohesion)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">b(i)</span>: Average distance to nearest neighboring cluster (separation)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            s(i) near +1 means the document is well-clustered. Near 0 means it sits on the boundary. Near -1 means it&apos;s likely in the wrong cluster. Average silhouette across all documents evaluates overall clustering quality.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Technique Comparison
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

                    {activeTab === 'kmeans' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🎯 K-Means Clustering</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Partitions N documents into K clusters by minimizing within-cluster variance. Fast and scalable — O(n·K·t) where t = iterations.
                                </p>
                                <div className="grid gap-3">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">Step 1:</p> Initialize K random centroids
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">Step 2:</p> Assign each document to nearest centroid
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">Step 3:</p> Recompute centroids as cluster means
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">Step 4:</p> Repeat Steps 2–3 until convergence
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hierarchical' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🌳 Hierarchical Clustering</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Builds a tree (dendrogram) of nested clusters. No need to specify K in advance — cut the tree at desired level.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg mb-2">Agglomerative (Bottom-Up)</p>
                                        <p className="text-muted-foreground">Start with each doc as its own cluster. Merge closest pairs iteratively. O(n³) time.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg mb-2">Divisive (Top-Down)</p>
                                        <p className="text-muted-foreground">Start with one cluster. Split recursively. Less common but useful for large K.</p>
                                    </div>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded mt-4">
                                    <p className="font-semibold text-lg mb-2">Linkage Methods:</p>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <div className="p-3 bg-secondary/30 rounded">
                                            <p className="font-semibold">Single</p>
                                            <p className="text-sm text-muted-foreground">Min distance between clusters. Produces elongated clusters.</p>
                                        </div>
                                        <div className="p-3 bg-secondary/30 rounded">
                                            <p className="font-semibold">Complete</p>
                                            <p className="text-sm text-muted-foreground">Max distance. Produces compact, spherical clusters.</p>
                                        </div>
                                        <div className="p-3 bg-secondary/30 rounded">
                                            <p className="font-semibold">Average</p>
                                            <p className="text-sm text-muted-foreground">Mean distance. Balanced compromise.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'dbscan' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🔵 DBSCAN (Density-Based)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Groups documents by density — finds arbitrarily shaped clusters and identifies outliers as noise. No need to specify K.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Parameters:</p>
                                        <ul className="space-y-2 text-muted-foreground mt-2">
                                            <li>• <span className="font-mono font-bold">ε (eps)</span>: Neighborhood radius</li>
                                            <li>• <span className="font-mono font-bold">MinPts</span>: Minimum points to form a dense region</li>
                                        </ul>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Point Types:</p>
                                        <ul className="space-y-2 text-muted-foreground mt-2">
                                            <li>• <span className="font-bold text-blue-600">Core</span>: ≥ MinPts neighbors within ε</li>
                                            <li>• <span className="font-bold text-yellow-600">Border</span>: Within ε of a core point</li>
                                            <li>• <span className="font-bold text-red-600">Noise</span>: Neither core nor border</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive K-Means Demo */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> K-Means Clustering Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Documents:</label>
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className={`p-6 rounded-lg border-2 ${showClusters ? clusterColors[doc.cluster] : 'border-gray-300 bg-secondary/20'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-lg">Doc {doc.id}: {doc.text}</p>
                                            <p className="text-sm text-muted-foreground font-mono">Vector: ({doc.x}, {doc.y})</p>
                                        </div>
                                        {showClusters && <Badge className="text-lg">Cluster {doc.cluster}</Badge>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={runKMeans} size="lg" className="text-xl w-full">
                        Run K-Means (K=3)
                    </Button>

                    {showClusters && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">Clustering Result (converged in {iterations} iterations):</p>
                            <ul className="space-y-2 text-lg">
                                <li>• <span className="text-blue-600 font-bold">Cluster A</span>: Machine Learning documents (Docs 1, 2)</li>
                                <li>• <span className="text-green-600 font-bold">Cluster B</span>: Database documents (Docs 3, 4)</li>
                                <li>• <span className="text-purple-600 font-bold">Cluster C</span>: Web Development documents (Docs 5, 6)</li>
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📊</span> Algorithm Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                            <thead>
                                <tr className="bg-secondary/30">
                                    <th className="border-2 p-3 text-left">Feature</th>
                                    <th className="border-2 p-3 text-left">K-Means</th>
                                    <th className="border-2 p-3 text-left">Hierarchical</th>
                                    <th className="border-2 p-3 text-left">DBSCAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="border-2 p-3 font-semibold">Requires K?</td><td className="border-2 p-3">Yes</td><td className="border-2 p-3">No (cut dendrogram)</td><td className="border-2 p-3">No</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Time Complexity</td><td className="border-2 p-3">O(n·K·t)</td><td className="border-2 p-3">O(n³)</td><td className="border-2 p-3">O(n·log n)</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Cluster Shape</td><td className="border-2 p-3">Spherical</td><td className="border-2 p-3">Any (depends on linkage)</td><td className="border-2 p-3">Arbitrary</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Handles Noise?</td><td className="border-2 p-3">No</td><td className="border-2 p-3">No</td><td className="border-2 p-3">Yes (labels outliers)</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Scalability</td><td className="border-2 p-3">High</td><td className="border-2 p-3">Low</td><td className="border-2 p-3">Medium</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Best For</td><td className="border-2 p-3">Large collections</td><td className="border-2 p-3">Taxonomy building</td><td className="border-2 p-3">Noisy data</td></tr>
                            </tbody>
                        </table>
                    </div>
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
                            <li>• Unsupervised — no labeled data needed</li>
                            <li>• Improves search by grouping related results</li>
                            <li>• Enables cluster-based retrieval (faster)</li>
                            <li>• Discovers hidden topic structure</li>
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
                            <li>• K-Means sensitive to initialization</li>
                            <li>• Choosing K is non-trivial</li>
                            <li>• High-dimensional text data is sparse</li>
                            <li>• Cluster quality hard to evaluate without labels</li>
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
                        Document clustering powers search result grouping (Carrot2, Clusty), topic discovery in news aggregation (Google News clusters), scatter-gather browsing interfaces, collection organization in digital libraries, and cluster-based retrieval where only cluster representatives are compared to the query for faster search.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/text-preprocessing">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Text Preprocessing
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/text-compression">
                        Next: Text Compression <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
