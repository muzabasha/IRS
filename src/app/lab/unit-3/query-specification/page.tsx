'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function QuerySpecificationLab() {
    const [userInput, setUserInput] = useState('kitten')
    const [suggestion, setSuggestion] = useState('')
    const [editDistance, setEditDistance] = useState(0)
    const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'visual' | 'form'>('text')

    const dictionary = ['kitten', 'sitting', 'kitchen', 'mitten', 'bitten']

    const levenshteinDistance = (a: string, b: string): number => {
        const matrix: number[][] = []
        for (let i = 0; i <= b.length; i++) matrix[i] = [i]
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1]
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                }
            }
        }
        return matrix[b.length][a.length]
    }

    const findClosestMatch = () => {
        let minDistance = Infinity
        let closest = ''
        dictionary.forEach(word => {
            const dist = levenshteinDistance(userInput.toLowerCase(), word)
            if (dist < minDistance && dist > 0) { minDistance = dist; closest = word }
        })
        setEditDistance(minDistance)
        setSuggestion(closest)
    }

    const tabs = [
        { key: 'text' as const, label: 'Text Input', emoji: '⌨️' },
        { key: 'voice' as const, label: 'Voice Input', emoji: '🎤' },
        { key: 'visual' as const, label: 'Visual Query', emoji: '📷' },
        { key: 'form' as const, label: 'Form-Based', emoji: '📝' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge>Lab 3 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Query Specification UI Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Helping users express their search intent effectively
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
                        Users often misspell queries, don&apos;t know the right vocabulary, or struggle to express complex needs. Query specification interfaces bridge this gap with autocorrect, suggestions, and structured input.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Levenshtein Distance */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Levenshtein Distance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-xl">lev(i,j) = min(lev(i-1,j)+1, lev(i,j-1)+1, lev(i-1,j-1)+cost)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">lev(i,j)</span>: Edit distance between first i chars of s1 and first j chars of s2
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">lev(i-1,j)+1</span>: Deletion from s1
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">lev(i,j-1)+1</span>: Insertion into s1
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">cost</span>: 0 if chars match, 1 if substitution needed
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Levenshtein distance computes the minimum edits (insert, delete, substitute) to transform one string into another. Used for &quot;Did you mean?&quot; suggestions — Google corrects 15% of all queries this way. Time complexity: O(m×n) using dynamic programming.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Query Specification Methods
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

                    {activeTab === 'text' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">⌨️ Text Input with Assistance</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Autocomplete</p>
                                        <p className="text-muted-foreground">Predict query as user types. Reduces typing by 30–50%. Uses trie data structure.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Spell Correction</p>
                                        <p className="text-muted-foreground">&quot;Did you mean?&quot; using edit distance. Noisy channel model: P(correction|typo).</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Query Expansion</p>
                                        <p className="text-muted-foreground">Add synonyms automatically. &quot;car&quot; → &quot;car automobile vehicle&quot;.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Search Operators</p>
                                        <p className="text-muted-foreground">site:, filetype:, &quot;exact phrase&quot;, -exclude for power users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'voice' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🎤 Voice Input</p>
                                <p className="text-lg text-muted-foreground mb-4">Natural language via speech recognition. 50+ languages, 95% accuracy. Queries are longer and more conversational.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">ASR Pipeline</p>
                                        <p className="text-muted-foreground">Audio → Acoustic Model → Language Model → Text. Uses deep learning (Whisper, DeepSpeech).</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Conversational Search</p>
                                        <p className="text-muted-foreground">&quot;What&apos;s the weather?&quot; → &quot;How about tomorrow?&quot; — context-aware follow-ups.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'visual' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📷 Visual Query (Query-by-Example)</p>
                                <p className="text-lg text-muted-foreground mb-4">Upload image or draw sketch. System extracts features and finds similar content.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Google Lens</p>
                                        <p className="text-muted-foreground">Point camera at object → identify, translate, shop. Uses CNN embeddings.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Reverse Image Search</p>
                                        <p className="text-muted-foreground">Upload image → find source, higher resolution, or similar images.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'form' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📝 Form-Based (Structured Input)</p>
                                <p className="text-lg text-muted-foreground mb-4">Structured fields reduce errors by 60%. Best when queries have known parameters.</p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Flight Search</p>
                                        <p className="text-muted-foreground">From, To, Date, Passengers — constrained fields prevent invalid queries.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Job Search</p>
                                        <p className="text-muted-foreground">Title, Location, Salary range, Experience level — faceted input.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Academic Search</p>
                                        <p className="text-muted-foreground">Author, Title, Year, Journal — structured metadata queries.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Spell Checker */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Spell Checker
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Dictionary:</label>
                        <div className="bg-secondary/30 p-4 rounded">
                            <div className="flex flex-wrap gap-2">
                                {dictionary.map((word, i) => (
                                    <Badge key={i} variant="outline" className="text-lg px-4 py-2">{word}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Enter a word (try misspelling):</label>
                        <div className="flex gap-2">
                            <Input value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="e.g., kiten, siting" className="text-2xl p-6 border-2" />
                            <Button onClick={findClosestMatch} size="lg" className="text-xl">
                                <Play className="h-5 w-5 mr-2" /> Check
                            </Button>
                        </div>
                    </div>

                    {suggestion && (
                        <div className="space-y-3">
                            <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded border-2 border-amber-500">
                                <p className="text-lg mb-2">Did you mean:</p>
                                <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">{suggestion}</p>
                                <p className="text-lg text-muted-foreground mt-2">
                                    Edit distance: {editDistance} {editDistance === 1 ? 'change' : 'changes'}
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
                            <li>• Spell correction fixes 15% of queries</li>
                            <li>• Autocomplete reduces typing by 30–50%</li>
                            <li>• Form-based input prevents invalid queries</li>
                            <li>• Voice enables hands-free, accessible search</li>
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
                            <li>• Autocorrect can change user intent</li>
                            <li>• Voice recognition errors in noisy environments</li>
                            <li>• Visual search limited by semantic gap</li>
                            <li>• Form-based too rigid for exploratory search</li>
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
                        Query specification powers Google&apos;s &quot;Did you mean?&quot; (spell correction), Siri/Alexa (voice search), Google Lens (visual query), Kayak/Skyscanner (form-based travel search), and PubMed&apos;s MeSH term suggestion (domain-specific vocabulary assistance).
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-3/search-process">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Search Process
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-3/result-visualization">
                        Next: Result Visualization <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
