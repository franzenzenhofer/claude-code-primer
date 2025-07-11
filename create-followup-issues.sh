#!/bin/bash

# Create follow-up issues for incomplete Claude work

# Issue 1: Complete PR Creation for All Chapter Fact-Checks
gh issue create \
  --title "🚨 URGENT: Complete All Chapter PRs - Claude Tasks Incomplete" \
  --body "## Critical Follow-Up: Claude Started But Didn't Create PRs

### Problem
Claude created branches for all issues but didn't create pull requests. We need completed PRs for:

### Incomplete Chapter Work (Issues #1-12)
- [ ] Chapter 1: Origins - Branch exists, no PR
- [ ] Chapter 2: Transformer Revolution - Branch exists, no PR  
- [ ] Chapter 3: Constitutional AI - Branch exists, no PR
- [ ] Chapter 4: Building Claude - Branch exists, no PR
- [ ] Chapter 5: API to Code - Branch exists, no PR
- [ ] Chapter 6: MCP - Branch exists, no PR
- [ ] Chapter 7: Revolution - Branch exists, no PR
- [ ] Chapter 8: CLI - Branch exists, no PR
- [ ] Chapter 9: Security - Branch exists, no PR
- [ ] Chapter 10: GitHub - Branch exists, no PR
- [ ] Chapter 11: Case Studies - Branch exists, no PR
- [ ] Chapter 12: Ethics - Branch exists, no PR

### Technical Issues (Issues #13-24)
- [ ] Issue #13: Citation Verification - No PR
- [ ] Issue #14: Editorial Master Plan - No PR
- [ ] Issue #15: Mobile UX - No PR
- [ ] Issue #16: Performance - No PR
- [ ] Issue #17: SEO - No PR
- [ ] Issue #18: Accessibility - No PR
- [ ] Issue #19: Analytics - No PR
- [ ] Issue #20: CI/CD Pipeline - No PR
- [ ] Issue #21: Multi-format Export - No PR
- [ ] Issue #22: Version Control - No PR
- [ ] Issue #23: Visual Design - No PR
- [ ] Issue #24: Security Hardening - No PR

### Actions Required
1. For each branch, create a proper PR
2. Ensure all fact-checking is complete
3. Verify Pulitzer Prize quality standards
4. Request review on each PR
5. Deploy to production after merging

**Assignee**: @claude
**Priority**: CRITICAL
**Deadline**: 4 hours

@claude Please complete ALL pull requests immediately." \
  --label "urgent,follow-up"

# Issue 2: Manual Fact-Checking Override
gh issue create \
  --title "🔍 MANUAL FACT-CHECK: Verify All Citations and Claims" \
  --body "## Manual Fact-Checking Required

Since Claude's fact-checking is incomplete, we need immediate manual verification:

### Chapter-by-Chapter Verification
- [ ] Chapter 1: 21 citations - Verify each is real and accessible
- [ ] Chapter 2: 42 citations - Check transformer paper links
- [ ] Chapter 3: 22 citations - Verify Constitutional AI papers
- [ ] Chapter 4: 20 citations - Check technical architecture docs
- [ ] Chapter 5: 10 citations - Verify API documentation
- [ ] Chapter 6: 10 citations - Check MCP specifications
- [ ] Chapter 7: 17 citations - Verify impact studies
- [ ] Chapter 8: 15 citations - Check CLI documentation
- [ ] Chapter 9: 13 citations - Verify security papers
- [ ] Chapter 10: 9 citations - Check GitHub docs
- [ ] Chapter 11: 10 citations - Verify case study patterns
- [ ] Chapter 12: 28 citations - Check ethics papers

### Critical Issues to Fix
1. Remove ALL fictional company names
2. Verify ALL performance metrics
3. Check ALL technical claims
4. Ensure ALL code examples work
5. Validate ALL URLs return 200 status

**This blocks publication!**

@claude Start immediately with Chapter 1 and work sequentially." \
  --label "fact-check,critical"

# Issue 3: Emergency Publication Pipeline
gh issue create \
  --title "🚀 EMERGENCY: Setup Immediate Publication Pipeline" \
  --body "## Emergency Publication Process

We need to publish the book NOW with quality checks:

### Immediate Actions
1. [ ] Merge any completed, fact-checked chapters
2. [ ] Run Playwright tests on current content
3. [ ] Deploy to Cloudflare staging
4. [ ] Quick manual review
5. [ ] Deploy to production

### Quality Gates
- [ ] Zero broken links
- [ ] All images loading
- [ ] Mobile responsive
- [ ] Page load < 3 seconds
- [ ] No JavaScript errors

### Deployment Steps
\`\`\`bash
# Test locally
npm test
npm run test:e2e

# Deploy to staging
wrangler pages deploy . --project-name=claude-code-primer-staging

# After verification, deploy to production
wrangler pages deploy . --project-name=claude-code-primer
\`\`\`

@claude Execute this emergency deployment process NOW." \
  --label "deployment,urgent"

echo "Created 3 critical follow-up issues!"