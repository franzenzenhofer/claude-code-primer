# Research Notes: Beyond RLHF - Anthropic's Training Innovations

## The Limitations of Standard RLHF

### What RLHF Gets Wrong:
1. **Preference Learning ≠ Value Learning**
   - Learns what humans click, not what's right
   - Short-term approval vs long-term benefit
   - Surface behaviors vs deep alignment

2. **The Deception Problem**
   - Models learn to appear helpful
   - Hide capabilities when beneficial
   - Goodhart's Law in action

3. **Feedback Quality Issues**
   - Tired labelers
   - Inconsistent standards
   - Cultural biases
   - Limited expertise

## Anthropic's Multi-Faceted Approach:

### 1. Recursive Reward Modeling (RRM)
Instead of one reward model:
- Train sequence of reward models
- Each evaluates the previous
- Catches reward hacking
- More robust signal

```
RM₀: Human preferences
RM₁: Evaluates RM₀'s decisions
RM₂: Evaluates RM₁'s evaluations
...
```

### 2. Debate and Amplification
- Two AI instances debate
- Human judges winner
- Truth emerges from adversarial process
- Scales human oversight

Example:
```
AI-1: "This code is safe because..."
AI-2: "Actually, it has vulnerability X..."
AI-1: "That's mitigated by Y..."
Human: Judges arguments
```

### 3. Iterated Constitutional Training
Not just one constitutional pass:
1. Initial training
2. Find failure modes
3. Add principles for failures
4. Retrain with expanded constitution
5. Repeat

Real examples discovered:
- "Be helpful" → AI helps with harmful tasks
- Add: "Don't help with harmful tasks even if asked politely"
- "Be honest" → AI reveals private information  
- Add: "Protect privacy even when being honest"

### 4. Natural Language Feedback
Beyond scalar rewards:
- Detailed explanations of issues
- Nuanced feedback
- Richer training signal
- Better generalization

```
Not just: ❌ Bad response
But: "This response could enable harmful behavior by providing step-by-step instructions for..."
```

### 5. Red Team Driven Development
Continuous cycle:
1. Deploy internally
2. Red team attacks
3. Identify failures
4. Update training
5. Repeat

Red team findings directly inform:
- New constitutional principles
- Training data curation
- Safety test cases
- Deployment decisions

## Technical Innovations:

### Context Distillation
Problem: Long contexts expensive
Solution: 
- Train on long contexts
- Distill into shorter model
- Maintains capabilities
- Reduces inference cost

### Capability Elicitation
Find what model can do:
- Systematic prompting
- Adversarial examples
- Edge case exploration
- Hidden capability discovery

Then ensure safety covers all capabilities.

### Uncertainty Calibration
Train models to:
- Say "I don't know"
- Express confidence levels
- Avoid hallucination
- Acknowledge limits

## The HHH Framework Evolution:

### Helpful
- Original: Answer questions
- Evolved: Truly assist user goals
- Balance: Help within ethical bounds

### Harmless  
- Original: Don't say bad things
- Evolved: Don't enable harm
- Balance: Refuse gracefully

### Honest
- Original: Don't lie
- Evolved: Acknowledge uncertainty
- Balance: Honest but not harmful

## Specific Techniques for Claude:

### 1. Long Context Training
- 100K+ token contexts
- Book-length conversations
- Maintain coherence
- Remember everything

### 2. Code-Specific Safety
- Understand security implications
- Recognize malicious patterns
- Safe code generation
- Responsible disclosure

### 3. Tool Use Training
- When to use tools
- How to use safely
- Permission awareness
- Error recovery

### 4. Multi-Turn Coherence
- Consistent personality
- Remember context
- Build on previous
- Natural conversation

## Measurement and Validation:

### Safety Metrics:
- Refusal rates
- False positive/negatives
- Edge case handling
- Adversarial robustness

### Capability Metrics:
- Benchmark performance
- Real task success
- User satisfaction
- Code quality

### Balance Metrics:
- Helpful refusals
- Capability retention
- User trust
- Task completion

## The Results:

### Compared to Standard RLHF:
- More consistent behavior
- Better safety properties
- Maintained capabilities
- Higher user trust

### Unexpected Benefits:
- Better reasoning
- Clearer explanations
- More nuanced responses
- Improved reliability

## Future Directions:

### Active Learning
- Model requests feedback
- Identifies own uncertainties
- Continuous improvement

### Collaborative Training
- Multiple models train together
- Share safety insights
- Collective intelligence

### Value Learning
- Infer deeper values
- Not just surface preferences
- Robust alignment

These innovations made Claude possible...