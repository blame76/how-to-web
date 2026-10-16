const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');

const repositoryRoot = path.resolve(__dirname, '..');
const references = [
  { directory: 'blocks/product-card', path: '/blocks/product-card/', id: 'product-card' },
  { directory: 'elements/navigation/navbar', path: '/elements/navigation/navbar/', id: 'navbar' },
  { directory: 'elements/navigation/mega-menu', path: '/elements/navigation/mega-menu/', id: 'mega-menu' },
  { directory: 'elements/interactive/carousel', path: '/elements/interactive/carousel/', id: 'carousel' },
  { directory: 'elements/interactive/dialog', path: '/elements/interactive/dialog/', id: 'dialog' },
  { directory: 'elements/interactive/combobox', path: '/elements/interactive/combobox/', id: 'combobox' },
  { directory: 'patterns/form-submission', path: '/patterns/form-submission/', id: 'form-submission' },
];

const localMarkdownLinks = markdown => [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
  .map(([, target]) => target.split(/[?#]/, 1)[0])
  .filter(target => target && !/^(?:https?:|mailto:|tel:)/i.test(target));

for (const reference of references) {
  test(`${reference.id} contract and discovery targets stay consistent`, async ({ page, request }) => {
    const featureDirectory = path.join(repositoryRoot, reference.directory);
    const dna = JSON.parse(fs.readFileSync(path.join(featureDirectory, 'build-dna.json'), 'utf8'));

    expect(dna.format).toBe('how-to-web-build-dna');
    expect(dna.id).toBe(reference.id);
    expect(dna.purpose).toBeTruthy();
    expect(dna.reconstruction_priority).toEqual(expect.any(Array));
    expect(dna.adaptation_contract.must_preserve).toEqual(expect.any(Array));
    expect(dna.adaptation_contract.may_change).toEqual(expect.any(Array));
    expect(dna.agent_contract).toBeTruthy();
    expect(dna.acceptance.length).toBeGreaterThan(0);
    expect(dna.examples.length).toBeGreaterThan(0);

    for (const [key, target] of Object.entries(dna.public)) {
      if (key === 'source_repository') continue;
      expect(fs.existsSync(path.resolve(featureDirectory, target)), `${reference.id} public.${key}`).toBe(true);
    }

    for (const example of dna.examples) {
      for (const [key, target] of Object.entries(example)) {
        if (key === 'id' || key === 'note') continue;
        expect(fs.existsSync(path.resolve(featureDirectory, target)), `${reference.id} ${example.id}.${key}`).toBe(true);
      }
    }

    for (const filename of ['index.md', 'llms.txt']) {
      const markdown = fs.readFileSync(path.join(featureDirectory, filename), 'utf8');
      for (const target of localMarkdownLinks(markdown)) {
        expect(
          fs.existsSync(path.resolve(featureDirectory, target)),
          `${reference.id}/${filename} -> ${target}`
        ).toBe(true);
      }
    }

    await page.goto(reference.path);

    const discoveryLinks = [
      ['link[rel~="alternate"][type="text/markdown"]', dna.public.markdown],
      ['link[rel~="describedby"]', dna.public.llms],
      ['link[rel~="alternate"][type="application/json"]', dna.public.build_dna],
    ];

    for (const [selector, target] of discoveryLinks) {
      const link = page.locator(selector);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', target);

      const response = await request.get(new URL(target, page.url()).toString());
      expect(response.ok(), `${reference.id} discovery target ${target}`).toBe(true);
    }
  });
}
