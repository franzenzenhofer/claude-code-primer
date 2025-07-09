# Research Notes: GPT-3 - The Paradigm Shift

## May 2020: Language Models Are Few-Shot Learners

GPT-3 didn't just scale - it fundamentally changed how we think about AI.

## The Staggering Scale:
- **Parameters**: 175B (100x GPT-2)
- **Training tokens**: 300B
- **Dataset size**: 570GB text
- **Training cost**: ~$4.6M
- **Architecture**: 96 layers, 96 heads, 12,288 dim

## Model Family:
- GPT-3 Small: 125M
- GPT-3 Medium: 350M
- GPT-3 Large: 760M
- GPT-3 XL: 1.3B
- GPT-3 2.7B: 2.7B
- GPT-3 6.7B: 6.7B
- GPT-3 13B: 13B
- GPT-3 175B: 175B (davinci)

## The Training Dataset Revolution:

### Common Crawl (60%)
- Filtered version of web crawl
- Heavy quality filtering
- Deduplicated

### WebText2 (22%)
- Extended version of GPT-2 dataset
- Reddit-linked content

### Books1 & Books2 (16%)
- Two book corpora
- Fiction and non-fiction

### Wikipedia (3%)
- High-quality reference text

## The Three Learning Paradigms:

### 1. Zero-Shot
```
"Translate English to French: cheese →"
```

### 2. One-Shot
```
"Translate English to French:
sea otter → loutre de mer
cheese →"
```

### 3. Few-Shot (The Revolution)
```
"Translate English to French:
sea otter → loutre de mer
peppermint → menthe poivrée
plush giraffe → girafe peluche
cheese →"
```

## In-Context Learning: The Game Changer

No gradient updates, just examples in prompt:
- Model adapts behavior from examples
- Task specification through demonstration
- No fine-tuning needed

## Breakthrough Capabilities:

### 1. Arithmetic
- 2-digit addition: 100% accuracy
- 3-digit addition: 80% accuracy
- Simple word problems

### 2. Code Generation
```python
# Function to reverse a string
def reverse_string(s):
    return s[::-1]
```

### 3. Creative Writing
- Poetry with specific constraints
- Stories in author styles
- Script writing

### 4. Reasoning Tasks
- Analogies
- Logical puzzles
- Common sense reasoning

## The API Model:

### Democratization Through Access
- No need for ML expertise
- Pay per token
- Instant deployment

### Parameters That Matter:
- **Temperature**: Randomness (0-1)
- **Top-p**: Nucleus sampling
- **Frequency penalty**: Reduce repetition
- **Presence penalty**: Encourage novelty

## Discovered Phenomena:

### 1. Prompt Sensitivity
Small changes → different outputs
"Let's think step by step" → better reasoning

### 2. Role Playing
"You are an expert physicist..."
Model adopts personas

### 3. Chain-of-Thought
Breaking down complex problems improves accuracy

### 4. Task Instruction Following
Natural language specifications work

## Limitations and Concerns:

### 1. Hallucinations
- Makes up facts confidently
- No distinction between real/fake

### 2. Biases
- Reflects training data biases
- Demographic stereotypes

### 3. Inconsistency
- Different answers to same question
- Logical contradictions

### 4. No Online Learning
- Fixed knowledge cutoff
- Can't update beliefs

## The GPT-3 Impact:

### 1. Research Direction
- Shift from architecture to scale
- Prompting as new paradigm
- Emergence as phenomenon

### 2. Commercial AI
- Hundreds of startups built on API
- AI writing tools explosion
- Code assistants birth

### 3. Societal Discussion
- AI capabilities suddenly visible
- Ethics discussions mainstream
- AGI timelines revised

## Technical Insights:

### Attention Pattern Analysis
- Induction heads for copying
- Subject-verb agreement tracking
- Long-range dependency handling

### Scaling Laws Confirmed
- Performance ∝ log(parameters)
- Smooth, predictable improvement
- No plateau yet visible

## Bridge to GPT-4:

GPT-3 showed AI could:
- Learn from examples
- Perform diverse tasks
- Generate useful outputs

Next: Could we make it reliable, aligned, and more capable?