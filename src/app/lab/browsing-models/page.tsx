'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function BrowsingModelsLab() {
    const [currentNode, setCurrentNode] = useState('home')
    const [history, setHistory] = useState<string[]>(['home'])
    const [berriesCollected, setBerriesCollected] = useState<string[]>([])

    const nodes: Record<string, { title: string, content: string, links: Array<{ to: string, label: string }>, berry?: string }> = {
        home: {
            title: 'Information Retrieval Portal',
            content: 'Welcome to the IR knowledge base. Explore topics through navigation.',
            links: [
                { to: 'models', label: 'IR Models' },
                { to: 'evaluation', label: 'Evaluation Metrics' },
                { to: 'applications', label: 'Applications' }
            ]
        },
        models: {
            title: 'IR Models',
            content: 'Different approaches to information retrieval.',
            links: [
                { to: 'boolean', label: 'Boolean Model' },
                { to: 'vector', label: 'Vector Space Model' },
                { to: 'home', label: 'Back to Home' }
            ],
            berry: 'Learned about IR model taxonomy'
        },
        boolean: {
            title: 'Boolean Model',
            content: 'Set-theoretic approach using AND, OR, NOT operators.',
            links: [
                { to: 'models', label: 'Back to Models' },
                { to: 'vector', label: 'Next: Vector Model' }
            ],
            berry: 'Boolean model uses exact matching'
        },
        vector: {
            title: 'Vector Space Model',
            content: 'Documents and queries as vectors with cosine similarity.',
            links: [
                { to: 'boolean', label: 'Previous: Boolean' },
                { to: 'models', label: 'Back to Models' }
            ],
            berry: 'VSM enables ranking with TF-IDF'
        },
        evaluation: {
            title: 'Evaluation Metrics',
            content: 'Measuring IR system effectiveness.',
            links: [
                { to: 'home', label: 'Back to Home' }
            ],
            berry: 'Precision and Recall are key metrics'
        },
        applications: {
            title: 'IR Applications',
            content: 'Real-world uses of information retrieval.',
            links: [
                { to: 'home', label: 'Back to Home' }
            ],
            berry: 'IR powers search engines and recommenders'
        }
    }

    const navigate = (to: string) => {
        setCurrentNode(to)
        setHistory([...history, to])
        if (nodes[to].berry && !berriesCollected.includes(nodes[to].berry!)) {
            setBerriesCollected([...berriesCollected, nodes[to].berry!])
        }
    }

    const current = nodes[currentNode]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab 5 of 6</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Browsing Models Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Master exploratory navigation and the Berry-Picking model
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-pink-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Why Learn Browsing Models?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Not all information needs are well-defined queries. Sometimes users want to explore, discover, and learn
                        as they go. Browsing models formalize this exploratory behavior, recognizing that search is often iterative
                        and evolving, not a single query-response cycle.
                    </p>
                    <div className="bg-pink-50 dark:bg-pink-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Wikipedia navigation (following links between articles)</li>
                            <li>• E-commerce browsing (category navigation, related products)</li>
                            <li>• Digital libraries (hierarchical classification systems)</li>
                            <li>• Social media exploration (following connections, hashtags)</li>
                            <li>• News portals (topic-based navigation)</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">What Problem Does It Solve?</p>
                        <p className="text-sm">Traditional search assumes users know what they want. Browsing supports
                            "I'll know it when I see it" scenarios where information needs emerge through exploration.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Scoring Function */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Scoring Function: Recall@k (Berry-Picking)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center text-lg">
                        Recall@k = |Rel ∩ Ret₁...ₖ| / |Rel|
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Components:</h4>
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Ret₁...ₖ</span>
                                <span className="text-muted-foreground">First k items encountered during browsing session</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Rel</span>
                                <span className="text-muted-foreground">Total number of relevant documents in collection</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">k</span>
                                <span className="text-muted-foreground">Inspection depth (number of clicks or items viewed)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Recall@k</span>
                                <span className="text-muted-foreground">Fraction of relevant items discovered within k steps</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2">Information Scent Model:</p>
                        <div className="space-y-2 text-sm font-mono">
                            <div>P(click | link) = exp(Scent(link, goal)) / Σ exp(Scent(all_links, goal))</div>
                            <div className="mt-2 text-xs">
                                Scent = cosine_similarity(link_text, user_goal)<br />
                                Users follow links with highest information scent (semantic similarity to goal)
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Lab */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Lab: Berry-Picking Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Scenario:</p>
                        <p className="text-sm">You're exploring IR concepts. Navigate through the knowledge base by clicking links.
                            Each page you visit may contain a "berry" (piece of relevant information). Your goal: collect as many berries as possible!</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Current Page:</label>
                            <div className="bg-secondary/30 p-4 rounded">
                                <h3 className="font-bold text-lg mb-2">{current.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{current.content}</p>
                                {current.berry && (
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded text-sm mb-4">
                                        🍓 Berry: {current.berry}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold">Available Links:</p>
                                    {current.links.map((link, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start"
                                            onClick={() => navigate(link.to)}
                                        >
                                            → {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Browsing History ({history.length} pages):</label>
                                <div className="bg-secondary/30 p-3 rounded max-h-32 overflow-y-auto">
                                    <div className="text-xs font-mono space-y-1">
                                        {history.map((node, i) => (
                                            <div key={i}>
                                                {i + 1}. {nodes[node].title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Berries Collected ({berriesCollected.length}):</label>
                                <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                                    {berriesCollected.length === 0 ? (
                                        <p className="text-xs text-muted-foreground">No berries collected yet. Keep browsing!</p>
                                    ) : (
                                        <div className="text-xs space-y-1">
                                            {berriesCollected.map((berry, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <span>🍓</span>
                                                    <span>{berry}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded">
                                <p className="text-xs font-semibold mb-1">Recall@{history.length}:</p>
                                <p className="text-2xl font-bold">{((berriesCollected.length / 5) * 100).toFixed(0)}%</p>
                                <p className="text-xs text-muted-foreground">
                                    You've discovered {berriesCollected.length} out of 5 total berries
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Equation Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span> Browsing Models Explained
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="font-semibold">Berry-Picking Model (Marcia Bates)</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Users don't execute one perfect query. They search → read → learn new terms → refine query → repeat.
                                Information gathering is iterative, with the query evolving as understanding grows.
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="font-semibold">Information Scent</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Users predict link relevance from anchor text. High scent = high probability of click.
                                Scent is measured by semantic similarity between link text and user's goal.
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <p className="font-semibold">Lost in Hyperspace</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                In complex hypertext, users lose orientation. Solutions: breadcrumbs, sitemaps, search within site,
                                history tracking, and limiting link depth.
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <p className="font-semibold">Three Browsing Types</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <span className="font-semibold">Flat:</span> Linear scanning (lists).
                                <span className="font-semibold"> Hierarchical:</span> Tree navigation (folders).
                                <span className="font-semibold"> Hypertext:</span> Network navigation (web links).
                            </p>
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
                        <pre>{`import random
from collections import defaultdict

class BrowsingSimulator:
    def __init__(self, graph, relevant_nodes):
        self.graph = graph  # {node: [linked_nodes]}
        self.relevant_nodes = set(relevant_nodes)
        self.visited = []
        self.berries_found = set()
    
    def calculate_scent(self, link_text, goal_keywords):
        """Simple scent: count matching keywords"""
        matches = sum(1 for word in goal_keywords if word in link_text.lower())
        return matches / len(goal_keywords) if goal_keywords else 0
    
    def browse_step(self, current_node, goal_keywords):
        """Simulate one browsing step"""
        self.visited.append(current_node)
        
        # Collect berry if relevant
        if current_node in self.relevant_nodes:
            self.berries_found.add(current_node)
        
        # Get available links
        links = self.graph.get(current_node, [])
        if not links:
            return None
        
        # Calculate scent for each link
        scents = {}
        for link in links:
            scent = self.calculate_scent(link, goal_keywords)
            scents[link] = scent
        
        # Choose link with highest scent (with some randomness)
        if random.random() < 0.8:  # 80% follow scent
            next_node = max(scents, key=scents.get)
        else:  # 20% explore randomly
            next_node = random.choice(links)
        
        return next_node
    
    def simulate_session(self, start_node, goal_keywords, max_steps=10):
        """Simulate a complete browsing session"""
        current = start_node
        
        for step in range(max_steps):
            current = self.browse_step(current, goal_keywords)
            if current is None:
                break
        
        # Calculate metrics
        recall = len(self.berries_found) / len(self.relevant_nodes)
        return {
            'visited': self.visited,
            'berries_found': list(self.berries_found),
            'recall': recall,
            'steps': len(self.visited)
        }

# Example usage
graph = {
    'home': ['models', 'evaluation', 'applications'],
    'models': ['boolean', 'vector', 'probabilistic'],
    'boolean': ['models'],
    'vector': ['models', 'boolean'],
    'probabilistic': ['models', 'vector'],
    'evaluation': ['home'],
    'applications': ['home']
}

relevant = ['boolean', 'vector', 'probabilistic', 'evaluation']
goal = ['model', 'retrieval', 'ranking']

simulator = BrowsingSimulator(graph, relevant)
results = simulator.simulate_session('home', goal, max_steps=8)

print(f"Browsing Path: {' → '.join(results['visited'])}")
print(f"Berries Found: {results['berries_found']}")
print(f"Recall@{results['steps']}: {results['recall']:.2%}")`}</pre>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span> Limitations of Browsing Models
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">1. Inefficient for Known-Item Search</p>
                        <p className="text-sm text-muted-foreground">
                            If you know exactly what you want, browsing is slow. Direct search is faster.
                            Browsing works best for exploratory tasks, not targeted retrieval.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">2. Cognitive Overload</p>
                        <p className="text-sm text-muted-foreground">
                            Too many links or deep hierarchies cause "lost in hyperspace". Users forget where they started
                            and struggle to backtrack.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">3. Depends on Link Quality</p>
                        <p className="text-sm text-muted-foreground">
                            Poor anchor text (e.g., "click here") provides no information scent. Users cannot predict
                            destination relevance, leading to wasted clicks.
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">4. Serendipity vs Efficiency Trade-off</p>
                        <p className="text-sm text-muted-foreground">
                            Browsing enables discovery of unexpected relevant items (serendipity), but at the cost of time.
                            Search is more efficient but misses unexpected connections.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">✅</span> Hybrid Approach: Search + Browse
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Modern systems combine search and browsing for optimal user experience:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Faceted Search</p>
                                <p className="text-sm text-muted-foreground">
                                    Search results with browsable filters (Amazon: search "laptop" then filter by brand, price, rating)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Related Items / "People Also Viewed"</p>
                                <p className="text-sm text-muted-foreground">
                                    After search, provide browsing links to similar items for exploration
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Search Within Results</p>
                                <p className="text-sm text-muted-foreground">
                                    Browse a category, then search within that subset for refinement
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">→</span>
                            <div>
                                <p className="font-semibold">Breadcrumbs & History</p>
                                <p className="text-sm text-muted-foreground">
                                    Show navigation path to prevent disorientation during browsing
                                </p>
                            </div>
                        </div>
                    </div>
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
                        <p className="font-semibold mb-2">Q1: What is the Berry-Picking model?</p>
                        <p className="text-sm text-green-600">A: An iterative search model where users refine queries as they discover information, "picking berries" (relevant facts) along the way rather than executing one perfect query.</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q2: What is "information scent"?</p>
                        <p className="text-sm text-green-600">A: Cues (like anchor text) that help users predict if a link will lead to relevant information. High scent = high probability of clicking.</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded">
                        <p className="font-semibold mb-2">Q3: When is browsing better than search?</p>
                        <p className="text-sm text-green-600">A: When users have vague information needs, want to explore a topic, or don't know the right keywords. Browsing supports discovery and learning.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/structured-text-retrieval">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Structured Text Retrieval
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/lab">
                        Back to Lab Hub
                    </Link>
                </Button>
            </div>
        </div>
    )
}
