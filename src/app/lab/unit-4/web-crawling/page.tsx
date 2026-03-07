'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function WebCrawlingLab() {
    const [frontier, setFrontier] = useState<string[]>(['https://example.com'])
    const [visited, setVisited] = useState<Set<string>>(new Set())
    const [currentUrl, setCurrentUrl] = useState('')
    const [crawlCount, setCrawlCount] = useState(0)
    const [activeTab, setActiveTab] = useState<'bfs' | 'dfs' | 'focused' | 'incremental'>('bfs')

    const webGraph: Record<string, string[]> = {
        'https://example.com': ['https://example.com/about', 'https://example.com/products'],
        'https://example.com/about': ['https://example.com/team', 'https://example.com/contact'],
        'https://example.com/products': ['https://example.com/product1', 'https://example.com/product2'],
        'https://example.com/team': ['https://example.com/careers'],
        'https://example.com/contact': [],
        'https://example.com/product1': ['https://example.com/reviews'],
        'https://example.com/product2': [],
        'https://example.com/careers': [],
        'https://example.com/reviews': [],
    }

    const crawlStep = () => {
        if (frontier.length === 0) return
        const url = frontier[0]
        const newFrontier = frontier.slice(1)
        if (!visited.has(url)) {
            const newVisited = new Set(visited)
            newVisited.add(url)
            setVisited(newVisited)
            setCurrentUrl(url)
            setCrawlCount(crawlCount + 1)
            const outlinks = webGraph[url] || []
            const newUrls = outlinks.filter(link => !newVisited.has(link) && !newFrontier.includes(link))
            setFrontier([...newFrontier, ...newUrls])
        } else {
            setFrontier(newFrontier)
        }
    }

    const resetCrawler = () => {
        setFrontier(['https://example.com'])
        setVisited(new Set())
        setCurrentUrl('')
        setCrawlCount(0)
    }

    const tabs = [
        { key: 'bfs' as const, label: 'Breadth-First', emoji: '📊' },
        { key: 'dfs' as const, label: 'Depth-First', emoji: '📏' },
        { key: 'focused' as const, label: 'Focused', emoji: '🎯' },
        { key: 'incremental' as const, label: 'Incremental', emoji: '🔄' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 2 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Web Crawling Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Discovering and indexing the web
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
                        Before you can search the web, you need to discover it. Web crawlers systematically browse the web, following links and downloading pages for indexing. Google crawls 100+ billion pages.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Crawl Rate */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Crawl Freshness
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">F(t) = e<sup>-λt</sup></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">F(t)</span>: Freshness of a page at time t after last crawl
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">λ</span>: Page change rate (changes per unit time)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">t</span>: Time since last crawl
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">e<sup>-λt</sup></span>: Exponential decay — freshness drops over time
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Pages that change frequently (news sites, λ high) become stale quickly and need frequent re-crawling. Static pages (λ low) stay fresh longer. Optimal crawl scheduling allocates bandwidth proportional to λ — crawl fast-changing pages more often.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: URL Priority */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: URL Priority Score
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">Priority(u) = α·PageRank(u) + β·Freshness(u) + γ·Relevance(u)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">PageRank(u)</span>: Estimated importance from link structure
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Freshness(u)</span>: How stale the cached version is
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Relevance(u)</span>: Topic relevance (for focused crawling)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">α, β, γ</span>: Weights balancing importance, freshness, relevance
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Modern crawlers use priority queues ordered by this composite score. High-PageRank pages are crawled first (they&apos;re important), stale pages get priority (they need updating), and for focused crawlers, topically relevant pages are preferred.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Strategy Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Crawling Strategies
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'outline'} onClick={() => setActiveTab(tab.key)} className="text-lg px-6 py-4">
                                {tab.emoji} {tab.label}
                            </Button>
                        ))}
                    </div>

                    {activeTab === 'bfs' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">📊 Breadth-First Search (BFS)</p>
                            <p className="text-lg text-muted-foreground mb-4">Explore all pages at depth N before depth N+1. Uses a queue (FIFO). Good for finding important pages quickly — high-quality pages tend to be close to seed URLs.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                Queue: [A] → [B,C] → [C,D,E] → [D,E,F,G] → ...
                            </div>
                        </div>
                    )}

                    {activeTab === 'dfs' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">📏 Depth-First Search (DFS)</p>
                            <p className="text-lg text-muted-foreground mb-4">Follow one path to the end before backtracking. Uses a stack (LIFO). Good for deep site exploration but may get trapped in infinite paths.</p>
                            <div className="bg-secondary/20 p-4 rounded font-mono text-lg">
                                Stack: [A] → [B] → [D] → [G] → backtrack → [E] → ...
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border border-yellow-400 mt-4">
                                <p className="font-semibold">⚠️ Spider Traps:</p>
                                <p className="text-muted-foreground">Infinite URL generators (calendars, session IDs) can trap DFS crawlers. Use depth limits.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'focused' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">🎯 Focused Crawling</p>
                            <p className="text-lg text-muted-foreground mb-4">Prioritize pages relevant to specific topics. Uses a classifier to score URLs before crawling.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Topic Classifier</p>
                                    <p className="text-muted-foreground">Score each URL&apos;s predicted relevance. Crawl highest-scoring first.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Context Graph</p>
                                    <p className="text-muted-foreground">Use anchor text and surrounding text to predict page topic before downloading.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'incremental' && (
                        <div className="bg-secondary/30 p-6 rounded">
                            <p className="font-semibold text-xl mb-3">🔄 Incremental Crawling</p>
                            <p className="text-lg text-muted-foreground mb-4">Re-crawl pages based on change frequency. Keeps index fresh without re-crawling everything.</p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">News Sites</p>
                                    <p className="text-muted-foreground">Re-crawl every 15–60 minutes. High λ.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Blogs</p>
                                    <p className="text-muted-foreground">Re-crawl daily. Medium λ.</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded">
                                    <p className="font-semibold text-lg">Static Pages</p>
                                    <p className="text-muted-foreground">Re-crawl weekly/monthly. Low λ.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive Crawler */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive BFS Crawler Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xl font-semibold">Frontier (Queue):</label>
                            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border-2 border-blue-500 min-h-[120px]">
                                {frontier.length === 0 ? <p className="text-lg text-muted-foreground">Empty — crawl complete</p> : (
                                    <div className="space-y-1">
                                        {frontier.slice(0, 5).map((url, i) => (
                                            <div key={i} className="text-sm font-mono bg-background p-2 rounded">{i + 1}. {url}</div>
                                        ))}
                                        {frontier.length > 5 && <p className="text-muted-foreground">... and {frontier.length - 5} more</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xl font-semibold">Visited Pages:</label>
                            <div className="bg-green-50 dark:bg-green-950 p-4 rounded border-2 border-green-500 min-h-[120px]">
                                {visited.size === 0 ? <p className="text-lg text-muted-foreground">None yet</p> : (
                                    <div className="space-y-1">
                                        {Array.from(visited).slice(0, 5).map((url, i) => (
                                            <div key={i} className="text-sm font-mono bg-background p-2 rounded">✓ {url}</div>
                                        ))}
                                        {visited.size > 5 && <p className="text-muted-foreground">... and {visited.size - 5} more</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {currentUrl && (
                        <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                            <p className="text-lg font-semibold">Currently Crawling:</p>
                            <p className="font-mono text-lg">{currentUrl}</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button onClick={crawlStep} disabled={frontier.length === 0} className="flex-1 text-lg" size="lg">
                            <Play className="h-5 w-5 mr-2" /> Crawl Next Page
                        </Button>
                        <Button onClick={resetCrawler} variant="outline" size="lg">Reset</Button>
                    </div>

                    <div className="bg-secondary/30 p-4 rounded">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div><p className="text-3xl font-bold">{crawlCount}</p><p className="text-lg text-muted-foreground">Pages Crawled</p></div>
                            <div><p className="text-3xl font-bold">{frontier.length}</p><p className="text-lg text-muted-foreground">In Frontier</p></div>
                            <div><p className="text-3xl font-bold">{visited.size}</p><p className="text-lg text-muted-foreground">Visited</p></div>
                        </div>
                    </div>
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
                            <li>• Discovers content automatically</li>
                            <li>• BFS finds important pages quickly</li>
                            <li>• Focused crawling saves bandwidth</li>
                            <li>• Incremental keeps index fresh</li>
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
                            <li>• Spider traps (infinite URLs)</li>
                            <li>• Duplicate content detection needed</li>
                            <li>• Politeness constraints limit speed</li>
                            <li>• Deep web (forms, JS) hard to crawl</li>
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
                        Web crawling is the foundation of every search engine. Googlebot processes 20+ billion pages per day using distributed BFS with priority queues. Common Crawl provides open crawl data (250+ billion pages). Scrapy and Apache Nutch are popular open-source crawling frameworks. SEO tools (Screaming Frog) use focused crawling for site audits.
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-4/multimedia-ir">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Multimedia IR
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-4/pagerank">
                        Next: PageRank <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
