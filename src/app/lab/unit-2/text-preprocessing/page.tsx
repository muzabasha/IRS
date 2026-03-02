'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function TextPreprocessingLab() {
    const [text, setText] = useState('The researchers are studying machine learning algorithms.')
    const [tokens, setTokens] = useState<string[]>([])
    const [noStopwords, setNoStopwords] = useState<string[]>([])
    const [stemmed, setStemmed] = useState<string[]>([])

    const stopwords = new Set(['the', 'are', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'])

    const simpleStem = (word: string): string => {
        const suffixes = ['ing', 'ed', 'es', 's', 'ly', 'er']
        for (const suffix of suffixes) {
            if (word.endsWith(suffix) && word.length > suffix.length + 2) {
                return word.slice(0, -suffix.length)
            }
        }
        return word
    }

    const processText = () => {
        // Tokenization
        const tokenized = text.toLowerCase().match(/\b\w+\b/g) || []
        setTokens(tokenized)

        // Stopword removal
        const filtered = tokenized.filter(t => !stopwords.has(t))
        setNoStopwords(filtered)

        // Stemming
        const stemmedTokens = filtered.map(simpleStem)
        setStemmed(stemmedTokens)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 7 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Text Preprocessing Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Clean and normalize text for indexing
                </p>
            </div>

            {/* Pipeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔄</span> Preprocessing Pipeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {['Tokenization', 'Normalization', 'Stopword Removal', 'Stemming'].map((step, i) => (
                            <div key={i} className="flex items-center gap-4 p-6 bg-secondary/20 rounded">
                                <Badge className="text-lg">{i + 1}</Badge>
                                <span className="text-xl font-semibold">{step}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Lab
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Input Text:</label>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="text-lg p-6"
                        />
                    </div>

                    <Button onClick={processText} size="lg" className="w-full text-lg">
                        <Play className="h-5 w-5 mr-2" /> Process Text
                    </Button>

                    {tokens.length > 0 && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xl font-semibold">1. Tokens ({tokens.length}):</label>
                                <div className="bg-secondary/30 p-6 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {tokens.map((t, i) => (
                                            <Badge key={i} variant="outline" className="text-base">{t}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-semibold">2. After Stopword Removal ({noStopwords.length}):</label>
                                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {noStopwords.map((t, i) => (
                                            <Badge key={i} variant="secondary" className="text-base">{t}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-semibold">3. After Stemming ({stemmed.length}):</label>
                                <div className="bg-green-50 dark:bg-green-950 p-6 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {stemmed.map((t, i) => (
                                            <Badge key={i} className="text-base">{t}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        Final tokens ready for indexing!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/global-analysis">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Global Analysis
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/document-clustering">
                        Next: Document Clustering <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
