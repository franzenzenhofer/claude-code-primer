# Research Notes: GPT-2 - The Scaling Revelation

## The Leap: February 2019

GPT-2 wasn't just bigger - it revealed that scale fundamentally changes capabilities.

## Model Variants:
- GPT-2 Small: 124M parameters
- GPT-2 Medium: 355M parameters
- GPT-2 Large: 774M parameters
- GPT-2 XL: 1.5B parameters (10x GPT-1)

## Key Architectural Changes:
- **Layers**: 48 (vs 12 in GPT-1)
- **Hidden size**: 1600
- **Attention heads**: 25
- **Context**: 1024 tokens (2x GPT-1)
- **Vocabulary**: 50,257 tokens

## The Training Revolution:

### Dataset: WebText
- Created by scraping Reddit links with 3+ karma
- 40GB of text (8M documents)
- Quality filter: humans found it interesting
- Diverse: news, blogs, stories, discussions

### No Fine-Tuning Philosophy
"Language models are unsupervised multitask learners"
- All tasks framed as text generation
- Prompt engineering born here
- "Zero-shot task transfer"

## Emergent Abilities That Shocked Researchers:

### 1. Coherent Long-Form Generation
- Could write entire articles
- Maintained consistency over paragraphs
- Style adaptation from prompts

### 2. Zero-Shot Task Performance
Without any training on specific tasks:
- Translation: "French: [text] English:"
- Summarization: "TL;DR:"
- Question answering: Context + "Q: ... A:"

### 3. Prompt Programming
```
Input: "Recipe for chocolate cake:
1."
Output: Reasonable recipe steps
```

### The Staged Release Controversy:
- OpenAI initially withheld full model
- Concerns about misuse (fake news, spam)
- Released in stages over 9 months
- Sparked AI safety discussions

## Technical Insights:

### Layer-wise Behavior Analysis:
- Early layers: lexical, syntactic
- Middle layers: semantic relationships
- Late layers: task-specific adaptations

### The Scaling Curves:
- Log-linear improvement with size
- Larger models → better zero-shot
- Suggested even larger models would be even better

### Surprising Capabilities:
1. **Arithmetic**: Basic math without training
2. **Translation**: Between languages it barely saw
3. **Code**: Simple programming tasks
4. **Reasoning**: Basic logical inference

## What GPT-2 Taught Us:

### 1. Scale Enables Generalization
- Task-specific training less important
- General intelligence through scale

### 2. Prompting as Programming
- Natural language as interface
- No gradient updates needed
- Birth of "prompt engineering"

### 3. Safety Isn't Separate
- Capabilities and risks scale together
- Need to think about deployment

### 4. Data Quality Matters
- WebText >> random web crawl
- Human curation implicit in Reddit

## Limitations Still Present:
- Factual accuracy issues
- No internet access
- Fixed knowledge cutoff
- Sometimes incoherent
- No true understanding?

## The Bridge to GPT-3:
GPT-2 proved:
- Scale works
- Zero-shot is possible
- Prompting is powerful

Next question: What happens at 100x scale?