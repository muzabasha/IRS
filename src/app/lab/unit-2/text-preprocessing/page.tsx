'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function TextPreprocessingLab() {
    const [inputText, setInputText] = useState('The running dogs are quickly jumping over the fences!')
    const [tokens, setTokens] = useState<string[]>([])
    const [filtered, setFiltered] = useState<string[]>([])
    const [stemmed, setStemmed] = useState<string[]>([])

    const stopwords = ['the', 'are', 'is', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']

    const simpleStemmer = (word: string): string => {
        const suffixes = ['ing', 'ed', 'es', 's', 'ly', 'er', 'est']
        for (const suffix of suffixes) {
            if (word.endsWith(suffix) && word.length > suffix.length + 2) {
                return word.slice(0, -suffix.length)
            }
        }
        return word
    }

    const processText = () => {
        // Step 1: Tokenization
        const tokenized = inputText
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(t => t.length > 0)
        setTokens(tokenized)

        // Step 2: Stopword removal
        const filteredTokens = tokenized.filter(t => !stopwords.includes(t))
        setFiltered(filteredTokens)

        // Step 3: Stemming
        const stemmedTokens = filteredTokens.map(simpleStemmer)
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
                <Badge>Lab 3 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Text Preprocessing Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Transform raw text into clean, indexable tokens
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Preprocess Text?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Raw text is messy: different cases, punctuation, word forms. Preprocessing normalizes text to improve
                        matching and reduce index size. It's the foundation of all IR systems.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Impact:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google processes billions of documents - preprocessing reduces index size by 40-60%</li>
                            <li>• Stemming helps "running" match "run", "runs", "ran" - improves recall by 20-30%</li>
                            <li>• Stopword removal eliminates "the", "is", "and" - saves 30% storage space</li>
                            <li>• Tokenization handles URLs, emails, hashtags correctly</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Processing Pipeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Text Processing Pipeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                            <div className="flex-1">
                                <p className="font-semibold">Tokenization</p>
                                <p className="text-sm text-muted-foreground">Split text into words (tokens)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
                            <div className="flex-1">
                                <p className="font-semibold">Normalization</p>
                                <p className="text-sm text-muted-foreground">Lowercase, remove punctuation</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                            <div className="flex-1">
                                <p className="font-semibold">Stopword Removal</p>
                                <p className="text-sm text-muted-foreground">Filter out common words</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">4</div>
                            <div className="flex-1">
                                <p className="font-semibold">Stemming/Lemmatization</p>
                                <p className="text-sm text-muted-foreground">Reduce words to root form</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Text Processor
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Input Text:</label>
                        <Textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter text to process..."
                            className="min-h-[100px]"
                        />
                        <Button onClick={processText} className="w-full">
                            <Play className="h-4 w-4 mr-2" /> Process Text
                        </Button>
                    </div>

                    {tokens.length > 0 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Step 1: Tokenization ({tokens.length} tokens)</label>
                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {tokens.map((token, i) => (
                                            <Badge key={i} variant="outline">{token}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Step 2: Stopword Removal ({filtered.length} tokens)</label>
                                <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {filtered.map((token, i) => (
                                            <Badge key={i} variant="outline" className="bg-green-100 dark:bg-green-900">{token}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Removed: {tokens.length - filtered.length} stopwords
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Step 3: Stemming ({stemmed.length} stems)</label>
                                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
                                    <div className="flex flex-wrap gap-2">
                                        {stemmed.map((token, i) => (
                                            <Badge key={i} variant="outline" className="bg-purple-100 dark:bg-purple-900">{token}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Unique stems: {new Set(stemmed).size}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Stemming vs Lemmatization */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Stemming vs Lemmatization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">Stemming</p>
                            <p className="text-sm text-muted-foreground mb-3">
                                Crude chopping of word endings using rules
                            </p>
                            <div className="space-y-1 text-sm font-mono bg-background p-2 rounded">
                                <div>running → run</div>
                                <div>studies → studi</div>
                                <div>ponies → poni</div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Fast but may produce non-words
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">Lemmatization</p>
                            <p className="text-sm text-muted-foreground mb-3">
                                Dictionary-based reduction to base form
                            </p>
                            <div className="space-y-1 text-sm font-mono bg-background p-2 rounded">
                                <div>running → run</div>
                                <div>studies → study</div>
                                <div>ponies → pony</div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Slower but produces valid words
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Compression */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📦</span> Text Compression: Huffman Coding
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">H = -Σ P(s_i) × log₂ P(s_i)</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Entropy (H) defines the theoretical compression limit. Huffman coding assigns shorter codes to frequent characters.
                    </p>
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-2">Example: Compress "MISSISSIPPI"</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Character frequencies:</span>
                                <span className="font-mono">I:4, S:4, P:2, M:1</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Huffman codes:</span>
                                <span className="font-mono">I:0, S:10, P:110, M:111</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Original size:</span>
                                <span className="font-mono">11 chars × 8 bits = 88 bits</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Compressed size:</span>
                                <span className="font-mono">4×1 + 4×2 + 2×3 + 1×3 = 21 bits</span>
                            </div>
                            <div className="flex justify-between font-bold text-green-600">
                                <span>Compression ratio:</span>
                                <span>76% reduction!</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import re
from collections import Counter

class TextPreprocessor:
    def __init__(self):
        self.stopwords = {'the', 'is', 'are', 'a', 'an', 'and', 'or', 'but'}
    
    def tokenize(self, text):
        """Split text into tokens"""
        # Lowercase and remove punctuation
        text = text.lower()
        text = re.sub(r'[^\\w\\s]', ' ', text)
        # Split on whitespace
        tokens = text.split()
        return [t for t in tokens if t]
    
    def remove_stopwords(self, tokens):
        """Filter out common words"""
        return [t for t in tokens if t not in self.stopwords]
    
    def stem(self, word):
        """Simple suffix-stripping stemmer"""
        suffixes = ['ing', 'ed', 'es', 's', 'ly', 'er', 'est']
        for suffix in suffixes:
            if word.endswith(suffix) and len(word) > len(suffix) + 2:
                return word[:-len(suffix)]
        return word
    
    def process(self, text):
        """Complete preprocessing pipeline"""
        tokens = self.tokenize(text)
        filtered = self.remove_stopwords(tokens)
        stemmed = [self.stem(t) for t in filtered]
        return stemmed

# Example usage
processor = TextPreprocessor()
text = "The running dogs are quickly jumping over the fences!"
result = processor.process(text)
print(f"Original: {text}")
print(f"Processed: {result}")
print(f"Vocabulary size: {len(set(result))}")`}</code>
                    </pre>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Output:</p>
                        <pre className="text-sm font-mono">
                            Original: The running dogs are quickly jumping over the fences!
                            Processed: ['run', 'dog', 'quick', 'jump', 'fenc']
                            Vocabulary size: 5
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Text Preprocessing
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. Information Loss</p>
                            <p className="text-sm text-muted-foreground">
                                Stemming "university" → "univers" loses meaning. Can't distinguish "US" (country) from "us" (pronoun).
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Language Dependency</p>
                            <p className="text-sm text-muted-foreground">
                                English stemmers don't work for Chinese, Arabic, or German. Each language needs custom rules.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. Context Ignorance</p>
                            <p className="text-sm text-muted-foreground">
                                "Apple" (fruit) vs "Apple" (company) both become "appl". Preprocessing can't distinguish meanings.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. Phrase Breaking</p>
                            <p className="text-sm text-muted-foreground">
                                "New York" becomes ["new", "york"]. Loses the fact that it's a single entity (named entity).
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Inverted Index
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Now that text is clean and normalized, we need efficient storage and retrieval:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Inverted Index Structure</p>
                                <p className="text-sm text-muted-foreground">
                                    Map each term to list of documents containing it. Enables instant lookup instead of scanning.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Postings Lists with Positions</p>
                                <p className="text-sm text-muted-foreground">
                                    Store not just doc IDs but also term positions for phrase queries and proximity search.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Compression Techniques</p>
                                <p className="text-sm text-muted-foreground">
                                    Gap encoding and variable-byte codes reduce index size by 70-80%, fitting more in RAM.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/unit-2/inverted-index">
                            Next Lab: Inverted Index <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Assessment */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎓</span> Quick Assessment
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q1: What's the difference between stemming and lemmatization?</p>
                            <p className="text-sm text-green-600">A: Stemming uses crude rules to chop endings (fast, may produce non-words). Lemmatization uses dictionaries to find proper base forms (slower, produces valid words).</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why remove stopwords?</p>
                            <p className="text-sm text-green-600">A: Stopwords like "the", "is", "and" appear in almost every document, don't carry meaning, and waste 30% of index space.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What does Huffman coding optimize?</p>
                            <p className="text-sm text-green-600">A: It assigns shorter bit codes to frequent characters and longer codes to rare ones, minimizing average bits per character.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-2/relevance-feedback">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Relevance Feedback
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-2/inverted-index">
                        Next: Inverted Index <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
