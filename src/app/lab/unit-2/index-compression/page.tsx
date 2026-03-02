'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function IndexCompressionLab() {
    const [docIds, setDocIds] = useState('100,105,110,150,200')
    const [gaps, setGaps] = useState<number[]>([])
    const [vbEncoded, setVbEncoded] = useState<Array<{ gap: number; bytes: number[] }>>([])

    const variableByteEncode = (n: number): number[] => {
        const bytes: number[] = []
        while (n >= 128) {
            bytes.push(n % 128)
            n = Math.floor(n / 128)
        }
        bytes.push(n + 128)
        return bytes
    }

    const handleCompress = () => {
        const ids = docIds.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
        if (ids.length === 0) return

        const newGaps: number[] = [ids[0]]
        for (let i = 1; i < ids.length; i++) {
            newGaps.push(ids[i] - ids[i - 1])
        }
        setGaps(newGaps)

        const encoded = newGaps.map(gap => ({
            gap,
            bytes: variableByteEncode(gap)
        }))
        setVbEncoded(encoded)
    }

    const originalBits = docIds.split(',').filter(s => s.trim()).length * 32
    const compressedBits = vbEncoded.reduce((sum, item) => sum + item.bytes.length * 8, 0)
    const ratio = originalBits > 0 ? (compressedBits / originalBits).toFixed(2) : '0'

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 12 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Index Compression Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Gap encoding and variable-byte compression
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
                        A compressed index in RAM beats an uncompressed index on disk - every time. Gap encoding makes postings lists smaller and faster.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Gap Encoding Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Document IDs (comma-separated):</label>
                        <Input
                            value={docIds}
                            onChange={(e) => setDocIds(e.target.value)}
                            placeholder="e.g., 100,105,110,150,200"
                            className="text-2xl p-6 border-2"
                        />
                        <Button onClick={handleCompress} size="lg" className="text-xl">
                            Compress with Gap Encoding
                        </Button>
                    </div>

                    {gaps.length > 0 && (
                        <>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Step 1: Gap Encoding</p>
                                <div className="space-y-2">
                                    <p className="text-lg">
                                        <span className="font-semibold">Original IDs:</span> [{docIds}]
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-semibold">Gaps:</span> [{gaps.join(', ')}]
                                    </p>
                                </div>
                            </div>

                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Step 2: Variable-Byte Encoding</p>
                                <div className="space-y-3">
                                    {vbEncoded.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">Gap: {item.gap}</Badge>
                                            <span className="font-mono text-xl">
                                                [{item.bytes.join(', ')}]
                                            </span>
                                            <span className="text-muted-foreground">
                                                ({item.bytes.length} byte{item.bytes.length !== 1 ? 's' : ''})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="font-semibold text-xl mb-3">Compression Results:</p>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-3xl font-bold">{originalBits}</p>
                                        <p className="text-lg text-muted-foreground">Original bits</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{compressedBits}</p>
                                        <p className="text-lg text-muted-foreground">Compressed bits</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-green-600">{ratio}</p>
                                        <p className="text-lg text-muted-foreground">Compression ratio</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/boolean-search">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Boolean Search
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2-comparison">
                        Next: Unit 2 Comparison <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
