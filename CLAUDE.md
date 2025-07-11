# CLAUDE.md - Claude Code Primer Project Instructions

## 🎯 Project Mission
Create and maintain a Pulitzer Prize-quality book about Claude Code and AI-assisted development.

## 📚 Book Standards

### Editorial Excellence
- **Zero Tolerance for Errors**: Every fact must be verified, every citation must be real
- **Pulitzer Prize Quality**: Literary excellence, compelling narrative, accessible to general audience
- **Technical Accuracy**: All code examples must work, all technical claims must be true
- **Academic Rigor**: 200+ citations minimum, all from authoritative sources

### Chapter Requirements
Each chapter must achieve:
1. **Fact Verification**: All claims verified with credible sources
2. **Citation Perfection**: Every citation accessible and properly formatted
3. **Narrative Excellence**: Compelling storytelling that engages readers
4. **Technical Clarity**: Complex concepts explained accessibly
5. **Code Accuracy**: All examples tested and working

### Quality Gates
Before any chapter is published:
- [ ] All citations verified (200+ total)
- [ ] Zero fictional content
- [ ] All URLs return 200 status
- [ ] Playwright tests pass
- [ ] Mobile responsive verified
- [ ] Load time < 3 seconds
- [ ] Accessibility WCAG 2.1 AA compliant

## 🔧 Development Workflow

### Git Commit Standards
For content changes, use this commit sequence:
1. `research:` - Fact gathering and source verification
2. `outline:` - Structural planning and narrative arc
3. `draft:` - Initial content creation
4. `style:` - Literary enhancement and prose refinement
5. `accuracy:` - Technical verification and fact-checking
6. `edit:` - Grammar, flow, and clarity improvements
7. `format:` - Final formatting and presentation

### Atomic Commits
- One logical change per commit
- Clear, descriptive messages
- Reference issue numbers
- No mixing of content and code

### PR Requirements
Every PR must:
1. Pass all automated tests
2. Include screenshot evidence
3. Have zero broken links
4. Meet performance targets
5. Include citation verification

## 🚀 Deployment

### Cloudflare Pages
- **Project**: claude-code-primer
- **Domain**: https://claude-code-primer.franzai.com
- **Staging**: Test thoroughly before production

### Deployment Commands
```bash
# Local testing
npm test
npm run test:e2e

# Deploy to production
wrangler pages deploy . --project-name=claude-code-primer
```

## 📋 Current Priorities

### Immediate Tasks
1. Complete fact-checking for all chapters
2. Merge verified content to master
3. Deploy corrected book to production
4. Monitor reader feedback

### Quality Metrics
- Citation accuracy: 100%
- Fact verification: 100%
- Mobile responsiveness: 100%
- Load time: < 3 seconds
- Accessibility: WCAG 2.1 AA

## 🤖 Claude Integration

### GitHub Workflow
- Respond to all @claude mentions
- Create atomic commits for changes
- Follow editorial standards strictly
- Create PRs for review
- Deploy after approval

### Review Process
1. Automated tests must pass
2. Manual review for quality
3. Fact-checking verification
4. Merge when 100% complete
5. Auto-deploy to Cloudflare

## 📊 Success Criteria

### Publication Ready When:
- All 12 chapters fact-checked
- 200+ citations verified
- Zero fictional content
- All tests passing
- Performance optimized
- Accessibility compliant

### Pulitzer Prize Standards:
- Exceptional writing quality
- Groundbreaking subject matter
- Meticulous research
- Compelling narrative
- Lasting impact

**Remember**: This book will be the definitive guide to AI-assisted development. Every word matters, every fact counts, every reader deserves excellence.