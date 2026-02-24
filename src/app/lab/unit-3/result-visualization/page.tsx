'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ResultVisualizationLab() {
    const [viewMode, setViewMode] = useState<'list' | 'grid' | 'cluster'>('list')

    const results = [
        { id: 1, title: 'Machine Learning Basics', snippet: 'Introduction to ML algorithms and concepts...', category: 'Tutorial', relevance: 0.95 },
        { id: 2, title: 'Deep Learning with Python', snippet: 'Build neural networks using TensorFlow...', category: 'Tutorial', relevance: 0.88 },
        { id: 3, title: 'ML Research Paper 2024', snippet: 'Latest advances in transformer models...', category: 'Research', relevance: 0.82 },
        { id: 4, title: 'Machine Learning Jobs', snippet: 'Top ML engineer positions available...', category: 'Jobs', relevance: 0.75 },
        { id: 5, title: 'ML Course Syllabus', snippet: 'Complete curriculum for ML certification...', category: 'Education', relevance: 0.70 },
    ]

    const clusters = {
        'Tutorial': results.filter(r => r.category === 'Tutorial'),
        'Research': results.filter(r => r.category === 'Research'),
        'Jobs': results.filter(r => r.category === 'Jobs'),
        'Education': results.filter(r => r.category === 'Education'),
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Result Visualization Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Presenting search results effectively
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: First Impressions Matter
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Users judge relevance in 2-3 seconds per result. Good visualization helps users quickly identify
                        relevant documents through snippets, highlighting, clustering, and faceted navigation.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Key Principles:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• KWIC (Keyword in Context) - show query terms in snippets</li>
                            <li>• Clustering - group similar results together</li>
                            <li>• Faceted search - filter by category, date, type</li>
                            <li>• Visual cues - thumbnails, icons, ratings</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* View Mode Selector */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Result Visualization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'outline'}
                            onClick={() => setViewMode('list')}
                        >
                            List View
                        </Button>
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid View
                        </Button>
                        <Button
                            variant={viewMode === 'cluster' ? 'default' : 'outline'}
                            onClick={() => setViewMode('cluster')}
                        >
                            Clustered View
                        </Button>
                    </div>

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="space-y-3">
                            {results.map((result) => (
                                <div key={result.id} className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                                                {result.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">{result.snippet}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline">{result.category}</Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    Relevance: {(result.relevance * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center text-2xl">
                                            📄
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Grid View */}
                    {viewMode === 'grid' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.map((result) => (
                                <div key={result.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="text-4xl mb-3 text-center">📄</div>
                                    <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer mb-2">
                                        {result.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{result.snippet}</p>
                                    <div className="mt-3">
                                        <Badge variant="outline">{result.category}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Clustered View */}
                    {viewMode === 'cluster' && (
                        <div className="space-y-4">
                            {Object.entries(clusters).map(([category, items]) => (
                                items.length > 0 && (
                                    <div key={category} className="border rounded-lg p-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                            <span className="text-2xl">📁</span>
                                            {category} ({items.length})
                                        </h3>
                                        <div className="space-y-2">
                                            {items.map((result) => (
                                                <div key={result.id} className="pl-4 border-l-2 border-primary">
                                                    <p className="font-semibold text-blue-600 hover:underline cursor-pointer">
                                                        {result.title}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">{result.snippet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Visualization Techniques */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎨</span> Result Presentation Techniques
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. KWIC Snippets</p>
                            <p className="text-sm text-muted-foreground">
                                Show query terms in context with surrounding text
                            </p>
                            <div className="mt-2 text-xs font-mono bg-background p-2 rounded">
                                ...science of <span className="bg-yellow-200 dark:bg-yellow-900">searching</span> for info...
                            </div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Faceted Navigation</p>
                            <p className="text-sm text-muted-foreground">
                                Filter by category, date, type, price
                            </p>
                            <div className="mt-2 flex gap-1 flex-wrap">
                                <Badge variant="outline">Type: PDF</Badge>
                                <Badge variant="outline">Date: 2024</Badge>
                            </div>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Result Clustering</p>
                            <p className="text-sm text-muted-foreground">
                                Group similar documents automatically
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Uses K-means or hierarchical clustering
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">4. Visual Thumbnails</p>
                            <p className="text-sm text-muted-foreground">
                                Preview images, charts, document layouts
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Increases click-through by 30%
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: KWIC Snippet Generator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`def generate_kwic_snippet(text, query, window=50):
    """
    Generate Keyword-In-Context snippet
    
    Args:
        text: Full document text
        query: Search query
        window: Characters before/after keyword
    
    Returns:
        Snippet with query highlighted
    """
    query_lower = query.lower()
    text_lower = text.lower()
    
    # Find query position
    pos = text_lower.find(query_lower)
    if pos == -1:
        return text[:100] + "..."
    
    # Calculate snippet boundaries
    start = max(0, pos - window)
    end = min(len(text), pos + len(query) + window)
    
    # Extract snippet
    snippet = text[start:end]
    
    # Add ellipsis
    if start > 0:
        snippet = "..." + snippet
    if end < len(text):
        snippet = snippet + "..."
    
    return snippet

def cluster_results(results, n_clusters=3):
    """
    Cluster search results by similarity
    """
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.cluster import KMeans
    
    # Extract text
    texts = [r['title'] + ' ' + r['snippet'] for r in results]
    
    # Vectorize
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(texts)
    
    # Cluster
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    labels = kmeans.fit_predict(X)
    
    # Group by cluster
    clusters = {}
    for i, label in enumerate(labels):
        if label not in clusters:
            clusters[label] = []
        clusters[label].append(results[i])
    
    return clusters

# Example usage
text = "Information retrieval is the science of searching for information..."
query = "searching"
snippet = generate_kwic_snippet(text, query, window=30)
print(snippet)
# Output: ...science of searching for information...`}</code>
                    </pre>
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
                            <p className="font-semibold mb-2">Q1: What is KWIC?</p>
                            <p className="text-sm text-green-600">A: Keyword-In-Context - showing query terms within surrounding text to help users judge relevance quickly.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: What is faceted search?</p>
                            <p className="text-sm text-green-600">A: Filtering results by multiple dimensions (facets) like category, date, price - allows users to narrow results interactively.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: Why cluster search results?</p>
                            <p className="text-sm text-green-600">A: To organize large result sets into meaningful groups, helping users explore different aspects of their query.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Unit Complete */}
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎉</span> Unit 3 Complete!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Congratulations! You've mastered user interface design for IR:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">HCI Principles (Fitts's Law, Autocomplete)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Information Access Process (Berry-Picking)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Query Specification (Spell-check, Edit Distance)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Result Visualization (KWIC, Clustering, Facets)</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button asChild className="w-full" size="lg">
                            <Link href="/lab">
                                Return to Lab Hub <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-3/query-specification">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Query Specification
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-3">
                        Back to Unit 3 Labs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
