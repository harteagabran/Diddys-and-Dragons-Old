var armor5E = [
    {
        "name": "none",
        "ac": "10 + Dex modifier",
        "type": "none"
  },
    {
        "name": "Padded",
        "cost": "5 gp",
        "ac": "11 + Dex modifier",
        "stealth": "disadvantage",
        "weight": "8 lb.",
        "type": "light"
  },
    {
        "name": "Leather",
        "cost": "10 gp",
        "ac": "11 + Dex modifier",
        "weight": "10 lb.",
        "type": "light"
  },
    {
        "name": "Studded leather",
        "cost": "45 gp",
        "ac": "12 + Dex modifier",
        "weight": "13 lb.",
        "type": "light"
  },
    {
        "name": "Hide",
        "cost": "10 gp",
        "ac": "12 + Dex modifier (max 2)",
        "weight": "12 lb.",
        "type": "medium"
  },
    {
        "name": "Chain shirt",
        "cost": "50 gp",
        "ac": "13 + Dex modifier (max 2)",
        "weight": "20 lb.",
        "type": "medium"
  },
    {
        "name": "Scale mail",
        "cost": "50 gp",
        "ac": "14 + Dex modifier (max 2)",
        "stealth": "disadvantage",
        "weight": "45 lb.",
        "type": "medium"
  },
    {
        "name": "Breastplate",
        "cost": "400 gp",
        "ac": "14 + Dex modifier (max 2)",
        "weight": "20 lb.",
        "type": "medium"
  },
    {
        "name": "Half plate",
        "cost": "750 gp",
        "ac": "15 + Dex modifier (max 2)",
        "stealth": "disadvantage",
        "weight": "40 lb.",
        "type": "medium"
  },
    {
        "name": "Ring mail",
        "cost": "30 gp",
        "ac": "14",
        "stealth": "disadvantage",
        "weight": "40 lb.",
        "type": "heavy"
  },
    {
        "name": "Chain mail",
        "cost": "75 gp",
        "ac": "16",
        "strength": "Str 13",
        "stealth": "disadvantage",
        "weight": "55 lb.",
        "type": "heavy"
  },
    {
        "name": "Splint",
        "cost": "200 gp",
        "ac": "17",
        "strength": "Str 15",
        "stealth": "disadvantage",
        "weight": "60 lb.",
        "type": "heavy"
  },
    {
        "name": "Plate",
        "cost": "1500 gp",
        "ac": "18",
        "strength": "Str 15",
        "stealth": "disadvantage",
        "weight": "65 lb.",
        "type": "heavy"
  },
    {
        "name": "Monk",
        "ac": "10 + Dex modifier + Wis modifier",
        "type": "none"
  },
    {
        "name": "Barbarian",
        "ac": "10 + Dex modifier + Con modifier",
        "type": "none"
  },
    {
        "name": "Mage Armor",
        "ac": "13 + Dex modifier",
        "type": "none"
  }
];
var weapons5E = [
    {
        "name": "Club",
        "proper": "Light",
        "cost": "1 sp",
        "dam": "1d4 bludgeoning",
        "type": "Simple Melee",
        "weight": "2 lb."
  },
    {
        "name": "Dagger",
        "proper": "Finesse, Light, Thrown (range 20/60)",
        "cost": "2 gp",
        "dam": "1d4 piercing",
        "type": "Simple Melee",
        "weight": "1 lb."
  },
    {
        "name": "Greatclub",
        "proper": "Two-handed",
        "cost": "2 sp",
        "dam": "1d8 bludgeoning",
        "type": "Simple Melee",
        "weight": "10 lb."
  },
    {
        "name": "Handaxe",
        "proper": "Light, Throw (range 20/60)",
        "cost": "5 gp",
        "dam": "1d6 slashing",
        "type": "Simple Melee",
        "weight": "2 lb."
  },
    {
        "name": "Javelin",
        "proper": "Thrown (range 30/120)",
        "cost": "5 sp",
        "dam": "1d6 piercing",
        "type": "Simple Melee",
        "weight": "2 lb."
  },
    {
        "name": "Hammer (l)",
        "proper": "Light, Thrown (range 20/60)",
        "cost": "2 gp",
        "dam": "1d4 bludgeoning",
        "type": "Simple Melee",
        "weight": "2 lb."
  },
    {
        "name": "Mace",
        "proper": "--",
        "cost": "5 gp",
        "dam": "1d6 bludgeoning",
        "type": "Simple Melee",
        "weight": "4 lb."
  },
    {
        "name": "Quarterstaff",
        "proper": "Versatile (1d8)",
        "cost": "2 sp",
        "dam": "1d6 bludgeoning",
        "type": "Simple Melee",
        "weight": "4 lb."
  },
    {
        "name": "Sickle",
        "proper": "Light",
        "cost": "1 gp",
        "dam": "1d4 slashing",
        "type": "Simple Melee",
        "weight": "2 lb."
  },
    {
        "name": "Spear",
        "proper": "Thrown (range 20/60), Versatile (1d8)",
        "cost": "1 gp",
        "dam": "1d6 piercing",
        "type": "Simple Melee",
        "weight": "3 lb."
  },
    {
        "name": "Crossbow (l)",
        "proper": "Ammunition (range 80/320), loading, two-handed",
        "cost": "25 gp",
        "dam": "1d8 piercing",
        "type": "Simple Ranged",
        "weight": "5 lb."
  },
    {
        "name": "Dart",
        "proper": "Finesse, Thrown (range 20/60)",
        "cost": "5 cp",
        "dam": "1d4 piercing",
        "type": "Simple Ranged",
        "weight": "0.25 lb."
  },
    {
        "name": "Shortbow",
        "proper": "Ammunition (range 80/320), Two-handed",
        "cost": "25 gp",
        "dam": "1d6 piercing",
        "type": "Simple Ranged",
        "weight": "2 lb."
  },
    {
        "name": "Sling",
        "proper": "Ammunition (range 30/120)",
        "cost": "1 sp",
        "dam": "1d4 bludgeoning",
        "type": "Simple Ranged",
        "weight": "0 lb."
  },
    {
        "name": "Battleaxe",
        "proper": "Versatile (1d10)",
        "cost": "10 gp",
        "dam": "1d8 slashing",
        "type": "Martial Melee",
        "weight": "4 lb."
  },
    {
        "name": "Flail",
        "proper": "--",
        "cost": "10 gp",
        "dam": "1d8 bludgeoning",
        "type": "Martial Melee",
        "weight": "2 lb."
  },
    {
        "name": "Glaive",
        "proper": "Heavy, Reach, Two-handed",
        "cost": "20 gp",
        "dam": "1d10 slashing",
        "type": "Martial Melee",
        "weight": "6 lb."
  },
    {
        "name": "Greataxe",
        "proper": "Heavy, Two-handed",
        "cost": "30 gp",
        "dam": "1d12 slashing",
        "type": "Martial Melee",
        "weight": "7 lb."
  },
    {
        "name": "Greatsword",
        "proper": "Heavy, Two-handed",
        "cost": "50 gp",
        "dam": "2d6 slashing",
        "type": "Martial Melee",
        "weight": "6 lb."
  },
    {
        "name": "Halberd",
        "proper": "Heavy, Reach, Two-handed",
        "cost": "20 gp",
        "dam": "1d10 slashing",
        "type": "Martial Melee",
        "weight": "6 lb."
  },
    {
        "name": "Lance",
        "proper": "Reach, Special",
        "cost": "10 gp",
        "dam": "1d12 piercing",
        "type": "Martial Melee",
        "weight": "6 lb."
  },
    {
        "name": "Longsword",
        "proper": "Versatile (1d10)",
        "cost": "15 gp",
        "dam": "1d8 slashing",
        "type": "Martial Melee",
        "weight": "3 lb."
  },
    {
        "name": "Maul",
        "proper": "Heavy, Two-handed",
        "cost": "10 gp",
        "dam": "2d6 bludgeoning",
        "type": "Martial Melee",
        "weight": "10 lb."
  },
    {
        "name": "Morningstar",
        "proper": "--",
        "cost": "15 gp",
        "dam": "1d8 piercing",
        "type": "Martial Melee",
        "weight": "4 lb."
  },
    {
        "name": "Pike",
        "proper": "Heavy, Reach, Two-handed",
        "cost": "5 gp",
        "dam": "1d10 piercing",
        "type": "Martial Melee",
        "weight": "18 lb."
  },
    {
        "name": "Rapier",
        "proper": "Finesse",
        "cost": "25 gp",
        "dam": "1d8 piercing",
        "type": "Martial Melee",
        "weight": "2 lb."
  },
    {
        "name": "Scimitar",
        "proper": "Finesse, Light",
        "cost": "25 gp",
        "dam": "1d6 slashing",
        "type": "Martial Melee",
        "weight": "3 lb."
  },
    {
        "name": "Doublebladed Scimitar",
        "proper": "Special",
        "cost": "250 gp",
        "dam": "2d4 slashing",
        "type": "Martial Melee",
        "weight": "20 lb."
 },
    {
        "name": "Shortsword",
        "proper": "Finesse, Light",
        "cost": "10 gp",
        "dam": "1d6 piercing",
        "type": "Martial Melee",
        "weight": "2 lb."
  },
    {
        "name": "Trident",
        "proper": "Thrown (range 20/60), Versatile (1d8)",
        "cost": "1 sp",
        "dam": "1d4 bludgeoning",
        "type": "Simple",
        "weight": "2 lb."
  },
    {
        "name": "War Pick",
        "proper": "--",
        "cost": "5 gp",
        "dam": "1d8 piercing",
        "type": "Martial Melee",
        "weight": "2 lb."
  },
    {
        "name": "Warhammer",
        "proper": "Versatile (1d10)",
        "cost": "2 gp",
        "dam": "1d4 slashing",
        "type": "Martial Melee",
        "weight": "2 lb."
  },
    {
        "name": "Whip",
        "proper": "Finesse, Reach",
        "cost": "2 gp",
        "dam": "1d4 slashing",
        "type": "Martial Melee",
        "weight": "3 lb."
  },
    {
        "name": "Blowgun",
        "proper": "Ammunition (range 25/100), Loading",
        "cost": "10 gp",
        "dam": "1 piercing",
        "type": "Martial Ranged",
        "weight": "1 lb."
  },
    {
        "name": "Crossbow (h)",
        "proper": "Ammunition (range 30/120), Light, Loading",
        "cost": "75 gp",
        "dam": "1d6 piercing",
        "type": "Martial Ranged",
        "weight": "3 lb."
  },
    {
        "name": "Crossbow (heavy)",
        "proper": "Ammunition (range 100/400), Heavy, Loading, Two-handed",
        "cost": "50 gp",
        "dam": "1d10 piercing",
        "type": "Martial Ranged",
        "weight": "2 lb."
  },
    {
        "name": "Longbow",
        "proper": "Ammunition (range 150/600), Heavy, Two-handed",
        "cost": "50 gp",
        "dam": "1d8 piercing",
        "type": "Martial Ranged",
        "weight": "2 lb."
  },
    {
        "name": "Net",
        "proper": "Special, Thrown (range 5/15)",
        "cost": "1 gp",
        "dam": "--",
        "type": "Martial Ranged",
        "weight": "3 lb."
  },
    {
        "name": "none"
  }
];
