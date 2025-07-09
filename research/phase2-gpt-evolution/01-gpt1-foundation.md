# Research Notes: GPT-1 - The Beginning

## Context: The 2018 AI Landscape
- Deep learning dominated by supervised learning
- NLP required task-specific architectures
- Transfer learning limited to computer vision (ImageNet)
- BERT had just introduced bidirectional pre-training

## GPT-1: "Improving Language Understanding by Generative Pre-Training"
**Released**: June 2018 by OpenAI
**Parameters**: 117M
**Architecture**: 12-layer transformer decoder

### Key Innovations:

1. **Unsupervised Pre-training + Supervised Fine-tuning**
   - Pre-train on books (BookCorpus ~7,000 books)
   - Fine-tune on specific tasks with minimal changes
   - Same model architecture for all tasks

2. **Generative Pre-training Objective**
   - Simply predict next word (autoregressive)
   - No complex training objectives
   - Unidirectional (left-to-right) only

3. **Task-Agnostic Architecture**
   - Previous models needed task-specific architectures
   - GPT-1 used same transformer for all tasks
   - Only changed input formatting

### Training Details:
- **Dataset**: BookCorpus (800M words)
- **Tokenization**: BPE with 40,000 merges
- **Context**: 512 tokens
- **Training time**: 30 days on 8 GPUs
- **Optimizer**: Adam with warmup

### Results That Surprised Everyone:
- Beat task-specific models on 9/12 tasks
- Showed language models learn general features
- Zero-shot performance was promising
- Transfer learning worked for NLP!

### Limitations:
- Still required fine-tuning for tasks
- Limited context window (512 tokens)
- Relatively small by today's standards
- Couldn't do true few-shot learning

### Architecture Decisions That Persisted:
- Decoder-only transformer
- Autoregressive generation
- Layer normalization placement
- GELU activation function
- Learned position embeddings

### Why GPT-1 Mattered:
1. **Proved unsupervised pre-training works**: Learn from raw text
2. **Single model, many tasks**: End of task-specific architectures
3. **Scale hypothesis seed**: Larger might be better
4. **Foundation for GPT series**: Core ideas remained

### The Path It Set:
GPT-1 asked: "What if we just predict next words really well?"
This simple idea would scale to GPT-4 and beyond.