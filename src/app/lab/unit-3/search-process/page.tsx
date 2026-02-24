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
                <h1 className="text-4xl font-bold">Information Access Process Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Understanding iterative search and the Berry-Picking model
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Search is a Journey
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Real search isn't a single query → results → done. It's an iterative process where each result
                        teaches you new vocabulary, leading to better queries. This is the Berry-Picking model.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Example:</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="font-bold">1.</span>
                                <div>
                                    <p className="font-semibold">Initial query: "Why do cats purr?"</p>
                                    <p className="text-muted-foreground">Learn term: "feline vocalization"</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold">2.</span>
                                <div>
                                    <p className="font-semibold">Refined query: "feline vocalization research"</p>
                                    <p className="text-muted-foreground">Learn term: "laryngeal mechanism"</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-bold">3.</span>
                                <div>
                                    <p className="font-semibold">Expert query: "laryngeal mechanism purring"</p>
                                    <p className="text-muted-foreground">Find the scientific answer!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Berry-Picking Model */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Berry-Picking Model Formula
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">U_total = Σ Gain(d_i) × P(r_i)</div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">U_total</span>
                                <span className="text-muted-foreground">Total utility/knowledge gained</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Gain(d_i)</span>
                                <span className="text-muted-foreground">New information from document i</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">P(r_i)</span>
                                <span className="text-muted-foreground">Probability user reaches document i</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Berry-Picking Simulator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Berry-Picking Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="bg-secondary/30 p-4 rounded">
                            <p className="font-semibold mb-2">Search Journey Progress:</p>
                            <div className="space-y-2">
                                {berryPickingSteps.map((step, i) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded border-2 ${i < currentStep
                                                ? 'bg-green-50 dark:bg-green-950 border-green-500'
                                                : i === currentStep
                                                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-500'
                                                    : 'bg-secondary/20 border-border'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">Step {i + 1}: "{step.query}"</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Found: {step.docs.join(', ')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm">Gain: {step.gain}</p>
                                                <p className="text-sm">Prob: {step.prob}</p>
                                                <p className="text-sm font-bold">
                                                    Utility: {(step.gain * step.prob).toFixed(1)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={simulateSearch}
                                disabled={currentStep >= berryPickingSteps.length}
                                className="flex-1"
                            >
                                <Play className="h-4 w-4 mr-2" />
                                {currentStep === 0 ? 'Start Search' : 'Next Step'}
                            </Button>
                            <Button onClick={resetSimulation} variant="outline">
                                Reset
                            </Button>
                        </div>

                        {totalUtility > 0 && (
                            <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                                <p className="text-sm text-muted-foreground mb-1">Total Knowledge Gained:</p>
                                <p className="text-3xl font-bold">{totalUtility.toFixed(1)} units</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Search History: {searchHistory.join(' → ')}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Search Process Stages */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔄</span> The 6 Stages of Information Access
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-3">
                        {[
                            { stage: '1. Recognizing Need', desc: 'Identifying information gap (ASK - Anomalous State of Knowledge)' },
                            { stage: '2. Selecting Source', desc: 'Choosing search engine, database, or library' },
                            { stage: '3. Formulating Query', desc: 'Converting need into keywords' },
                            { stage: '4. Inspecting Results', desc: 'Scanning titles, snippets, relevance' },
                            { stage: '5. Extracting Information', desc: 'Reading documents, taking notes' },
                            { stage: '6. Reformulating', desc: 'Learning new terms, refining query' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-secondary/20 rounded">
                                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="font-semibold">{item.stage}</p>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: Search Session Tracker
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`class SearchSession:
    def __init__(self):
        self.queries = []
        self.documents_viewed = []
        self.total_utility = 0
    
    def add_query(self, query, docs_found, gain, prob_reach):
        """Track a search iteration"""
        self.queries.append(query)
        self.documents_viewed.extend(docs_found)
        
        # Calculate utility for this step
        utility = gain * prob_reach
        self.total_utility += utility
        
        return {
            'query': query,
            'docs': docs_found,
            'utility': utility,
            'cumulative': self.total_utility
        }
    
    def get_vocabulary_growth(self):
        """Track how vocabulary expands"""
        unique_terms = set()
        for query in self.queries:
            unique_terms.update(query.lower().split())
        return len(unique_terms)
    
    def analyze_session(self):
        """Berry-Picking analysis"""
        return {
            'total_queries': len(self.queries),
            'total_docs': len(self.documents_viewed),
            'vocabulary_size': self.get_vocabulary_growth(),
            'total_utility': self.total_utility,
            'avg_utility_per_query': self.total_utility / len(self.queries) if self.queries else 0
        }

# Example usage
session = SearchSession()
session.add_query("cats", ["Cat breeds", "Cat behavior"], gain=10, prob_reach=1.0)
session.add_query("cat purring", ["Why cats purr"], gain=8, prob_reach=0.9)
session.add_query("feline vocalization", ["Cat sounds"], gain=5, prob_reach=0.7)

analysis = session.analyze_session()
print(f"Total Utility: {analysis['total_utility']:.1f}")
print(f"Vocabulary Growth: {analysis['vocabulary_size']} terms")`}</code>
                    </pre>
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
                            <p className="font-semibold mb-2">Q1: What is the Berry-Picking model?</p>
                            <p className="text-sm text-green-600">A: An iterative search model where users gather information bit by bit across multiple queries, with each result informing the next query.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: What is ASK (Anomalous State of Knowledge)?</p>
                            <p className="text-sm text-green-600">A: When users have a gap in knowledge but don't know the exact terms to search for - they learn vocabulary through the search process.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: Why does P(r_i) decrease in later steps?</p>
                            <p className="text-sm text-green-600">A: Users may stop searching before reaching later documents due to satisfaction, fatigue, or time constraints.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-3/hci-principles">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: HCI Principles
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-3/query-specification">
                        Next: Query Specification <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
