# Mathematical Formulas Implementation Guide

## Overview
This document provides a comprehensive guide to the mathematical formulas implemented across the Information Retrieval course topics. Formulas are rendered using KaTeX for beautiful, publication-quality mathematical notation.

## Implementation Status

### ✅ Unit 1: Introduction to Information Retrieval

#### Topic 3: Classic IR Models (u1-t3.json)

**1. TF-IDF Weighting Formula** (Slide 7)
```
w_{t,d} = tf_{t,d} × log(N/df_t)
```
**Terms Explained:**
- `w_{t,d}`: Weight of term t in document d - the final importance score
- `tf_{t,d}`: Term Frequency - number of times term t appears in document d
- `N`: Total number of documents in the collection
- `df_t`: Document Frequency - number of documents containing term t
- `log(N/df_t)`: IDF (Inverse Document Frequency) - penalizes common terms, boosts rare discriminative terms

**2. Cosine Similarity Formula** (Slide 5 - VSM)
```
sim(q⃗, d⃗) = (q⃗ · d⃗) / (||q⃗|| × ||d⃗||)
           = Σ(q_i × d_i) / (√Σq_i² × √Σd_i²)
```
**Terms Explained:**
- `sim(q⃗, d⃗)`: Similarity score between query vector q and document vector d (range: 0 to 1)
- `q⃗ · d⃗`: Dot product of query and document vectors - measures overlap in term space
- `||q⃗||`: Magnitude (length) of query vector - normalizes for query length
- `||d⃗||`: Magnitude (length) of document vector - normalizes for document length
- `q_i`: Weight of the i-th term in the query (typically TF-IDF)
- `d_i`: Weight of the i-th term in the document (typically TF-IDF)
- `n`: Total number of unique terms in the vocabulary

#### Topic 4: Set-Theoretic Models (u1-t4.json)

**3. Fuzzy Set Operations** (Slide 4)
```
μ_{A∩B}(x) = min(μ_A(x), μ_B(x))  [Fuzzy AND]
μ_{A∪B}(x) = max(μ_A(x), μ_B(x))  [Fuzzy OR]
μ_Ā(x) = 1 - μ_A(x)                [Fuzzy NOT]
```
**Terms Explained:**
- `μ_A(x)`: Membership degree of element x in fuzzy set A - value between 0 and 1
- `μ_{A∩B}(x)`: Fuzzy AND (Intersection) - minimum of the two membership degrees
- `μ_{A∪B}(x)`: Fuzzy OR (Union) - maximum of the two membership degrees
- `μ_Ā(x)`: Fuzzy NOT (Complement) - inverts the membership degree

#### Topic 6: Probabilistic Models (u1-t6.json)

**4. BM25 Ranking Formula** (Slide 5)
```
BM25(q, d) = Σ_{t∈q} IDF(t) · (tf_{t,d} · (k₁ + 1)) / (tf_{t,d} + k₁ · (1 - b + b · |d|/avgdl))
```
**Terms Explained:**
- `BM25(q, d)`: Relevance score for document d given query q - higher score means more relevant
- `t ∈ q`: Summation over all terms t that appear in query q
- `IDF(t)`: Inverse Document Frequency of term t
- `tf_{t,d}`: Raw term frequency - number of times term t appears in document d
- `k₁`: Term frequency saturation parameter (typical: 1.2-2.0) - controls how quickly TF impact saturates
- `b`: Document length normalization parameter (typical: 0.75) - 0 means no normalization, 1 means full
- `|d|`: Length of document d in words
- `avgdl`: Average document length across the entire collection
- `|d|/avgdl`: Document length ratio - penalizes long documents, boosts short ones

---

## How to Add Formulas to Other Topics

### JSON Structure
Add a `formula` field to any slide in the JSON content files:

```json
{
    "slideNumber": X,
    "type": "standard",
    "title": "Your Topic Title",
    "content": {
        "text": "Descriptive text..."
    },
    "formula": {
        "equation": "LaTeX_equation_here",
        "description": "Brief explanation of what the formula does",
        "terms": [
            {
                "symbol": "LaTeX_symbol",
                "meaning": "Plain English explanation"
            }
        ]
    }
}
```

### LaTeX Formatting Tips

1. **Basic Symbols:**
   - Fractions: `\\frac{numerator}{denominator}`
   - Square root: `\\sqrt{x}`
   - Summation: `\\sum_{i=1}^{n}`
   - Product: `\\prod_{i=1}^{n}`

2. **Greek Letters:**
   - Lower case: `\\alpha`, `\\beta`, `\\gamma`, `\\mu`, `\\sigma`
   - Upper case: `\\Gamma`, `\\Delta`, `\\Sigma`

3. **Subscripts/Superscripts:**
   - Subscript: `x_i` or `x_{ij}`
   - Superscript: `x^2` or `x^{2i}`

4. **Vectors and Matrices:**
   - Vector: `\\vec{x}` or `\\mathbf{x}`
   - Matrix: Use `\\begin{bmatrix}...\\end{bmatrix}`

5. **Operators:**
   - Multiplication: `\\times` or `\\cdot`
   - Division: `/` or `\\div`
   - Greater/Less: `>`, `<`, `\\geq`, `\\leq`

6. **Text in Math:**
   - Use `\\text{your text}` for regular text within formulas

### Important: Escape Backslashes
In JSON, backslashes must be escaped: use `\\` instead of `\`

Example:
```json
"equation": "\\frac{a}{b}"  ← Correct
"equation": "\frac{a}{b}"   ← Wrong
```

---

## Recommended Formulas for Other Units

### Unit 2: Query Operations

**Topic: Boolean Operators**
```
AND: D₁ ∩ D₂ = { d | d ∈ D₁ ∧ d ∈ D₂ }
OR:  D₁ ∪ D₂ = { d | d ∈ D₁ ∨ d ∈ D₂ }
NOT: D̄ = { d | d ∉ D }
```

**Topic: Relevance Feedback (Rocchio Algorithm)**
```
q⃗ₘ = α·q⃗₀ + β·(1/|Dᵣ|)·Σd⃗ᵣ - γ·(1/|Dₙᵣ|)·Σd⃗ₙᵣ
```
Where:
- `q⃗ₘ`: Modified query vector
- `q⃗₀`: Original query vector
- `Dᵣ`: Set of relevant documents
- `Dₙᵣ`: Set of non-relevant documents
- `α, β, γ`: Weight parameters

### Unit 3: Indexing & Performance Evaluation

**Topic: Precision & Recall**
```
Precision = TP / (TP + FP) = |Relevant ∩ Retrieved| / |Retrieved|
Recall = TP / (TP + FN) = |Relevant ∩ Retrieved| / |Relevant|
F-Measure = (2 · Precision · Recall) / (Precision + Recall)
```

**Topic: Mean Average Precision (MAP)**
```
MAP = (1/|Q|) · Σ_{q∈Q} AP(q)
AP(q) = (1/|Rel_q|) · Σ_{k=1}^{N} P(k) · rel(k)
```

**Topic: Discounted Cumulative Gain (DCG)**
```
DCG@k = Σ_{i=1}^{k} (2^{relᵢ} - 1) / log₂(i + 1)
nDCG@k = DCG@k / IDCG@k
```

### Unit 4: Web Search & Link Analysis

**Topic: PageRank**
```
PR(A) = (1-d) + d · Σ (PR(Tᵢ) / C(Tᵢ))
```
Where:
- `PR(A)`: PageRank score of page A
- `d`: Damping factor (typically 0.85)
- `Tᵢ`: Pages that link to A
- `C(Tᵢ)`: Number of outgoing links from Tᵢ

**Topic: HITS Algorithm**
```
a(p) = Σ_{q∈Bₚ} h(q)  [Authority]
h(p) = Σ_{q∈Fₚ} a(q)  [Hub]
```

---

## Rendering Details

### Frontend Implementation
Formulas are rendered using the **KaTeX** library, which provides:
- **Fast rendering** (much faster than MathJax)
- **No JavaScript required** for client-side rendering
- **High quality** publication-ready output
- **Wide browser support**

### Component Location
File: `src/components/topic-viewer.tsx`
- Formulas appear in a highlighted blue gradient box
- Terms are displayed in a grid with symbol + meaning
- All formulas support both light and dark modes

### Visual Design
- **Background**: Blue/indigo gradient with border
- **Equation**: Centered, white/dark background, large font
- **Terms**: Grid layout with inline LaTeX rendering
- **Icons**: Terminal icon to indicate mathematical content

---

## Testing Checklist

When adding new formulas:

1. ✅ **Syntax Check**: Verify LaTeX compiles without errors
2. ✅ **Escape Check**: Ensure all backslashes are doubled (`\\`)
3. ✅ **JSON Validity**: Run through JSON validator
4. ✅ **Visual Test**: View in browser (light & dark modes)
5. ✅ **Responsive**: Check on mobile devices
6. ✅ **Term Alignment**: Ensure all terms in equation are explained

---

## Example: Adding a New Formula

Let's add the Jaccard Similarity formula to a hypothetical topic:

```json
{
    "slideNumber": 5,
    "type": "standard",
    "title": "Jaccard Similarity",
    "content": {
        "text": "Jaccard similarity measures overlap between two sets as the ratio of intersection to union."
    },
    "formula": {
        "equation": "J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{|A \\cap B|}{|A| + |B| - |A \\cap B|}",
        "description": "Jaccard coefficient measures similarity between finite sample sets, commonly used in text similarity and clustering.",
        "terms": [
            {
                "symbol": "J(A, B)",
                "meaning": "Jaccard similarity coefficient - value between 0 (no overlap) and 1 (identical sets)"
            },
            {
                "symbol": "|A \\cap B|",
                "meaning": "Size of intersection - number of elements in both A and B"
            },
            {
                "symbol": "|A \\cup B|",
                "meaning": "Size of union - total number of unique elements in A or B"
            },
            {
                "symbol": "|A|",
                "meaning": "Cardinality of set A - number of elements in A"
            },
            {
                "symbol": "|B|",
                "meaning": "Cardinality of set B - number of elements in B"
            }
        ]
    }
}
```

---

## Troubleshooting

### Common Issues

**Problem**: Formula doesn't render
- **Solution**: Check for unescaped backslashes in JSON

**Problem**: Strange characters appear
- **Solution**: Ensure you're using LaTeX syntax, not Unicode math symbols

**Problem**: Formula overflows container
- **Solution**: Use `\\frac` for fractions, break long equations with `\\\\`

**Problem**: Terms don't align
- **Solution**: Verify `symbol` field uses exact LaTeX from equation

---

## Future Enhancements

Consider adding to the formula rendering system:
1. **Copy to Clipboard**: Button to copy LaTeX source
2. **Step-by-step Derivations**: Expandable proofs
3. **Interactive Calculators**: Input values to see formula in action
4. **Graph Visualizations**: Plot functions alongside equations
5. **Formula Search**: Index all formulas for quick reference

---

## Summary

**Currently Implemented:**
- ✅ TF-IDF Weighting (u1-t3)
- ✅ Cosine Similarity (u1-t3)
- ✅ Fuzzy Set Operations (u1-t4)
- ✅ BM25 Ranking (u1-t6)

**Next Priority Topics:**
- ⏳ PageRank (Unit 4)
- ⏳ Precision/Recall/F-Measure (Unit 3)
- ⏳ Relevance Feedback/Rocchio (Unit 2)
- ⏳ HITS Algorithm (Unit 4)

**Total Formulas Added**: 4
**Topics Enhanced**: 3 out of 28

For questions or issues, refer to the KaTeX documentation: https://katex.org/docs/supported.html
