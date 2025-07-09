# Research Notes: Training and Scale - The Path to Intelligence

## The Scaling Hypothesis

"Larger models trained on more data with more compute become more capable"
- Emerged from OpenAI's scaling laws paper (Kaplan et al., 2020)
- Validated by GPT-3, PaLM, Claude
- But scale alone isn't everything...

## The Three Pillars of Scale:

### 1. Model Size (Parameters)
- GPT-2: 1.5B parameters
- GPT-3: 175B parameters  
- GPT-4: ~1.7T parameters (estimated)
- Claude 2: Unknown but likely 100B-500B range
- Claude 3 Opus: Larger still

### 2. Data Size
- GPT-3: ~300B tokens
- LLaMA: 1.4T tokens
- Claude: Trained on "internet-scale" data + specialized sources
- Quality matters more than quantity

### 3. Compute (FLOPs)
- Training cost scales with model size × data size
- GPT-3: ~3.14 × 10²³ FLOPs
- Modern models: 10²⁴ - 10²⁵ FLOPs
- Months of training on thousands of GPUs

## The Training Process:

### Stage 1: Pre-training
**Objective**: Predict next token
```
Input: "The cat sat on the"
Target: "mat"
```

**Process**:
1. Initialize with random weights
2. Feed batches of text
3. Calculate loss (cross-entropy)
4. Backpropagate gradients
5. Update weights (AdamW optimizer typical)
6. Repeat billions of times

**Key Techniques**:
- Mixed precision training (FP16/BF16)
- Gradient accumulation
- Distributed data parallel
- Gradient checkpointing

### Stage 2: Supervised Fine-Tuning (SFT)
**Objective**: Follow instructions

**Data**: Human-written examples
```
Human: Explain recursion
Assistant: Recursion is a programming technique where...
```

**Changes**:
- Much smaller dataset (thousands vs billions)
- Higher quality bar
- Often full fine-tuning, sometimes LoRA

### Stage 3: Reinforcement Learning
**Traditional (OpenAI)**: RLHF
- Train reward model on human preferences
- Use PPO to optimize for reward

**Anthropic's Approach**: Constitutional AI
- Use AI feedback instead of just human
- More scalable and consistent

## Emergent Abilities:

As models scale, new capabilities emerge:

### ~1B Parameters
- Basic grammar
- Simple completions

### ~10B Parameters  
- Follow simple instructions
- Basic reasoning
- Some factual knowledge

### ~100B Parameters
- Complex reasoning
- In-context learning
- Code generation
- Multiple languages

### ~1T+ Parameters
- Strong reasoning
- Excellent code understanding  
- Nuanced instruction following
- Theory of mind markers

## The Efficiency Revolution:

### Compute-Optimal Training
- Chinchilla showed: more data > bigger model
- For fixed compute, optimal ratio exists
- Most models were "undertrained"

### Architectural Improvements
- Flash Attention: 2-4x speedup
- RoPE embeddings: better length generalization
- SwiGLU activation: slight quality improvement
- Multi-Query Attention: inference speedup

### Training Techniques
- Curriculum learning: easy → hard examples
- Data mixing: careful ratios of different sources
- Deduplication: avoid memorization
- Quality filtering: remove low-quality text

## Why Claude Trains Differently:

### Constitutional Training
1. Initial training with helpful/harmless objectives
2. Generate self-critiques
3. Revise based on principles
4. Train on improved outputs

### Data Curation
- Heavy filtering for quality
- Avoid toxic/biased content
- Include diverse perspectives
- Technical content emphasis for Claude Code

### Safety Integration
- Not bolted on after training
- Built into the training process
- Reduces capability-safety tradeoffs

## The Path to Claude Code:

### Additional Training
1. **Code-heavy corpus**: GitHub, documentation, tutorials
2. **Tool use examples**: How to use file systems, run commands
3. **Debugging scenarios**: Error → diagnosis → fix
4. **Software engineering practices**: Not just code completion

### Specialized Objectives
- Understand entire codebases
- Generate working code first time
- Explain reasoning clearly
- Use tools appropriately

## Limits of Scale:

### Diminishing Returns
- Each 10x in compute → smaller capability jump
- Need algorithmic improvements too

### Data Quality Ceiling
- Internet has finite high-quality text
- Synthetic data may help

### Inference Costs
- Larger models = expensive to run
- Need efficiency improvements

### Context Length Scaling
- Attention is O(n²)
- Various solutions: sparse, linear, hierarchical