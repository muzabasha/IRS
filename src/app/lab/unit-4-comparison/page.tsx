'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Play, RefreshCw } from 'lucide-react'

export default function Unit4ComparisonPage() {
    const [dampingFactor, setDampingFactor] = useState(0.85)
    const [iterations, setIterations] = useState(10)
    const [targetColor, setTargetColor] = useState({ r: 150, g: 100, b: 200 })
    const [results, setResults] = useState<any>(null)

    // Sample web graph
    const webGraph = {
        nodes: ['A', 'B', 'C', 'D', 'E'],
        edges: [
            { from: 'A', to: 'B' },
            { from: 'A', to: 'C' },
            { from: 'B', to: 'C' },
            { from: 'C', to: 'A' },
            { from: 'D', to: 'C' },
            { from: 'E', to: 'D' }
        ]
    }

    // Sample images with color histograms
    const images = [
        { id: 1, name: 'Sunset', color: { r: 200, g: 100, b: 50 }, description: 'Orange sunset scene' },
        { id: 2, name: 'Ocean', color: { r: 50, g: 100, b: 200 }, description: 'Blue ocean waves' },
        { id: 3, name: 'Forest', color: { r: 100, g: 150, b: 80 }, description: 'Green forest landscape' },
        { id: 4, name: 'Purple Sky', color: { r: 150, g: 100, b: 200 }, description: 'Purple twilight sky' },
        { id: 5, name: 'Desert', color: { r: 180, g: 150, b: 100 }, description: 'Sandy desert dunes' }
    ]

    // Calculate PageRank
    const calculatePageRank = (graph: any, d: number, iter: number) => {
        const n = graph.nodes.length
        const ranks: Record<string, number> = {}
        const outlinks: Record<string, number> = {}

        // Initialize
        graph.nodes.forEach((node: string) => {
            ranks[node] = 1 / n
            outlinks[node] = graph.edges.filter((e: any) => e.from === node).length
        })

        // Iterate
        const history = [{ ...ranks }]
        for (let i = 0; i < iter; i++) {
            const newRanks: Record<string, number> = {}
            graph.nodes.forEach((node: string) => {
                let sum = 0
                graph.edges.forEach((edge: any) => {
                    if (edge.to === node) {
                        sum += ranks[edge.from] / (outlinks[edge.from] || 1)
                    }
                })
                newRanks[node] = (1 - d) / n + d * sum
            })
            Object.assign(ranks, newRanks)
            history.push({ ...ranks })
        }

        return { ranks, history }
    }

    // Calculate color distance (Euclidean)
    const colorDistance = (c1: any, c2: any) => {
        return Math.sqrt(
            Math.pow(c1.r - c2.r, 2) +
            Math.pow(c1.g - c2.g, 2) +
            Math.pow(c1.b - c2.b, 2)
        )
    }

    // BFS Crawling simulation
    const simulateCrawling = () => {
        const visited: string[] = []
        const queue = ['A']
        const frontier: string[] = []
        const steps = []

        while (queue.length > 0 && visited.length < webGraph.nodes.length) {
            const current = queue.shift()!
            if (!visited.includes(current)) {
                visited.push(current)
                const neighbors = webGraph.edges
                    .filter(e => e.from === current)
                    .map(e => e.to)
                    .filter(n => !visited.includes(n) && !queue.includes(n))

                queue.push(...neighbors)
                steps.push({
                    current,
                    visited: [...visited],
                    queue: [...queue],
                    frontier: neighbors
                })
            }
        }

        return steps
    }

    // Meta-search aggregation
    const metaSearchAggregation = () => {
        const engine1 = [
            { id: 1, title: 'Machine Learning Guide', score: 0.95 },
            { id: 2, title: 'Deep Learning Tutorial', score: 0.85 },
            { id: 3, title: 'AI Overview', score: 0.75 }
        ]
        const engine2 = [
            { id: 2, title: 'Deep Learning Tutorial', score: 0.90 },
            { id: 4, title: 'Neural Networks', score: 0.88 },
            { id: 1, title: 'Machine Learning Guide', score: 0.82 }
        ]
        const engine3 = [
            { id: 3, title: 'AI Overview', score: 0.92 },
            { id: 1, title: 'Machine Learning Guide', score: 0.87 },
            { id: 5, title: 'Data Science', score: 0.80 }
        ]

        // Aggregate scores
        const aggregated: Record<number, any> = {}
        const addResults = (results: any[], engineName: string) => {
            results.forEach((result, rank) => {
                if (!aggregated[result.id]) {
                    aggregated[result.id] = {
                        ...result,
                        scores: {},
                        ranks: {},
                        totalScore: 0
                    }
                }
                aggregated[result.id].scores[engineName] = result.score
                aggregated[result.id].ranks[engineName] = rank + 1
                aggregated[result.id].totalScore += result.score
            })
        }

        addResults(engine1, 'Engine 1')
        addResults(engine2, 'Engine 2')
        addResults(engine3, 'Engine 3')

        const merged = Object.values(aggregated)
            .sort((a: any, b: any) => b.totalScore - a.totalScore)

        return { engine1, engine2, engine3, merged }
    }

    const executeComparison = () => {
        // PageRank
        const pagerank = calculatePageRank(webGraph, dampingFactor, iterations)

        // Image retrieval
        const imageResults = images
            .map(img => ({
                ...img,
                distance: colorDistance(img.color, targetColor),
                similarity: 1 / (1 + colorDistance(img.color, targetColor))
            }))
            .sort((a, b) => a.distance - b.distance)

        // Web crawling
        const crawlSteps = simulateCrawling()

        // Meta-search
        const metaSearch = metaSearchAggregation()

        setResults({
            pagerank,
            imageResults,
            crawlSteps,
            metaSearch
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4
                    </Link>
                </Button>
                <Badge variant="outline">Unit 4 Comparison</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 4: Multimedia & Web Search Comparison</h1>
                <p className="text-lg text-muted-foreground">
                    Compare multimedia retrieval, web crawling, PageRank, and meta-search techniques
                </p>
            </div>

            {/* Input Section */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle>Input Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">PageRank Damping Factor: {dampingFactor}</label>
                            <Slider
                                value={[dampingFactor]}
                                onValueChange={(v) => setDampingFactor(v[0])}
                                min={0.5}
                                max={0.99}
                                step={0.01}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">PageRank Iterations: {iterations}</label>
                            <Slider
                                value={[iterations]}
                                onValueChange={(v) => setIterations(v[0])}
                                min={1}
                                max={20}
                                step={1}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Target Image Color (RGB)</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs">Red: {targetColor.r}</label>
                                <Slider
                                    value={[targetColor.r]}
                                    onValueChange={(v) => setTargetColor({ ...targetColor, r: v[0] })}
                                    min={0}
                                    max={255}
                                    step={1}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Green: {targetColor.g}</label>
                                <Slider
                                    value={[targetColor.g]}
                                    onValueChange={(v) => setTargetColor({ ...targetColor, g: v[0] })}
                                    min={0}
                                    max={255}
                                    step={1}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Blue: {targetColor.b}</label>
                                <Slider
                                    value={[targetColor.b]}
                                    onValueChange={(v) => setTargetColor({ ...targetColor, b: v[0] })}
                                    min={0}
                                    max={255}
                                    step={1}
                                />
                            </div>
                        </div>
                        <div className="h-16 rounded border-2" style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={executeComparison} className="flex-1">
                            <Play className="h-4 w-4 mr-2" /> Compare All Techniques
                        </Button>
                        <Button variant="outline" onClick={() => {
                            setDampingFactor(0.85)
                            setIterations(10)
                            setTargetColor({ r: 150, g: 100, b: 200 })
                            setResults(null)
                        }}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {results && (
                <>
                    {/* Multimedia IR - Image Retrieval */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🖼️</span> Multimedia IR: Content-Based Image Retrieval
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                    <p className="text-sm font-semibold mb-2">Color Histogram Matching (Euclidean Distance)</p>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Distance = √[(R₁-R₂)² + (G₁-G₂)² + (B₁-B₂)²]
                                    </p>
                                    <div className="grid md:grid-cols-5 gap-3">
                                        {results.imageResults.map((img: any, i: number) => (
                                            <div key={img.id} className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                                                <div className="h-20 rounded mb-2 border-2" style={{ backgroundColor: `rgb(${img.color.r}, ${img.color.g}, ${img.color.b})` }} />
                                                <Badge className="mb-1">#{i + 1}</Badge>
                                                <p className="text-xs font-semibold">{img.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Distance: {img.distance.toFixed(1)}
                                                </p>
                                                <p className="text-xs text-green-600">
                                                    Similarity: {(img.similarity * 100).toFixed(1)}%
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Web Crawling */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🕷️</span> Web Crawling: BFS Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                                    <p className="text-sm font-semibold mb-3">Breadth-First Search Crawling</p>
                                    <div className="space-y-3">
                                        {results.crawlSteps.map((step: any, i: number) => (
                                            <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge>Step {i + 1}</Badge>
                                                    <span className="font-semibold">Visiting: {step.current}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div>
                                                        <p className="text-muted-foreground">Visited:</p>
                                                        <div className="flex gap-1 mt-1">
                                                            {step.visited.map((n: string) => (
                                                                <Badge key={n} variant="outline" className="bg-green-100 dark:bg-green-900">{n}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Queue:</p>
                                                        <div className="flex gap-1 mt-1">
                                                            {step.queue.map((n: string, j: number) => (
                                                                <Badge key={j} variant="outline" className="bg-blue-100 dark:bg-blue-900">{n}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">New Frontier:</p>
                                                        <div className="flex gap-1 mt-1">
                                                            {step.frontier.map((n: string, j: number) => (
                                                                <Badge key={j} variant="outline" className="bg-orange-100 dark:bg-orange-900">{n}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PageRank */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📈</span> PageRank Algorithm
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="final" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="final">Final Rankings</TabsTrigger>
                                    <TabsTrigger value="convergence">Convergence</TabsTrigger>
                                </TabsList>

                                <TabsContent value="final" className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <p className="text-sm font-semibold mb-3">
                                            PageRank Formula: PR(A) = (1-d)/N + d × Σ(PR(Ti)/C(Ti))
                                        </p>
                                        <div className="grid md:grid-cols-5 gap-3">
                                            {Object.entries(results.pagerank.ranks)
                                                .sort(([, a]: any, [, b]: any) => b - a)
                                                .map(([node, rank]: any, i) => (
                                                    <div key={node} className="bg-white dark:bg-gray-800 p-4 rounded text-center">
                                                        <Badge className="mb-2">#{i + 1}</Badge>
                                                        <p className="text-2xl font-bold text-primary mb-1">{node}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Score: {rank.toFixed(4)}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="convergence" className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <p className="text-sm font-semibold mb-3">PageRank Convergence Over Iterations</p>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {results.pagerank.history.map((hist: any, i: number) => (
                                                <div key={i} className="bg-white dark:bg-gray-800 p-2 rounded text-xs font-mono">
                                                    <span className="font-bold">Iter {i}:</span>{' '}
                                                    {Object.entries(hist).map(([node, rank]: any) => (
                                                        <span key={node} className="ml-2">
                                                            {node}={rank.toFixed(4)}
                                                        </span>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Meta-search */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🔗</span> Meta-search: Result Aggregation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { name: 'Engine 1', results: results.metaSearch.engine1, color: 'blue' },
                                        { name: 'Engine 2', results: results.metaSearch.engine2, color: 'green' },
                                        { name: 'Engine 3', results: results.metaSearch.engine3, color: 'purple' }
                                    ].map((engine) => (
                                        <div key={engine.name} className={`bg-${engine.color}-50 dark:bg-${engine.color}-950 p-3 rounded`}>
                                            <p className="font-semibold mb-2">{engine.name}</p>
                                            <div className="space-y-2">
                                                {engine.results.map((result: any, i: number) => (
                                                    <div key={result.id} className="bg-white dark:bg-gray-800 p-2 rounded text-xs">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline">#{i + 1}</Badge>
                                                            <span className="font-semibold">{result.title}</span>
                                                        </div>
                                                        <p className="text-muted-foreground mt-1">Score: {result.score.toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded">
                                    <p className="font-semibold mb-3">Merged Results (Score Aggregation)</p>
                                    <div className="space-y-2">
                                        {results.metaSearch.merged.map((result: any, i: number) => (
                                            <div key={result.id} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge>#{i + 1}</Badge>
                                                        <span className="font-semibold">{result.title}</span>
                                                    </div>
                                                    <Badge variant="outline">Total: {result.totalScore.toFixed(2)}</Badge>
                                                </div>
                                                <div className="flex gap-2 text-xs">
                                                    {Object.entries(result.scores).map(([engine, score]: any) => (
                                                        <span key={engine} className="text-muted-foreground">
                                                            {engine}: {score.toFixed(2)}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
                                    <p className="font-semibold mb-2">Multimedia Semantic Gap</p>
                                    <p className="text-sm text-muted-foreground">
                                        Color histograms capture low-level features but miss high-level semantics.
                                        A purple sky and purple flower have similar colors but different meanings.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Crawling Strategy Matters</p>
                                    <p className="text-sm text-muted-foreground">
                                        BFS ensures broad coverage before depth. Important for discovering diverse content.
                                        DFS would go deep into one branch first.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">PageRank Convergence</p>
                                    <p className="text-sm text-muted-foreground">
                                        PageRank typically converges in 10-20 iterations. Damping factor (0.85) balances
                                        link following vs. random jumps, preventing rank sinks.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Meta-search Benefits</p>
                                    <p className="text-sm text-muted-foreground">
                                        Aggregating multiple engines improves coverage and reduces bias.
                                        Different engines excel at different query types.
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
