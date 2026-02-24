'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function PageRankLab() {
    const [dampingFactor, setDampingFactor] = useState(0.85)
    const [iterations, setIterations] = useState(0)
    const [pageRanks, setPageRanks] = useState<number[]>([0.25, 0.25, 0.25, 0.25])

    // Simple 4-page web graph
    // A -> B, C
    // B -> C
    // C -> A
    // D -> A, B, C
    const linkGraph = [
        [0, 1, 1, 0],  // A links to B, C
        [0, 0, 1, 0],  // B links to C
        [1, 0, 0, 0],  // C links to A
        [1, 1, 1, 0],  // D links to A, B, C
    ]

    const calculatePageRank = () => {
        const n = 4
        let ranks = [...pageRanks]
        const d = dampingFactor

        // One iteration of PageRank
        const newRanks = new Array(n).fill(0)

        for (let i = 0; i < n; i++) {
            let sum = 0
            for (let j = 0; j < n; j++) {
                if (linkGraph[j][i] === 1) {
                    const outLinks = linkGraph[j].reduce((a, b) => a + b, 0)
                    sum += ranks[j] / outLinks
                }
            }
            newRanks[i] = (1 - d) / n + d * sum
        }

        setPageRanks(newRanks)
        setIterations(iterations + 1)
    }

    const resetPageRank = () => {
        setPageRanks([0.25, 0.25, 0.25, 0.25])
        setIterations(0)
    }

    const pages = ['Page A', 'Page B', 'Page C', 'Page D']

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 3 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">PageRank Algorithm Lab</h1>
                <p className="text-lg text-muted-foreground">
                    The algorithm that made Google dominant
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Ranking the Web
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        With billions of web pages, how do you decide which are most important? PageRank treats links as votes:
                        pages linked by many important pages are themselves important.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Key Insight:</p>
                        <p className="text-sm">
                            A link from a high-authority page (like Wikipedia) is worth more than a link from a random blog.
                            PageRank computes this recursively: importance flows through the link graph.
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Impact:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google's original ranking algorithm (1998)</li>
                            <li>• Used for academic citation analysis</li>
                            <li>• Social network influence measurement</li>
                            <li>• Recommendation systems</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* PageRank Formula */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> PageRank Formula
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">PR(A) = (1-d)/N + d × Σ(PR(T_i) / C(T_i))</div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">PR(A)</span>
                                <span className="text-muted-foreground">PageRank of page A</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">d</span>
                                <span className="text-muted-foreground">Damping factor (typically 0.85) - probability of following links</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">N</span>
                                <span className="text-muted-foreground">Total number of pages</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">T_i</span>
                                <span className="text-muted-foreground">Pages that link to A</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">C(T_i)</span>
                                <span className="text-muted-foreground">Number of outbound links from T_i</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive PageRank Calculator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive PageRank Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="bg-secondary/30 p-4 rounded">
                            <p className="font-semibold mb-3">Link Graph:</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Badge>A</Badge>
                                    <span>→</span>
                                    <Badge variant="outline">B</Badge>
                                    <Badge variant="outline">C</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge>B</Badge>
                                    <span>→</span>
                                    <Badge variant="outline">C</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge>C</Badge>
                                    <span>→</span>
                                    <Badge variant="outline">A</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge>D</Badge>
                                    <span>→</span>
                                    <Badge variant="outline">A</Badge>
                                    <Badge variant="outline">B</Badge>
                                    <Badge variant="outline">C</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Damping Factor (d): {dampingFactor.toFixed(2)}</label>
                            <Slider
                                value={[dampingFactor]}
                                onValueChange={(v) => setDampingFactor(v[0])}
                                min={0}
                                max={1}
                                step={0.05}
                            />
                            <p className="text-xs text-muted-foreground">
                                Probability of following links vs random jump (typical: 0.85)
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={calculatePageRank} className="flex-1">
                                <Play className="h-4 w-4 mr-2" /> Run Iteration
                            </Button>
                            <Button onClick={resetPageRank} variant="outline">
                                Reset
                            </Button>
                        </div>

                        <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                            <p className="text-sm font-semibold mb-3">
                                PageRank Scores (Iteration {iterations}):
                            </p>
                            <div className="space-y-2">
                                {pages.map((page, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="font-semibold">{page}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 bg-secondary rounded-full h-4">
                                                <div
                                                    className="bg-primary h-4 rounded-full transition-all"
                                                    style={{ width: `${pageRanks[i] * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-mono text-sm w-16 text-right">
                                                {pageRanks[i].toFixed(3)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                Sum: {pageRanks.reduce((a, b) => a + b, 0).toFixed(3)} (should converge to 1.0)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: PageRank Implementation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import numpy as np

def pagerank(adjacency_matrix, damping=0.85, max_iter=100, tol=1e-6):
    """
    Calculate PageRank for a web graph
    
    Args:
        adjacency_matrix: NxN matrix where [i][j]=1 if i links to j
        damping: Damping factor (typically 0.85)
        max_iter: Maximum iterations
        tol: Convergence tolerance
    
    Returns:
        PageRank scores for each page
    """
    n = len(adjacency_matrix)
    
    # Initialize PageRank scores
    pr = np.ones(n) / n
    
    # Calculate outbound link counts
    out_links = np.sum(adjacency_matrix, axis=1)
    out_links[out_links == 0] = 1  # Avoid division by zero
    
    for iteration in range(max_iter):
        pr_new = np.zeros(n)
        
        for i in range(n):
            # Sum contributions from pages linking to i
            for j in range(n):
                if adjacency_matrix[j][i] == 1:
                    pr_new[i] += pr[j] / out_links[j]
            
            # Apply PageRank formula
            pr_new[i] = (1 - damping) / n + damping * pr_new[i]
        
        # Check convergence
        if np.sum(np.abs(pr_new - pr)) < tol:
            print(f"Converged in {iteration + 1} iterations")
            break
        
        pr = pr_new
    
    return pr

# Example: 4-page web graph
# A -> B, C
# B -> C
# C -> A
# D -> A, B, C
graph = np.array([
    [0, 1, 1, 0],  # A
    [0, 0, 1, 0],  # B
    [1, 0, 0, 0],  # C
    [1, 1, 1, 0],  # D
])

scores = pagerank(graph)
pages = ['A', 'B', 'C', 'D']

print("PageRank Scores:")
for page, score in zip(pages, scores):
    print(f"Page {page}: {score:.4f}")`}</code>
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
                            <p className="font-semibold mb-2">Q1: What does the damping factor represent?</p>
                            <p className="text-sm text-green-600">A: The probability that a user follows links (0.85) vs randomly jumping to any page (0.15) - models real browsing behavior.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why is PageRank computed iteratively?</p>
                            <p className="text-sm text-green-600">A: Because importance is recursive - a page's rank depends on the ranks of pages linking to it, which depend on their inlinks, etc.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is the "random surfer" model?</p>
                            <p className="text-sm text-green-600">A: PageRank models a user randomly clicking links with probability d, or jumping to a random page with probability (1-d).</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
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
