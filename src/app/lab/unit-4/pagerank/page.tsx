'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function PageRankLab() {
    const [dampingFactor, setDampingFactor] = useState(0.85)
    const [iterations, setIterations] = useState(0)
    const [pageRanks, setPageRanks] = useState<number[]>([0.25, 0.25, 0.25, 0.25])
    const [activeTab, setActiveTab] = useState<'pagerank' | 'hits' | 'salsa'>('pagerank')

    const linkGraph = [
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
    ]

    const calculatePageRank = () => {
        const n = 4
        const ranks = [...pageRanks]
        const d = dampingFactor
        const newRanks = new Array(n).fill(0)
        for (let i = 0; i < n; i++) {
            let sum = 0
            for (let j = 0; j < n; j++) {
                if (linkGraph[j][i] === 1) {
                    const outLinks = linkGraph[j].reduce((a, b) => a + b, 0)
                    sum += ranks[j] / outLinks
                }
            }
            newRanks[i] = (1 - d) / n + d * sum
        }
        setPageRanks(newRanks)
        setIterations(iterations + 1)
    }

    const resetPageRank = () => {
        setPageRanks([0.25, 0.25, 0.25, 0.25])
        setIterations(0)
    }

    const pages = ['Page A', 'Page B', 'Page C', 'Page D']

    const tabs = [
        { key: 'pagerank' as const, label: 'PageRank', emoji: '📊' },
        { key: 'hits' as const, label: 'HITS', emoji: '🔗' },
        { key: 'salsa' as const, label: 'SALSA', emoji: '💃' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 3 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">PageRank Algorithm Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    The algorithm that made Google dominant
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
                        With billions of web pages, how do you decide which are most important? PageRank treats links as votes: pages linked by many important pages are themselves important.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: PageRank */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: PageRank
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">PR(A) = (1-d)/N + d × Σ<sub>T∈B<sub>A</sub></sub> PR(T) / C(T)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">PR(A)</span>: PageRank score of page A
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">d</span>: Damping factor (typically 0.85) — probability of following links
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">N</span>: Total number of pages in the web graph
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">B<sub>A</sub></span>: Set of pages that link to A (backlinks)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">C(T)</span>: Number of outbound links from page T
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">(1-d)/N</span>: Random jump probability (teleportation)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            PageRank models a &quot;random surfer&quot; who follows links with probability d and jumps to a random page with probability (1-d). The stationary distribution of this Markov chain gives the PageRank scores. A link from a page with high PR and few outlinks is worth more than one from a low-PR page with many outlinks.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Algorithm Comparison Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Link Analysis Algorithms
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'outline'} onClick={() => setActiveTab(tab.key)} className="text-lg px-6 py-4">
                                {tab.emoji} {tab.label}
                            </Button>
                        ))}
                    </div>

                    {activeTab === 'pagerank' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">📊 PageRank (Brin & Page, 1998)</p>
                            <p className="text-lg text-muted-foreground mb-4">Query-independent, global authority score. Computed offline for the entire web graph. Used as one of 200+ ranking signals in Google.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Convergence</p>
                                    <p className="text-muted-foreground">Typically converges in 50–100 iterations. Power iteration method. O(N) per iteration.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Dangling Nodes</p>
                                    <p className="text-muted-foreground">Pages with no outlinks distribute their PR equally to all pages (or to a special sink).</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hits' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">🔗 HITS (Kleinberg, 1999)</p>
                            <p className="text-lg text-muted-foreground mb-4">Query-dependent. Computes two scores per page: Hub (links to good authorities) and Authority (linked by good hubs). Mutually reinforcing.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                <p>auth(p) = Σ hub(q) for all q → p</p>
                                <p>hub(p) = Σ auth(q) for all p → q</p>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border border-yellow-400 mt-4">
                                <p className="font-semibold">Topic Drift:</p>
                                <p className="text-muted-foreground">HITS can drift to popular but off-topic pages because it operates on a query-specific subgraph.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'salsa' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">💃 SALSA (Lempel & Moran, 2001)</p>
                            <p className="text-lg text-muted-foreground mb-4">Combines PageRank&apos;s random walk with HITS&apos; hub/authority distinction. Two interleaved random walks on a bipartite graph.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Authority Walk</p>
                                    <p className="text-muted-foreground">Follow inlinks → random outlink from that hub → arrive at authority.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Hub Walk</p>
                                    <p className="text-muted-foreground">Follow outlinks → random inlink to that authority → arrive at hub.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive PageRank Calculator */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive PageRank Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xl font-semibold">Damping Factor (d): {dampingFactor.toFixed(2)}</label>
                            <Slider value={[dampingFactor]} onValueChange={(v) => { setDampingFactor(v[0]); resetPageRank() }} min={0} max={1} step={0.05} />
                        </div>

                        <div className="bg-secondary/30 p-6 rounded-lg">
                            <p className="text-xl font-semibold mb-3">Link Graph (4 pages):</p>
                            <div className="grid grid-cols-4 gap-2 font-mono text-center text-lg">
                                <div className="font-bold">→</div>
                                {pages.map(p => <div key={p} className="font-bold">{p.split(' ')[1]}</div>)}
                                {linkGraph.map((row, i) => (
                                    <>
                                        <div key={`label-${i}`} className="font-bold">{pages[i].split(' ')[1]}</div>
                                        {row.map((val, j) => (
                                            <div key={`${i}-${j}`} className={`p-2 rounded ${val === 1 ? 'bg-blue-200 dark:bg-blue-800 font-bold' : 'bg-secondary/20'}`}>
                                                {val}
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={calculatePageRank} size="lg" className="text-lg">
                                <Play className="h-5 w-5 mr-2" /> Iterate (Step {iterations})
                            </Button>
                            <Button onClick={resetPageRank} variant="outline" size="lg" className="text-lg">
                                Reset
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xl font-semibold">PageRank Scores (Iteration {iterations}):</p>
                            {pages.map((page, i) => (
                                <div key={page} className="flex items-center gap-4">
                                    <span className="font-semibold text-lg w-24">{page}</span>
                                    <div className="flex-1 bg-secondary/20 rounded-full h-10 overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                                            style={{ width: `${Math.max(pageRanks[i] * 200, 10)}%` }}
                                        >
                                            <span className="text-white font-mono font-bold text-sm">{pageRanks[i].toFixed(4)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                        <table className="w-full text-lg">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="text-left p-4 font-bold">Feature</th>
                                    <th className="text-left p-4 font-bold">PageRank</th>
                                    <th className="text-left p-4 font-bold">HITS</th>
                                    <th className="text-left p-4 font-bold">SALSA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b"><td className="p-4 font-semibold">Query Dependent?</td><td className="p-4">No</td><td className="p-4">Yes</td><td className="p-4">Yes</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Scores per Page</td><td className="p-4">1 (PR)</td><td className="p-4">2 (Hub + Auth)</td><td className="p-4">2 (Hub + Auth)</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Computation</td><td className="p-4">Offline</td><td className="p-4">Online</td><td className="p-4">Online</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Topic Drift</td><td className="p-4">N/A</td><td className="p-4">Susceptible</td><td className="p-4">Resistant</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Convergence</td><td className="p-4">Guaranteed</td><td className="p-4">Guaranteed</td><td className="p-4">Guaranteed</td></tr>
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
                            <li>• Query-independent (computed once offline)</li>
                            <li>• Robust against simple link spam</li>
                            <li>• Mathematically elegant (Markov chain)</li>
                            <li>• Scales to billions of pages</li>
                            <li>• Guaranteed convergence</li>
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
                            <li>• Ignores query relevance (topic-blind)</li>
                            <li>• Vulnerable to link farms</li>
                            <li>• Favors older, well-linked pages</li>
                            <li>• Expensive to recompute for entire web</li>
                            <li>• Dangling nodes need special handling</li>
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
                        PageRank revolutionized web search as one of Google&apos;s original ranking signals. Today it&apos;s used beyond web search: citation analysis (ranking academic papers by influence), social network analysis (identifying influential users), recommendation systems (ranking items by link structure), and fraud detection (identifying suspicious link patterns in financial networks).
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-4/web-crawling">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Web Crawling
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-4/meta-search">
                        Next: Meta-Search <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}