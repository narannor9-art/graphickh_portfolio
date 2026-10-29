import { useEffect, useRef } from "react";
import Scene from "./Scene.jsx";

const work = [
  { title: "Northline", kind: "Brand identity + design system", year: "2026", note: "Logo, type and a React component library for a logistics startup." },
  { title: "Packet", kind: "Dashboard UI", year: "2025", note: "Network monitoring for IT teams, redesigned around alerts people can act on." },
  { title: "Kohl & Co.", kind: "Packaging + web", year: "2025", note: "Label system and a storefront built in React and Shopify." },
  { title: "Fieldnotes", kind: "Editorial poster series", year: "2024", note: "Twelve posters on infrastructure, printed risograph." },
];

const skills = {
  Design: ["Brand identity", "Typography", "Layout and grid", "Motion graphics", "Print production"],
  Engineering: ["React and Vite", "Three.js and WebGL", "TypeScript", "Design systems", "Deployment on Vercel"],
};

export default function App() {
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 0.9;
      scroll.current = Math.min(window.scrollY / max, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Scene scroll={scroll} />
      <header className="nav">
        <a href="#top" className="logo">Your Name</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact" className="pill">Get in touch</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="intro">Graphic designer and front-end engineer, based in Phnom Penh</p>
          <h1>
            Designed with care.
            <em>Built to run.</em>
          </h1>
          <p className="lede">I design brands and interfaces for software teams, then build them in code so nothing gets lost between the mockup and the browser.</p>
          <div className="actions">
            <a className="pill solid" href="#work">See selected work</a>
            <a className="pill ghost" href="#contact">Email me</a>
          </div>
        </section>

        <section id="work" className="block">
          <h2>Selected work</h2>
          <ul className="work">
            {work.map((w) => (
              <li key={w.title}>
                <span className="year">{w.year}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p className="kind">{w.kind}</p>
                </div>
                <p className="note">{w.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="block">
          <h2>What I do</h2>
          <div className="skills">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3>{group}</h3>
                <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="block contact">
          <h2>Have a project in mind?</h2>
          <a className="mail" href="mailto:hello@yourname.com">hello@yourname.com</a>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Your Name</footer>
    </>
  );
}
