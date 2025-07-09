# Research Notes: GPT-4 - The Multimodal Reasoner

## March 2023: A New Ceiling

GPT-4 represented not just scale, but architectural innovation and capability leaps.

## The Hidden Architecture:
OpenAI didn't disclose:
- Exact parameter count (rumored ~1.7T)
- Training details
- Architecture specifics
- Dataset composition

What we know:
- Mixture of Experts (MoE) likely
- Trained on diverse data including images
- 6 months of safety work
- Extensive red teaming

## Capability Breakthroughs:

### 1. Advanced Reasoning
- Bar exam: 90th percentile (vs 10th for GPT-3.5)
- SAT: 1410/1600
- Competitive programming: Codeforces 392 rating
- Complex multi-step problems

### 2. Multimodal Understanding
- Image inputs (GPT-4V)
- Chart/diagram analysis
- Visual reasoning
- Meme understanding

### 3. Expanded Context
- 8,192 tokens (standard)
- 32,768 tokens (GPT-4-32k)
- Better long-context performance
- Maintained coherence

### 4. Improved Reliability
- 40% more factual (OpenAI eval)
- 82% less harmful content
- Better calibration
- Fewer hallucinations

## Technical Innovations:

### Mixture of Experts (Rumored)
- 8 expert models
- 2 active per token
- Efficient scaling
- Specialized capabilities

### Training Process:
1. **Pre-training**: Massive scale
2. **Instruction tuning**: Extended SFT
3. **RLHF**: Multiple iterations
4. **Constitutional methods**: Additional safety

### Predictable Scaling
- Used smaller models to predict performance
- Scaling laws held even at extreme scale
- Planned capability development

## System Card Insights:

### Safety Mitigations:
- Reduced harmful content generation
- Better at refusing dangerous requests
- Adversarial testing results
- External red team findings

### Limitations Acknowledged:
- Still hallucinates
- Can be biased
- Limited knowledge cutoff
- Reasoning errors possible

## GPT-4's Code Capabilities:

### Understanding:
- Full repository comprehension
- Cross-file relationships
- Architecture understanding
- Bug pattern recognition

### Generation:
- Complete applications
- Multiple file coordination
- Proper error handling
- Design pattern usage

### Debugging:
- Trace through logic
- Identify subtle bugs
- Suggest fixes
- Explain root causes

## Real-World Performance:

### Professional Exams:
- Uniform Bar Exam: 298/400 (90th percentile)
- LSAT: 163 (88th percentile)
- GRE Quant: 163/170 (80th percentile)
- Medical licensing: Pass

### Academic Benchmarks:
- MMLU: 86.4% (vs 70.0% GPT-3.5)
- HellaSwag: 95.3%
- AI2 Reasoning: 96.3%

## The Plugin System (Preview of Tool Use):

### ChatGPT Plugins:
- Web browsing
- Code interpreter
- Third-party services
- Wolfram Alpha

This foreshadowed:
- Agent capabilities
- Tool use patterns
- External integration

## Impact on AI Landscape:

### 1. Capability Ceiling Raised
- "Sparks of AGI" paper
- New applications possible
- Research directions shifted

### 2. Competition Intensified
- Google's Bard response
- Anthropic's Claude
- Open source efforts

### 3. Safety Mainstream
- Alignment tax reduced
- Safety improves capabilities
- Red teaming standard

## Comparison Points:

### GPT-3.5 vs GPT-4:
- Reasoning: Major improvement
- Reliability: Significantly better
- Context: 2x-8x increase
- Safety: Measurably improved

### What GPT-4 Couldn't Do:
- Real-time information
- Learn from conversations
- Perfect accuracy
- True understanding?

## The Stage for Claude:

GPT-4 proved:
- Scale continues to help
- Safety and capability align
- Multimodal is future
- Tool use incoming

But questions remained:
- Alternative training methods?
- Better safety approaches?
- Specialized applications?
- Open development?

This context explains why Anthropic's approach with Claude and especially Claude Code matters...