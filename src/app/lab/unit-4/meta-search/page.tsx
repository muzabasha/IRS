'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function MetaSearchLab() {
    const [query, setQuery] = useState('machine learning')
    const [mergedResults, setMergedResults] = useState<any[]>([])
    const [showDetails, setShowDetails] = useState(false)

    // Simulated results from different search engines
    const searchEngines = {
        'Google': [
            { title: 'Machine Learning Basics', score: 0.95, url: 'ml-basics.com' },
            { title: 'Deep Learning Tutorial', score: 0.88, url: 'dl-tutorial.com' },
            { title: 'ML Algorithms Guide', score: 0.82, url: 'ml-guide.com' },
        ],
        'Bing': [
            { title: 'Machine Learning Basics', score: 0.92, url: 'ml-basics.com' },
            { title: 'Introduction to ML', score: 0.85, url: 'intro-ml.com' },
            { title: 'ML Course Online', score: 0.78, url: 'ml-course.com' },
        ],
        'DuckDuckGo': [
            { title: 'Deep Learning Tutorial', score: 0.90, url: 'dl-tutorial.com' },
            { title: 'ML Research Papers', score: 0.83, url: 'ml-research.com' },
            { title: 'Machine Learning Basics', score: 0.80, url: 'ml-basics.com' },
        ],
    }

    const combineResults = () => {
        // Collect all results
        const allResults: any[] = []

        Object.entries(searchEngines).forEach(([engine, results]) => {
            results.forEach(result => {
                allResults.push({
                    ...result,
                    engine,
                    normalizedScore: result.score
                })
            })
        })

        // Group by URL (duplicate detection)
        const grouped: Record<string, any> = {}
        allResults.forEach(result => {
            if (!grouped[result.url]) {
                grouped[result.url] = {
                    ...result,
                    engines: [result.engine],
                    scores: [result.score],
                    avgScore: result.score
                }
            } else {
                grouped[result.url].engines.push(result.engine)
                grouped[result.url].scores.push(result.score)
                grouped[result.url].avgScore =
                    grouped[result.url].scores.reduce((a: number, b: number) => a + b, 0) /
                    grouped[result.url].scores.length
            }
        })

        // Convert to array and sort by average score
        const merged = Object.values(grouped).sort((a: any, b: any) => b.avgScore - a.avgScore)
        setMergedResults(merged)
        setShowDetails(true)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 4 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Meta-search Engines Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Aggregating results from multiple search engines
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Best of All Worlds
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Instead of building your own index, why not query multiple search engines and combine their results?
                        Meta-search engines aggregate results from Google, Bing, DuckDuckGo, etc., providing diverse perspectives.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Examples:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Dogpile - aggregates Google, Bing, Yahoo</li>
                            <li>• Metacrawler - combines multiple engines</li>
                            <li>• Searx - privacy-focused meta-search</li>
                            <li>• Kayak/Skyscanner - meta-search for travel</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Advantages:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• No need to build/maintain index</li>
                            <li>• Leverage multiple ranking algorithms</li>
                            <li>• Broader coverage of the web</li>
                            <li>• Reduce bias from single engine</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Result Merging Strategies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Result Merging Strategies
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. Round-Robin</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Take one result from each engine in turn
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                [G1, B1, D1, G2, B2, D2, ...]
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Simple but ignores relevance scores
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Score Normalization</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Normalize scores to [0,1], then merge
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                score_norm = (s - min) / (max - min)
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Accounts for different scoring scales
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Voting/Consensus</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Rank by how many engines return it
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                score = count × avg_rank
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Favors results appearing in multiple engines
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">4. Weighted Combination</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Weight engines by quality/trust
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                score = w₁×s₁ + w₂×s₂ + w₃×s₃
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Prioritize more reliable engines
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Meta-search Simulator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Meta-search Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Query:</label>
                            <div className="flex gap-2">
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter search query..."
                                    className="text-lg"
                                />
                                <Button onClick={combineResults}>
                                    <Play className="h-4 w-4 mr-2" /> Search All Engines
                                </Button>
                            </div>
                        </div>

                        {!showDetails && (
                            <div className="grid md:grid-cols-3 gap-4">
                                {Object.entries(searchEngines).map(([engine, results]) => (
                                    <div key={engine} className="border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                                                {engine[0]}
                                            </div>
                                            <p className="font-semibold">{engine}</p>
                                        </div>
                                        <div className="space-y-2">
                                            {results.map((result, i) => (
                                                <div key={i} className="text-sm">
                                                    <p className="font-semibold text-blue-600">{result.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Score: {result.score.toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showDetails && mergedResults.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">Merged Results (Consensus Ranking):</p>
                                    <Button variant="outline" size="sm" onClick={() => setShowDetails(false)}>
                                        Show Individual Results
                                    </Button>
                                </div>
                                {mergedResults.map((result, i) => (
                                    <div key={i} className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge className="bg-primary">{i + 1}</Badge>
                                                    <h3 className="text-lg font-semibold text-blue-600">
                                                        {result.title}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{result.url}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-xs text-muted-foreground">Found in:</p>
                                                    {result.engines.map((engine: string, j: number) => (
                                                        <Badge key={j} variant="outline" className="text-xs">
                                                            {engine}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">
                                                    Score: {result.avgScore.toFixed(3)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {result.engines.length} engine{result.engines.length > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Challenges */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Meta-search Challenges
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-3">
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">1. Score Incompatibility</p>
                            <p className="text-sm text-muted-foreground">
                                Different engines use different scoring scales. Google's 0.95 ≠ Bing's 0.95.
                                Need normalization or rank-based merging.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">2. Duplicate Detection</p>
                            <p className="text-sm text-muted-foreground">
                                Same page may appear with different URLs (www vs non-www, http vs https).
                                Need URL canonicalization.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">3. Latency</p>
                            <p className="text-sm text-muted-foreground">
                                Must wait for slowest engine to respond. Parallel queries help but add complexity.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                            <p className="font-semibold mb-2">4. API Limitations</p>
                            <p className="text-sm text-muted-foreground">
                                Search engines limit API calls (rate limiting). May need to scrape HTML (against ToS).
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: Meta-search Engine
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import asyncio
import aiohttp
from collections import defaultdict

class MetaSearchEngine:
    def __init__(self):
        self.engines = {
            'google': 'https://api.google.com/search',
            'bing': 'https://api.bing.com/search',
            'duckduckgo': 'https://api.duckduckgo.com/search'
        }
    
    async def query_engine(self, session, engine, query):
        """Query a single search engine"""
        try:
            async with session.get(
                self.engines[engine],
                params={'q': query},
                timeout=5
            ) as response:
                results = await response.json()
                return engine, results
        except Exception as e:
            print(f"Error querying {engine}: {e}")
            return engine, []
    
    async def search_all(self, query):
        """Query all engines in parallel"""
        async with aiohttp.ClientSession() as session:
            tasks = [
                self.query_engine(session, engine, query)
                for engine in self.engines
            ]
            results = await asyncio.gather(*tasks)
            return dict(results)
    
    def normalize_scores(self, results):
        """Normalize scores to [0, 1]"""
        for engine, docs in results.items():
            if not docs:
                continue
            scores = [doc['score'] for doc in docs]
            min_score, max_score = min(scores), max(scores)
            
            for doc in docs:
                if max_score > min_score:
                    doc['norm_score'] = (doc['score'] - min_score) / (max_score - min_score)
                else:
                    doc['norm_score'] = 1.0
        
        return results
    
    def merge_results(self, results, strategy='consensus'):
        """Merge results from multiple engines"""
        # Group by URL
        merged = defaultdict(lambda: {
            'engines': [],
            'scores': [],
            'title': '',
            'url': ''
        })
        
        for engine, docs in results.items():
            for doc in docs:
                url = doc['url']
                merged[url]['engines'].append(engine)
                merged[url]['scores'].append(doc.get('norm_score', doc['score']))
                merged[url]['title'] = doc['title']
                merged[url]['url'] = url
        
        # Calculate final scores
        final_results = []
        for url, data in merged.items():
            if strategy == 'consensus':
                # Favor results in multiple engines
                score = len(data['engines']) * sum(data['scores']) / len(data['scores'])
            elif strategy == 'average':
                score = sum(data['scores']) / len(data['scores'])
            else:
                score = max(data['scores'])
            
            final_results.append({
                'title': data['title'],
                'url': url,
                'score': score,
                'engines': data['engines']
            })
        
        # Sort by score
        final_results.sort(key=lambda x: x['score'], reverse=True)
        return final_results

# Example usage
async def main():
    meta = MetaSearchEngine()
    results = await meta.search_all("machine learning")
    results = meta.normalize_scores(results)
    merged = meta.merge_results(results, strategy='consensus')
    
    for i, result in enumerate(merged[:10], 1):
        print(f"{i}. {result['title']}")
        print(f"   Score: {result['score']:.3f}")
        print(f"   Engines: {', '.join(result['engines'])}")

asyncio.run(main())`}</code>
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
                            <p className="font-semibold mb-2">Q1: What is a meta-search engine?</p>
                            <p className="text-sm text-green-600">A: A search engine that queries multiple other search engines and combines their results, rather than maintaining its own index.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why normalize scores when merging results?</p>
                            <p className="text-sm text-green-600">A: Different engines use different scoring scales. Normalization converts all scores to a common range (e.g., 0-1) for fair comparison.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is the consensus ranking strategy?</p>
                            <p className="text-sm text-green-600">A: Ranking results by how many engines return them, combined with average score. Results appearing in multiple engines rank higher.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Unit Complete */}
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎉</span> Unit 4 Complete!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Congratulations! You've mastered multimedia IR and web search:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Multimedia IR (CBIR, Color Features)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Web Crawling (BFS, Politeness, robots.txt)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">PageRank (Link Analysis, Random Surfer)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 dark:bg-green-900">✓</Badge>
                            <span className="text-sm">Meta-search (Result Merging, Consensus)</span>
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
                    <Link href="/lab/unit-4/pagerank">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: PageRank
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-4">
                        Back to Unit 4 Labs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
