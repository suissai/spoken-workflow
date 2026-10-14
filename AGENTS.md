<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep bilingual long-page content in a shared Chappie site with separate `/` and `/en` leaf routes for language-specific metadata.
- Keep product copy, demonstration parsing and ROI calculations separate from presentation so business values and translations can be maintained independently.
- Voice and purchase demonstrations run locally and never mutate business data; browser speech APIs require explicit user actions.
- Store consented early-access requests through a validated public server function using an insert-only publishable client; no visitor can read submitted personal data.
- Use semantic CSS tokens for all visual roles and GSAP context cleanup with reduced-motion support for narrative animations.
