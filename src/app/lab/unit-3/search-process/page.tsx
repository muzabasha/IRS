'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function SearchProcessLab() {
    const [currentStep, setCurrentStep] = useState(0)
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [totalUtility, setTotalUtility] = useState(0)
    const [activeTab, setActiveTab] = useState<'berrypicking' | 'stages' | 'models'>('berrypicking')

    const berryPickingSteps = [
        { query: 'cats', docs: ['Cat breeds', 'Cat behavior'], gain: 10, prob: 1.0 },
        { query: 'cat purring', docs: ['Why cats purr', 'Cat communication'], gain: 8, prob: 0.9 },
        { query: 'feline vocalization', docs: ['Cat sounds research'], gain: 5, prob: 0.7 },
    ]

    const simulateSearch = () => {
        if (currentStep < berryPickingSteps.length) {
            const step = berryPickingSteps[currentStep]
            setSearchHistory([...searchHistory, step.query])
            const utility = step.gain * step.prob
            setTotalUtility(totalUtility + utility)
            setCurrentStep(currentStep + 1)
        }
    }

    const resetSimulation = () => {
        setCurrentStep(0)
        setSearchHistory([])
        setTotalUtility(0)
    }

    const tabs = [
        { key: 'berrypicking' as const, label: 'Berry-Picking', emoji: '🫐' },
        { key: 'stages' as const, label: '6 Stages', emoji: '🔄' },
        { key: 'models' as const, label: 'Search Models', emoji: '📊' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge>Lab 2 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Information Access Process Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Understanding iterative search and the Berry-Picking model
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
                        Real search isn&apos;t a single query → results → done. It&apos;s an iterative process where each result teaches you new vocabulary, leading to better queries. This is the Berry-Picking model.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Berry-Picking Utility */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Berry-Picking Utility
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">U<sub>total</sub> = Σ<sub>i=1</sub><sup>n</sup> Gain(d<sub>i</sub>) × P(r<sub>i</sub>)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">U<sub>total</sub></span>: Total knowledge/utility gained across the session
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Gain(d<sub>i</sub>)</span>: New information from document i
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">P(r<sub>i</sub>)</span>: Probability user reaches document i
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">n</span>: Total documents encountered across all queries
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            P(r<sub>i</sub>) decreases with each step — users may stop due to satisfaction, fatigue, or time constraints. Early results contribute more to total utility. This is why ranking quality matters most for top results.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: DCG */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Session DCG
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">sDCG = Σ<sub>q=1</sub><sup>Q</sup> γ<sup>q-1</sup> × DCG(q)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">sDCG</span>: Session-level Discounted Cumulative Gain
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Q</span>: Number of queries in the session
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">γ</span>: Discount factor for later queries (0 &lt; γ &lt; 1)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">DCG(q)</span>: Standard DCG for the q-th query&apos;s results
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Session DCG extends single-query evaluation to multi-query sessions. Later queries are discounted because a good system should satisfy users earlier. This captures the iterative nature of real search behavior.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Search Process Models
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

                    {activeTab === 'berrypicking' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🫐 Berry-Picking Model (Bates, 1989)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Users gather information bit by bit across multiple queries, like picking berries from different bushes. Each result informs the next query.
                                </p>
                                <div className="grid gap-3">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">1. Initial Query</p>
                                        <p className="text-muted-foreground">&quot;Why do cats purr?&quot; → Learn term: &quot;feline vocalization&quot;</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">2. Refined Query</p>
                                        <p className="text-muted-foreground">&quot;feline vocalization research&quot; → Learn term: &quot;laryngeal mechanism&quot;</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold">3. Expert Query</p>
                                        <p className="text-muted-foreground">&quot;laryngeal mechanism purring&quot; → Find the scientific answer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'stages' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🔄 The 6 Stages of Information Access</p>
                                <div className="grid gap-3">
                                    {[
                                        { stage: '1. Recognizing Need', desc: 'Identifying information gap (ASK — Anomalous State of Knowledge)', icon: '🤔' },
                                        { stage: '2. Selecting Source', desc: 'Choosing search engine, database, or library', icon: '🔎' },
                                        { stage: '3. Formulating Query', desc: 'Converting need into keywords or structured query', icon: '⌨️' },
                                        { stage: '4. Inspecting Results', desc: 'Scanning titles, snippets, judging relevance', icon: '👀' },
                                        { stage: '5. Extracting Information', desc: 'Reading documents, taking notes, saving', icon: '📝' },
                                        { stage: '6. Reformulating', desc: 'Learning new terms, refining query, iterating', icon: '🔄' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-secondary/20 rounded">
                                            <span className="text-3xl">{item.icon}</span>
                                            <div>
                                                <p className="font-semibold text-lg">{item.stage}</p>
                                                <p className="text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'models' && (
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-lg border-collapse">
                                    <thead>
                                        <tr className="bg-secondary/30">
                                            <th className="border-2 p-3 text-left">Model</th>
                                            <th className="border-2 p-3 text-left">Key Idea</th>
                                            <th className="border-2 p-3 text-left">Query Behavior</th>
                                            <th className="border-2 p-3 text-left">Best For</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="border-2 p-3 font-semibold">Classic (Single Query)</td><td className="border-2 p-3">One query, one result set</td><td className="border-2 p-3">Static</td><td className="border-2 p-3">Known-item search</td></tr>
                                        <tr><td className="border-2 p-3 font-semibold">Berry-Picking</td><td className="border-2 p-3">Iterative, evolving queries</td><td className="border-2 p-3">Dynamic</td><td className="border-2 p-3">Exploratory search</td></tr>
                                        <tr><td className="border-2 p-3 font-semibold">Orienteering</td><td className="border-2 p-3">Navigate via small steps</td><td className="border-2 p-3">Incremental</td><td className="border-2 p-3">Browsing hierarchies</td></tr>
                                        <tr><td className="border-2 p-3 font-semibold">Sensemaking</td><td className="border-2 p-3">Build mental model</td><td className="border-2 p-3">Analytical</td><td className="border-2 p-3">Research tasks</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Berry-Picking Simulator */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Berry-Picking Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">Search Journey Progress:</p>
                            <div className="space-y-3">
                                {berryPickingSteps.map((step, i) => (
                                    <div key={i} className={`p-4 rounded border-2 ${i < currentStep ? 'bg-green-50 dark:bg-green-950 border-green-500' : i === currentStep ? 'bg-blue-50 dark:bg-blue-950 border-blue-500' : 'bg-secondary/20 border-border'}`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-lg">Step {i + 1}: &quot;{step.query}&quot;</p>
                                                <p className="text-muted-foreground">Found: {step.docs.join(', ')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg">Gain: {step.gain} × P: {step.prob}</p>
                                                <p className="text-lg font-bold">Utility: {(step.gain * step.prob).toFixed(1)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={simulateSearch} disabled={currentStep >= berryPickingSteps.length} className="flex-1 text-lg" size="lg">
                                <Play className="h-5 w-5 mr-2" /> {currentStep === 0 ? 'Start Search' : 'Next Step'}
                            </Button>
                            <Button onClick={resetSimulation} variant="outline" size="lg">Reset</Button>
                        </div>

                        {totalUtility > 0 && (
                            <div className="bg-primary/10 p-6 rounded border-2 border-primary">
                                <p className="text-lg text-muted-foreground mb-1">Total Knowledge Gained:</p>
                                <p className="text-4xl font-bold">{totalUtility.toFixed(1)} units</p>
                                <p className="text-lg text-muted-foreground mt-2">
                                    Search History: {searchHistory.join(' → ')}
                                </p>
                            </div>
                        )}
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
                            <li>• Models real user behavior accurately</li>
                            <li>• Captures vocabulary learning effect</li>
                            <li>• Supports system design for iteration</li>
                            <li>• Enables session-level evaluation metrics</li>
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
                            <li>• Hard to predict when users will stop</li>
                            <li>• Utility/gain difficult to measure objectively</li>
                            <li>• Session boundaries are ambiguous</li>
                            <li>• Individual differences in search strategies</li>
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
                        The Berry-Picking model drives features like &quot;Related searches&quot; (Google), query suggestions after zero results, search history for re-finding, and session-aware ranking that considers previous queries. Academic search tools (Semantic Scholar) use citation trails as berry-picking paths.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-3/hci-principles">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: HCI Principles
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-3/query-specification">
                        Next: Query Specification <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
