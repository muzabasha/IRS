import {
    Search,
    Database,
    Link as LinkIcon,
    Image as ImageIcon,
    Code2,
    Layout,
    Fingerprint,
    Zap,
    BarChart3,
    FileCode,
    Network,
    Filter,
    Boxes,
    Terminal,
    Settings,
    Type,
    Cpu,
    Target,
    LucideIcon
} from "lucide-react"

export interface ProjectRubric {
    criteria: string;
    points: number;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    difficulty: "Beginner" | "Medium" | "Hard" | "Expert";
    unit: number;
    tags: string[];
    icon: LucideIcon;
    color: string;
    bg: string;
    instructions: string[];
    technicalDetails: string;
    experimentalSetup: string;
    demonstration: string;
    rubric: ProjectRubric[];
}

export const projects: Project[] = [
    {
        id: "p1",
        title: "Inverted Index Construction",
        description: "Build the foundational data structure for all modern search engines from scratch.",
        difficulty: "Beginner",
        unit: 1,
        tags: ["Core", "Python"],
        icon: Database,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        instructions: [
            "Download the 'Sample Text' dataset (50 documents).",
            "Implement a tokenizer that removes punctuation and normalizes case.",
            "Create a dictionary mapping each word to a list of Document IDs.",
            "Export the resulting index to a JSON file."
        ],
        technicalDetails: "Focus on hash map efficiency. Use standard libraries for string manipulation before moving to NLTK. Complexity should be O(N) where N is total terms.",
        experimentalSetup: "Python 3.10+, Standard i/o. Dataset: 50 .txt files (10KB each).",
        demonstration: "Run `python indexer.py ./data` and show the generated `index.json`. Keyword 'computer' should point to [Doc 1, Doc 4, Doc 15].",
        rubric: [
            { criteria: "Correct Tokenization", points: 20 },
            { criteria: "Handling of Duplicate Terms in Doc", points: 20 },
            { criteria: "Storage efficiency of JSON", points: 10 },
            { criteria: "Code Cleanliness", points: 10 }
        ]
    },
    {
        id: "p2",
        title: "Boolean Query Engine",
        description: "Develop a logic processor for AND, OR, and NOT queries using posting list intersections.",
        difficulty: "Medium",
        unit: 1,
        tags: ["Logic", "Algorithm"],
        icon: Terminal,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        instructions: [
            "Load the Inverted Index from Project 1.",
            "Implement a Boolean parser that handles bracket expressions.",
            "Optimize intersection using the 'Skip List' approach.",
            "Support at least 3 levels of nested operations."
        ],
        technicalDetails: "Implement Linear Merge for AND/OR. Remember that NOT requires knowledge of the Universal Set (Total Docs).",
        experimentalSetup: "Python/Java. Focus on bitwise operations for large-scale postings.",
        demonstration: "Query: '(data AND science) NOT physics'. Output should be Doc IDs 5, 12, 18.",
        rubric: [
            { criteria: "AND/OR Intersection Correctness", points: 30 },
            { criteria: "NOT Operator Implementation", points: 20 },
            { criteria: "Parser robustness (syntax errors)", points: 10 }
        ]
    },
    {
        id: "p3",
        title: "TF-IDF Weighting Engine",
        description: "Calculate statistical weights for terms to determine importance relative to a collection.",
        difficulty: "Medium",
        unit: 1,
        tags: ["Math", "VSM"],
        icon: BarChart3,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        instructions: [
            "Calculate Term Frequency (TF) for all words in a document.",
            "Calculate Inverse Document Frequency (IDF) using log(N/df).",
            "Store results in a sparse matrix format.",
            "Implement document length normalization."
        ],
        technicalDetails: "Log base is usually 10. Handle smooth-IDF (1 + log N/df) to avoid division by zero.",
        experimentalSetup: "Use NumPy for matrix operations. 100 documents average length 200 words.",
        demonstration: "Show that stop-words like 'the' have near-zero weight while niche terms like 'cryptography' have high weight.",
        rubric: [
            { criteria: "IDF Calculation accuracy", points: 20 },
            { criteria: "Handling of zero-df terms", points: 10 },
            { criteria: "Scaling/Normalization implementation", points: 20 }
        ]
    },
    {
        id: "p4",
        title: "Cosine Similarity Ranker",
        description: "Rank documents by the angle between query and document vectors in N-dimensional space.",
        difficulty: "Hard",
        unit: 1,
        tags: ["Geometry", "Ranking"],
        icon: Settings,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        instructions: [
            "Convert search queries into TF-IDF vectors.",
            "Compute dot products between query and document vectors.",
            "Sort documents by similarity score (DESC).",
            "Implement a cutoff threshold (e.g., Score > 0.1)."
        ],
        technicalDetails: "Cosine Similarity = (A . B) / (||A|| ||B||). Ensure unit-length normalization happens at index time for speed.",
        experimentalSetup: "Dataset: 500 documents. Query time should be < 100ms.",
        demonstration: "Query 'Deep Learning' should result in a score list: Doc 8 (0.85), Doc 2 (0.43), etc.",
        rubric: [
            { criteria: "Vector Dot Product accuracy", points: 25 },
            { criteria: "Ranking Speed", points: 10 },
            { criteria: "Normalization of Query Vector", points: 15 }
        ]
    },
    {
        id: "p5",
        title: "Fuzzy Logic Retriever",
        description: "Implement a 'soft' IR system that handles degree of membership instead of binary inclusion.",
        difficulty: "Hard",
        unit: 1,
        tags: ["Fuzzy", "Advanced"],
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        instructions: [
            "Define triangular membership functions for term importance.",
            "Implement Fuzzy AND (MIN) and Fuzzy OR (MAX) operators.",
            "Integrate a simple thesaurus to handle correlations.",
            "Rank results by membership degree."
        ],
        technicalDetails: "A term T belongs to Doc D with degree mu(T,D). For fuzzy search, we compute the membership of the entire query logic.",
        experimentalSetup: "Python. Small dataset with manually tagged metadata for membership testing.",
        demonstration: "Query 'Expert in Java' should find people tagged as 'Intermediate' with a membership of 0.6.",
        rubric: [
            { criteria: "Membership function design", points: 20 },
            { criteria: "MIN/MAX operator accuracy", points: 20 },
            { criteria: "Thesaurus integration", points: 10 }
        ]
    },
    {
        id: "p6",
        title: "Probabilistic BM25 Scorer",
        description: "Implement the industry-standard BM25 ranking algorithm used by Lucene and Elasticsearch.",
        difficulty: "Hard",
        unit: 1,
        tags: ["Probabilistic", "Elastic"],
        icon: Cpu,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        instructions: [
            "Implement the BM25 formula with parameters k1=1.2 and b=0.75.",
            "Calculate average document length for the collection.",
            "Implement TF saturation handling.",
            "Compare results against standard TF-IDF (Project 3)."
        ],
        technicalDetails: "BM25 balances TF saturation and length normalization. It is non-linear compared to standard VSM.",
        experimentalSetup: "Dataset: Cranfield collection or similar small academic dataset.",
        demonstration: "Demonstrate that BM25 performs better on long documents than raw TF-IDF.",
        rubric: [
            { criteria: "Formula Implementation Accuracy", points: 30 },
            { criteria: "Parameter Tuning understanding", points: 10 },
            { criteria: "Detailed Comparison Report", points: 10 }
        ]
    },
    {
        id: "p7",
        title: "XML Structural Search Engine",
        description: "Map and search within XML trees using XPath-like structural constraints.",
        difficulty: "Medium",
        unit: 1,
        tags: ["Structured", "XML"],
        icon: FileCode,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        instructions: [
            "Parse hierarchical XML document nodes.",
            "Map terms to specific tag paths (e.g., /book/title).",
            "Implement a containment operator (Find A inside B).",
            "Return matched nodes rather than full documents."
        ],
        technicalDetails: "Use ElementTree or lxml. Focus on the relationship between parent and child nodes in the index.",
        experimentalSetup: "50 XML files with schema (Title, Author, Abstract, Chapter).",
        demonstration: "Query: '/article/title containing 'neural''. Should NOT return articles where 'neural' is only in the body.",
        rubric: [
            { criteria: "Path Parsing correctness", points: 20 },
            { criteria: "Constraint handling logic", points: 20 },
            { criteria: "Node-level retrieval precision", points: 10 }
        ]
    },
    {
        id: "p8",
        title: "Berry-Picking Visualization",
        description: "Track and visualize iterative search paths and evolving information needs.",
        difficulty: "Medium",
        unit: 1,
        tags: ["UX", "Visualization"],
        icon: Network,
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        instructions: [
            "Build a search UI that saves a session history.",
            "Visualize the 'drift' in keywords over a 5-minute search window.",
            "Graph query reformulations manually.",
            "Identify 'Information Berries' (bits of info found along the way)."
        ],
        technicalDetails: "Log every query and every click. Use D3.js or a simple chart to show how keywords change over time.",
        experimentalSetup: "Web interface (React/Lite) with a simulated backend.",
        demonstration: "Show a graph where a user starts with 'cars' and ends with 'Tesla battery lithium mining'.",
        rubric: [
            { criteria: "History tracking implementation", points: 20 },
            { criteria: "Visual Clarity of the graph", points: 20 },
            { criteria: "Data collection accuracy", points: 10 }
        ]
    },
    {
        id: "p9",
        title: "Porter Stemmer Implementation",
        description: "Write a morphological analyzer that reduces words to their grammatical roots.",
        difficulty: "Medium",
        unit: 2,
        tags: ["Linguistics", "NLP"],
        icon: Type,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        instructions: [
            "Implement the 5 stages of the Porter Stemming algorithm.",
            "Handle plural/singular rules.",
            "Handle 'ing', 'ed' suffix stripping.",
            "Test against a gold-standard list of roots."
        ],
        technicalDetails: "Porter's algorithm uses rules like 'SSES -> SS'. Implementing this correctly requires careful regex or state-machine logic.",
        experimentalSetup: "Python. A text file containing 10,000 unique English words.",
        demonstration: "'Computers', 'Computing', 'Computed' should all stem to 'comput'.",
        rubric: [
            { criteria: "Stage 1 rule correctness", points: 15 },
            { criteria: "Handing of irregular plurals", points: 15 },
            { criteria: "Success rate on test set", points: 20 }
        ]
    },
    {
        id: "p10",
        title: "Huffman Index Compressor",
        description: "Shrink the size of your Inverted Index using prefix-free variable length coding.",
        difficulty: "Hard",
        unit: 2,
        tags: ["Compression", "Binary"],
        icon: Boxes,
        color: "text-yellow-600",
        bg: "bg-yellow-600/10",
        instructions: [
            "Count term frequencies in the index dictionary.",
            "Build a Huffman Tree (Priority Queue based).",
            "Generate binary codes for each term.",
            "Write the compressed binary file to disk."
        ],
        technicalDetails: "Most frequent terms get the shortest bits. Compare the size of your binary file vs the original JSON.",
        experimentalSetup: "C++ or Python. Focus on bit-level manipulation (BitArray).",
        demonstration: "Original: 1.2MB JSON. Compressed: 450KB binary. 100% lossless recovery.",
        rubric: [
            { criteria: "Tree construction efficiency", points: 20 },
            { criteria: "Bit-packing logic", points: 20 },
            { criteria: "Compression ratio achieved", points: 10 }
        ]
    },
    {
        id: "p11",
        title: "Rocchio Relevance Feedback",
        description: "Perform query expansion based on documents marked as relevant by the user.",
        difficulty: "Hard",
        unit: 2,
        tags: ["Feedback", "AI"],
        icon: Search,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        instructions: [
            "Perform an initial search and display top 10 results.",
            "Allow user to toggle 'Relevant/Not' for each result.",
            "Recalculate the query vector using the Rocchio formula.",
            "Run a second search and show improvement in precision."
        ],
        technicalDetails: "Qnew = alpha*Qold + beta*(avg Rel) - gamma*(avg nonRel). Default beta=0.75, gamma=0.25.",
        experimentalSetup: "Python. A VSM system must already be implemented (Project 4).",
        demonstration: "A user searching for 'Apples' (fruit) marks tech docs as NOT relevant. The next result set should be 100% fruit.",
        rubric: [
            { criteria: "Vector updating logic", points: 25 },
            { criteria: "Improvement in P@5", points: 15 },
            { criteria: "UI interactivity", points: 10 }
        ]
    },
    {
        id: "p12",
        title: "Local Analysis Expandor",
        description: "Expand queries automatically by analyzing the context of the initial retrieval set.",
        difficulty: "Medium",
        unit: 2,
        tags: ["Automation", "Search"],
        icon: Target,
        color: "text-indigo-600",
        bg: "bg-indigo-600/10",
        instructions: [
            "Assume top 5 results are relevant (Pseudo-Relevance).",
            "Extract 10 most informative terms from these docs.",
            "Add these terms to the user query with weights.",
            "Show the 'Query Drift' if any."
        ],
        technicalDetails: "Use TF-IDF to find 'informative' terms in the top set. Be careful of common words creeping back in.",
        experimentalSetup: "Automated test script. Measure Recall increase.",
        demonstration: "Search 'Jaguar'. System adds 'v8', 'engine', 'luxury' automatically.",
        rubric: [
            { criteria: "Term extraction algorithm", points: 20 },
            { criteria: "Context awareness", points: 20 },
            { criteria: "Documentation on Query Drift", points: 10 }
        ]
    },
    {
        id: "p13",
        title: "Global WordNet Intergrator",
        description: "Use an external lexical database to expand user queries with synonyms and polysemy data.",
        difficulty: "Medium",
        unit: 2,
        tags: ["Thesaurus", "Lexical"],
        icon: LinkIcon,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        instructions: [
            "Import the Python NLTK WordNet corpus.",
            "For each query term, find its 'synsets'.",
            "Weight synonyms at 50% of the original term weight.",
            "Re-run search using expanded query vector."
        ],
        technicalDetails: "Handle 'Sense Disambiguation' if possible (i.e. 'bank' as river vs financial).",
        experimentalSetup: "NLTK library installed. Internet access for WordNet if not local.",
        demonstration: "Query 'happy' also returns documents containing 'joyful' or 'cheerful'.",
        rubric: [
            { criteria: "Synonym extraction logic", points: 20 },
            { criteria: "Weighting strategy", points: 10 },
            { criteria: "Precision/Recall tradeoff analysis", points: 20 }
        ]
    },
    {
        id: "p14",
        title: "Search Result Browser UI",
        description: "Design a high-fidelity Search Engine Results Page (SERP) with interface support features.",
        difficulty: "Beginner",
        unit: 3,
        tags: ["UI", "UX"],
        icon: Layout,
        color: "text-sky-500",
        bg: "bg-sky-500/10",
        instructions: [
            "Create a mock results list.",
            "Implement 'Keyword in Context' highlighting.",
            "Add a sidebar for 'Faceted Search' (Category, Date).",
            "Design a mobile-responsive layout."
        ],
        technicalDetails: "Use React/Tailwind. Focus on accessibility (ARIA labels) and visual scanning patterns (F-shape).",
        experimentalSetup: "Next.js/React. Focused on front-end aesthetics.",
        demonstration: "Provide a working URL or video of the UI highlighting search terms in bold.",
        rubric: [
            { criteria: "Visual Design Quality", points: 20 },
            { criteria: "Accessibility Compliance", points: 10 },
            { criteria: "Snippet readability", points: 20 }
        ]
    },
    {
        id: "p15",
        title: "Result Clustering Visualization",
        description: "Group search results into thematic folders using unsupervised learning (K-Means).",
        difficulty: "Hard",
        unit: 3,
        tags: ["ML", "Dashboard"],
        icon: Boxes,
        color: "text-lime-600",
        bg: "bg-lime-600/10",
        instructions: [
            "Take the top 100 search results.",
            "Represent each result as a TF-IDF vector.",
            "Apply K-Means clustering (K=5).",
            "Automatically label clusters using the most frequent terms."
        ],
        technicalDetails: "Use Scikit-learn for K-Means. Use Elbow Method to find optimal K if possible.",
        experimentalSetup: "Python (Backend) + JSON API (Frontend).",
        demonstration: "Search 'Python'. Results are grouped into 'Programming', 'Snake', 'Monty Python', etc.",
        rubric: [
            { criteria: "Clustering mathematically correct", points: 20 },
            { criteria: "Labeling accuracy", points: 20 },
            { criteria: "UI presentation of groups", points: 10 }
        ]
    },
    {
        id: "p16",
        title: "Content-Based Image Retriever",
        description: "Search for images based on visual content like color distribution and textures.",
        difficulty: "Expert",
        unit: 4,
        tags: ["Computer Vision", "CV"],
        icon: ImageIcon,
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        instructions: [
            "Build an 8-bin color histogram for a set of images.",
            "Implement the Histogram Intersection distance metric.",
            "Implement a 'Search by Image' functionality.",
            "Support JPEG and PNG formats."
        ],
        technicalDetails: "OpenCV is recommended. Normalize histograms to handle different image sizes.",
        experimentalSetup: "Dataset: 200 diverse images (Scenery, Objects, Colors).",
        demonstration: "Upload a blue sky photo. The top results should be other sky and ocean photos.",
        rubric: [
            { criteria: "Histogram generation", points: 20 },
            { criteria: "Distance metric correctness", points: 15 },
            { criteria: "Retrieval speed", points: 15 }
        ]
    },
    {
        id: "p17",
        title: "Tiny Web Crawler",
        description: "Build a recursive robot that explores the web and downloads content for indexing.",
        difficulty: "Medium",
        unit: 4,
        tags: ["Crawl", "Network"],
        icon: Network,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        instructions: [
            "Implement a URL frontier (Queue).",
            "Fetch HTML using basic HTTP requests.",
            "Parse links and add new URLs to frontier.",
            "Respect 'robots.txt' and implement politeness delays."
        ],
        technicalDetails: "Use Python Requests + BeautifulSoup. Politeness should be at least 1 second between hits.",
        experimentalSetup: "Crawl a small sandbox area (e.g. a local wiki or educational sub-domain).",
        demonstration: "Console log showing: Fetching -> Parsing -> Found 12 Links -> Added to Queue.",
        rubric: [
            { criteria: "Link extraction regex/logic", points: 20 },
            { criteria: "Politeness & Robots.txt handling", points: 20 },
            { criteria: "Frontier management (avoiding loops)", points: 10 }
        ]
    },
    {
        id: "p18",
        title: "PageRank Link Scorer",
        description: "Calculate authority scores based on external link weight and damping factors.",
        difficulty: "Hard",
        unit: 4,
        tags: ["Graph", "Math"],
        icon: LinkIcon,
        color: "text-orange-600",
        bg: "bg-orange-600/10",
        instructions: [
            "Create a transition matrix for a 10-node graph.",
            "Implement the Power Iteration method.",
            "Apply a Damping Factor of 0.85.",
            "Iterate until scores converge (delta < 0.001)."
        ],
        technicalDetails: "Handle 'Spider Traps' and 'Dead Ends' by redistributing weights to the whole graph.",
        experimentalSetup: "Math-heavy. Python or MATLAB/Octave.",
        demonstration: "A node with many high-quality incoming links should end up with the highest score.",
        rubric: [
            { criteria: "Matrix construction", points: 20 },
            { criteria: "Convergence logic", points: 20 },
            { criteria: "Handling of dead-ends", points: 10 }
        ]
    },
    {
        id: "p19",
        title: "HITS Algorithm Scorer",
        description: "Identify top 'Hubs' and 'Authorities' in a query-specific sub-graph.",
        difficulty: "Hard",
        unit: 4,
        tags: ["Web", "Algorithm"],
        icon: Zap,
        color: "text-amber-600",
        bg: "bg-amber-600/10",
        instructions: [
            "Fetch a 'Root Set' for a query.",
            "Expand to a 'Base Set' (nodes pointing to or from root).",
            "Calculate Hub scores and Authority scores iteratively.",
            "Normalize scores at each step."
        ],
        technicalDetails: "Auth = sum of Hubs pointing to it. Hub = sum of Auths it points to. Non-linear convergence.",
        experimentalSetup: "Dataset: A mocked web subgraph with 50 nodes and 200 links.",
        demonstration: "Show that a curated directory is a high Hub, while Wikipedia is a high Authority.",
        rubric: [
            { criteria: "Subgraph expansion logic", points: 20 },
            { criteria: "Iterative calculation correctness", points: 20 },
            { criteria: "Normalization implementation", points: 10 }
        ]
    },
    {
        id: "p20",
        title: "Multimedia Audio Fingerprinter",
        description: "Build a simplified Shazam-style matcher using audio peak frequencies.",
        difficulty: "Expert",
        unit: 4,
        tags: ["Audio", "Signal"],
        icon: Fingerprint,
        color: "text-rose-600",
        bg: "bg-rose-600/10",
        instructions: [
            "Perform a Fast Fourier Transform (FFT) on 5-second audio clips.",
            "Identify peak frequencies in specific time bins.",
            "Create a 'Constellation Map' of these peaks.",
            "Search for time-offset matches in a database."
        ],
        technicalDetails: "Use Librosa for audio processing. Focus on the 'Combinatorial Hashing' of peaks to handle noise.",
        experimentalSetup: "Python. 10 base songs, 5 noisy samples for testing.",
        demonstration: "Play a noisy version of a song; the system correctly identifies it from the 10 originals.",
        rubric: [
            { criteria: "FFT implementation/usage", points: 15 },
            { criteria: "Hashing efficiency", points: 20 },
            { criteria: "Robustness to noise", points: 15 }
        ]
    }
];
