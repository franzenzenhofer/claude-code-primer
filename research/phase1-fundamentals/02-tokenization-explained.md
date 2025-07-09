# Research Notes: Tokenization - How LLMs See Text

## The Fundamental Problem
Computers operate on numbers, not text. Tokenization bridges this gap.

## Evolution of Tokenization:

### 1. Character-Level
- Each character = one token
- Simple but inefficient
- "Hello" = ['H', 'e', 'l', 'l', 'o'] = 5 tokens
- Problems: Very long sequences, loses word meaning

### 2. Word-Level
- Each word = one token
- "Hello world" = ['Hello', 'world'] = 2 tokens
- Problems: Huge vocabulary, out-of-vocabulary issues

### 3. Subword Tokenization (Current Standard)
Modern LLMs use variants of subword tokenization:

#### Byte-Pair Encoding (BPE)
- Start with characters
- Iteratively merge most frequent pairs
- "unhappy" might become ['un', 'happy']
- Balances vocabulary size with sequence length

#### WordPiece (BERT)
- Similar to BPE but uses likelihood instead of frequency
- Identifies subwords with ## prefix for continuations
- "playing" = ['play', '##ing']

#### SentencePiece (Used by Claude)
- Treats text as raw bytes
- Language-agnostic (works with any Unicode)
- Can handle spaces as regular tokens
- Includes special tokens: <s>, </s>, <pad>, <unk>

## How Tokenization Affects LLMs:

### 1. Context Window
- Models have token limits, not character limits
- GPT-4: 8k-32k tokens
- Claude: 100k-200k tokens
- 1 token ≈ 0.75 words in English

### 2. Performance Implications
- Common words = single tokens (efficient)
- Rare words = multiple tokens (less efficient)
- Code often tokenizes poorly (many special characters)

### 3. Language Bias
- English typically most efficient
- Other languages may use 2-3x more tokens
- Impacts: cost, speed, effective context length

### 4. Special Tokens
- `<|endoftext|>`: Document boundaries
- `<|im_start|>`, `<|im_end|>`: Conversation markers
- Role tokens: system, user, assistant
- These guide model behavior

## Tokenization in Practice:

### For Claude Code:
1. **Code Understanding**: Variable names often split unpredictably
2. **Path Handling**: File paths can consume many tokens
3. **Error Messages**: Stack traces are token-intensive
4. **Comments**: Natural language in code tokenizes differently

### Optimization Strategies:
- Use common variable names when possible
- Avoid extremely long identifiers
- Be aware that refactoring can change token count
- Consider token efficiency in prompt design