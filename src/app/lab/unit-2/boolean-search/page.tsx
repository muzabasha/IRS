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
        const res: number[] = []
        let i = 0, j = 0
        while (i < list1.length && j < list2.length) {
            if (list1[i] === list2[j]) { res.push(list1[i]); i++; j++ }
            else if (list1[i] < list2[j]) i++
            else j++
        }
        return res
    }

    const mergeOr = (list1: number[], list2: number[]) => {
        const res: number[] = []
        let i = 0, j = 0
        while (i < list1.length && j < list2.length) {
            if (list1[i] === list2[j]) { res.push(list1[i]); i++; j++ }
            else if (list1[i] < list2[j]) { res.push(list1[i]); i++ }
            else { res.push(list2[j]); j++ }
        }
        while (i < list1.length) res.push(list1[i++])
        while (j < list2.length) res.push(list2[j++])
        return res
    }

    const mergeNot = (list1: number[], list2: number[]) => {
        const res: number[] = []
        let i = 0, j = 0
        while (i < list1.length) {
            if (j >= list2.length || list1[i] < list2[j]) { res.push(list1[i]); i++ }
            else if (list1[i] === list2[j]) { i++; j++ }
            else j++
        }
        return res
    }

    const handleExecute = () => {
        const list1 = index[term1]
        const list2 = index[term2]
        if (operation === 'AND') setResult(mergeAnd(list1, list2))
        else if (operation === 'OR') setResult(mergeOr(list1, list2))
        else setResult(mergeNot(list1, list2))
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

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Find documents about &apos;cats&apos; AND &apos;dogs&apos; but NOT &apos;allergies&apos; — all in milliseconds. Boolean operations merge sorted postings lists efficiently using linear-time algorithms.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: AND Merge Cost */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Merge Cost
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">Cost(A ∩ B) = O(|A| + |B|)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">A, B</span>: Sorted postings lists for two terms
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">|A|, |B|</span>: Lengths of the postings lists
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">∩</span>: Intersection (AND operation)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">O(|A|+|B|)</span>: Linear time — single pass through both lists
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Because postings lists are sorted by document ID, AND/OR/NOT can all be computed in a single linear scan using two pointers. This is why Boolean retrieval is so fast — even for millions of documents.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Query Optimization */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Query Optimization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">Optimal order: process terms by increasing df(t)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">df(t)</span>: Document frequency — number of docs containing term t
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Smallest first</span>: AND the rarest term first to minimize intermediate results
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            For a conjunctive query (t₁ AND t₂ AND t₃), processing the term with the smallest postings list first produces the smallest intermediate result, reducing total comparisons. Example: if df(t₁)=1000, df(t₂)=50, df(t₃)=5000, process t₂ first.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Operation Comparison Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📊</span> Boolean Operations Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                            <thead>
                                <tr className="bg-secondary/30">
                                    <th className="border-2 p-3 text-left">Operation</th>
                                    <th className="border-2 p-3 text-left">Symbol</th>
                                    <th className="border-2 p-3 text-left">Algorithm</th>
                                    <th className="border-2 p-3 text-left">Complexity</th>
                                    <th className="border-2 p-3 text-left">Result Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="border-2 p-3 font-semibold">AND</td><td className="border-2 p-3 font-mono">∩</td><td className="border-2 p-3">Two-pointer intersection</td><td className="border-2 p-3">O(|A|+|B|)</td><td className="border-2 p-3">≤ min(|A|,|B|)</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">OR</td><td className="border-2 p-3 font-mono">∪</td><td className="border-2 p-3">Two-pointer union</td><td className="border-2 p-3">O(|A|+|B|)</td><td className="border-2 p-3">≤ |A|+|B|</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">NOT</td><td className="border-2 p-3 font-mono">\ (minus)</td><td className="border-2 p-3">Two-pointer difference</td><td className="border-2 p-3">O(|A|+|B|)</td><td className="border-2 p-3">≤ |A|</td></tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Demo */}
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
                                    <span className="text-muted-foreground">df={docs.length}</span>
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
                                    Found {result.length} matching document{result.length !== 1 ? 's' : ''} | Comparisons: O({index[term1].length}+{index[term2].length}) = O({index[term1].length + index[term2].length})
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
                            <li>• Exact match — predictable results</li>
                            <li>• Very fast (linear merge algorithms)</li>
                            <li>• Easy to understand and implement</li>
                            <li>• Supports complex nested queries</li>
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
                            <li>• No ranking — all results equally relevant</li>
                            <li>• Feast or famine (too many or zero results)</li>
                            <li>• Users must know Boolean logic</li>
                            <li>• Cannot express &quot;similar to&quot; or &quot;about&quot;</li>
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
                        Boolean search is the foundation of library catalog systems (OPAC), legal databases (Westlaw, LexisNexis), patent search (USPTO), PubMed medical literature search, and email filtering rules. Even modern ranked retrieval systems use Boolean operations internally to generate candidate sets before scoring.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
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
