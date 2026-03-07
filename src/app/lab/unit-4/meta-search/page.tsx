'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function MetaSearchLab() {
    const [query, setQuery] = useState('machine learning')
    const [mergedResults, setMergedResults] = useState<any[]>([])
    const [showDetails, setShowDetails] = useState(false)
    const [activeTab, setActiveTab] = useState<'roundrobin' | 'normalization' | 'voting' | 'weighted'>('roundrobin')

    const searchEngines = {
        'Google': [
            { title: 'Machine Learning Basics', score: 0.95, url: 'ml-basics.com' },
            { title: 'Deep Learning Tutorial', score: 0.88, url: 'dl-tutorial.com' },
            { title: 'ML Algorithms Guide', score: 0.82, url: 'ml-guide.com' },
        ],
        'Bing': [
            { title: 'Machine Learning Basics', score: 0.92, url: 'ml-basics.com' },
            { title: 'Introduction to ML', score: 0.85, url: 'intro-ml.com' },
            { title: 'ML Course Online', score: 0.78, url: 'ml-course.com' },
        ],
        'DuckDuckGo': [
            { title: 'Deep Learning Tutorial', score: 0.90, url: 'dl-tutorial.com' },
            { title: 'ML Research Papers', score: 0.83, url: 'ml-research.com' },
            { title: 'Machine Learning Basics', score: 0.80, url: 'ml-basics.com' },
        ],
    }

    const combineResults = () => {
        const allResults: any[] = []
        Object.entries(searchEngines).forEach(([engine, results]) => {
            results.forEach(result => {
                allResults.push({ ...result, engine, normalizedScore: result.score })
            })
        })
        const grouped: Record<string, any> = {}
        allResults.forEach(result => {
            if (!grouped[result.url]) {
                grouped[result.url] = { ...result, engines: [result.engine], scores: [result.score], avgScore: result.score }
            } else {
                grouped[result.url].engines.push(result.engine)
                grouped[result.url].scores.push(result.score)
                grouped[result.url].avgScore = grouped[result.url].scores.reduce((a: number, b: number) => a + b, 0) / grouped[result.url].scores.length
            }
        })
        const merged = Object.values(grouped).sort((a: any, b: any) => b.avgScore - a.avgScore)
        setMergedResults(merged)
        setShowDetails(true)
    }

    const tabs = [
        { key: 'roundrobin' as const, label: 'Round-Robin', emoji: '🔄' },
        { key: 'normalization' as const, label: 'Score Normalization', emoji: '📏' },
        { key: 'voting' as const, label: 'Voting/Consensus', emoji: '🗳️' },
        { key: 'weighted' as const, label: 'Weighted Combination', emoji: '⚖️' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Meta-Search Engines Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Aggregating results from multiple search engines for better coverage
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
                        Instead of building your own index, why not query multiple search engines and combine their results? Meta-search engines aggregate results from Google, Bing, DuckDuckGo, etc., providing diverse perspectives and broader web coverage.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">Real-world Examples:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Dogpile — aggregates Google, Bing, Yahoo</li>
                            <li>• Searx — privacy-focused open-source meta-search</li>
                            <li>• Kayak / Skyscanner — meta-search for travel</li>
                            <li>• Metacrawler — combines multiple engines</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Score Normalization */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Score Normalization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">S_norm(d) = (S(d) - S_min) / (S_max - S_min)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S_norm(d)</span>: Normalized score of document d in [0, 1]
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S(d)</span>: Original score from a search engine
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S_min</span>: Minimum score in that engine&apos;s result set
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S_max</span>: Maximum score in that engine&apos;s result set
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Different search engines use different scoring scales — Google&apos;s 0.95 ≠ Bing&apos;s 0.95. Min-max normalization maps all scores to [0, 1] so they can be fairly compared and combined across engines.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Weighted Combination */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Weighted Combination
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">S_final(d) = Σ<sub>i=1..k</sub> w<sub>i</sub> × S_norm<sub>i</sub>(d)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S_final(d)</span>: Combined score for document d
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">w<sub>i</sub></span>: Weight assigned to engine i (trust/quality)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">S_norm<sub>i</sub>(d)</span>: Normalized score from engine i
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">k</span>: Number of search engines queried
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Σw<sub>i</sub> = 1</span>: Weights sum to 1 for proper averaging
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Not all engines are equally reliable. Weighted combination assigns higher weights to more trusted engines. For example, w_Google=0.5, w_Bing=0.3, w_DDG=0.2 prioritizes Google&apos;s rankings while still benefiting from diversity.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique-wise Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Result Merging Strategies
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

                    {activeTab === 'roundrobin' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">🔄 Round-Robin Interleaving</p>
                            <p className="text-lg text-muted-foreground mb-4">Take one result from each engine in turn. Simple, fair, but ignores relevance scores entirely.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg mb-4">
                                Output: [G₁, B₁, D₁, G₂, B₂, D₂, G₃, B₃, D₃, ...]
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">When to Use</p>
                                    <p className="text-muted-foreground">When engines don&apos;t expose scores, or when equal representation matters more than precision.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Duplicate Handling</p>
                                    <p className="text-muted-foreground">Skip duplicates when encountered. First occurrence wins its position.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'normalization' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">📏 Score Normalization</p>
                            <p className="text-lg text-muted-foreground mb-4">Normalize each engine&apos;s scores to [0,1] using min-max scaling, then sort by normalized score across all engines.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg mb-4">
                                S_norm = (S - S_min) / (S_max - S_min)
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Z-Score Alternative</p>
                                    <p className="text-muted-foreground">Z = (S - μ) / σ — normalizes by mean and standard deviation. Better for Gaussian-distributed scores.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Challenge</p>
                                    <p className="text-muted-foreground">Requires access to raw scores. Many engines only return ranked lists without scores.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'voting' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">🗳️ Voting / Consensus</p>
                            <p className="text-lg text-muted-foreground mb-4">Rank documents by how many engines return them. Results appearing in multiple engines are considered more reliable.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg mb-4">
                                Score(d) = |engines returning d| × avg_rank(d)
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Borda Count</p>
                                    <p className="text-muted-foreground">Each engine assigns points based on rank position (N points for rank 1, N-1 for rank 2, etc.). Sum across engines.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Condorcet Method</p>
                                    <p className="text-muted-foreground">Pairwise comparison: document A beats B if more engines rank A higher than B. Finds the Condorcet winner.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'weighted' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">⚖️ Weighted Combination</p>
                            <p className="text-lg text-muted-foreground mb-4">Assign different weights to engines based on quality, coverage, or past performance. More trusted engines have higher influence.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg mb-4">
                                S_final = w₁×S₁ + w₂×S₂ + w₃×S₃ (where Σwᵢ = 1)
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Static Weights</p>
                                    <p className="text-muted-foreground">Fixed weights based on engine reputation. Simple but doesn&apos;t adapt to query type.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Learned Weights</p>
                                    <p className="text-muted-foreground">Train weights using relevance judgments. Different weights per query category (e.g., news vs academic).</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Meta-search Simulator */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Meta-Search Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xl font-semibold">Query:</label>
                            <div className="flex gap-2">
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter search query..."
                                    className="text-lg"
                                />
                                <Button onClick={combineResults} size="lg" className="text-lg">
                                    <Play className="h-5 w-5 mr-2" /> Search All Engines
                                </Button>
                            </div>
                        </div>

                        {!showDetails && (
                            <div className="grid md:grid-cols-3 gap-4">
                                {Object.entries(searchEngines).map(([engine, results]) => (
                                    <div key={engine} className="border-2 rounded-lg p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                                                {engine[0]}
                                            </div>
                                            <p className="font-semibold text-xl">{engine}</p>
                                        </div>
                                        <div className="space-y-3">
                                            {results.map((result, i) => (
                                                <div key={i} className="bg-secondary/20 p-3 rounded">
                                                    <p className="font-semibold text-blue-600 text-lg">{result.title}</p>
                                                    <p className="text-muted-foreground">Score: {result.score.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showDetails && mergedResults.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-xl">Merged Results (Consensus Ranking):</p>
                                    <Button variant="outline" onClick={() => setShowDetails(false)}>
                                        Show Individual Results
                                    </Button>
                                </div>
                                {mergedResults.map((result, i) => (
                                    <div key={i} className="border-2 rounded-lg p-6 hover:bg-secondary/50 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className="bg-primary text-lg px-3 py-1">{i + 1}</Badge>
                                                    <h3 className="text-xl font-semibold text-blue-600">{result.title}</h3>
                                                </div>
                                                <p className="text-lg text-muted-foreground mb-2">{result.url}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-muted-foreground">Found in:</p>
                                                    {result.engines.map((engine: string, j: number) => (
                                                        <Badge key={j} variant="outline" className="text-lg">{engine}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold">Score: {result.avgScore.toFixed(3)}</p>
                                                <p className="text-lg text-muted-foreground">{result.engines.length} engine{result.engines.length > 1 ? 's' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📊</span> Strategy Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="text-left p-4 font-bold">Feature</th>
                                    <th className="text-left p-4 font-bold">Round-Robin</th>
                                    <th className="text-left p-4 font-bold">Normalization</th>
                                    <th className="text-left p-4 font-bold">Voting</th>
                                    <th className="text-left p-4 font-bold">Weighted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b"><td className="p-4 font-semibold">Needs Scores?</td><td className="p-4">No</td><td className="p-4">Yes</td><td className="p-4">No</td><td className="p-4">Yes</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Complexity</td><td className="p-4">O(n)</td><td className="p-4">O(n log n)</td><td className="p-4">O(n)</td><td className="p-4">O(n log n)</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Fairness</td><td className="p-4">Equal</td><td className="p-4">Score-based</td><td className="p-4">Consensus</td><td className="p-4">Trust-based</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Adaptability</td><td className="p-4">None</td><td className="p-4">Low</td><td className="p-4">Medium</td><td className="p-4">High</td></tr>
                                <tr className="border-b"><td className="p-4 font-semibold">Best For</td><td className="p-4">No scores</td><td className="p-4">Comparable engines</td><td className="p-4">Diverse engines</td><td className="p-4">Known quality</td></tr>
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
                            <li>• No need to build or maintain an index</li>
                            <li>• Broader web coverage than any single engine</li>
                            <li>• Leverages multiple ranking algorithms</li>
                            <li>• Reduces single-engine bias</li>
                            <li>• Privacy benefits (distribute queries)</li>
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
                            <li>• Latency bottleneck (slowest engine)</li>
                            <li>• Score incompatibility across engines</li>
                            <li>• API rate limits and ToS restrictions</li>
                            <li>• Duplicate detection is non-trivial</li>
                            <li>• No control over underlying index quality</li>
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
                        Meta-search is used in travel aggregators (Kayak, Skyscanner combining airline results), e-commerce comparison (Google Shopping aggregating merchant prices), academic search (Semantic Scholar combining multiple databases), privacy-focused search (Searx distributing queries to avoid tracking), and enterprise search (federating results from internal wikis, email, and file systems).
                    </p>
                </CardContent>
            </Card>

            {/* Unit Complete */}
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🎉</span> Unit 4 Complete!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Congratulations! You&apos;ve mastered multimedia IR and web search:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-lg">✓</Badge>
                            <span className="text-lg">Multimedia IR (CBIR, Color Features)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-lg">✓</Badge>
                            <span className="text-lg">Web Crawling (BFS, Politeness, robots.txt)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-lg">✓</Badge>
                            <span className="text-lg">PageRank (Link Analysis, Random Surfer)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-lg">✓</Badge>
                            <span className="text-lg">Meta-search (Result Merging, Consensus)</span>
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
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-4/pagerank">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: PageRank
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-4">
                        Back to Unit 4 Labs <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
