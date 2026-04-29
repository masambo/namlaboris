# AI‑Enabled Admin Dashboard

**Goal**: Transform the existing `/dashboard` route into a professional, minimalist admin overview that delivers all AI‑driven features directly within the dashboard for every registered user.

## User Review Required

> [!IMPORTANT]
> This plan introduces new UI components, Supabase Edge‑function placeholders, and modifies the dashboard page. Approve to proceed with implementation.

## Open Questions

> [!WARNING]
> - **Export format** – PDF, CSV, or both?
> - **Alert visual style** – color‑coded severity badges (red/orange/green) as shown?
> - **LLM provider** – continue using Google Gemini (default) or switch?

## Proposed Changes

---
### 1. API Layer (`src/lib/ai.ts`)
- Already added mock client functions.
- When approved, replace mock bodies with real Supabase Edge‑function calls.

---
### 2. UI Components (new files under `src/components/ui/`)
- **`ai-summary-card.tsx`** (already created) – displays case title, AI summary, and toggles recommendations.
- **`recommendation-panel.tsx`** – fetches recommendations via `fetchRecommendations(caseId)` and shows a list of actionable buttons.
- **`compliance-alert-card.tsx`** – shows alerts from `fetchComplianceAlerts()` with severity badges.
- **`live-ai-tips.tsx`** – subscribes to `subscribeLiveTips` and renders a scrolling tip list.
- **`export-button.tsx`** – replaces existing Export button; on click calls `exportReport()` and triggers download.
- All components use the existing `Card` component and design‑token CSS variables for consistent styling.

---
### 3. Dashboard Page (`src/routes/dashboard.tsx`)
- Import the new components and `fetchCaseSummaries`, `fetchComplianceAlerts`.
- Add state hooks:
  ```ts
  const [summaries, setSummaries] = useState<CaseSummary[]>([]);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  ```
- After auth resolves, load summaries for the case IDs used in the existing "Live Caseload" list and load alerts in parallel.
- Render:
  - **Compliance Alerts** card above the Stat cards.
  - **AI Summary Cards** for each case in the live caseload (replaces static text).
  - **Live AI Tips** component at the bottom of the caseload card.
  - Replace the existing Export button with `<ExportButton />`.
- Ensure responsive grid layout matches the minimalist design system.

---
### 4. Styling
- Ensure all new components import `design‑tokens.css` (already global) and use `var(--brand-*)` variables.
- Add a small utility `cn` (class‑names) if not present (already used by existing Card).
- Remove any hard‑coded colors that don’t map to tokens.

---
### 5. Testing & Verification
- Run `npm run lint` & `npm run format`.
- Start dev server (`npm run dev -- --port 3000`).
- Verify dashboard loads, AI cards appear with mock data, Export triggers a download, Live tips update every 10 seconds.
- Check accessibility (ARIA labels on panels, focus order).

---
### 6. Production Hook‑up (post‑approval)
- Implement Supabase Edge Functions (`functions/ai-summary`, `functions/ai-alerts`, etc.) that call Google Gemini with appropriate prompts.
- Update `src/lib/ai.ts` to POST to those endpoints.
- Add error handling and loading spinners.

---
**Implementation will proceed in the order listed above.**
