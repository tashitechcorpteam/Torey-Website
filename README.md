# Know Motion Media — Editorial Homepage

Premium single-page experience: editorial · cinematic · media-first · motion-choreographed.

## Open it

```bash
npx serve .
```

Or open `index.html` directly. Needs internet for Google Fonts + GSAP / Lenis CDNs.

## Stack

- HTML / CSS / vanilla JS
- GSAP + ScrollTrigger (primary motion system)
- Lenis (smooth scroll; disabled under `prefers-reduced-motion`)
- Poppins (brand-adjacent to Poppins Rounded — swap self-hosted Rounded when licensed)

## Page flow

1. **Hero** — dense editorial open: KNOW MOTION MEDIA + manifesto + expanding reel + media fragments → UPGRDS handoff
2. **Upgrds** — pinned flagship cinematic sequence + discovery rail
3. **Ecosystem** — typographic brand index (hover previews, not cards)
4. **WldKind** — nature expand + asymmetric wildlife spread
5. **CraveDept** — sensory horizontal food energy
6. **UpgrdYou** — human / lifestyle composition
7. **Impact** — confirmed metrics only (huge 500M+ views + 4 brands)
8. **Connect** — typographic closing composition
9. Footer

## Edit statistics & social

All editable data lives in `js/content.js`.

- Confirmed stats (`confirmed: true` + numeric `value`) render and count up
- Unconfirmed placeholders stay in the file but are **not shown** until approved
- Social links: set `href` only when official URLs are supplied

## Media

- Photography: `assets/images/`
- Video / reels: `assets/video/` (swap in brand footage — muted, loop, poster, playsinline)
- Ken Burns motion used on stills where brand video is not yet available
- Videos pause when offscreen; respect `prefers-reduced-motion`

## Notes

- No invented metrics, clients, or social URLs
- Mobile uses simplified compositions (no heavy pin sequences)
- Upgrds is the flagship — larger scale, more media, more scroll real estate
