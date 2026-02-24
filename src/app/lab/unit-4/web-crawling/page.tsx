'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react'

export default function WebCrawlingLab() {
    const [frontier, setFrontier] = useState<string[]>(['https://example.com'])
    const [visited, setVisited] = useState<Set<string>>(new Set())
    const [currentUrl, setCurrentUrl] = useState('')
    const [crawlCount, setCrawlCount] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    // Simulated web graph
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
        if (frontier.length === 0) {
            setIsRunning(false)
            return
        }

        // BFS: Take first URL from frontier
        const url = frontier[0]
        const newFrontier = frontier.slice(1)

        if (!visited.has(url)) {
            // Mark as visited
            const newVisited = new Set(visited)
            newVisited.add(url)
            setVisited(newVisited)
            setCurrentUrl(url)
            setCrawlCount(crawlCount + 1)

            // Add outlinks to frontier
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
        setIsRunning(false)
    }

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
                <h1 className="text-4xl font-bold">Web Crawling Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Discovering and indexing the web
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: How Search Engines Find Content
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Before you can search the web, you need to discover it. Web crawlers (spiders/bots) systematically
                        browse the web, following links and downloading pages for indexing.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Scale:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google crawls 100+ billion pages</li>
                            <li>• Googlebot processes 20+ billion pages per day</li>
                            <li>• Average crawl depth: 3-4 clicks from homepage</li>
                            <li>• Politeness: 1-2 second delay between requests</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Key Challenges:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Scale: Billions of pages, petabytes of data</li>
                            <li>• Freshness: Pages change constantly</li>
                            <li>• Politeness: Don't overload servers</li>
                            <li>• Duplicate detection: Same content, different URLs</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Crawling Strategies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Crawling Strategies
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. Breadth-First (BFS)</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Explore all pages at depth N before depth N+1
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                Queue: [A] → [B,C] → [C,D,E] → ...
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Good for: Finding important pages quickly
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Depth-First (DFS)</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Follow one path to the end before backtracking
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                Stack: [A] → [B] → [D] → [G] → ...
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Good for: Deep site exploration
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Focused Crawling</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Prioritize pages relevant to specific topics
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                Score each URL, crawl highest first
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Good for: Domain-specific search engines
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">4. Incremental Crawling</p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Re-crawl pages based on change frequency
                            </p>
                            <div className="text-xs font-mono bg-background p-2 rounded">
                                News sites: hourly, Blogs: daily
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Good for: Keeping index fresh
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Crawler Simulator */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive BFS Crawler Simulator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Frontier (Queue):</label>
                                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded border-2 border-blue-500 min-h-[100px]">
                                    {frontier.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">Empty</p>
                                    ) : (
                                        <div className="space-y-1">
                                            {frontier.slice(0, 5).map((url, i) => (
                                                <div key={i} className="text-xs font-mono bg-background p-1 rounded">
                                                    {i + 1}. {url}
                                                </div>
                                            ))}
                                            {frontier.length > 5 && (
                                                <p className="text-xs text-muted-foreground">
                                                    ... and {frontier.length - 5} more
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Visited Pages:</label>
                                <div className="bg-green-50 dark:bg-green-950 p-3 rounded border-2 border-green-500 min-h-[100px]">
                                    {visited.size === 0 ? (
                                        <p className="text-sm text-muted-foreground">None yet</p>
                                    ) : (
                                        <div className="space-y-1">
                                            {Array.from(visited).slice(0, 5).map((url, i) => (
                                                <div key={i} className="text-xs font-mono bg-background p-1 rounded">
                                                    ✓ {url}
                                                </div>
                                            ))}
                                            {visited.size > 5 && (
                                                <p className="text-xs text-muted-foreground">
                                                    ... and {visited.size - 5} more
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {currentUrl && (
                            <div className="bg-primary/10 p-4 rounded border-2 border-primary">
                                <p className="text-sm font-semibold mb-1">Currently Crawling:</p>
                                <p className="font-mono text-sm">{currentUrl}</p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button onClick={crawlStep} disabled={frontier.length === 0} className="flex-1">
                                <Play className="h-4 w-4 mr-2" /> Crawl Next Page
                            </Button>
                            <Button onClick={resetCrawler} variant="outline">
                                Reset
                            </Button>
                        </div>

                        <div className="bg-secondary/30 p-4 rounded">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold">{crawlCount}</p>
                                    <p className="text-xs text-muted-foreground">Pages Crawled</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{frontier.length}</p>
                                    <p className="text-xs text-muted-foreground">In Frontier</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{visited.size}</p>
                                    <p className="text-xs text-muted-foreground">Visited</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* robots.txt */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🤖</span> Politeness: robots.txt
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Websites use robots.txt to tell crawlers which pages to avoid. Ethical crawlers respect these rules.
                    </p>
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`# Example robots.txt
User-agent: *
Disallow: /admin/
Disallow: /private/
Crawl-delay: 2

User-agent: Googlebot
Allow: /

Sitemap: https://example.com/sitemap.xml`}</code>
                    </pre>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded">
                        <p className="font-semibold mb-2">Politeness Rules:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Respect robots.txt directives</li>
                            <li>• Add delay between requests (1-2 seconds)</li>
                            <li>• Identify your crawler (User-Agent header)</li>
                            <li>• Don't crawl during peak hours</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: Simple Web Crawler
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from collections import deque
import time

class WebCrawler:
    def __init__(self, seed_url, max_pages=100):
        self.frontier = deque([seed_url])
        self.visited = set()
        self.max_pages = max_pages
        self.domain = urlparse(seed_url).netloc
    
    def is_valid_url(self, url):
        """Check if URL is valid and same domain"""
        parsed = urlparse(url)
        return (parsed.netloc == self.domain and 
                parsed.scheme in ['http', 'https'])
    
    def extract_links(self, html, base_url):
        """Extract all links from HTML"""
        soup = BeautifulSoup(html, 'html.parser')
        links = []
        
        for link in soup.find_all('a', href=True):
            url = urljoin(base_url, link['href'])
            if self.is_valid_url(url):
                links.append(url)
        
        return links
    
    def crawl(self):
        """BFS crawling"""
        while self.frontier and len(self.visited) < self.max_pages:
            url = self.frontier.popleft()
            
            if url in self.visited:
                continue
            
            try:
                print(f"Crawling: {url}")
                
                # Fetch page
                response = requests.get(url, timeout=5)
                response.raise_for_status()
                
                # Mark as visited
                self.visited.add(url)
                
                # Extract and add new links
                links = self.extract_links(response.text, url)
                for link in links:
                    if link not in self.visited:
                        self.frontier.append(link)
                
                # Be polite - delay between requests
                time.sleep(1)
                
            except Exception as e:
                print(f"Error crawling {url}: {e}")
        
        return self.visited

# Example usage
crawler = WebCrawler('https://example.com', max_pages=50)
crawled_pages = crawler.crawl()
print(f"Crawled {len(crawled_pages)} pages")`}</code>
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
                            <p className="font-semibold mb-2">Q1: What's the difference between BFS and DFS crawling?</p>
                            <p className="text-sm text-green-600">A: BFS explores all pages at one depth before going deeper (uses queue). DFS follows one path to the end before backtracking (uses stack).</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: What is robots.txt?</p>
                            <p className="text-sm text-green-600">A: A file that tells web crawlers which pages they're allowed to access and which to avoid. Ethical crawlers respect these rules.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: Why is "politeness" important in crawling?</p>
                            <p className="text-sm text-green-600">A: To avoid overloading servers with too many requests. Crawlers should add delays (1-2 sec) between requests and respect robots.txt.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-4/multimedia-ir">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Multimedia IR
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-4/pagerank">
                        Next: PageRank <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
