'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function HCIPrinciplesLab() {
    const [buttonSize, setButtonSize] = useState(50)
    const [distance, setDistance] = useState(500)
    const [fittsTime, setFittsTime] = useState(0)
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])

    const dictionary = ['machine learning', 'machine vision', 'machine translation', 'deep learning', 'neural networks']

    const calculateFitts = () => {
        const a = 50, b = 150 // Empirical constants
        const ID = Math.log2(1 + distance / buttonSize)
        const time = a + b * ID
        setFittsTime(Math.round(time))
    }

    const handleQueryChange = (value: string) => {
        setQuery(value)
        if (value.length > 0) {
            const matches = dictionary.filter(term =>
                term.toLowerCase().startsWith(value.toLowerCase())
            )
            setSuggestions(matches.slice(0, 5))
        } else {
            setSuggestions([])
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge>Lab 1 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">HCI Principles for IR</h1>
                <p className="text-lg text-muted-foreground">
                    Design search interfaces that users love
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why HCI Matters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        The best search algorithm is useless if users can't figure out how to use it. HCI principles ensure
                        that search interfaces are intuitive, efficient, and satisfying.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Impact:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google's minimalist homepage reduces cognitive load - users focus on search</li>
                            <li>• Amazon's autocomplete increases conversions by 20-30%</li>
                            <li>• Poor UI causes 70% of users to abandon search within 3 clicks</li>
                            <li>• Fitts's Law: Larger buttons = 37% faster interaction</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Fitts's Law */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Fitts's Law: Button Placement
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">T = a + b × log₂(1 + D/W)</div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">T</span>
                                <span className="text-muted-foreground">Time to reach target (milliseconds)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">D</span>
                                <span className="text-muted-foreground">Distance to target (pixels)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">W</span>
                                <span className="text-muted-foreground">Width of target (pixels)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Fitts Calculator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Fitts's Law Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Distance (D): {distance}px</label>
                                <Slider
                                    value={[distance]}
                                    onValueChange={(v) => setDistance(v[0])}
                                    min={100}
                                    max={1000}
                                    step={50}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Button Width (W): {buttonSize}px</label>
                                <Slider
                                    value={[buttonSize]}
                                    onValueChange={(v) => setButtonSize(v[0])}
                                    min={10}
                                    max={200}
                                    step={10}
                                />
                            </div>
                            <Button onClick={calculateFitts} className="w-full">
                                <Play className="h-4 w-4 mr-2" /> Calculate Time
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {fittsTime > 0 && (
                                <div className="bg-primary/10 p-6 rounded border-2 border-primary">
                                    <p className="text-sm text-muted-foreground mb-2">Predicted Time:</p>
                                    <p className="text-4xl font-bold">{fittsTime}ms</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Index of Difficulty: {Math.log2(1 + distance / buttonSize).toFixed(2)}
                                    </p>
                                </div>
                            )}
                            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                <p className="font-semibold mb-2">Design Insights:</p>
                                <ul className="space-y-1 text-sm">
                                    <li>• Larger buttons are easier to click</li>
                                    <li>• Closer buttons are faster to reach</li>
                                    <li>• Corners/edges are "infinite" targets</li>
                                    <li>• Mobile needs 44×44px minimum</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Autocomplete Demo */}
            <Card className="border-2 border-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Autocomplete: Reducing Cognitive Load
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Try typing "machine" or "deep":</label>
                        <Input
                            value={query}
                            onChange={(e) => handleQueryChange(e.target.value)}
                            placeholder="Start typing..."
                            className="text-lg"
                        />
                        {suggestions.length > 0 && (
                            <div className="bg-background border rounded-lg shadow-lg">
                                {suggestions.map((suggestion, i) => (
                                    <div
                                        key={i}
                                        className="p-3 hover:bg-secondary cursor-pointer border-b last:border-b-0"
                                        onClick={() => {
                                            setQuery(suggestion)
                                            setSuggestions([])
                                        }}
                                    >
                                        <span className="font-semibold">{query}</span>
                                        <span className="text-muted-foreground">{suggestion.slice(query.length)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                        <p className="font-semibold mb-2">Benefits:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Reduces typing by 30-50%</li>
                            <li>• Prevents spelling errors</li>
                            <li>• Suggests vocabulary users don't know</li>
                            <li>• Increases query success rate by 20%</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* HCI Principles */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📋</span> Core HCI Principles for Search
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold mb-2">1. Visibility of System Status</p>
                        <p className="text-sm text-muted-foreground">
                            Show loading indicators, result counts, "Searching..." messages
                        </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold mb-2">2. Error Prevention</p>
                        <p className="text-sm text-muted-foreground">
                            Autocomplete, spell-check, "Did you mean?" suggestions
                        </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold mb-2">3. User Control & Freedom</p>
                        <p className="text-sm text-muted-foreground">
                            Easy query editing, back button, clear filters
                        </p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                        <p className="font-semibold mb-2">4. Recognition over Recall</p>
                        <p className="text-sm text-muted-foreground">
                            Show search history, recent queries, popular searches
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: Autocomplete with Trie
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.frequency = 0

class Autocomplete:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word, freq=1):
        """Add word to trie with frequency"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
        node.frequency = freq
    
    def search_prefix(self, prefix):
        """Find all words starting with prefix"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        
        # DFS to find all completions
        results = []
        self._dfs(node, prefix, results)
        # Sort by frequency
        return sorted(results, key=lambda x: x[1], reverse=True)
    
    def _dfs(self, node, current, results):
        if node.is_end:
            results.append((current, node.frequency))
        for char, child in node.children.items():
            self._dfs(child, current + char, results)

# Example usage
ac = Autocomplete()
ac.insert("machine learning", 1000)
ac.insert("machine vision", 500)
ac.insert("machine translation", 300)

suggestions = ac.search_prefix("mach")
print(f"Suggestions: {[word for word, freq in suggestions]}")`}</code>
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
                            <p className="font-semibold mb-2">Q1: According to Fitts's Law, how do you make a button easier to click?</p>
                            <p className="text-sm text-green-600">A: Increase its size (W) or reduce distance to it (D). Larger buttons have lower Index of Difficulty.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why is autocomplete important for search?</p>
                            <p className="text-sm text-green-600">A: Reduces typing, prevents errors, suggests vocabulary, and increases success rate by helping users formulate better queries.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is "visibility of system status"?</p>
                            <p className="text-sm text-green-600">A: Keeping users informed about what's happening through feedback like loading indicators, progress bars, and result counts.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-3">
                        View More Labs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
