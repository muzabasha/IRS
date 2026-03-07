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
    const [activeTab, setActiveTab] = useState<'fitts' | 'hick' | 'gestalt' | 'nielsen'>('fitts')

    const dictionary = ['machine learning', 'machine vision', 'machine translation', 'deep learning', 'neural networks']

    const calculateFitts = () => {
        const a = 50, b = 150
        const ID = Math.log2(1 + distance / buttonSize)
        const time = a + b * ID
        setFittsTime(Math.round(time))
    }

    const handleQueryChange = (value: string) => {
        setQuery(value)
        if (value.length > 0) {
            const matches = dictionary.filter(term => term.toLowerCase().startsWith(value.toLowerCase()))
            setSuggestions(matches.slice(0, 5))
        } else {
            setSuggestions([])
        }
    }

    const tabs = [
        { key: 'fitts' as const, label: "Fitts's Law", emoji: '🎯' },
        { key: 'hick' as const, label: "Hick's Law", emoji: '⏱️' },
        { key: 'gestalt' as const, label: 'Gestalt Principles', emoji: '👁️' },
        { key: 'nielsen' as const, label: "Nielsen's Heuristics", emoji: '📋' },
    ]

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
                <h1 className="text-5xl md:text-6xl font-bold">HCI Principles for IR</h1>
                <p className="text-2xl text-muted-foreground">
                    Design search interfaces that users love
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
                        The best search algorithm is useless if users can&apos;t figure out how to use it. HCI principles ensure search interfaces are intuitive, efficient, and satisfying.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Fitts's Law */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Fitts&apos;s Law
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">T = a + b × log₂(1 + D/W)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">T</span>: Time to reach target (milliseconds)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">a, b</span>: Empirical constants (device-dependent)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">D</span>: Distance to target (pixels)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">W</span>: Width of target (pixels)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">log₂(1+D/W)</span>: Index of Difficulty (ID)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Fitts&apos;s Law predicts pointing time: larger targets closer to the cursor are faster to click. For search UIs, this means the search button should be large and near the input field. Screen edges/corners act as &quot;infinite&quot; targets (zero overshoot).
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Hick's Law */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Hick&apos;s Law
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">T = b × log₂(n + 1)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">T</span>: Decision time (milliseconds)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">n</span>: Number of choices presented
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">b</span>: Empirical constant (~150ms per bit)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            More choices = slower decisions. Google shows 10 results per page (not 100) because users scan faster with fewer options. Autocomplete limits suggestions to 5–8 items. Faceted search breaks many filters into categorized groups.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> HCI Principles Exploration
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

                    {activeTab === 'fitts' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🎯 Fitts&apos;s Law in Search UI</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Search Button</p>
                                        <p className="text-muted-foreground">Large, adjacent to input field. Google&apos;s button is 36px tall, right next to the search box.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Result Links</p>
                                        <p className="text-muted-foreground">Full-width clickable areas. Title + snippet = larger target than title alone.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Mobile Touch Targets</p>
                                        <p className="text-muted-foreground">Minimum 44×44px (Apple HIG). Spacing prevents mis-taps.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Edge/Corner Targets</p>
                                        <p className="text-muted-foreground">Scroll bars, close buttons at edges have &quot;infinite&quot; width — impossible to overshoot.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hick' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">⏱️ Hick&apos;s Law in Search UI</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">10 Results Per Page</p>
                                        <p className="text-muted-foreground">Google shows 10 results — enough to find relevant docs without overwhelming users.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Autocomplete (5–8 items)</p>
                                        <p className="text-muted-foreground">Limiting suggestions reduces decision time while still being helpful.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Categorized Facets</p>
                                        <p className="text-muted-foreground">Group filters by type (date, format, source) instead of one flat list.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Progressive Disclosure</p>
                                        <p className="text-muted-foreground">Show basic options first, &quot;Advanced Search&quot; for power users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'gestalt' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">👁️ Gestalt Principles in Search UI</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Proximity</p>
                                        <p className="text-muted-foreground">Title, URL, snippet grouped together = one result. Whitespace separates results.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Similarity</p>
                                        <p className="text-muted-foreground">All result titles in blue, all URLs in green — consistent visual language.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Continuity</p>
                                        <p className="text-muted-foreground">Vertical list layout guides eye from top to bottom through results.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Figure-Ground</p>
                                        <p className="text-muted-foreground">Search box stands out against background. Highlighted terms pop from snippet text.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'nielsen' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📋 Nielsen&apos;s 10 Usability Heuristics (IR Focus)</p>
                                <div className="grid gap-3">
                                    {[
                                        { h: '1. Visibility of System Status', ex: 'Loading spinner, "About 1,230,000 results (0.42 sec)"' },
                                        { h: '2. Match Real World', ex: 'Use familiar terms: "Search", not "Execute Query"' },
                                        { h: '3. User Control & Freedom', ex: 'Back button, clear filters, edit query easily' },
                                        { h: '4. Consistency & Standards', ex: 'Blue links, search box at top, pagination at bottom' },
                                        { h: '5. Error Prevention', ex: 'Autocomplete, "Did you mean?", spell-check' },
                                        { h: '7. Flexibility & Efficiency', ex: 'Keyboard shortcuts, advanced search, search operators' },
                                        { h: '8. Aesthetic & Minimal Design', ex: 'Google homepage: just a logo and search box' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-secondary/20 p-4 rounded">
                                            <p className="font-semibold">{item.h}</p>
                                            <p className="text-muted-foreground text-sm">{item.ex}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Fitts Calculator */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Fitts&apos;s Law Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-lg font-semibold">Distance (D): {distance}px</label>
                                <Slider value={[distance]} onValueChange={(v) => setDistance(v[0])} min={100} max={1000} step={50} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-lg font-semibold">Button Width (W): {buttonSize}px</label>
                                <Slider value={[buttonSize]} onValueChange={(v) => setButtonSize(v[0])} min={10} max={200} step={10} />
                            </div>
                            <Button onClick={calculateFitts} className="w-full text-lg" size="lg">
                                <Play className="h-5 w-5 mr-2" /> Calculate Time
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {fittsTime > 0 && (
                                <div className="bg-primary/10 p-6 rounded border-2 border-primary">
                                    <p className="text-lg text-muted-foreground mb-2">Predicted Time:</p>
                                    <p className="text-5xl font-bold">{fittsTime}ms</p>
                                    <p className="text-lg text-muted-foreground mt-2">
                                        Index of Difficulty: {Math.log2(1 + distance / buttonSize).toFixed(2)} bits
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Autocomplete Demo */}
            <Card className="border-4 border-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Autocomplete Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xl font-semibold">Try typing &quot;machine&quot; or &quot;deep&quot;:</label>
                        <Input value={query} onChange={(e) => handleQueryChange(e.target.value)} placeholder="Start typing..." className="text-2xl p-6 border-2" />
                        {suggestions.length > 0 && (
                            <div className="bg-background border-2 rounded-lg shadow-lg">
                                {suggestions.map((suggestion, i) => (
                                    <div key={i} className="p-4 hover:bg-secondary cursor-pointer border-b last:border-b-0 text-lg" onClick={() => { setQuery(suggestion); setSuggestions([]) }}>
                                        <span className="font-semibold">{query}</span>
                                        <span className="text-muted-foreground">{suggestion.slice(query.length)}</span>
                                    </div>
                                ))}
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
                            <li>• Reduces user errors by 60% (autocomplete)</li>
                            <li>• Increases task completion rate</li>
                            <li>• Measurable with Fitts&apos;s/Hick&apos;s laws</li>
                            <li>• Universal principles across platforms</li>
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
                            <li>• Oversimplification of human behavior</li>
                            <li>• Cultural differences in UI expectations</li>
                            <li>• Accessibility needs vary widely</li>
                            <li>• Lab results may not match real-world usage</li>
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
                        HCI principles drive every major search interface. Google&apos;s minimalist homepage (aesthetic design), Amazon&apos;s autocomplete (error prevention, 20–30% conversion boost), faceted navigation in e-commerce (Hick&apos;s Law), and mobile search optimization (Fitts&apos;s Law for touch targets) all stem from these foundational principles.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-3/search-process">
                        Next: Search Process <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
