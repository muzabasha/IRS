'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function TextCompressionLab() {
    const [text, setText] = useState('AAABBC')
    const [huffmanCodes, setHuffmanCodes] = useState<Record<string, string>>({})
    const [compressed, setCompressed] = useState('')

    const buildHuffmanCodes = (inputText: string) => {
        const freq: Record<string, number> = {}
        for (const char of inputText) {
            freq[char] = (freq[char] || 0) + 1
        }

        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
        const codes: Record<string, string> = {}

        if (sorted.length === 1) {
            codes[sorted[0][0]] = '0'
        } else if (sorted.length === 2) {
            codes[sorted[0][0]] = '0'
            codes[sorted[1][0]] = '1'
        } else {
            sorted.forEach((entry, idx) => {
                codes[entry[0]] = idx.toString(2).padStart(2, '0')
            })
        }

        setHuffmanCodes(codes)
        const compressedText = inputText.split('').map(c => codes[c]).join('')
        setCompressed(compressedText)
    }

    const handleCompress = () => {
        if (text.trim()) {
            buildHuffmanCodes(text)
        }
    }

    const originalBits = text.length * 8
    const compressedBits = compressed.length
    const savings = originalBits > 0 ? ((1 - compressedBits / originalBits) * 100).toFixed(1) : '0'

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 9 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Text Compression Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Reduce storage with Huffman coding
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
                        A gigabyte saved is a gigabyte earned - and a second of search time saved. Compression reduces storage costs and speeds up disk I/O.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Huffman Coding Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Input Text:</label>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value.toUpperCase())}
                            placeholder="Enter text (e.g., AAABBC)"
                            className="text-2xl p-6 border-2"
                        />
                        <Button onClick={handleCompress} size="lg" className="text-xl">
                            Compress Text
                        </Button>
                    </div>

                    {Object.keys(huffmanCodes).length > 0 && (
                        <>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Huffman Codes:</p>
                                <div className="space-y-2">
                                    {Object.entries(huffmanCodes).map(([char, code]) => (
                                        <div key={char} className="flex items-center gap-4 text-lg">
                                            <Badge className="text-lg px-4 py-2">{char}</Badge>
                                            <span className="font-mono text-xl">{code}</span>
                                            <span className="text-muted-foreground">
                                                ({code.length} bit{code.length !== 1 ? 's' : ''})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="font-semibold text-xl mb-3">Compressed Output:</p>
                                <p className="font-mono text-lg break-all mb-4">{compressed}</p>
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
                                        <p className="text-3xl font-bold text-green-600">{savings}%</p>
                                        <p className="text-lg text-muted-foreground">Savings</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/document-clustering">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Document Clustering
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/inverted-index">
                        Next: Inverted Index <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
