import Fuse from 'fuse.js';
import itemTypes from './itemTypes';
import affixOptions from './affixOptions';

const parseOCR = (text) => {
  const attributes = {
    world: '',
    rarity: '',
    type: '',
    itemPower: 0,
    stat: 0,
    inherentAffix: '',
    affixes: [],
    ability: '',
  };

  const worlds = ['Basic', 'Sacred', 'Ancestral'];
  const rarities = ['Normal', 'Magic', 'Rare', 'Legendary', 'Unique'];
  const itemTypeKeys = Object.keys(itemTypes);
  const allAffixes = Object.values(affixOptions).flatMap(item => item.map(affix => affix.affix));

  const fuzzyMatch = (input, options, threshold = 0.2) => {
    const cleanInput = input.replace(/[^\w\s\+\-\%]/g, '').replace(/\(.*?\)|\[.*?\]/g, '').trim();
    const fuse = new Fuse(options, { includeScore: true, threshold });
    const result = fuse.search(cleanInput);
    const match = result.length > 0 && result[0].score < threshold ? result[0].item : null;
    if (match) {
      console.log(`Successful Match - Input: "${input}", Clean Input: "${cleanInput}", Match: "${match}", Score: ${result[0].score}`);
    } else {
      console.log(`No Match - Input: "${input}", Clean Input: "${cleanInput}", Tested Against: ${options}`);
    }
    return match;
  };

  const cleanLine = line => line.replace(/[^\w\s\+\-\%]/g, '').replace(/\(.*?\)|\[.*?\]/g, '').trim();
  const lines = text.split('\n')
    .map(cleanLine)
    .filter(line => line.split(' ').length > 1);

  console.log('Cleaned OCR Text:', lines.join('\n'));

  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];

    // Combine World, Rarity, and Type
    if (!attributes.world && !attributes.rarity && !attributes.type) {
      const worldMatch = fuzzyMatch(line, worlds);
      const rarityMatch = fuzzyMatch(line, rarities);
      const typeMatch = fuzzyMatch(line, itemTypeKeys);
      if (worldMatch || rarityMatch || typeMatch) {
        attributes.world = worldMatch || '';
        attributes.rarity = rarityMatch || '';
        attributes.type = typeMatch || '';
        lineIndex++;
        continue;
      }
    }

    // Extract item power
    if (line.includes('Power')) {
      const powerMatch = line.match(/\d+/);
      if (powerMatch) {
        attributes.itemPower = parseInt(powerMatch[0], 10);
        console.log(`Successful Match - Input: "${line}", Match: "Item Power: ${attributes.itemPower}"`);
        lineIndex++;
        continue;
      }
    }

    // Extract inherent affix based on item type
    if (!attributes.inherentAffix && itemTypes[attributes.type]?.inherentAffixes.length) {
      const match = fuzzyMatch(line, itemTypes[attributes.type].inherentAffixes, 0.3);
      if (match) {
        attributes.inherentAffix = match;
        lineIndex++;
        continue;
      }
    }

    // Extract affixes after inherent affix or stat
    if (attributes.affixes.length < 3 || (itemTypes[attributes.type]?.inherentAffixes.length && attributes.affixes.length < 4)) {
      const match = fuzzyMatch(line, allAffixes, 0.3);
      if (match && !attributes.affixes.includes(match)) {
        const affixValue = line.match(/[\d,]+/); // Extract the numerical value
        attributes.affixes.push(`${affixValue ? affixValue[0] : ''} ${match}`);
        lineIndex++;
        continue;
      }
    }

    lineIndex++;
  }

  // Log parsed attributes
  console.log('Parsed Attributes:');
  if (attributes.world) console.log(`World: ${attributes.world}`);
  console.log(`Rarity: ${attributes.rarity}`);
  console.log(`Type: ${attributes.type}`);
  console.log(`Item Power: ${attributes.itemPower}`);
  if (attributes.stat) console.log(`Stat: ${attributes.stat}`);
  if (attributes.inherentAffix) console.log(`Inherent Affix: ${attributes.inherentAffix}`);
  attributes.affixes.forEach((affix, index) => {
    console.log(`Affix ${index + 1}: ${affix}`);
  });
  if (attributes.ability) console.log(`Ability: ${attributes.ability}`);

  return attributes;
};

export default parseOCR;
