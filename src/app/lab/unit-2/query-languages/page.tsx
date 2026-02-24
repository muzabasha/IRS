'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function QueryLanguagesLab() {
    const [query, setQuery] = useState('comp*')
    const [queryType, setQueryType] = useState<'keyword' | 'pattern' | 'structural'>('pattern')
    const [results, setResults] = useState<string[]>([])

    const documents = [
        { id: 1, text: 'computer science fundamentals', title: 'CS Basics' },
        { id: 2, text: 'computational biology research', title: 'Bio Computing' },
        { id: 3, text: 'machine learning algorithms', title: 'ML Guide' },
        { id: 4, text: 'compiler design principles', title: 'Compilers' },
        { id: 5, text: 'computing in the cloud', title: 'Cloud Computing' }
    ]

    const executeQuery = () => {
        let filtered: string[] = []
        const queryLower = query.toLowerCase()

        if (queryType === 'keyword') {
            // Simple keyword matching
            filtered = documents
                .filter(doc => doc.text.toLowerCase().includes(queryLower))
                .map(doc => `Doc${doc.id}: ${doc.text}`)
        } else if (queryType === 'pattern') {
            // Pattern matching with wildcards
            const pattern = queryLower.replace(/\*/g, '.*').replace(/\?/g, '.')
            const regex = new RegExp(pattern)
            filtered = documents
                .filter(doc => doc.text.split(' ').some(word => regex.test(word)))
                .map(doc => `Doc${doc.id}: ${doc.text}`)
        } else if (queryType === 'structural') {
            // Structural query (search in title)
            filtered = documents
                .filter(doc => doc.title.toLowerCase().includes(queryLower))
                .map(doc => `Doc${doc.id}: [Title: ${doc.title}] ${doc.text}`)
        }

        setResults(filtered)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 1 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Query Languages Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master keyword, pattern, and structural query formulation
                </p>
            </div>

            {/* Motivation Section */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Query Languages?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Query languages bridge the gap between what users want and what systems can find. Unlike SQL for databases,
                        IR query languages handle unstructured text and must balance simplicity with expressiveness.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Web search engines (Google, Bing) - keyword queries</li>
                            <li>• Code search (GitHub) - pattern matching with regex</li>
                            <li>• XML/HTML search - structural queries for specific tags</li>
                            <li>• Email search - field-specific queries (from:, subject:)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Query Types */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Three Types of Query Languages
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold">1. Keyword Queries</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Simple word sequences. System treats them as AND (narrow) or OR (broad).
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                Query: "machine learning" → Find docs with both words
                            </div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold">2. Pattern Queries</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Wildcards and regex for flexible matching. * = any characters, ? = single character.
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                Query: "comp*" → Matches computer, compiler, computing
                            </div>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold">3. Structural Queries</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Search within specific document fields or XML tags.
                            </p>
                            <div className="font-mono text-sm bg-background p-2 rounded">
                                Query: title:"computing" → Search only in title field
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Formula Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Mathematical Foundation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg mb-2">R(q_AND) = ⋂ Dist(t) for all t in q</div>
                        <div className="text-lg">R(q_OR) = ⋃ Dist(t) for all t in q</div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">R(q)</span>
                                <span className="text-muted-foreground">Result set - documents matching query q</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">⋂</span>
                                <span className="text-muted-foreground">Intersection (AND) - document must contain ALL terms</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">⋃</span>
                                <span className="text-muted-foreground">Union (OR) - document can contain ANY term</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Dist(t)</span>
                                <span className="text-muted-foreground">Distribution set - all doc IDs where term t occurs</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Lab: Try Different Query Types
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection:</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-1 text-sm">
                            {documents.map((doc) => (
                                <div key={doc.id} className="font-mono">
                                    Doc{doc.id}: [Title: {doc.title}] {doc.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Select Query Type:</label>
                        <div className="flex gap-2">
                            <Button
                                variant={queryType === 'keyword' ? 'default' : 'outline'}
                                onClick={() => setQueryType('keyword')}
                            >
                                Keyword
                            </Button>
                            <Button
                                variant={queryType === 'pattern' ? 'default' : 'outline'}
                                onClick={() => setQueryType('pattern')}
                            >
                                Pattern
                            </Button>
                            <Button
                                variant={queryType === 'structural' ? 'default' : 'outline'}
                                onClick={() => setQueryType('structural')}
                            >
                                Structural
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Enter Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={
                                    queryType === 'keyword' ? 'e.g., machine learning' :
                                        queryType === 'pattern' ? 'e.g., comp*' :
                                            'e.g., computing'
                                }
                                className="font-mono"
                            />
                            <Button onClick={executeQuery}>
                                <Play className="h-4 w-4 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {queryType === 'keyword' && 'Try: "computer", "learning"'}
                            {queryType === 'pattern' && 'Try: "comp*", "comput?ng"'}
                            {queryType === 'structural' && 'Try: "computing", "ML"'}
                        </p>
                    </div>

                    {results.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Results ({results.length} documents):</label>
                            <div className="bg-green-50 dark:bg-green-950 p-4 rounded space-y-2">
                                {results.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Badge variant="outline">Match</Badge>
                                        <span className="text-sm">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Illustration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📊</span> Step-by-Step Illustration
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="bg-secondary/20 p-4 rounded">
                            <p className="font-semibold mb-2">Example: Pattern Query "comp*"</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 1</Badge>
                                    <div>
                                        <p className="font-semibold">Parse pattern</p>
                                        <p className="text-muted-foreground">Convert "comp*" to regex: "comp.*"</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 2</Badge>
                                    <div>
                                        <p className="font-semibold">Scan vocabulary</p>
                                        <p className="text-muted-foreground">Check each word: computer ✓, compiler ✓, computing ✓</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5">Step 3</Badge>
                                    <div>
                                        <p className="font-semibold">Retrieve postings</p>
                                        <p className="text-muted-foreground">Get doc IDs: {'{1, 2, 4, 5}'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Badge className="mt-0.5 bg-green-600">Step 4</Badge>
                                    <div>
                                        <p className="font-semibold">Return results</p>
                                        <p className="text-muted-foreground">4 documents match the pattern ✓</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Code */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import re

def query_executor(query, documents, query_type='keyword'):
    """
    Execute different types of queries on document collection
    """
    results = []
    
    if query_type == 'keyword':
        # Simple keyword matching
        for doc in documents:
            if query.lower() in doc['text'].lower():
                results.append(doc)
    
    elif query_type == 'pattern':
        # Pattern matching with wildcards
        pattern = query.replace('*', '.*').replace('?', '.')
        regex = re.compile(pattern, re.IGNORECASE)
        for doc in documents:
            if any(regex.match(word) for word in doc['text'].split()):
                results.append(doc)
    
    elif query_type == 'structural':
        # Field-specific search
        field, term = query.split(':')
        for doc in documents:
            if term.lower() in doc.get(field, '').lower():
                results.append(doc)
    
    return results

# Example usage
docs = [
    {'id': 1, 'title': 'CS Basics', 'text': 'computer science'},
    {'id': 2, 'title': 'Bio Computing', 'text': 'computational biology'}
]

# Keyword query
print(query_executor('computer', docs, 'keyword'))

# Pattern query
print(query_executor('comp*', docs, 'pattern'))

# Structural query
print(query_executor('title:Computing', docs, 'structural'))`}</code>
                    </pre>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
                        <p className="font-semibold mb-2">Key Insights:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Keyword queries are fastest (simple string matching)</li>
                            <li>• Pattern queries require regex compilation (slower)</li>
                            <li>• Structural queries need field-aware indexing</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Static Queries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. No Learning from Results</p>
                            <p className="text-sm text-muted-foreground">
                                Once you submit a query, the system doesn't learn from which results you found useful.
                                Every search starts from scratch.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Vocabulary Mismatch</p>
                            <p className="text-sm text-muted-foreground">
                                Users and documents may use different words for the same concept. Query "car" won't find "automobile".
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. Query Formulation Burden</p>
                            <p className="text-sm text-muted-foreground">
                                Users must know the right syntax and terms. Pattern queries require regex knowledge.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. No Context Awareness</p>
                            <p className="text-sm text-muted-foreground">
                                The system doesn't know if you're a beginner or expert, or what you searched for previously.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Preview */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Relevance Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Relevance Feedback addresses these limitations by:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Interactive Query Refinement</p>
                                <p className="text-sm text-muted-foreground">
                                    Users mark results as relevant/non-relevant, system learns and improves the query
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Automatic Query Expansion</p>
                                <p className="text-sm text-muted-foreground">
                                    System adds related terms from relevant documents to overcome vocabulary mismatch
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Rocchio Algorithm</p>
                                <p className="text-sm text-muted-foreground">
                                    Mathematical framework to move query vector toward relevant docs and away from irrelevant ones
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/unit-2/relevance-feedback">
                            Next Lab: Relevance Feedback <ArrowRight className="ml-2 h-4 w-4" />
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
                            <p className="font-semibold mb-2">Q1: What's the difference between keyword and pattern queries?</p>
                            <p className="text-sm text-green-600">A: Keyword queries match exact terms, while pattern queries use wildcards (* and ?) or regex for flexible matching</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: When would you use structural queries?</p>
                            <p className="text-sm text-green-600">A: When searching within specific document fields (title, author) or XML/HTML tags to get more precise results</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: Why are pattern queries slower than keyword queries?</p>
                            <p className="text-sm text-green-600">A: Pattern queries require scanning the vocabulary and compiling regex, while keyword queries use direct hash lookups in the index</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-2/relevance-feedback">
                        Next: Relevance Feedback <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
