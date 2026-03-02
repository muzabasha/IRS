'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function BooleanSearchLab() {
    const [index] = useState({
        cat: [1, 2, 4, 7],
        dog: [2, 3, 4, 5],
        bird: [1, 3, 6, 7]
    })

    const [operation, setOperation] = useState<'AND' | 'OR' | 'NOT'>('AND')
    const [term1, setTerm1] = useState<'cat' | 'dog' | 'bird'>('cat')
    const [term2, setTerm2] = useState<'cat' | 'dog' | 'bird'>('dog')
    const [result, setResult] = useState<number[]>([])

    const mergeAnd = (list1: number[], list2: number[]) => {
        const result: number[] = []
        let i = 0, j = 0
        while (i < list1.length && j < list2.length) {
            if (list1[i] === list2[j]) {
                result.push(list1[i])
                i++
                j++
            } else if (list1[i] < list2[j]) {
                i++
            } else {
                j++
            }
        }
        return result
    }

    const mergeOr = (list1: number[], list2: number[]) => {
        const result: number[] = []
        let i = 0, j = 0
        while (i < list1.length && j < list2.length) {
            if (list1[i] === list2[j]) {
                result.push(list1[i])
                i++
                j++
            } else if (list1[i] < list2[j]) {
                result.push(list1[i])
                i++
            } else {
                result.push(list2[j])
                j++
            }
        }
        while (i < list1.length) result.push(list1[i++])
        while (j < list2.length) result.push(list2[j++])
        return result
    }

    const mergeNot = (list1: number[], list2: number[]) => {
        const result: number[] = []
        let i = 0, j = 0
        while (i < list1.length) {
            if (j >= list2.length || list1[i] < list2[j]) {
                result.push(list1[i])
                i++
            } else if (list1[i] === list2[j]) {
                i++
                j++
            } else {
                j++
            }
        }
        return result
    }

    const handleExecute = () => {
        const list1 = index[term1]
        const list2 = index[term2]

        let newResult: number[] = []
        if (operation === 'AND') {
            newResult = mergeAnd(list1, list2)
        } else if (operation === 'OR') {
            newResult = mergeOr(list1, list2)
        } else {
            newResult = mergeNot(list1, list2)
        }
        setResult(newResult)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 11 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Boolean Search Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Process AND, OR, NOT queries with list merging
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
                        Find documents about &apos;cats&apos; AND &apos;dogs&apos; but NOT &apos;allergies&apos; - all in milliseconds. Boolean operations merge sorted lists efficiently.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> List Merging Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-6 rounded">
                        <p className="font-semibold text-xl mb-3">Inverted Index:</p>
                        <div className="space-y-2">
                            {Object.entries(index).map(([term, docs]) => (
                                <div key={term} className="flex items-center gap-4 text-lg">
                                    <Badge className="text-lg px-4 py-2">{term}</Badge>
                                    <span className="font-mono text-xl">[{docs.join(', ')}]</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xl font-semibold">Build Query:</label>
                        <div className="flex items-center gap-4 flex-wrap">
                            <select
                                value={term1}
                                onChange={(e) => setTerm1(e.target.value as 'cat' | 'dog' | 'bird')}
                                className="text-2xl p-4 border-2 rounded"
                            >
                                <option value="cat">cat</option>
                                <option value="dog">dog</option>
                                <option value="bird">bird</option>
                            </select>

                            <select
                                value={operation}
                                onChange={(e) => setOperation(e.target.value as 'AND' | 'OR' | 'NOT')}
                                className="text-2xl p-4 border-2 rounded font-bold"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                                <option value="NOT">NOT</option>
                            </select>

                            <select
                                value={term2}
                                onChange={(e) => setTerm2(e.target.value as 'cat' | 'dog' | 'bird')}
                                className="text-2xl p-4 border-2 rounded"
                            >
                                <option value="cat">cat</option>
                                <option value="dog">dog</option>
                                <option value="bird">bird</option>
                            </select>

                            <Button onClick={handleExecute} size="lg" className="text-xl">
                                Execute Query
                            </Button>
                        </div>
                    </div>

                    {result.length > 0 && (
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                            <p className="font-semibold text-xl mb-3">
                                Query: {term1} {operation} {term2}
                            </p>
                            <div className="space-y-2">
                                <p className="text-lg">
                                    <span className="font-semibold">List 1 ({term1}):</span> [{index[term1].join(', ')}]
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold">List 2 ({term2}):</span> [{index[term2].join(', ')}]
                                </p>
                                <p className="text-2xl font-bold mt-4">
                                    Result: [{result.join(', ')}]
                                </p>
                                <p className="text-lg text-muted-foreground">
                                    Found {result.length} matching document{result.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/inverted-index">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Inverted Index
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/index-compression">
                        Next: Index Compression <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
