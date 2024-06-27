const itemTypes = {
    "Helm": { inherentAffixes: [] },
    "Chest": { inherentAffixes: [] },
    "Gloves": { inherentAffixes: [] },
    "Pants": { inherentAffixes: ["While Injured, Your Potion Also Restores X% Resource", "While Injured, Potion Grants X% Max Life as Barrier"] },
    "Boots": { inherentAffixes: ["Attacks Reduce Evade's Cooldown by X Seconds", "+X Max Evade Charge", "Evade Briefly Grants X% Movement Speed"] },
    "Amulet": { inherentAffixes: ["+X% Resistance to All Elements"] },
    "Ring": { inherentAffixes: ["X% Resistance to All Elements", "+X% [Cold|Fire|Lightning|Poison|Shadow] Resistance"] },
    "Dagger": { inherentAffixes: ["+X% Damage to Close Enemies"] },
    "Staff": { inherentAffixes: ["+X% Damage to Crowd Controlled Enemies"] },
    "Wand": { inherentAffixes: ["+X% Lucky Hit Chance"] },
    "Crossbow": { inherentAffixes: ["+X% Vulnerable Damage"] },
    "Bow": { inherentAffixes: ["+X% Damage to Distant Enemies"] },
    "Focus": { inherentAffixes: ["+X% Cooldown Reduction"] },
    "Totem": { inherentAffixes: ["+X% Spirit Cost Reduction"] },
    "Shield": { inherentAffixes: ["+X Thorns"] },
    "Mace": { inherentAffixes: ["+X% Overpower Damage"] },
    "Sword": { inherentAffixes: ["+X% Critical Strike Damage"] },
    "Scythe": { inherentAffixes: ["+X Life on Kill"] },
    "Axe": { inherentAffixes: ["+X% Damage to Healthy Enemies"] },
    "Two-Handed Sword": { inherentAffixes: ["X% Critical Strike Damage"] },
    "Two-Handed Axe": { inherentAffixes: ["+X% Damage to Healthy Enemies"] },
    "Two-Handed Mace": { inherentAffixes: ["+X% Overpower Damage"] },
    "Two-Handed Scythe": { inherentAffixes: ["+X Life on Kill"] }
};

export default itemTypes;
