'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function TextPreprocessingLab() {
    const [text, setText] = useState('The researchers are studying machine learning algorithms.')
    const [tokens, setTokens] = useState<string[]>([])
    const [noStopwords, setNoStopwords] = useState<string[]>([])
    const [stemmed, setStemmed] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState<'tokenization' | 'stopwords' | 'stemming' | 'lemmatization'>('tokenization')

    const stopwords = new Set(['the', 'are', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'of', 'with', 'by', 'from', 'this', 'that', 'these', 'those', 'it', 'its'])

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
        const tokenized = text.toLowerCase().match(/\b\w+\b/g) || []
        setTokens(tokenized)
        const filtered = tokenized.filter(t => !stopwords.has(t))
        setNoStopwords(filtered)
        const stemmedTokens = filtered.map(simpleStem)
        setStemmed(stemmedTokens)
    }

    const tabs = [
        { key: 'tokenization' as const, label: '1. Tokenization', emoji: '✂️' },
        { key: 'stopwords' as const, label: '2. Stopword Removal', emoji: '🚫' },
        { key: 'stemming' as const, label: '3. Stemming', emoji: '🌱' },
        { key: 'lemmatization' as const, label: '4. Lemmatization', emoji: '📖' },
    ]

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

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Raw text is messy — punctuation, case variations, inflections, and noise words all reduce retrieval effectiveness. Preprocessing transforms raw text into clean, normalized index terms.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Heaps' Law */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Heaps&apos; Law
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">V = k · n<sup>β</sup></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">V</span>: Vocabulary size (number of unique terms)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">n</span>: Total number of tokens in the collection
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">k</span>: Constant (typically 10–100)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">β</span>: Growth exponent (typically 0.4–0.6)
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Heaps&apos; Law predicts vocabulary growth: as a corpus grows, new unique words appear at a sub-linear rate. Preprocessing (stemming, stopword removal) reduces V significantly, shrinking index size and improving retrieval speed.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Zipf's Law */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Zipf&apos;s Law
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">f(r) = C / r<sup>α</sup></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">f(r)</span>: Frequency of the r-th ranked term
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">r</span>: Rank of the term (1 = most frequent)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">C</span>: Collection-dependent constant
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">α</span>: Exponent ≈ 1 for natural language
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Zipf&apos;s Law shows that a few words (stopwords like &quot;the&quot;, &quot;is&quot;) dominate frequency, while most words are rare. This justifies stopword removal — the top ~50 words account for ~50% of all tokens but carry almost zero discriminative value.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Technique-wise Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Technique-wise Exploration
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

                    {activeTab === 'tokenization' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">✂️ Tokenization</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Splits continuous text into discrete tokens (words, numbers, symbols). Handles punctuation, hyphens, apostrophes, and special characters.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>&quot;O&apos;Brien&apos;s state-of-the-art IR system&quot;</p>
                                    <p className="text-green-600 dark:text-green-400 mt-2">→ [&quot;O&apos;Brien&apos;s&quot;, &quot;state-of-the-art&quot;, &quot;IR&quot;, &quot;system&quot;]</p>
                                    <p className="text-muted-foreground text-sm mt-1">or: [&quot;o&quot;, &quot;brien&quot;, &quot;s&quot;, &quot;state&quot;, &quot;of&quot;, &quot;the&quot;, &quot;art&quot;, &quot;ir&quot;, &quot;system&quot;]</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Whitespace Tokenizer</p>
                                    <p className="text-muted-foreground">Splits on spaces only. Fast but naive.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Regex Tokenizer</p>
                                    <p className="text-muted-foreground">Pattern-based splitting. Flexible and configurable.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Subword (BPE)</p>
                                    <p className="text-muted-foreground">Byte-pair encoding for unknown words. Used in modern NLP.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'stopwords' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🚫 Stopword Removal</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Removes high-frequency, low-information words. Typically reduces index size by 30–40% with minimal impact on retrieval quality.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>[&quot;the&quot;, &quot;researchers&quot;, &quot;are&quot;, &quot;studying&quot;, &quot;machine&quot;, &quot;learning&quot;]</p>
                                    <p className="text-green-600 dark:text-green-400 mt-2">→ [&quot;researchers&quot;, &quot;studying&quot;, &quot;machine&quot;, &quot;learning&quot;]</p>
                                    <p className="text-red-500 mt-1">Removed: &quot;the&quot;, &quot;are&quot;</p>
                                </div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border border-yellow-400">
                                <p className="font-semibold text-lg">⚠️ Caution:</p>
                                <p className="text-muted-foreground">Removing stopwords can hurt phrase queries (&quot;to be or not to be&quot;) and named entities (&quot;The Who&quot;, &quot;Let It Be&quot;). Modern systems often keep stopwords in the index but down-weight them.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'stemming' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🌱 Stemming (Porter Algorithm)</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Reduces words to their root form by stripping suffixes. Aggressive but fast — may produce non-words.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded font-mono">
                                        <p className="font-semibold mb-2">Porter Stemmer:</p>
                                        <p>&quot;computing&quot; → &quot;comput&quot;</p>
                                        <p>&quot;computers&quot; → &quot;comput&quot;</p>
                                        <p>&quot;computation&quot; → &quot;comput&quot;</p>
                                        <p>&quot;studies&quot; → &quot;studi&quot;</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded font-mono">
                                        <p className="font-semibold mb-2">Snowball Stemmer:</p>
                                        <p>&quot;generalization&quot; → &quot;general&quot;</p>
                                        <p>&quot;generalizes&quot; → &quot;general&quot;</p>
                                        <p>&quot;running&quot; → &quot;run&quot;</p>
                                        <p>&quot;better&quot; → &quot;better&quot;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-950 p-4 rounded border border-red-400">
                                <p className="font-semibold text-lg">Common Errors:</p>
                                <p className="text-muted-foreground">Over-stemming: &quot;university&quot; and &quot;universe&quot; → &quot;univers&quot; (conflation error). Under-stemming: &quot;alumnus&quot; and &quot;alumni&quot; remain separate.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lemmatization' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📖 Lemmatization</p>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Reduces words to their dictionary form (lemma) using morphological analysis. More accurate than stemming but slower — requires a lexicon.
                                </p>
                                <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                    <p>&quot;better&quot; → &quot;good&quot; (adjective)</p>
                                    <p>&quot;ran&quot; → &quot;run&quot; (verb)</p>
                                    <p>&quot;mice&quot; → &quot;mouse&quot; (noun)</p>
                                    <p>&quot;studies&quot; → &quot;study&quot; (noun/verb)</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-lg border-collapse">
                                    <thead>
                                        <tr className="bg-secondary/30">
                                            <th className="border-2 p-3 text-left">Feature</th>
                                            <th className="border-2 p-3 text-left">Stemming</th>
                                            <th className="border-2 p-3 text-left">Lemmatization</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="border-2 p-3">Speed</td><td className="border-2 p-3">Fast (rule-based)</td><td className="border-2 p-3">Slower (dictionary lookup)</td></tr>
                                        <tr><td className="border-2 p-3">Output</td><td className="border-2 p-3">May not be a real word</td><td className="border-2 p-3">Always a valid word</td></tr>
                                        <tr><td className="border-2 p-3">Accuracy</td><td className="border-2 p-3">Lower (over/under-stemming)</td><td className="border-2 p-3">Higher (context-aware)</td></tr>
                                        <tr><td className="border-2 p-3">Use Case</td><td className="border-2 p-3">Large-scale IR systems</td><td className="border-2 p-3">NLP, question answering</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pipeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔄</span> Preprocessing Pipeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {['Tokenization → Split text into words', 'Case Normalization → Convert to lowercase', 'Stopword Removal → Remove common words', 'Stemming/Lemmatization → Reduce to root forms'].map((step, i) => (
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
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Removed {tokens.length - noStopwords.length} stopwords ({((tokens.length - noStopwords.length) / tokens.length * 100).toFixed(0)}% reduction)
                                    </p>
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
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Final tokens ready for indexing
                                    </p>
                                </div>
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
                            <li>• Reduces vocabulary size by 30–50%</li>
                            <li>• Improves recall by conflating word variants</li>
                            <li>• Smaller index = faster search</li>
                            <li>• Language-independent tokenization possible</li>
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
                            <li>• Stemming errors (over/under-stemming)</li>
                            <li>• Stopword removal hurts phrase queries</li>
                            <li>• Language-specific rules needed</li>
                            <li>• Loss of semantic nuance</li>
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
                        Text preprocessing is the foundation of every IR system. Search engines (Google, Bing) use tokenization and normalization on billions of documents. Lucene/Elasticsearch apply configurable analyzer chains (tokenizer → filters). Medical IR (PubMed) uses specialized stemmers for biomedical terms. Multilingual search requires language-specific preprocessing pipelines.
                    </p>
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
