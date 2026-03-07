'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ─── Huffman ───
function huffmanEncode(text: string) {
    if (!text) return { codes: {} as Record<string, string>, bits: 0, encoded: '' }
    const freq: Record<string, number> = {}
    for (const c of text) freq[c] = (freq[c] || 0) + 1

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
    const codes: Record<string, string> = {}
    if (sorted.length === 1) {
        codes[sorted[0][0]] = '0'
    } else {
        const bitLen = Math.max(1, Math.ceil(Math.log2(sorted.length)))
        sorted.forEach(([ch], i) => { codes[ch] = i.toString(2).padStart(bitLen, '0') })
    }
    const encoded = text.split('').map(c => codes[c]).join('')
    return { codes, bits: encoded.length, encoded }
}

// ─── RLE ───
function rleEncode(text: string) {
    if (!text) return { pairs: [] as Array<[number, string]>, encoded: '' }
    const pairs: Array<[number, string]> = []
    let count = 1
    for (let i = 1; i < text.length; i++) {
        if (text[i] === text[i - 1]) count++
        else { pairs.push([count, text[i - 1]]); count = 1 }
    }
    pairs.push([count, text[text.length - 1]])
    const encoded = pairs.map(([c, s]) => `(${c},${s})`).join('')
    return { pairs, encoded }
}

// ─── LZ77 ───
function lz77Encode(text: string, windowSize = 12) {
    const tokens: Array<[number, number, string]> = []
    let i = 0
    while (i < text.length) {
        let bestOff = 0, bestLen = 0
        const start = Math.max(0, i - windowSize)
        for (let j = start; j < i; j++) {
            let len = 0
            while (i + len < text.length && j + len < i && text[j + len] === text[i + len]) len++
            if (len > bestLen) { bestOff = i - j; bestLen = len }
        }
        const next = i + bestLen < text.length ? text[i + bestLen] : ''
        tokens.push([bestOff, bestLen, next])
        i += bestLen + 1
    }
    return tokens
}

// ─── LZ78 ───
function lz78Encode(text: string) {
    const dict: Record<string, number> = {}
    const tokens: Array<[number, string]> = []
    let w = '', nextCode = 1
    for (const c of text) {
        const wc = w + c
        if (dict[wc] !== undefined) { w = wc }
        else {
            tokens.push([dict[w] ?? 0, c])
            dict[wc] = nextCode++
            w = ''
        }
    }
    if (w) tokens.push([dict[w] ?? 0, ''])
    return { tokens, dictSize: nextCode - 1 }
}

// ─── LZW ───
function lzwEncode(text: string) {
    const dict: Record<string, number> = {}
    const unique = [...new Set(text.split(''))]
    unique.forEach((c, i) => { dict[c] = i })
    let nextCode = unique.length
    let w = ''
    const output: number[] = []
    for (const c of text) {
        const wc = w + c
        if (dict[wc] !== undefined) { w = wc }
        else {
            output.push(dict[w])
            dict[wc] = nextCode++
            w = c
        }
    }
    if (w) output.push(dict[w])
    return { output, newEntries: nextCode - unique.length }
}

// ─── Entropy ───
function computeEntropy(text: string) {
    if (!text) return 0
    const freq: Record<string, number> = {}
    for (const c of text) freq[c] = (freq[c] || 0) + 1
    let h = 0
    for (const f of Object.values(freq)) {
        const p = f / text.length
        if (p > 0) h -= p * Math.log2(p)
    }
    return h
}

export default function TextCompressionLab() {
    const [text, setText] = useState('AABCAABCAABC')
    const [activeTab, setActiveTab] = useState<'huffman' | 'rle' | 'lz77' | 'lz78' | 'lzw' | 'compare'>('compare')

    const entropy = useMemo(() => computeEntropy(text), [text])
    const huffman = useMemo(() => huffmanEncode(text), [text])
    const rle = useMemo(() => rleEncode(text), [text])
    const lz77 = useMemo(() => lz77Encode(text), [text])
    const lz78 = useMemo(() => lz78Encode(text), [text])
    const lzw = useMemo(() => lzwEncode(text), [text])

    const originalBits = text.length * 8
    const tabs = [
        { key: 'compare' as const, label: '📊 Compare All' },
        { key: 'huffman' as const, label: '🌳 Huffman' },
        { key: 'rle' as const, label: '🔁 RLE' },
        { key: 'lz77' as const, label: '🪟 LZ77' },
        { key: 'lz78' as const, label: '📖 LZ78' },
        { key: 'lzw' as const, label: '⚡ LZW' },
    ]

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
                    Five classical techniques — Huffman, RLE, LZ77, LZ78, LZW
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
                        A gigabyte saved is a gigabyte earned. Compression reduces storage, speeds up disk I/O,
                        and fits more data in RAM. Different techniques suit different data patterns — understanding
                        when to use each is key for IR system design.
                    </p>
                </CardContent>
            </Card>

            {/* Entropy Card */}
            <Card className="border-2 border-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <span className="text-3xl">📐</span> Shannon&apos;s Entropy — Theoretical Limit
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg font-mono bg-secondary/30 p-4 rounded">
                        H = −Σ P(sᵢ) log₂ P(sᵢ)
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Entropy measures the minimum average bits per symbol for any lossless compression.
                        No algorithm can beat this limit.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded border-2 border-purple-300">
                        <p className="text-xl">
                            For your input: <span className="font-bold">{entropy.toFixed(3)} bits/symbol</span>
                            {' '}(vs {Math.ceil(Math.log2(Math.max(2, new Set(text.split('')).size)))} bits fixed-length)
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Input */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Compression Lab
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Input Text:</label>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value.toUpperCase())}
                            placeholder="Enter text (e.g., AABCAABCAABC)"
                            className="text-2xl p-6 border-2"
                        />
                        <p className="text-lg text-muted-foreground">
                            {text.length} characters • {originalBits} bits (ASCII) • {new Set(text.split('')).size} unique symbols
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(t => (
                            <Button
                                key={t.key}
                                variant={activeTab === t.key ? 'default' : 'outline'}
                                onClick={() => setActiveTab(t.key)}
                                className="text-lg"
                            >
                                {t.label}
                            </Button>
                        ))}
                    </div>

                    {/* ─── COMPARE ALL ─── */}
                    {activeTab === 'compare' && (
                        <div className="space-y-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-lg border-collapse">
                                    <thead>
                                        <tr className="bg-secondary/50">
                                            <th className="p-4 text-left border-2">Technique</th>
                                            <th className="p-4 text-left border-2">Output</th>
                                            <th className="p-4 text-center border-2">Units</th>
                                            <th className="p-4 text-center border-2">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-4 border-2 font-semibold">🌳 Huffman</td>
                                            <td className="p-4 border-2 font-mono text-sm break-all">{huffman.encoded.slice(0, 60)}{huffman.encoded.length > 60 ? '…' : ''}</td>
                                            <td className="p-4 border-2 text-center font-bold">{huffman.bits} bits</td>
                                            <td className="p-4 border-2 text-center"><Badge>Statistical</Badge></td>
                                        </tr>
                                        <tr className="bg-secondary/20">
                                            <td className="p-4 border-2 font-semibold">🔁 RLE</td>
                                            <td className="p-4 border-2 font-mono text-sm">{rle.encoded.slice(0, 60)}{rle.encoded.length > 60 ? '…' : ''}</td>
                                            <td className="p-4 border-2 text-center font-bold">{rle.pairs.length} pairs</td>
                                            <td className="p-4 border-2 text-center"><Badge variant="secondary">Run-based</Badge></td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-2 font-semibold">🪟 LZ77</td>
                                            <td className="p-4 border-2 font-mono text-sm">{lz77.map(t => `(${t[0]},${t[1]},${t[2]})`).join('').slice(0, 60)}</td>
                                            <td className="p-4 border-2 text-center font-bold">{lz77.length} tokens</td>
                                            <td className="p-4 border-2 text-center"><Badge variant="outline">Sliding Window</Badge></td>
                                        </tr>
                                        <tr className="bg-secondary/20">
                                            <td className="p-4 border-2 font-semibold">📖 LZ78</td>
                                            <td className="p-4 border-2 font-mono text-sm">{lz78.tokens.map(t => `(${t[0]},${t[1]})`).join('').slice(0, 60)}</td>
                                            <td className="p-4 border-2 text-center font-bold">{lz78.tokens.length} tokens</td>
                                            <td className="p-4 border-2 text-center"><Badge variant="outline">Dictionary</Badge></td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-2 font-semibold">⚡ LZW</td>
                                            <td className="p-4 border-2 font-mono text-sm">[{lzw.output.join(',')}]</td>
                                            <td className="p-4 border-2 text-center font-bold">{lzw.output.length} indices</td>
                                            <td className="p-4 border-2 text-center"><Badge variant="outline">Dictionary</Badge></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Comparison Properties */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-base border-collapse">
                                    <thead>
                                        <tr className="bg-secondary/50">
                                            <th className="p-3 text-left border-2">Property</th>
                                            <th className="p-3 text-center border-2">Huffman</th>
                                            <th className="p-3 text-center border-2">RLE</th>
                                            <th className="p-3 text-center border-2">LZ77</th>
                                            <th className="p-3 text-center border-2">LZ78</th>
                                            <th className="p-3 text-center border-2">LZW</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-2 font-semibold">Approach</td>
                                            <td className="p-3 border-2 text-center text-sm">Variable-length codes</td>
                                            <td className="p-3 border-2 text-center text-sm">Count + symbol</td>
                                            <td className="p-3 border-2 text-center text-sm">Sliding window refs</td>
                                            <td className="p-3 border-2 text-center text-sm">Growing dictionary</td>
                                            <td className="p-3 border-2 text-center text-sm">Pre-init dictionary</td>
                                        </tr>
                                        <tr className="bg-secondary/20">
                                            <td className="p-3 border-2 font-semibold">Best For</td>
                                            <td className="p-3 border-2 text-center text-sm">Known distributions</td>
                                            <td className="p-3 border-2 text-center text-sm">Long runs</td>
                                            <td className="p-3 border-2 text-center text-sm">Local repetition</td>
                                            <td className="p-3 border-2 text-center text-sm">Diverse patterns</td>
                                            <td className="p-3 border-2 text-center text-sm">General text</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-2 font-semibold">Applications</td>
                                            <td className="p-3 border-2 text-center text-sm">JPEG, MP3</td>
                                            <td className="p-3 border-2 text-center text-sm">Fax, BMP</td>
                                            <td className="p-3 border-2 text-center text-sm">GZIP, ZIP, PNG</td>
                                            <td className="p-3 border-2 text-center text-sm">Early Unix</td>
                                            <td className="p-3 border-2 text-center text-sm">GIF, TIFF, PDF</td>
                                        </tr>
                                        <tr className="bg-secondary/20">
                                            <td className="p-3 border-2 font-semibold">Decode Speed</td>
                                            <td className="p-3 border-2 text-center">⚡ Fast</td>
                                            <td className="p-3 border-2 text-center">⚡⚡ Fastest</td>
                                            <td className="p-3 border-2 text-center">⚡ Fast</td>
                                            <td className="p-3 border-2 text-center">⚡ Fast</td>
                                            <td className="p-3 border-2 text-center">⚡ Fast</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-2 font-semibold">Limitation</td>
                                            <td className="p-3 border-2 text-center text-sm">No pattern exploit</td>
                                            <td className="p-3 border-2 text-center text-sm">Expands short runs</td>
                                            <td className="p-3 border-2 text-center text-sm">Window size limit</td>
                                            <td className="p-3 border-2 text-center text-sm">Dict memory</td>
                                            <td className="p-3 border-2 text-center text-sm">Dict memory</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ─── HUFFMAN TAB ─── */}
                    {activeTab === 'huffman' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                                <p className="text-xl font-semibold mb-2">📐 Equation: Average Code Length</p>
                                <p className="font-mono text-lg bg-white/50 dark:bg-black/30 p-3 rounded mb-3">
                                    L_avg = Σ P(sᵢ) × lᵢ
                                </p>
                                <p className="text-base text-muted-foreground mb-2">
                                    P(sᵢ) = probability of symbol i &nbsp;|&nbsp; lᵢ = code length for symbol i
                                </p>
                                <p className="text-base">
                                    Huffman guarantees: H ≤ L_avg &lt; H + 1 (within 1 bit of entropy)
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">Huffman Codes:</p>
                                <div className="space-y-2">
                                    {Object.entries(huffman.codes).map(([ch, code]) => (
                                        <div key={ch} className="flex items-center gap-4 text-lg">
                                            <Badge className="text-lg px-4 py-2">&apos;{ch}&apos;</Badge>
                                            <span className="font-mono text-xl">{code}</span>
                                            <span className="text-muted-foreground">({code.length} bit{code.length !== 1 ? 's' : ''})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="font-semibold text-xl mb-2">Encoded: <span className="font-mono text-base break-all">{huffman.encoded}</span></p>
                                <p className="text-2xl font-bold">{huffman.bits} bits <span className="text-lg font-normal text-muted-foreground">(vs {originalBits} ASCII = {originalBits > 0 ? ((1 - huffman.bits / originalBits) * 100).toFixed(1) : 0}% savings)</span></p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">✅ Advantages</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Optimal symbol-by-symbol encoding</li>
                                        <li>• Fast decoding with lookup table</li>
                                        <li>• Prefix-free — no ambiguity</li>
                                        <li>• Well-understood theory</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">⚠️ Limitations</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Cannot exploit repeated patterns</li>
                                        <li>• Needs frequency table transmitted</li>
                                        <li>• Minimum 1 bit per symbol</li>
                                        <li>• Two-pass (count then encode)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-secondary/20 p-4 rounded">
                                <p className="font-semibold text-lg">🎯 IR Application:</p>
                                <p className="text-base text-muted-foreground">Used as the final stage in DEFLATE (GZIP), JPEG, and MP3. In IR, Huffman codes compress term frequencies and document metadata after other preprocessing.</p>
                            </div>
                        </div>
                    )}

                    {/* ─── RLE TAB ─── */}
                    {activeTab === 'rle' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                                <p className="text-xl font-semibold mb-2">📐 Equation: RLE Encoding</p>
                                <p className="font-mono text-lg bg-white/50 dark:bg-black/30 p-3 rounded mb-3">
                                    Encoded = (c₁,s₁)(c₂,s₂)...(cₖ,sₖ)
                                </p>
                                <p className="text-base text-muted-foreground mb-2">
                                    cⱼ = run length &nbsp;|&nbsp; sⱼ = symbol &nbsp;|&nbsp; k = number of runs
                                </p>
                                <p className="text-base">
                                    Compression ratio: k/n where n = original length. Good when k ≪ n (long runs).
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">RLE Output:</p>
                                <div className="space-y-2">
                                    {rle.pairs.map(([count, ch], i) => (
                                        <div key={i} className="flex items-center gap-4 text-lg">
                                            <Badge className="text-lg px-4 py-2">Run {i + 1}</Badge>
                                            <span className="font-mono text-xl">({count}, &apos;{ch}&apos;)</span>
                                            <span className="text-muted-foreground">→ {ch.repeat(count)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`p-6 rounded border-2 ${rle.pairs.length * 2 < text.length ? 'bg-green-50 dark:bg-green-950 border-green-500' : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500'}`}>
                                <p className="text-2xl font-bold">
                                    {rle.pairs.length} pairs ({rle.pairs.length * 2} values)
                                    <span className="text-lg font-normal text-muted-foreground ml-2">
                                        vs {text.length} original chars
                                        {rle.pairs.length * 2 >= text.length ? ' — ⚠️ No savings (runs too short)' : ` — ${((1 - (rle.pairs.length * 2) / text.length) * 100).toFixed(1)}% savings`}
                                    </span>
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">✅ Advantages</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Simplest compression algorithm</li>
                                        <li>• O(n) encode and decode</li>
                                        <li>• No dictionary or tree needed</li>
                                        <li>• Excellent for long runs</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">⚠️ Limitations</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Expands data with short runs</li>
                                        <li>• Poor for natural language text</li>
                                        <li>• No pattern exploitation</li>
                                        <li>• Only handles consecutive repeats</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-secondary/20 p-4 rounded">
                                <p className="font-semibold text-lg">🎯 IR Application:</p>
                                <p className="text-base text-muted-foreground">Used in bitmap index compression where posting lists are stored as bitmaps with long runs of 0s. Also used in fax transmission (Group 3/4) and simple image formats (BMP, PCX).</p>
                            </div>
                        </div>
                    )}

                    {/* ─── LZ77 TAB ─── */}
                    {activeTab === 'lz77' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                                <p className="text-xl font-semibold mb-2">📐 Equation: LZ77 Token</p>
                                <p className="font-mono text-lg bg-white/50 dark:bg-black/30 p-3 rounded mb-3">
                                    Token = (d, l, c) — offset, length, next character
                                </p>
                                <p className="text-base text-muted-foreground mb-2">
                                    d = distance back in sliding window &nbsp;|&nbsp; l = match length &nbsp;|&nbsp; c = next unmatched char
                                </p>
                                <p className="text-base">
                                    (0, 0, c) = literal character (no match found in window)
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">LZ77 Tokens (window=12):</p>
                                <div className="space-y-3">
                                    {lz77.map((token, i) => (
                                        <div key={i} className="flex items-start gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">Step {i + 1}</Badge>
                                            <div>
                                                <span className="font-mono text-xl">({token[0]}, {token[1]}, &apos;{token[2]}&apos;)</span>
                                                <p className="text-base text-muted-foreground mt-1">
                                                    {token[1] === 0
                                                        ? `Literal '${token[2]}' — no match in window`
                                                        : `Match ${token[1]} chars at offset ${token[0]}, then '${token[2]}'`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="text-2xl font-bold">{lz77.length} tokens for {text.length} characters</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">✅ Advantages</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Exploits local repetition well</li>
                                        <li>• No explicit dictionary storage</li>
                                        <li>• Foundation of GZIP, ZIP, DEFLATE</li>
                                        <li>• Adaptive — no training needed</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">⚠️ Limitations</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Window size limits match distance</li>
                                        <li>• Slower encoding (search window)</li>
                                        <li>• Cannot match beyond window</li>
                                        <li>• Triples overhead for short text</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-secondary/20 p-4 rounded">
                                <p className="font-semibold text-lg">🎯 IR Application:</p>
                                <p className="text-base text-muted-foreground">LZ77 (via DEFLATE/GZIP) is the standard for compressing stored documents in search engines. Elasticsearch, Lucene, and web servers all use GZIP for document storage and HTTP transfer.</p>
                            </div>
                        </div>
                    )}

                    {/* ─── LZ78 TAB ─── */}
                    {activeTab === 'lz78' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                                <p className="text-xl font-semibold mb-2">📐 Equation: LZ78 Token</p>
                                <p className="font-mono text-lg bg-white/50 dark:bg-black/30 p-3 rounded mb-3">
                                    Token = (i, c) — dictionary index, new character
                                </p>
                                <p className="text-base text-muted-foreground mb-2">
                                    i = index of longest matching prefix in dictionary (0 = empty) &nbsp;|&nbsp; c = extending character
                                </p>
                                <p className="text-base">
                                    Each token creates a new dictionary entry: Dict[next] = phrase(i) + c
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">LZ78 Tokens (dict size: {lz78.dictSize}):</p>
                                <div className="space-y-3">
                                    {lz78.tokens.map((token, i) => (
                                        <div key={i} className="flex items-start gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">Step {i + 1}</Badge>
                                            <div>
                                                <span className="font-mono text-xl">({token[0]}, &apos;{token[1]}&apos;)</span>
                                                <p className="text-base text-muted-foreground mt-1">
                                                    {token[0] === 0
                                                        ? `No prefix match → new entry Dict[${i + 1}] = '${token[1]}'`
                                                        : `Match Dict[${token[0]}], extend with '${token[1]}' → new entry Dict[${i + 1}]`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="text-2xl font-bold">{lz78.tokens.length} tokens, dictionary grew to {lz78.dictSize} entries</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">✅ Advantages</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• No window size limitation</li>
                                        <li>• Handles diverse patterns</li>
                                        <li>• Single-pass encoding</li>
                                        <li>• Dictionary grows adaptively</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">⚠️ Limitations</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Dictionary can grow unbounded</li>
                                        <li>• Slower start (small dictionary)</li>
                                        <li>• Extra character per token</li>
                                        <li>• Less common in modern systems</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-secondary/20 p-4 rounded">
                                <p className="font-semibold text-lg">🎯 IR Application:</p>
                                <p className="text-base text-muted-foreground">LZ78 was used in early Unix &apos;compress&apos; utility. While less common today, its dictionary-building concept influenced modern compression in database systems and log compression.</p>
                            </div>
                        </div>
                    )}

                    {/* ─── LZW TAB ─── */}
                    {activeTab === 'lzw' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                                <p className="text-xl font-semibold mb-2">📐 Equation: LZW Output</p>
                                <p className="font-mono text-lg bg-white/50 dark:bg-black/30 p-3 rounded mb-3">
                                    Output = (i₁, i₂, ..., iₘ) — stream of dictionary indices only
                                </p>
                                <p className="text-base text-muted-foreground mb-2">
                                    Dictionary pre-initialized with all single characters. No extra character field needed.
                                </p>
                                <p className="text-base">
                                    Decoder reconstructs the same dictionary from the index stream alone.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">LZW Output Indices:</p>
                                <div className="space-y-3">
                                    {lzw.output.map((idx, i) => (
                                        <div key={i} className="flex items-center gap-4 text-lg border-b pb-2">
                                            <Badge className="text-lg px-4 py-2">Step {i + 1}</Badge>
                                            <span className="font-mono text-xl">Index: {idx}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950 p-6 rounded border-2 border-green-500">
                                <p className="text-2xl font-bold">{lzw.output.length} indices for {text.length} characters ({lzw.newEntries} new dictionary entries)</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">✅ Advantages</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Simpler than LZ78 (no char field)</li>
                                        <li>• Single-pass, adaptive</li>
                                        <li>• Patent-free since 2004</li>
                                        <li>• Decoder needs no extra info</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded border">
                                    <p className="font-semibold text-lg mb-2">⚠️ Limitations</p>
                                    <ul className="space-y-1 text-base">
                                        <li>• Dictionary grows unbounded</li>
                                        <li>• Index size increases over time</li>
                                        <li>• Less effective than LZ77 for text</li>
                                        <li>• Was patent-encumbered until 2004</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-secondary/20 p-4 rounded">
                                <p className="font-semibold text-lg">🎯 IR Application:</p>
                                <p className="text-base text-muted-foreground">LZW is used in GIF images, TIFF, and PDF compression. In IR, it&apos;s used for compressing auxiliary data structures and cached query results where simplicity matters.</p>
                            </div>
                        </div>
                    )}

                </CardContent>
            </Card>

            {/* Key Interpretation Card */}
            <Card className="border-2 border-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <span className="text-3xl">🔍</span> When to Use Which Technique?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 rounded border-2 border-blue-300 bg-blue-50 dark:bg-blue-950">
                            <p className="font-semibold text-lg">🌳 Huffman</p>
                            <p className="text-sm text-muted-foreground">When you know symbol frequencies upfront. Final stage of multi-layer compression (DEFLATE = LZ77 + Huffman).</p>
                        </div>
                        <div className="p-4 rounded border-2 border-green-300 bg-green-50 dark:bg-green-950">
                            <p className="font-semibold text-lg">🔁 RLE</p>
                            <p className="text-sm text-muted-foreground">When data has long runs of identical values. Bitmap indices, fax, simple images. Avoid for natural text.</p>
                        </div>
                        <div className="p-4 rounded border-2 border-purple-300 bg-purple-50 dark:bg-purple-950">
                            <p className="font-semibold text-lg">🪟 LZ77</p>
                            <p className="text-sm text-muted-foreground">Best general-purpose choice. Local repetition in text, documents, web pages. Foundation of GZIP/ZIP used everywhere in IR.</p>
                        </div>
                        <div className="p-4 rounded border-2 border-orange-300 bg-orange-50 dark:bg-orange-950">
                            <p className="font-semibold text-lg">📖 LZ78</p>
                            <p className="text-sm text-muted-foreground">When patterns are diverse and spread across the text. Better for longer documents with varied vocabulary.</p>
                        </div>
                        <div className="p-4 rounded border-2 border-pink-300 bg-pink-50 dark:bg-pink-950">
                            <p className="font-semibold text-lg">⚡ LZW</p>
                            <p className="text-sm text-muted-foreground">When simplicity matters. Image formats (GIF, TIFF), PDF. Good balance of compression and implementation ease.</p>
                        </div>
                        <div className="p-4 rounded border-2 border-red-300 bg-red-50 dark:bg-red-950">
                            <p className="font-semibold text-lg">🔗 Combined (DEFLATE)</p>
                            <p className="text-sm text-muted-foreground">LZ77 + Huffman = DEFLATE. Used in GZIP, ZIP, PNG, HTTP compression. The gold standard for IR document storage.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* External Resources */}
            <Card className="border-2 border-purple-400 bg-purple-50 dark:bg-purple-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> External Resources
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="https://notebooklm.google.com/notebook/55d2ddef-2246-4210-b30b-dfc93b87225d?artifactId=ed1c2483-4293-4d16-bb48-639d3c8e49dd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-lg border-2 border-purple-300 bg-white dark:bg-secondary/30 hover:shadow-lg transition-shadow">
                            <span className="text-4xl">🧠</span>
                            <div>
                                <p className="font-semibold text-xl">Text Compression Quiz</p>
                                <p className="text-lg text-muted-foreground">Test your knowledge on NotebookLM</p>
                            </div>
                        </a>
                        <a href="https://notebooklm.google.com/notebook/55d2ddef-2246-4210-b30b-dfc93b87225d?artifactId=8bb1670d-70cb-4b48-bd25-21cd97ee1753" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-lg border-2 border-purple-300 bg-white dark:bg-secondary/30 hover:shadow-lg transition-shadow">
                            <span className="text-4xl">🎬</span>
                            <div>
                                <p className="font-semibold text-xl">Text Compression Video</p>
                                <p className="text-lg text-muted-foreground">Watch the explanation on NotebookLM</p>
                            </div>
                        </a>
                    </div>
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
