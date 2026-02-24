'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function StructuredTextRetrievalLab() {
    const [query, setQuery] = useState('title:machine AND body:learning')
    const [results, setResults] = useState<Array<{ doc: string, match: boolean, reason: string }>>([])

    const documents = [
        { title: 'Machine Learning Basics', body: 'Introduction to algorithms and data science', abstract: 'Overview of ML' },
        { title: 'Deep Learning Guide', body: 'Neural networks and machine learning techniques', abstract: 'Advanced ML' },
        { title: 'Data Science Handbook', body: 'Statistics and machine learning applications', abstract: 'Practical guide' },
        { title: 'Machine Vision Systems', body: 'Computer vision and image processing', abstract: 'Visual computing' }
    ]

    const executeStructuredQuery = () => {
        const parsed = query.toLowerCase()
        const filtered = documents.map(doc => {
            let match = true
            let reason = ''

            if (parsed.includes('title:')) {
                const titleTerm = parsed.match(/title:(\w+)/)?.[1]
                if (titleTerm && !doc.title.toLowerCase().includes(titleTerm)) {
                    match = false
                    reason = `Title doesn't contain "${titleTerm}"`
                } else if (titleTerm) {
                    reason = `Title contains "${titleTerm}"`
                }
            }

            if (parsed.includes('body:') && match) {
                const bodyTerm = parsed.match(/body:(\w+)/)?.[1]
                if (bodyTerm && !doc.body.toLowerCase().includes(bodyTerm)) {
                    match = false
                    reason += ` | Body doesn't contain "${bodyTerm}"`
                } else if (bodyTerm) {
                    reason += ` | Body contains "${bodyTerm}"`
                }
            }

            return {
                doc: `${doc.title} - ${doc.body}`,
                match,
                reason: reason || 'No structural constraints'
            }
        })

        setResults(filtered)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 6</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Structured Text Retrieval Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master content-in-context retrieval with hierarchical document structures
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Structured Text Retrieval?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Traditional IR treats documents as flat bags of words, losing valuable structural information.
                        Finding "machine learning" in a document title is more significant than finding it in a footnote.
                        Structured retrieval exploits document hierarchy for precision.
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Academic paper search (find terms in Abstract vs References)</li>
                            <li>• Legal document retrieval (search specific sections of contracts)</li>
                            <li>• XML/HTML document querying (XPath, CSS selectors)</li>
                            <li>• Email search (search in Subject, From, Body separately)</li>
                            <li>• Medical records (search diagnosis codes vs treatment notes)</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">What Problem Does It Solve?</p>
                        <p className="text-sm">Flat retrieval cannot distinguish between "Python" in a title (programming language)
                            vs "python" in body text (snake). Structure provides context that improves precision.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Scoring Function */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Scoring Function: Interval Containment Model
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-lg">
                        C(node, term) ⟺ [S_term, E_term] ⊆ [S_node, E_node]
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">S_node, E_node</span>
                                <span className="text-muted-foreground">Start and end positions of structural element (e.g., &lt;title&gt;)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">S_term, E_term</span>
                                <span className="text-muted-foreground">Position(s) of search term in document</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">⊆</span>
                                <span className="text-muted-foreground">Containment operator (term must be inside node boundaries)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">C(node, term)</span>
                                <span className="text-muted-foreground">Boolean: True if term contained in node, False otherwise</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2">Weighted Scoring:</p>
                        <div className="space-y-2 text-sm font-mono">
                            <div>Score(d, q) = Σ w_field × TF-IDF(term, field)</div>
                            <div className="mt-2 text-xs">
                                • Title weight (w_title) = 2.0<br />
                                • Abstract weight (w_abstract) = 1.5<br />
                                • Body weight (w_body) = 1.0<br />
                                • References weight (w_refs) = 0.5
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Equation Interpretation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="font-semibold">Document as Tree Structure</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Documents are hierarchical: Document → Sections → Paragraphs → Sentences.
                                Each node has position boundaries [start, end] in the word sequence.
                            </p>
                            <div className="mt-2 text-xs font-mono bg-secondary/30 p-2 rounded">
                                &lt;doc&gt; [0, 100]<br />
                                &nbsp;&nbsp;&lt;title&gt; [0, 5]<br />
                                &nbsp;&nbsp;&lt;body&gt; [6, 100]<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;section&gt; [6, 50]<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;section&gt; [51, 100]
                            </div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold">Containment Logic</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                A term at position 3 is contained in &lt;title&gt; [0, 5] but NOT in &lt;section&gt; [6, 50].
                                This allows precise field-specific queries.
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <p className="font-semibold">Proximity Operators</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                NEAR(term1, term2, k) checks if terms appear within k words of each other.
                                Uses position intervals: |pos(term1) - pos(term2)| ≤ k
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Lab: Structured Query Executor
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Document Collection (with structure):</label>
                        <div className="bg-secondary/30 p-4 rounded space-y-2 text-sm">
                            {documents.map((doc, i) => (
                                <div key={i} className="font-mono text-xs">
                                    <div className="font-bold">Doc{i + 1}:</div>
                                    <div className="ml-4">
                                        &lt;title&gt;{doc.title}&lt;/title&gt;<br />
                                        &lt;abstract&gt;{doc.abstract}&lt;/abstract&gt;<br />
                                        &lt;body&gt;{doc.body}&lt;/body&gt;
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Enter Structured Query:</label>
                        <div className="flex gap-2">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., title:machine AND body:learning"
                                className="font-mono"
                            />
                            <Button onClick={executeStructuredQuery}>
                                <Play className="h-4 w-4 mr-2" /> Execute
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Try: "title:machine", "body:learning", "title:machine AND body:learning"
                        </p>
                    </div>

                    {results.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Results:</label>
                            <div className="space-y-2">
                                {results.map((result, i) => (
                                    <div key={i} className={`p-3 rounded ${result.match ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                                        <div className="flex items-center justify-between mb-1">
                                            <Badge variant={result.match ? 'default' : 'destructive'}>
                                                {result.match ? 'Match' : 'No Match'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm mb-1">{result.doc}</p>
                                        <p className="text-xs text-muted-foreground">{result.reason}</p>
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
                    <div className="bg-secondary/20 p-4 rounded">
                        <p className="font-semibold mb-3">Example: Query = "title:search AND abstract:retrieval"</p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 1</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Parse structural constraints</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Field 1: title, Term: "search"<br />
                                        Field 2: abstract, Term: "retrieval"<br />
                                        Operator: AND (both must match)
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 2</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Check Doc1: Title="Information Search Systems", Abstract="Overview of retrieval"</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        title contains "search"? YES ✓ (position 13)<br />
                                        abstract contains "retrieval"? YES ✓ (position 75)<br />
                                        <span className="text-green-600 font-bold">Result: MATCH (both constraints satisfied)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5">Step 3</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Check Doc2: Title="Database Management", Abstract="SQL and queries"</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        title contains "search"? NO ✗<br />
                                        abstract contains "retrieval"? NO ✗<br />
                                        <span className="text-red-600 font-bold">Result: NO MATCH (constraints not satisfied)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Badge className="mt-0.5 bg-green-600">Step 4</Badge>
                                <div className="flex-1">
                                    <p className="font-semibold">Calculate weighted scores for matching documents</p>
                                    <div className="mt-1 p-2 bg-secondary/30 rounded font-mono text-xs">
                                        Doc1 Score = (2.0 × TF-IDF_title) + (1.5 × TF-IDF_abstract) = 4.2<br />
                                        <span className="text-green-600 font-bold">Final Ranking: Doc1 (4.2)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Code */}
            <Card className="border-2 border-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Python Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`class StructuredDocument:
    def __init__(self, doc_id, fields):
        self.doc_id = doc_id
        self.fields = fields  # {'title': 'text', 'body': 'text', ...}
        self.positions = self._calculate_positions()
    
    def _calculate_positions(self):
        """Calculate word positions for each field"""
        positions = {}
        current_pos = 0
        for field, text in self.fields.items():
            words = text.split()
            start = current_pos
            end = current_pos + len(words) - 1
            positions[field] = {'start': start, 'end': end, 'words': words}
            current_pos = end + 1
        return positions
    
    def contains_in_field(self, term, field):
        """Check if term exists in specific field"""
        if field not in self.positions:
            return False
        words = self.positions[field]['words']
        return term.lower() in [w.lower() for w in words]
    
    def get_field_weight(self, field):
        """Return importance weight for field"""
        weights = {'title': 2.0, 'abstract': 1.5, 'body': 1.0, 'refs': 0.5}
        return weights.get(field, 1.0)

def structured_search(documents, query):
    """
    Execute structured query: field:term AND field:term
    """
    results = []
    
    # Parse query (simplified)
    constraints = []
    parts = query.split(' AND ')
    for part in parts:
        if ':' in part:
            field, term = part.strip().split(':')
            constraints.append((field, term))
    
    # Evaluate each document
    for doc in documents:
        match = True
        score = 0
        
        for field, term in constraints:
            if not doc.contains_in_field(term, field):
                match = False
                break
            score += doc.get_field_weight(field)
        
        if match:
            results.append((doc.doc_id, score))
    
    # Sort by score
    results.sort(key=lambda x: x[1], reverse=True)
    return results

# Example usage
docs = [
    StructuredDocument('D1', {
        'title': 'Machine Learning Basics',
        'abstract': 'Introduction to ML algorithms',
        'body': 'Detailed explanation of learning techniques'
    }),
    StructuredDocument('D2', {
        'title': 'Deep Learning Guide',
        'abstract': 'Neural networks overview',
        'body': 'Advanced machine learning methods'
    })
]

query = "title:machine AND body:learning"
results = structured_search(docs, query)

print("Structured Search Results:")
for doc_id, score in results:
    print(f"{doc_id}: Score = {score}")`}</pre>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Structured Text Retrieval
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">1. Requires Structured Documents</p>
                        <p className="text-sm text-muted-foreground">
                            Only works if documents have explicit structure (XML, HTML, JSON). Plain text files need preprocessing
                            to identify structure, which can be error-prone.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">2. Complex Query Syntax</p>
                        <p className="text-sm text-muted-foreground">
                            Users must learn field names and query syntax (XPath, field:term). This creates a barrier for
                            non-technical users compared to simple keyword search.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">3. Granularity Problem</p>
                        <p className="text-sm text-muted-foreground">
                            What should be returned? The whole document, the matching section, or the matching paragraph?
                            Determining optimal retrieval unit is challenging.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">4. Structure Inconsistency</p>
                        <p className="text-sm text-muted-foreground">
                            Different documents may use different tag names for similar concepts (&lt;summary&gt; vs &lt;abstract&gt;).
                            Schema heterogeneity reduces effectiveness.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Solution: Browsing Models
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        When structure is too complex or users don't know exact queries, Browsing Models provide an alternative:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Exploratory Navigation</p>
                                <p className="text-sm text-muted-foreground">
                                    Users browse through hierarchies (folders, categories) instead of formulating queries
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Hypertext Linking</p>
                                <p className="text-sm text-muted-foreground">
                                    Follow semantic links between documents (like Wikipedia) for discovery
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Berry-Picking Model</p>
                                <p className="text-sm text-muted-foreground">
                                    Iterative refinement: search → read → learn new terms → search again
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                        <Link href="/lab/browsing-models">
                            Next Lab: Browsing Models <ArrowRight className="ml-2 h-4 w-4" />
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
                <CardContent className="space-y-3">
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q1: Why is finding a term in &lt;title&gt; more valuable than in &lt;body&gt;?</p>
                        <p className="text-sm text-green-600">A: Titles are concise summaries of document content. Terms in titles indicate main topics, while body terms might be tangential mentions.</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q2: What does the containment operator ⊆ check?</p>
                        <p className="text-sm text-green-600">A: It checks if term positions fall within the start/end boundaries of a structural node (field).</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q3: Give an example of a proximity query.</p>
                        <p className="text-sm text-green-600">A: NEAR(machine, learning, 5) finds documents where "machine" and "learning" appear within 5 words of each other.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/probabilistic-model">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Probabilistic Model
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/browsing-models">
                        Next: Browsing Models <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
