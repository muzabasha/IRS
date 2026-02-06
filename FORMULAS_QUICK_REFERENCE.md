# Mathematical Formulas - Complete Implementation Summary

## Quick Reference Guide

This document provides a complete overview of all mathematical formulas implemented in the Information Retrieval course.

---

## 📊 Implementation Status

### **By Unit:**
- **Unit 1:** 5 topics with formulas (56% coverage)
- **Unit 2:** 1 topic with formula (17% coverage)
- **Unit 3:** 0 topics with formulas (0% coverage) ⚠️
- **Unit 4:** 1 topic with 2 formulas (17% coverage)

### **Total Coverage:**
- ✅ **7 of 28 topics** have mathematical formulas (25%)
- ✅ **8 unique formulas** implemented
- ✅ **60+ terms** with detailed explanations

---

## 🔢 All Implemented Formulas

### **1. TF-IDF Weighting** (u1-t3, Slide 7)
```
w_{t,d} = tf_{t,d} × log(N/df_t)
```
**Where:**
- w_{t,d} = Weight of term t in document d
- tf_{t,d} = Term frequency
- N = Total documents
- df_t = Document frequency
- log(N/df_t) = Inverse Document Frequency

**Use Case:** Term weighting in indexing and ranking

---

### **2. Cosine Similarity** (u1-t3, Slide 5)
```
sim(q⃗, d⃗) = (q⃗ · d⃗) / (||q⃗|| × ||d⃗||)
           = Σ(q_i × d_i) / (√Σq_i² × √Σd_i²)
```
**Where:**
- sim(q⃗, d⃗) = Similarity score (0 to 1)
- q⃗ · d⃗ = Dot product
- ||q⃗|| = Query vector magnitude
- ||d⃗|| = Document vector magnitude

**Use Case:** Vector Space Model document-query matching

---

### **3. Fuzzy Set Operations** (u1-t4, Slide 4)
```
μ_{A∩B}(x) = min(μ_A(x), μ_B(x))  [AND]
μ_{A∪B}(x) = max(μ_A(x), μ_B(x))  [OR]
μ_Ā(x) = 1 - μ_A(x)                [NOT]
```
**Where:**
- μ_A(x) = Membership degree in set A (0 to 1)
- min/max = Fuzzy intersection/union operators

**Use Case:** Soft boolean retrieval with partial matching

---

### **4. SVD for LSI** (u1-t5, Slide 4)
```
A = U Σ V^T ≈ U_k Σ_k V_k^T
```
**Where:**
- A = Term-document matrix
- U = Term-concept matrix
- Σ = Singular values (concept strength)
- V^T = Document-concept matrix
- k = Number of latent dimensions retained

**Use Case:** Latent Semantic Indexing for synonym handling

---

### **5. BM25 Ranking** (u1-t6, Slide 5)
```
BM25(q,d) = Σ_{t∈q} IDF(t) · (tf_{t,d} · (k₁+1)) / (tf_{t,d} + k₁ · (1-b + b·|d|/avgdl))
```
**Where:**
- IDF(t) = Inverse document frequency
- tf_{t,d} = Term frequency
- k₁ = TF saturation (typical: 1.2-2.0)
- b = Length normalization (typical: 0.75)
- |d| = Document length
- avgdl = Average document length

**Use Case:** State-of-the-art probabilistic ranking

---

### **6. Rocchio Algorithm** (u2-t2, Slide 3)
```
q⃗_m = α q⃗_0 + β (1/|D_r|) Σd⃗_r - γ (1/|D_nr|) Σd⃗_nr
```
**Where:**
- q⃗_m = Modified query vector
- q⃗_0 = Original query
- α, β, γ = Weights (typical: 1.0, 0.75, 0.15)
- D_r = Relevant documents
- D_nr = Non-relevant documents

**Use Case:** Relevance feedback query modification

---

### **7. PageRank** (u4-t5, Slide 2)
```
PR(A) = (1-d) + d Σ_{T_i ∈ B_A} PR(T_i)/C(T_i)
```
**Where:**
- PR(A) = PageRank of page A
- d = Damping factor (typical: 0.85)
- B_A = Pages linking to A
- C(T_i) = Outlinks from T_i

**Use Case:** Global web page importance ranking

---

### **8. HITS Algorithm** (u4-t5, Slide 3)
```
a(p) = Σ_{q ∈ B_p} h(q)  [Authority]
h(p) = Σ_{q ∈ F_p} a(q)  [Hub]
```
**Where:**
- a(p) = Authority score
- h(p) = Hub score
- B_p = Backlinks (incoming)
- F_p = Forward links (outgoing)

**Use Case:** Query-dependent link analysis

---

## ⚠️ Critical Missing Formulas

### **High Priority - Should Add Immediately:**

**Precision and Recall** (Essential evaluation metrics)
```
Precision = TP / (TP + FP)
          = |Relevant ∩ Retrieved| / |Retrieved|

Recall = TP / (TP + FN)
       = |Relevant ∩ Retrieved| / |Relevant|
```

**F-Measure** (Harmonic mean)
```
F₁ = 2 · (Precision · Recall) / (Precision + Recall)
```

**Suggested Location:** Unit 3, Topic 4 or create dedicated "Performance Evaluation" topic

---

**Mean Average Precision (MAP)**
```
MAP = (1/|Q|) · Σ_{q∈Q} AP(q)
AP(q) = (1/|Rel_q|) · Σ_{k=1}^N P(k) · rel(k)
```

**Suggested Location:** Unit 3, advanced metrics topic

---

**Normalized Discounted Cumulative Gain (nDCG)**
```
DCG@k = Σ_{i=1}^k (2^{rel_i} - 1) / log₂(i + 1)
nDCG@k = DCG@k / IDCG@k
```

**Suggested Location:** Unit 3, ranking quality metrics

---

## 🎯 Formula Implementation Checklist

### **For Each Formula:**
- [x] LaTeX equation with proper escaping
- [x] Brief description of what it computes
- [x] All terms explained with:
  - Symbol in LaTeX
  - Plain English meaning
  - Typical values or ranges
  - Relationship to other terms
- [x] Visual styling (blue gradient box)
- [x] Dark mode support
- [x] Mobile responsive design

### **Quality Standards:**
- [x] Mathematically accurate
- [x] Notation consistent with textbooks
- [x] Beginner-friendly explanations
- [x] Tested in multiple browsers
- [x] No rendering errors

---

## 📱 How to Use

### **For Students:**
1. Navigate to any topic with a formula
2. Scroll to the "Mathematical Model" section (blue box)
3. Read the main equation (centered, large text)
4. Review term definitions below
5. Copy LaTeX for notes if needed

### **For Instructors:**
1. Use as lecture reference material
2. Export formulas for slides
3. Create problem sets using the notation
4. Assess student understanding of symbols

### **Development:**
See `MATHEMATICAL_FORMULAS_GUIDE.md` for:
- How to add new formulas
- LaTeX syntax examples
- JSON structure templates
- Troubleshooting tips

---

## 🔧 Technical Implementation

### **Component:**
```tsx
File: src/components/topic-viewer.tsx
Lines: ~435-485 (formula rendering block)
```

### **Data Structure:**
```json
{
  "formula": {
    "equation": "LaTeX string (escaped backslashes)",
    "description": "Brief explanation",
    "terms": [
      {
        "symbol": "LaTeX symbol",
        "meaning": "Plain English"
      }
    ]
  }
}
```

### **Dependencies:**
- KaTeX: Fast LaTeX rendering
- CSS: Custom styling with gradients
- TypeScript: Type-safe formula interface

---

## 📖 Learning Progression

### **Basic → Advanced:**

**Level 1: Foundational (Week 1-3)**
- TF-IDF
- Cosine Similarity

**Level 2: Intermediate (Week 4-6)**
- Fuzzy Logic
- Rocchio Algorithm

**Level 3: Advanced (Week 7-10)**
- BM25
- SVD/LSI
- PageRank
- HITS

**Level 4: Evaluation (Week 11-12)**
- Precision/Recall ⚠️ (Need to add)
- MAP ⚠️ (Need to add)
- nDCG ⚠️ (Need to add)

---

## 💡 Educational Benefits

### **Why Mathematical Formulas Matter:**

1. **Precision** - Removes ambiguity from concepts
2. **Reproducibility** - Students can implement algorithms
3. **Depth** - Moves beyond superficial understanding
4. **Industry Readiness** - Real systems use these exact formulas
5. **Research Preparation** - Foundation for reading papers

### **Visual Learning:**
- Seeing notation helps memory retention
- Term-by-term breakdown reduces intimidation
- Interactive (show/hide) encourages exploration

---

## 🚀 Future Enhancements

### **Planned Additions:**

1. **Interactive Calculators** (High Priority)
   - Input values → see formula output
   - Example: TF-IDF calculator with sample text

2. **Step-by-Step Derivations** (Medium Priority)
   - Expandable proofs
   - Example: Derive cosine from dot product

3. **Formula Search** (Low Priority)
   - Index all formulas
   - Quick reference lookup

4. **Copy to Clipboard** (Low Priority)
   - One-click LaTeX copy for notes

5. **Graph Visualizations** (Future)
   - Plot PageRank convergence
   - Visualize precision-recall curves

---

## 📚 References & Resources

### **Textbooks with Matching Notation:**
1. Manning et al. - "Introduction to IR" (Cambridge, 2008)
2. Baeza-Yates & Ribeiro-Neto - "Modern IR" (Addison-Wesley, 2011)

### **Online Resources:**
- KaTeX Documentation: https://katex.org/docs/supported.html
- LaTeX Symbols: https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols

### **Implementation Examples:**
- Elasticsearch: Uses BM25 by default
- Apache Lucene: Implements TF-IDF and BM25
- Google: PageRank (historical foundation)

---

## 📞 Support & Contribution

### **Need Help?**
- Check `MATHEMATICAL_FORMULAS_GUIDE.md` for detailed instructions
- Review `MATHEMATICAL_FORMULAS_AUDIT.md` for complete coverage analysis

### **Found an Error?**
- Mathematical inaccuracy?
- LaTeX rendering issue?
- Missing term explanation?

→ Report via issue tracker or PR

---

## ✨ Summary

**What We Built:**
- 8 publication-quality mathematical formulas
- 60+ explained terms
- Professional LaTeX rendering
- Beginner-friendly educational resource

**What's Next:**
- Add evaluation metrics (Precision/Recall/F/MAP/nDCG)
- Create interactive formula calculators
- Expand to all mathematically-relevant topics

**Impact:**
- Students see real IR mathematics
- Bridges theory and practice
- Prepares for advanced study and industry

---

**Last Updated:** February 7, 2026  
**Version:** 1.0  
**Status:** Production-ready with planned enhancements
