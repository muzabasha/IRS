'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function MultimediaIRLab() {
    const [queryImage, setQueryImage] = useState([0.8, 0.2, 0.1])
    const [distances, setDistances] = useState<Array<{ id: number; name: string; features: number[]; desc: string; distance: number }>>([])
    const [activeTab, setActiveTab] = useState<'color' | 'texture' | 'shape' | 'deep'>('color')

    const imageDatabase = [
        { id: 1, name: 'Sunset', features: [0.9, 0.3, 0.1], desc: 'Red/orange dominant' },
        { id: 2, name: 'Ocean', features: [0.1, 0.2, 0.9], desc: 'Blue dominant' },
        { id: 3, name: 'Forest', features: [0.2, 0.8, 0.2], desc: 'Green dominant' },
        { id: 4, name: 'Desert', features: [0.7, 0.5, 0.1], desc: 'Red/yellow mix' },
    ]

    const euclideanDistance = (a: number[], b: number[]): number => {
        return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0))
    }

    const searchSimilar = () => {
        const dists = imageDatabase.map(img => ({
            ...img,
            distance: euclideanDistance(queryImage, img.features)
        }))
        dists.sort((a, b) => a.distance - b.distance)
        setDistances(dists)
    }

    const tabs = [
        { key: 'color' as const, label: 'Color Histogram', emoji: '🎨' },
        { key: 'texture' as const, label: 'Texture Features', emoji: '🧶' },
        { key: 'shape' as const, label: 'Shape Descriptors', emoji: '📐' },
        { key: 'deep' as const, label: 'Deep Features (CNN)', emoji: '🧠' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 1 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Multimedia IR Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Content-Based Image Retrieval with color features
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
                        How do you search for an image when you can&apos;t describe it in words? Multimedia IR extracts mathematical features (colors, textures, shapes) and finds similar content.
                    </p>
                </CardContent>
            </Card>

            {/* Equation Interpretation: Euclidean Distance */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Euclidean Distance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">d(x, y) = √(Σ<sub>i=1</sub><sup>n</sup> (x<sub>i</sub> - y<sub>i</sub>)²)</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">d(x,y)</span>: Distance between feature vectors x and y
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">x<sub>i</sub>, y<sub>i</sub></span>: i-th feature value (e.g., red channel intensity)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">n</span>: Number of features (dimensions)
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Lower d</span>: More similar images
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Euclidean distance measures straight-line distance in feature space. For color histograms with 3 channels (RGB), n=3. For CNN embeddings, n can be 512–2048 dimensions. Alternative metrics include cosine similarity (angle-based) and Earth Mover&apos;s Distance (distribution-based).
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Equation: Histogram Intersection */}
            <Card className="bg-blue-50 dark:bg-blue-950 p-6 rounded border-2 border-blue-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">🔍</span> Equation Interpretation: Histogram Intersection
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-lg font-mono text-center">
                        <div className="text-2xl">HI(H<sub>q</sub>, H<sub>d</sub>) = Σ<sub>i=1</sub><sup>n</sup> min(H<sub>q</sub>[i], H<sub>d</sub>[i])</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">H<sub>q</sub></span>: Query image histogram
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">H<sub>d</sub></span>: Database image histogram
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">min()</span>: Overlap between corresponding bins
                        </div>
                        <div className="bg-blue-200 dark:bg-blue-800 px-4 py-2 rounded-full">
                            <span className="font-mono font-bold">Higher HI</span>: More similar color distribution
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
                        <p className="text-lg">
                            Histogram intersection measures the overlap between two color distributions. It&apos;s robust to occlusion (partial visibility) and scale changes. Normalized HI ranges from 0 (no overlap) to 1 (identical distributions).
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Feature Extraction Tabs */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">📚</span> Feature Extraction Methods
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

                    {activeTab === 'color' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🎨 Color Histogram</p>
                                <p className="text-lg text-muted-foreground mb-4">Distribution of colors in RGB/HSV space. Fast, rotation-invariant, but ignores spatial layout.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Global Histogram</p>
                                        <p className="text-muted-foreground">Entire image → one histogram. Simple but loses spatial info.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Color Correlogram</p>
                                        <p className="text-muted-foreground">Captures spatial correlation between colors at distance d.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'texture' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🧶 Texture Features</p>
                                <p className="text-lg text-muted-foreground mb-4">Captures patterns of roughness, smoothness, and regularity.</p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Gabor Filters</p>
                                        <p className="text-muted-foreground">Multi-scale, multi-orientation frequency analysis. Models human visual cortex.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">LBP</p>
                                        <p className="text-muted-foreground">Local Binary Patterns — compare each pixel to neighbors. Fast and rotation-invariant.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">GLCM</p>
                                        <p className="text-muted-foreground">Gray-Level Co-occurrence Matrix — statistical texture measures (contrast, energy, entropy).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shape' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">📐 Shape Descriptors</p>
                                <p className="text-lg text-muted-foreground mb-4">Edge detection, contours, and keypoint-based features.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">SIFT / SURF</p>
                                        <p className="text-muted-foreground">Scale-Invariant Feature Transform. Detects keypoints robust to scale, rotation, illumination.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Hu Moments</p>
                                        <p className="text-muted-foreground">7 invariant moments capturing shape regardless of position, scale, rotation.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">Fourier Descriptors</p>
                                        <p className="text-muted-foreground">Represent contour as frequency components. Low frequencies = overall shape.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">ORB</p>
                                        <p className="text-muted-foreground">Oriented FAST and Rotated BRIEF. Fast alternative to SIFT, patent-free.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'deep' && (
                        <div className="space-y-4">
                            <div className="bg-secondary/30 p-6 rounded">
                                <p className="font-semibold text-xl mb-3">🧠 Deep Features (CNN Embeddings)</p>
                                <p className="text-lg text-muted-foreground mb-4">State-of-the-art: extract features from pre-trained CNNs. Bridges the semantic gap.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">ResNet / VGG</p>
                                        <p className="text-muted-foreground">Extract 512–2048 dim vectors from penultimate layer. Captures high-level semantics.</p>
                                    </div>
                                    <div className="bg-secondary/20 p-4 rounded">
                                        <p className="font-semibold text-lg">CLIP (OpenAI)</p>
                                        <p className="text-muted-foreground">Joint text-image embeddings. Search images with text queries and vice versa.</p>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border border-yellow-400 mt-4">
                                    <p className="font-semibold text-lg">The Semantic Gap:</p>
                                    <p className="text-muted-foreground">Low-level features (pixels) vs high-level concepts (happy dog). Deep learning narrows this gap by learning hierarchical representations.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Interactive CBIR */}
            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> Interactive Image Search (Color-Based)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-lg text-muted-foreground">Adjust RGB values to create a &quot;query image&quot; and find similar images in the database</p>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Red: {queryImage[0].toFixed(2)}</label>
                            <Slider value={[queryImage[0]]} onValueChange={(v) => setQueryImage([v[0], queryImage[1], queryImage[2]])} min={0} max={1} step={0.05} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Green: {queryImage[1].toFixed(2)}</label>
                            <Slider value={[queryImage[1]]} onValueChange={(v) => setQueryImage([queryImage[0], v[0], queryImage[2]])} min={0} max={1} step={0.05} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Blue: {queryImage[2].toFixed(2)}</label>
                            <Slider value={[queryImage[2]]} onValueChange={(v) => setQueryImage([queryImage[0], queryImage[1], v[0]])} min={0} max={1} step={0.05} />
                        </div>
                    </div>

                    <div className="bg-secondary/30 p-4 rounded">
                        <p className="text-lg font-semibold mb-2">Query Image Color:</p>
                        <div className="h-20 rounded border-2 border-border" style={{ backgroundColor: `rgb(${queryImage[0] * 255}, ${queryImage[1] * 255}, ${queryImage[2] * 255})` }} />
                        <p className="text-muted-foreground mt-2">RGB: [{queryImage.map(v => v.toFixed(2)).join(', ')}]</p>
                    </div>

                    <Button onClick={searchSimilar} className="w-full text-lg" size="lg">
                        <Play className="h-5 w-5 mr-2" /> Search Similar Images
                    </Button>

                    {distances.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-semibold text-xl">Results (sorted by similarity):</p>
                            {distances.map((img) => (
                                <div key={img.id} className="border-2 rounded-lg p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded border-2 border-border flex-shrink-0" style={{ backgroundColor: `rgb(${img.features[0] * 255}, ${img.features[1] * 255}, ${img.features[2] * 255})` }} />
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{img.name}</p>
                                            <p className="text-muted-foreground">{img.desc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold">d = {img.distance.toFixed(3)}</p>
                                            <p className="text-muted-foreground">Sim: {((1 - img.distance) * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                            <li>• No text annotation needed (content-based)</li>
                            <li>• Works across languages (visual features)</li>
                            <li>• Deep features bridge semantic gap</li>
                            <li>• Enables query-by-example (QBE)</li>
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
                            <li>• Semantic gap (pixels ≠ concepts)</li>
                            <li>• High-dimensional features are expensive</li>
                            <li>• Color histograms ignore spatial layout</li>
                            <li>• Requires large training data for deep models</li>
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
                        Multimedia IR powers Google Lens (visual search), Shazam (audio fingerprinting), Pinterest (visual similarity), medical imaging (find similar X-rays/MRIs), e-commerce product search (find similar items by photo), and copyright detection (reverse image search).
                    </p>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-4/web-crawling">
                        Next: Web Crawling <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
