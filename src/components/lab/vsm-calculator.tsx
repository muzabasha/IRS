'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Play } from 'lucide-react'

export function VSMCalculator() {
    const [query, setQuery] = useState('machine learning')
    const [results, setResults] = useState<Array<{ doc: string, score: number, details: string }>>([])

    const documents = [
        'machine learning algorithms for data science',
        'deep learning and neural networks',
        'machine vision and computer graphics',
        'natural language processing with machine learning',
        'database management systems'
    ]

    const calculateTFIDF = () => {
        const queryTerms = query.toLowerCase().split(' ')
        const scores = documents.map((doc, idx) => {
            const docTerms = doc.toLowerCase().split(' ')
            let score = 0
            let details = ''

            queryTerms.forEach(qTerm => {
                const tf = docTerms.filter(t => t === qTerm).length / docTerms.length
                const df = documents.filter(d => d.toLowerCase().includes(qTerm)).length
                const idf = Math.log(documents.length / (df || 1))
                const tfidf = tf * idf
                score += tfidf
                if (tf > 0) {
                    details += `${qTerm}: TF=${tf.toFixed(3)}, IDF=${idf.toFixed(3)}, TF-IDF=${tfidf.toFixed(3)}; `
                }
            })

            return { doc, score, details: details || 'No matching terms' }
        })

        const sorted = scores.sort((a, b) => b.score - a.score)
        setResults(sorted)
    }

    return (
        <Card className="border-2 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">💻</span> Interactive TF-IDF Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Document Collection:</label>
                    <div className="bg-secondary/30 p-4 rounded space-y-1 text-sm">
                        {documents.map((doc, i) => (
                            <div key={i} className="font-mono">Doc{i + 1}: {doc}</div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">Enter Query:</label>
                    <div className="flex gap-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., machine learning"
                        />
                        <Button onClick={calculateTFIDF}>
                            <Play className="h-4 w-4 mr-2" /> Calculate
                        </Button>
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Ranked Results:</label>
                        <div className="space-y-2">
                            {results.map((result, i) => (
                                <div key={i} className={`p-3 rounded ${result.score > 0 ? 'bg-green-50 dark:bg-green-950' : 'bg-secondary/20'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <Badge variant={result.score > 0 ? 'default' : 'outline'}>
                                            Rank {i + 1}
                                        </Badge>
                                        <span className="font-mono font-bold">Score: {result.score.toFixed(4)}</span>
                                    </div>
                                    <p className="text-sm mb-1">{result.doc}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{result.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
