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

    const dictionary = ['kitten', 'sitting', 'kitchen', 'mitten', 'bitten']

    const levenshteinDistance = (a: string, b: string): number => {
        const matrix: number[][] = []

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i]
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1]
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    )
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
            if (dist < minDistance && dist > 0) {
                minDistance = dist
                closest = word
            }
        })

        setEditDistance(minDistance)
        setSuggestion(closest)
    }

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
                <h1 className="text-4xl font-bold">Query Specification UI Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Helping users express their search intent effectively
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Bridging the Gulf of Execution
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Users often misspell queries, don't know the right vocabulary, or struggle to express complex needs.
                        Query specification interfaces help bridge this gap with autocorrect, suggestions, and structured input.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Impact:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google corrects 15% of all queries automatically</li>
                            <li>• "Did you mean?" increases success rate by 25%</li>
                            <li>• Voice search handles 50+ languages with 95% accuracy</li>
                            <li>• Form-based search (flights, hotels) reduces errors by 60%</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Levenshtein Distance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Levenshtein Distance (Edit Distance)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-sm">
                        <div>lev(a,b) = min(</div>
                        <div className="ml-4">lev(a-1, b) + 1,  // deletion</div>
                        <div className="ml-4">lev(a, b-1) + 1,  // insertion</div>
                        <div className="ml-4">lev(a-1, b-1) + cost  // substitution</div>
                        <div>)</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Calculates minimum edits (insertions, deletions, substitutions) to transform one string into another.
                        Used for spell-check and "Did you mean?" suggestions.
                    </p>
                </CardContent>
            </Card>

            {/* Interactive Spell Checker */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Spell Checker
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Dictionary:</label>
                        <div className="bg-secondary/30 p-3 rounded">
                            <div className="flex flex-wrap gap-2">
                                {dictionary.map((word, i) => (
                                    <Badge key={i} variant="outline">{word}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Enter a word (try misspelling):</label>
                        <div className="flex gap-2">
                            <Input
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="e.g., kiten, siting"
                                className="text-lg"
                            />
                            <Button onClick={findClosestMatch}>
                                <Play className="h-4 w-4 mr-2" /> Check
                            </Button>
                        </div>
                    </div>

                    {suggestion && (
                        <div className="space-y-3">
                            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded border-2 border-amber-500">
                                <p className="text-sm mb-2">Did you mean:</p>
                                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                                    {suggestion}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Edit distance: {editDistance} {editDistance === 1 ? 'change' : 'changes'}
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                <p className="font-semibold mb-2">Transformation Steps:</p>
                                <div className="text-sm space-y-1">
                                    <p>From: <span className="font-mono">{userInput}</span></p>
                                    <p>To: <span className="font-mono">{suggestion}</span></p>
                                    <p className="text-muted-foreground">
                                        {editDistance} edit{editDistance !== 1 ? 's' : ''} required
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Query Specification Methods */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span> Query Specification Methods
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. Text Input</p>
                            <p className="text-sm text-muted-foreground">
                                Classic search box with autocomplete and spell-check
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Best for: General web search, known-item search
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Voice Input</p>
                            <p className="text-sm text-muted-foreground">
                                Natural language via speech recognition
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Best for: Mobile, hands-free, conversational queries
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Visual Query</p>
                            <p className="text-sm text-muted-foreground">
                                Upload image or draw sketch (Google Lens)
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Best for: Product search, plant identification
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">4. Form-Based</p>
                            <p className="text-sm text-muted-foreground">
                                Structured fields (date, price, location)
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Best for: Flights, hotels, job search
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: Levenshtein Distance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`def levenshtein_distance(s1, s2):
    """
    Calculate edit distance between two strings
    Returns minimum number of edits needed
    """
    m, n = len(s1), len(s2)
    
    # Create DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Initialize base cases
    for i in range(m + 1):
        dp[i][0] = i  # deletions
    for j in range(n + 1):
        dp[0][j] = j  # insertions
    
    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]  # no change
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # deletion
                    dp[i][j-1],    # insertion
                    dp[i-1][j-1]   # substitution
                )
    
    return dp[m][n]

def spell_check(query, dictionary, threshold=2):
    """
    Find closest matches in dictionary
    """
    suggestions = []
    for word in dictionary:
        dist = levenshtein_distance(query.lower(), word.lower())
        if 0 < dist <= threshold:
            suggestions.append((word, dist))
    
    # Sort by distance
    suggestions.sort(key=lambda x: x[1])
    return suggestions

# Example usage
dictionary = ['kitten', 'sitting', 'kitchen', 'mitten']
query = 'kiten'

suggestions = spell_check(query, dictionary)
print(f"Query: {query}")
print(f"Suggestions: {suggestions}")
# Output: [('kitten', 1), ('mitten', 1), ('kitchen', 2)]`}</code>
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
                            <p className="font-semibold mb-2">Q1: What does Levenshtein distance measure?</p>
                            <p className="text-sm text-green-600">A: The minimum number of single-character edits (insertions, deletions, substitutions) needed to transform one string into another.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: When is form-based input better than text search?</p>
                            <p className="text-sm text-green-600">A: When queries have structured parameters (dates, prices, locations) - reduces errors and ensures valid input.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is a "zero-query" search?</p>
                            <p className="text-sm text-green-600">A: Search that starts without user input - using context like location, history, or recommendations (e.g., Netflix homepage).</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-3/search-process">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Search Process
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-3/result-visualization">
                        Next: Result Visualization <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
