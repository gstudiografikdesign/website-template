# Website Template

Ein schlankes, statisches Website-Template (HTML/CSS/JS, keine Build-Tools) mit
responsivem Layout, mobiler Navigation und Scroll-Animationen.

## Struktur

- `index.html` — Seitenstruktur (Header, Hero, Features, Integrationen, App-Sektion, Sicherheit, Referenzen, Blog, Footer)
- `styles.css` — Styling
- `script.js` — Interaktivität (siehe unten)

## Features

- **Mobile Navigation** — Burger-Menü mit `aria-expanded`, schließt sich per Klick auf einen Link oder mit `Escape`
- **Scroll-Reveal-Animationen** — Elemente mit `data-animate` blenden beim Scrollen ein (`data-animate="blur"` / `"scale"`, `data-delay="150"` für Verzögerung)
- **Integrationen-Sektion** — gepinnte Parallax-Ansicht, Logo-Positionen und Schwellenwerte in `script.js` (`INTEGRATION_LOGOS`) anpassbar
- **Newsletter-Formular** — Frontend-Platzhalter, muss vor Live-Betrieb an ein Backend/E-Mail-Provider angebunden werden

## Verwendung

1. `index.html` in einem Browser öffnen oder über einen einfachen lokalen Server ausliefern
2. Stellen, die mit `<!-- EDIT -->` markiert sind, durch eigene Inhalte ersetzen (Markenname, Headlines, Feature-Texte, Testimonials, Blog-Artikel)
3. Farben, Schriftgrößen und Abstände in `styles.css` anpassen

## Browser-Unterstützung

Nutzt native `IntersectionObserver`-API und moderne CSS-Features; getestet in aktuellen Versionen von Chrome, Firefox, Safari und Edge.
