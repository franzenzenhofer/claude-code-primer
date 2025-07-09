# Research Notes: Transformer Architecture - The Foundation

## The Pre-Transformer Era
Before 2017, language models relied primarily on:
- **RNNs (Recurrent Neural Networks)**: Sequential processing, suffered from vanishing gradients
- **LSTMs (Long Short-Term Memory)**: Better at long sequences but still sequential
- **Seq2Seq models**: Encoder-decoder architecture but limited context

## The Transformer Revolution (2017)
Paper: "Attention Is All You Need" - Vaswani et al.

### Key Innovation: Self-Attention
- **Parallel Processing**: Unlike RNNs, transformers process all positions simultaneously
- **Direct Connections**: Any position can attend to any other position directly
- **Scalability**: Computation scales with sequence length squared, not exponentially

### Core Components:

1. **Multi-Head Attention**
   - Multiple attention mechanisms running in parallel
   - Each head learns different relationships
   - Typical: 8-16 heads in modern models

2. **Position Encodings**
   - Since parallel processing loses sequence order
   - Sinusoidal functions inject positional information
   - Learned vs fixed encodings debate

3. **Feed-Forward Networks**
   - Two linear transformations with ReLU activation
   - Applied to each position separately
   - Typically 4x hidden dimension of model

4. **Layer Normalization**
   - Stabilizes training
   - Applied before (pre-norm) or after (post-norm) sublayers
   - Critical for deep models

5. **Residual Connections**
   - Skip connections around each sublayer
   - Prevents vanishing gradients
   - Enables very deep networks (GPT-3: 96 layers)

### The Attention Mechanism
```
Attention(Q, K, V) = softmax(QK^T / √d_k)V
```
- **Q (Query)**: What information am I looking for?
- **K (Key)**: What information do I contain?
- **V (Value)**: What actual information to pass forward?
- **√d_k scaling**: Prevents saturation of softmax

### Why Transformers Work:
1. **Inductive Bias**: Less built-in assumptions about sequence structure
2. **Long-Range Dependencies**: Direct paths between distant tokens
3. **Parallelization**: Training on massive datasets becomes feasible
4. **Transfer Learning**: Pre-training on general text, fine-tuning for tasks