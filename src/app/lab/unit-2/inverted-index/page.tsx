'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function InvertedIndexLab() {
    const [documents] = useState({
        1: 'machine learning algorithms',
        2: 'deep learning neural networks',
        3: 'machine learning and deep learning'
    })

    const [index, setIndex] = useState<Record<string, Array<[number, number]>>>({})
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<Array<[number, number]>>([])

    const buildIndex = () => {
        const newIndex: Record<string, Array<[number, number]>> = {}

        Object.entries(documents).forEach(([docId, text]) => {
            const terms = text.toLowerCase().split(/\s+/)
            const termFreq: Record<string, number> = {}

            terms.forEach(term => {
                termFreq[term] = (termFreq[term] || 0) + 1
            })

            Object.entries(termFreq).forEach(([term, freq]) => {
                if (!newIndex[term]) {
                    newIndex[term] = []
                }
                newIndex[term].push([Number(docId), freq])
            })
        })

        Object.keys(newIndex).forEach(term => {
            newIndex[term].sort((a, b) => a[0] - b[0])
        })

        setIndex(newIndex)
    }

    const handleSearch = () => {
        const term = searchTerm.toLowerCase().trim()
        if (term && index[term]) {
            setSearchResults(index[term])
        } else {
            setSearchResults([])
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 10 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Inverted Index Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Build the core data structure for search
                </p>
            </div>

            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Searching without an index is like reading every book in the library to find one quote. The inverted index enables instant term lookup.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Index Building Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Document Collection:</label>
                        <div className="space-y-2">
                            {Object.entries(documents).map(([id, text]) => (
                                <div key={id} className="p-4 bg-secondary/30 rounded border-2">
                                    <span className="font-semibold text-lg">Doc {id}:</span>
                                    <span className="ml-2 text-lg">{text}</span>
                                </div>
                            ))}
                        </div>
                        <Button onClick={buildIndex} size="lg" className="text-xl">
                            Build Inverted Index
                        </Button>
                    </div>

                    {Object.keys(index).length > 0 && (
                        <>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Inverted Index:</p>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {Object.entries(index).sort().map(([term, postings]) => (
                                        <div key={term} className="flex items-start gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">{term}</Badge>
                                            <div className="flex-1">
                                                {postings.map(([docId, freq], idx) => (
                                                    <span key={idx} className="mr-4">
                                                        Doc {docId} (freq: {freq})
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xl font-semibold">Search Term:</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Enter term to search"
                                        className="text-2xl p-6 border-2"
                                    />
                                    <Button onClick={handleSearch} size="lg" className="text-xl">
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                    <p className="font-semibold text-xl mb-3">Search Results for &quot;{searchTerm}&quot;:</p>
                                    <div className="space-y-2">
                                        {searchResults.map(([docId, freq]) => (
                                            <div key={docId} className="text-lg">
                                                • Document {docId}: frequency = {freq}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchTerm && searchResults.length === 0 && (
                                <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded border-2 border-yellow-500">
                                    <p className="text-xl">No results found for &quot;{searchTerm}&quot;</p>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/text-compression">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Text Compression
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/boolean-search">
                        Next: Boolean Search <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
