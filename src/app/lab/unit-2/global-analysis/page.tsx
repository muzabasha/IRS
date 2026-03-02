'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function GlobalAnalysisLab() {
    const [selectedTerm, setSelectedTerm] = useState('car')

    const thesaurus: Record<string, string[]> = {
        'car': ['automobile', 'vehicle', 'auto', 'sedan'],
        'computer': ['machine', 'processor', 'system', 'device'],
        'search': ['query', 'find', 'lookup', 'retrieve']
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 6 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Global Analysis Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Collection-wide query expansion with thesaurus and LSI
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
                        Sometimes the best expansion terms aren't in your search results - they're hidden in the collection. Global analysis uses collection-wide statistics to find related terms.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                        <p className="font-semibold text-xl mb-3">Advantages over Local Analysis:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• More stable - not affected by poor initial results</li>
                            <li>• Handles synonyms better (car → automobile)</li>
                            <li>• Pre-computed - no query-time overhead</li>
                            <li>• No query drift risk</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Thesaurus Demo */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab: Thesaurus Expansion
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Select a Query Term:</label>
                        <div className="flex gap-3">
                            {Object.keys(thesaurus).map((term) => (
                                <Button
                                    key={term}
                                    variant={selectedTerm === term ? 'default' : 'outline'}
                                    onClick={() => setSelectedTerm(term)}
                                    size="lg"
                                    className="text-lg"
                                >
                                    {term}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Related Terms from Thesaurus:</label>
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                            <div className="flex flex-wrap gap-3">
                                {thesaurus[selectedTerm].map((term, i) => (
                                    <Badge key={i} variant="secondary" className="text-xl px-6 py-3">
                                        {term}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                These terms are semantically related to "{selectedTerm}" based on collection-wide co-occurrence patterns.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Expanded Query:</label>
                        <div className="bg-secondary/30 p-6 rounded font-mono text-lg">
                            {selectedTerm} {thesaurus[selectedTerm].join(' ')}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">⚖️</span> Local vs Global Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-2 border-blue-500 p-6 rounded-lg">
                            <h3 className="font-bold text-2xl mb-4 text-blue-600">Local Analysis</h3>
                            <ul className="space-y-2 text-lg">
                                <li>✓ Fast and context-specific</li>
                                <li>✓ No pre-computation needed</li>
                                <li>✗ Risk of query drift</li>
                                <li>✗ Depends on initial results</li>
                            </ul>
                        </div>
                        <div className="border-2 border-green-500 p-6 rounded-lg">
                            <h3 className="font-bold text-2xl mb-4 text-green-600">Global Analysis</h3>
                            <ul className="space-y-2 text-lg">
                                <li>✓ Stable and reliable</li>
                                <li>✓ Handles synonyms well</li>
                                <li>✗ Expensive to build</li>
                                <li>✗ Less context-specific</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/local-analysis">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Local Analysis
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/text-preprocessing">
                        Next: Text Preprocessing <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
