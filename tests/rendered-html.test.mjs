import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete AQUATERRA contact page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /<title>AQUATERRA\.UZ — всё для вашего аквариума<\/title>/i);
  assert.match(html, /Написать — Abduazim/);
  assert.match(html, /Позвонить/);
  assert.doesNotMatch(html, /Instagram/);
  assert.match(html, /Показать на карте/);
  assert.match(html, /Apple Maps/);
  assert.match(html, /Google Maps/);
  assert.match(html, /Яндекс Карты/);
  assert.match(html, /2GIS/);
  assert.match(html, /Часы работы/);
  assert.match(html, /href="tel:\+998971464121"/);
  assert.match(html, /href="tel:\+998"/);
  assert.match(html, /href="https:\/\/t\.me\/AquaTerrauz"/);
  assert.match(html, /href="https:\/\/t\.me\/AQUATERRAUZB"/);
  assert.match(html, /Написать — Abduazim/);
  assert.match(html, /Каждый день/);
  assert.match(html, /09:00 — 21:00/);
  assert.match(html, /href="https:\/\/t\.me\/AquaTerra_uz"/);
  assert.match(html, /Наш Telegram-канал/);
  assert.match(html, /class="bubble bubble-13"/);
  assert.match(html, /property="og:image" content="https?:\/\/[^"/]+\/og\.png"/);
  assert.match(html, /name="twitter:image" content="https?:\/\/[^"/]+\/og\.png"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps editable client details in one config and respects reduced motion", async () => {
  const [config, css, page, layout, packageJson, background, socialCard] = await Promise.all([
    readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/aquaterra-underwater-bg.webp", import.meta.url)),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(config, /phones:/);
  assert.match(config, /telegrams:/);
  assert.match(config, /channel:/);
  assert.doesNotMatch(config, /instagramUrl/);
  assert.match(config, /mapLinks/);
  assert.match(config, /hours:/);
  assert.match(config, /logoSrc/);
  assert.match(config, /PLACEHOLDER/);
  assert.match(page, /from "\.\/site-config"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@keyframes bubble-rise/);
  assert.match(css, /aquaterra-underwater-bg\.webp/);
  assert.match(layout, /lang="ru"/);
  assert.match(layout, /generateMetadata/);
  assert.ok(background.byteLength > 50_000);
  assert.ok(socialCard.byteLength > 100_000);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|lucide-react/);
});
