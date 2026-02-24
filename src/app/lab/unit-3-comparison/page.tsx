'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Play, RefreshCw } from 'lucide-react'

export default function Unit3ComparisonPage() {
    const [query, setQuery] = useState('machine learning')
    const [targetDistance, setTargetDistance] = useState(200)
    const [targetWidth, setTargetWidth] = useState(50)
    const [results, setResults] = useState<any>(null)

    const documents = [
        { id: 1, title: 'Machine Learning Fundamentals', snippet: 'Introduction to machine learning algorithms and techniques', category: 'Tutorial', date: '2024-01-15' },
        { id: 2, title: 'Deep Learning with Neural Networks', snippet: 'Advanced deep learning and neural network architectures', category: 'Advanced', date: '2024-02-20' },
        { id: 3, title: 'Machine Vision Systems', snippet: 'Computer vision and image processing with machine learning', category: 'Application', date: '2024-01-10' },
        { id: 4, title: 'Natural Language Processing', snippet: 'NLP techniques for text analysis and understanding', category: 'Tutorial', date: '2024-03-05' },
        { id: 5, title: 'AI and Machine Learning Overview', snippet: 'Comprehensive overview of artificial intelligence and machine learning', category: 'Overview', date: '2024-02-01' }
    ]

    // Levenshtein distance for spell checking
    const levenshteinDistance = (str1: string, str2: string): number => {
        const matrix: number[][] = []
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i]
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1]
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                }
            }
        }
        return matrix[str2.length][str1.length]
    }

    // Spell check suggestions
    const getSpellingSuggestions = (word: string) => {
        const dictionary = ['machine', 'learning', 'deep', 'neural', 'network', 'vision', 'natural', 'language', 'processing', 'artificial', 'intelligence']
        return dictionary
            .map(dictWord => ({ word: dictWord, distance: levenshteinDistance(word.toLowerCase(), dictWord) }))
            .filter(item => item.distance <= 2 && item.distance > 0)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3)
    }

    // Autocomplete suggestions
    const getAutocompleteSuggestions = (prefix: string) => {
        const suggestions = [
            'machine learning',
            'machine learning algorithms',
            'machine learning tutorial',
            'machine vision',
            'deep learning',
            'neural networks',
            'natural language processing'
        ]
        return suggestions.filter(s => s.toLowerCase().startsWith(prefix.toLowerCase())).slice(0, 5)
    }

    // KWIC snippet generation
    const generateKWIC = (text: string, queryTerms: string[]) => {
        const words = text.split(' ')
        for (let i = 0; i < words.length; i++) {
            if (queryTerms.some(term => words[i].toLowerCase().includes(term.toLowerCase()))) {
                const start = Math.max(0, i - 3)
                const end = Math.min(words.length, i + 4)
                const snippet = words.slice(start, end).join(' ')
                return { snippet, matchIndex: i - start }
            }
        }
        return { snippet: text.slice(0, 50) + '...', matchIndex: -1 }
    }

    // Fitts's Law calculation
    const calculateFittsTime = (distance: number, width: number) => {
        const a = 0.1 // empirical constant
        const b = 0.2 // empirical constant
        return a + b * Math.log2(distance / width + 1)
    }

    const executeComparison = () => {
        const queryTerms = query.toLowerCase().split(' ')

        // Spell checking
        const spellChecked = queryTerms.map(term => {
            const suggestions = getSpellingSuggestions(term)
            return { original: term, suggestions }
        })

        // Autocomplete
        const autocomplete = getAutocompleteSuggestions(query)

        // KWIC snippets
        const kwicResults = documents.map(doc => {
            const kwic = generateKWIC(doc.title + ' ' + doc.snippet, queryTerms)
            return { ...doc, kwic }
        })

        // Faceted search
        const facets = {
            category: Array.from(new Set(documents.map(d => d.category))),
            date: Array.from(new Set(documents.map(d => d.date.slice(0, 7)))) // Year-Month
        }

        // Fitts's Law
        const fittsTime = calculateFittsTime(targetDistance, targetWidth)

        setResults({
            spellChecked,
            autocomplete,
            kwicResults,
            facets,
            fittsTime,
            queryTerms
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3
                    </Link>
                </Button>
                <Badge variant="outline">Unit 3 Comparison</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 3: User Interface Comparison</h1>
                <p className="text-lg text-muted-foreground">
                    Compare HCI principles, query specification, and result visualization techniques
                </p>
            </div>

            {/* Input Section */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle>Input Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try: machne lerning (with typos)"
                                className="font-mono"
                            />
                            <Button onClick={executeComparison}>
                                <Play className="h-4 w-4 mr-2" /> Compare
                            </Button>
                            <Button variant="outline" onClick={() => {
                                setQuery('machine learning')
                                setResults(null)
                            }}>
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Fitts&apos;s Law - Target Distance: {targetDistance}px</label>
                            <Slider
                                value={[targetDistance]}
                                onValueChange={(v) => setTargetDistance(v[0])}
                                min={50}
                                max={500}
                                step={10}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Fitts&apos;s Law - Target Width: {targetWidth}px</label>
                            <Slider
                                value={[targetWidth]}
                                onValueChange={(v) => setTargetWidth(v[0])}
                                min={20}
                                max={200}
                                step={10}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {results && (
                <>
                    {/* HCI Principles - Fitts's Law */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🎯</span> HCI Principle: Fitts&apos;s Law
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded space-y-4">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground mb-2">Movement Time Formula:</p>
                                    <p className="font-mono text-lg font-bold">MT = a + b × log₂(D/W + 1)</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 text-center">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                                        <p className="text-2xl font-bold text-primary">{targetDistance}px</p>
                                        <p className="text-sm text-muted-foreground">Distance (D)</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                                        <p className="text-2xl font-bold text-primary">{targetWidth}px</p>
                                        <p className="text-sm text-muted-foreground">Width (W)</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                                        <p className="text-2xl font-bold text-green-600">{results.fittsTime.toFixed(3)}s</p>
                                        <p className="text-sm text-muted-foreground">Movement Time</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground text-center">
                                    💡 Larger, closer targets are faster to select. Make important UI elements big and accessible!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Query Specification */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">✍️</span> Query Specification Techniques
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="autocomplete" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="autocomplete">Autocomplete</TabsTrigger>
                                    <TabsTrigger value="spellcheck">Spell Check</TabsTrigger>
                                </TabsList>

                                <TabsContent value="autocomplete" className="space-y-4">
                                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                                        <h4 className="font-semibold mb-3">Query Autocompletion</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Suggests completions as you type, reducing keystrokes and errors
                                        </p>
                                        <div className="space-y-2">
                                            {results.autocomplete.map((suggestion: string, i: number) => (
                                                <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded flex items-center gap-2 hover:bg-secondary/50 cursor-pointer">
                                                    <Badge variant="outline">{i + 1}</Badge>
                                                    <span className="font-mono">{suggestion}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="spellcheck" className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                        <h4 className="font-semibold mb-3">Spell Checking (Levenshtein Distance)</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Detects typos and suggests corrections based on edit distance
                                        </p>
                                        <div className="space-y-3">
                                            {results.spellChecked.map((item: any, i: number) => (
                                                <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-mono font-bold">{item.original}</span>
                                                        {item.suggestions.length > 0 && (
                                                            <Badge variant="destructive">Possible typo</Badge>
                                                        )}
                                                    </div>
                                                    {item.suggestions.length > 0 && (
                                                        <div className="space-y-1">
                                                            <p className="text-xs text-muted-foreground">Did you mean:</p>
                                                            {item.suggestions.map((sug: any, j: number) => (
                                                                <div key={j} className="flex items-center gap-2 text-sm">
                                                                    <Badge variant="outline">Distance: {sug.distance}</Badge>
                                                                    <span className="text-green-600">{sug.word}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Result Visualization */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📊</span> Result Visualization Techniques
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="list" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="list">List View</TabsTrigger>
                                    <TabsTrigger value="kwic">KWIC Snippets</TabsTrigger>
                                    <TabsTrigger value="faceted">Faceted Search</TabsTrigger>
                                </TabsList>

                                <TabsContent value="list" className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">
                                            Traditional list view with titles and descriptions
                                        </p>
                                        {results.kwicResults.map((doc: any) => (
                                            <Card key={doc.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <h4 className="font-bold text-primary mb-1">{doc.title}</h4>
                                                    <p className="text-sm text-muted-foreground mb-2">{doc.snippet}</p>
                                                    <div className="flex gap-2">
                                                        <Badge variant="outline">{doc.category}</Badge>
                                                        <Badge variant="outline">{doc.date}</Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="kwic" className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">
                                            Key Word In Context - shows query terms with surrounding context
                                        </p>
                                        {results.kwicResults.map((doc: any) => (
                                            <Card key={doc.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <h4 className="font-bold text-primary mb-2">{doc.title}</h4>
                                                    <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded">
                                                        <p className="text-sm font-mono">
                                                            ...{doc.kwic.snippet.split(' ').map((word: string, i: number) => (
                                                                <span key={i} className={results.queryTerms.some((term: string) => word.toLowerCase().includes(term)) ? 'bg-yellow-300 dark:bg-yellow-700 font-bold' : ''}>
                                                                    {word}{' '}
                                                                </span>
                                                            ))}...
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="faceted" className="space-y-4">
                                    <div className="grid md:grid-cols-4 gap-4">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold">Filter by Category</h4>
                                            {results.facets.category.map((cat: string) => (
                                                <div key={cat} className="flex items-center gap-2 p-2 bg-secondary/30 rounded hover:bg-secondary/50 cursor-pointer">
                                                    <input type="checkbox" id={cat} />
                                                    <label htmlFor={cat} className="text-sm cursor-pointer">{cat}</label>
                                                    <Badge variant="outline" className="ml-auto">
                                                        {documents.filter(d => d.category === cat).length}
                                                    </Badge>
                                                </div>
                                            ))}
                                            <h4 className="font-semibold mt-4">Filter by Date</h4>
                                            {results.facets.date.map((date: string) => (
                                                <div key={date} className="flex items-center gap-2 p-2 bg-secondary/30 rounded hover:bg-secondary/50 cursor-pointer">
                                                    <input type="checkbox" id={date} />
                                                    <label htmlFor={date} className="text-sm cursor-pointer">{date}</label>
                                                    <Badge variant="outline" className="ml-auto">
                                                        {documents.filter(d => d.date.startsWith(date)).length}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="md:col-span-3 space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                Faceted search allows filtering by multiple attributes
                                            </p>
                                            {results.kwicResults.map((doc: any) => (
                                                <Card key={doc.id}>
                                                    <CardContent className="p-4">
                                                        <h4 className="font-bold text-primary mb-1">{doc.title}</h4>
                                                        <p className="text-sm text-muted-foreground mb-2">{doc.snippet}</p>
                                                        <div className="flex gap-2">
                                                            <Badge>{doc.category}</Badge>
                                                            <Badge variant="outline">{doc.date}</Badge>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
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
                                    <p className="font-semibold mb-2">HCI Principles Matter</p>
                                    <p className="text-sm text-muted-foreground">
                                        Fitts&apos;s Law shows why search buttons should be large and close to input fields.
                                        Good UI design reduces user effort and errors.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Query Assistance is Essential</p>
                                    <p className="text-sm text-muted-foreground">
                                        Autocomplete reduces typing by 30-50%. Spell checking catches 80% of typos.
                                        Both improve user satisfaction significantly.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Context is King</p>
                                    <p className="text-sm text-muted-foreground">
                                        KWIC snippets help users assess relevance 3x faster than full text.
                                        Highlighting query terms guides attention effectively.
                                    </p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded">
                                    <p className="font-semibold mb-2">Facets Enable Exploration</p>
                                    <p className="text-sm text-muted-foreground">
                                        Faceted search supports iterative refinement. Users can explore result space
                                        without reformulating queries.
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
