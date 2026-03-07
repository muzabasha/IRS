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
    const [activeTab, setActiveTab] = useState<'vbyte' | 'gamma' | 'delta' | 'pfordelta'>('vbyte')

    const variableByteEncode = (n: number): number[] => {
        const bytes: number[] = []
        while (n >= 128) {
            bytes.push(n % 128)
            n = Math.floor(n / 128)
        }
        bytes.push(n + 128)
        return bytes
    }

    const gammaEncode = (n: number): string => {
        if (n <= 0) return '0'
        const binary = n.toString(2)
        const len = binary.length
        const unary = '1'.repeat(len - 1) + '0'
        return unary + binary.slice(1)
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

    const tabs = [
        { key: 'vbyte' as const, label: 'Variable-Byte', emoji: '📦' },
        { key: 'gamma' as const, label: 'Gamma Code', emoji: '🔢' },
        { key: 'delta' as const, label: 'Delta Code', emoji: '📐' },
        { key: 'pfordelta' as const, label: 'PForDelta', emoji: '⚡' },
    ]

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

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        A compressed index in RAM beats an uncompressed index on disk — every time. Gap encoding makes postings lists smaller and faster to process.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Gap Encoding */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Gap Encoding
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">g<sub>i</sub> = d<sub>i</sub> - d<sub>i-1</sub> (for i &gt; 1), g<sub>1</sub> = d<sub>1</sub></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">d<sub>i</sub></span>: The i-th document ID in the sorted postings list
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">g<sub>i</sub></span>: The gap (difference) between consecutive doc IDs
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">g<sub>1</sub> = d<sub>1</sub></span>: First entry stored as-is
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Sorted postings lists have increasing doc IDs. Storing gaps instead of absolute IDs produces much smaller numbers (especially for frequent terms), which compress better. Example: [100, 105, 110, 150, 200] → gaps [100, 5, 5, 40, 50] — the gaps are much smaller and need fewer bits.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Variable-Byte */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Variable-Byte Encoding
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">Bytes(n) = ⌈log<sub>128</sub>(n+1)⌉</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">n</span>: Gap value to encode
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">7 bits</span>: Data per byte (7 of 8 bits)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">1 bit</span>: Continuation flag (MSB: 1=last byte, 0=more)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Variable-byte uses 7 bits per byte for data and 1 bit as a continuation flag. Small gaps (≤127) need just 1 byte instead of 4. This is byte-aligned, making it fast to decode — the standard choice for production search engines like Lucene.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Compression Techniques
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.key}
                                variant={activeTab === tab.key ? 'default' : 'outline'}
                                onClick={() => setActiveTab(tab.key)}
                                className="text-lg px-6 py-4"
                            >
                                {tab.emoji} {tab.label}
                            </Button>
                        ))}
                    </div>

                    {activeTab === 'vbyte' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📦 Variable-Byte (VByte)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Byte-aligned encoding. Each byte uses 7 bits for data and 1 bit as continuation flag. Fast to decode due to byte alignment.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>Gap 5 → <span className="text-green-600 dark:text-green-400">[133]</span> (1 byte: 10000101)</p>
                                    <p>Gap 130 → <span className="text-green-600 dark:text-green-400">[2, 129]</span> (2 bytes: 00000010 10000001)</p>
                                    <p>Gap 16384 → <span className="text-green-600 dark:text-green-400">[0, 0, 129]</span> (3 bytes)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'gamma' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🔢 Elias Gamma Code</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Bit-level encoding: unary-coded length prefix + binary offset. Optimal for small gaps but not byte-aligned.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>Gap 1 → <span className="text-green-600 dark:text-green-400">{gammaEncode(1)}</span> (1 bit)</p>
                                    <p>Gap 5 → <span className="text-green-600 dark:text-green-400">{gammaEncode(5)}</span> (5 bits)</p>
                                    <p>Gap 13 → <span className="text-green-600 dark:text-green-400">{gammaEncode(13)}</span> (7 bits)</p>
                                    <p>Gap 100 → <span className="text-green-600 dark:text-green-400">{gammaEncode(100)}</span> (13 bits)</p>
                                </div>
                                <p className="text-muted-foreground mt-3">
                                    Formula: ⌊log₂(n)⌋ zeros + binary(n) = 2⌊log₂(n)⌋ + 1 bits total
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'delta' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📐 Elias Delta Code</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Encodes the length using gamma code instead of unary. Better than gamma for larger gaps (n &gt; 32).
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>Gap 1 → <span className="text-green-600 dark:text-green-400">1</span> (1 bit)</p>
                                    <p>Gap 5 → <span className="text-green-600 dark:text-green-400">01101</span> (5 bits)</p>
                                    <p>Gap 100 → <span className="text-green-600 dark:text-green-400">00111100100</span> (11 bits vs 13 for gamma)</p>
                                </div>
                                <p className="text-muted-foreground mt-3">
                                    Delta saves bits for large values because gamma-coding the length is more compact than unary for large lengths.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pfordelta' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">⚡ PForDelta (Patched Frame-of-Reference)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Block-based encoding: encodes blocks of 128 gaps using a fixed bit-width, with exceptions stored separately. Extremely fast decompression via SIMD.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">How it works:</p>
                                        <ul className="space-y-2 text-muted-foreground mt-2">
                                            <li>• Choose bit-width b that covers 90% of gaps</li>
                                            <li>• Encode most gaps in b bits each</li>
                                            <li>• &quot;Patch&quot; exceptions (outliers) separately</li>
                                        </ul>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Why it&apos;s fast:</p>
                                        <ul className="space-y-2 text-muted-foreground mt-2">
                                            <li>• Fixed-width = SIMD-friendly</li>
                                            <li>• Decodes 128 gaps at once</li>
                                            <li>• Used in Lucene, Google, Bing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Demo */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Gap Encoding + VByte Demo
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

                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Step 3: Gamma Encoding (for comparison)</p>
                                <div className="space-y-3">
                                    {gaps.map((gap, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">Gap: {gap}</Badge>
                                            <span className="font-mono text-xl">
                                                {gammaEncode(gap)}
                                            </span>
                                            <span className="text-muted-foreground">
                                                ({gammaEncode(gap).length} bits)
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
                                        <p className="text-lg text-muted-foreground">VByte bits</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-green-600">{ratio}</p>
                                        <p className="text-lg text-muted-foreground">Compression ratio</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold">{gaps.reduce((sum, g) => sum + gammaEncode(g).length, 0)}</p>
                                        <p className="text-lg text-muted-foreground">Gamma bits</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">
                                            {(gaps.reduce((sum, g) => sum + gammaEncode(g).length, 0) / originalBits).toFixed(2)}
                                        </p>
                                        <p className="text-lg text-muted-foreground">Gamma ratio</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📊</span> Technique Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                            <thead>
                                <tr className="bg-secondary/30">
                                    <th className="border-2 p-3 text-left">Feature</th>
                                    <th className="border-2 p-3 text-left">Variable-Byte</th>
                                    <th className="border-2 p-3 text-left">Gamma</th>
                                    <th className="border-2 p-3 text-left">Delta</th>
                                    <th className="border-2 p-3 text-left">PForDelta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="border-2 p-3 font-semibold">Alignment</td><td className="border-2 p-3">Byte</td><td className="border-2 p-3">Bit</td><td className="border-2 p-3">Bit</td><td className="border-2 p-3">Block (128)</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Decode Speed</td><td className="border-2 p-3">Fast</td><td className="border-2 p-3">Slow</td><td className="border-2 p-3">Slow</td><td className="border-2 p-3">Very Fast (SIMD)</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Compression</td><td className="border-2 p-3">Good</td><td className="border-2 p-3">Better (small gaps)</td><td className="border-2 p-3">Better (large gaps)</td><td className="border-2 p-3">Good</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Best For</td><td className="border-2 p-3">General purpose</td><td className="border-2 p-3">Very small gaps</td><td className="border-2 p-3">Mixed gap sizes</td><td className="border-2 p-3">High-throughput</td></tr>
                                <tr><td className="border-2 p-3 font-semibold">Used In</td><td className="border-2 p-3">Lucene, SQLite</td><td className="border-2 p-3">Academic IR</td><td className="border-2 p-3">Academic IR</td><td className="border-2 p-3">Google, Bing</td></tr>
                            </tbody>
                        </table>
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
                            <li>• Fits index in RAM (10x smaller)</li>
                            <li>• Faster I/O (less data to read from disk)</li>
                            <li>• Gap encoding exploits sorted order</li>
                            <li>• Decompression can be faster than disk seek</li>
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
                            <li>• Bit-level codes slow to decode (gamma/delta)</li>
                            <li>• Random access requires sequential decode</li>
                            <li>• Compression ratio depends on gap distribution</li>
                            <li>• Block codes need padding for short lists</li>
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
                        Index compression is critical for web-scale search. Google compresses petabytes of index data using PForDelta and similar block codes. Lucene/Elasticsearch use variable-byte encoding for postings lists. SQLite FTS5 uses variable-byte for its full-text index. Compression enables mobile search (limited RAM) and reduces cloud storage costs significantly.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
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
