const { GROUPS } = require("./constants");
const categories = {
    food: "Food",
    drink: "Drink",
    headwear: "Headwear",
    souvenir: "Souvenir"
};

const concessions = [
    {
        name: "1-Stop Apprentice Shop",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: null,
        rarity: 3
    },
    {
        name: "Abu Balloon Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.ALADDIN,
        rarity: 4
    },
    {
        name: "Animal Rice Crackers Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Anniversary Hat Stand",
        time: "45m",
        magic: 45,
        category: categories.headwear,
        obtain: "event",
        rarity: null
    },
    {
        name: "Arendelle Festival Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "chest",
        group: GROUPS.FROZEN,
        rarity: 3
    },
    {
        name: "Backpack Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: null,
        rarity: 4
    },
    {
        name: "Bakery",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: null,
        rarity: 2
    },
    {
        name: "Barrel's Lollipop Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        group: GROUPS.NBC,
        rarity: 4
    },
    {
        name: "Baymax Backpack Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.BH6,
        rarity: 4
    },
    {
        name: "Baymax Bao Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.BH6,
        rarity: 3
    },
    {
        name: "Blue Lightsaber Stand",
        time: "24h",
        magic: 121,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 2
    },
    {
        name: "Blue Milk Stand",
        time: "1h",
        magic: 16,
        category: categories.drink,
        obtain: "chest",
        group: GROUPS.STAR_WARS,
        rarity: 5
    },
    {
        name: "Breakfast Congee Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        group: GROUPS.MULAN,
        rarity: 4
    },
    {
        name: "Bubbling Potion Drink Stand",
        time: "4h",
        magic: 44,
        category: categories.drink,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Bunny Ears Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "Burger Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Burnt Pie Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.WIR,
        rarity: 3
    },
    {
        name: "Cackling Concession",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "chest",
        group: GROUPS.NBC,
        rarity: 5
    },
    {
        name: "Candy-Apple Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.SNOW_WHITE,
        rarity: 3
    },
    {
        name: "Captain Hook's Hat Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: null,
        rarity: 5
    },
    {
        name: "Carrot Farm",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: null,
        rarity: 4
    },
    {
        name: "Ceramic Cup Hot Chocolate Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.COCO,
        rarity: 4
    },
    {
        name: "Chocolate Crocodile Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Churro Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: null,
        rarity: 1
    },
    {
        name: "Cobra Backpack Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.ALADDIN,
        rarity: 5
    },
    {
        name: "Coconut Smoothie Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.LK,
        rarity: 4
    },
    {
        name: "Cotton Candy Cart",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "Creperie",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "Croissant Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Croquette Sandwich Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "event",
        group: GROUPS.TLM,
        rarity: 1
    },
    {
        name: "Cup of Tea Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.BATB,
        rarity: 4
    },
    {
        name: "Cupcake Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "DMK 1st-Anniversary Hat Stand",
        time: "2h",
        magic: 66,
        category: categories.headwear,
        obtain: "gift",
        rarity: 3
    },
    {
        name: "DMK 2nd-Anniversary Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "gift",
        rarity: 3
    },
    {
        name: "DMK 3rd-Anniversary Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "gift",
        rarity: 3
    },
    {
        name: "DMK 4th-Anniversary Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "gift",
        rarity: 3
    },
    {
        name: "Dory Wishable Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.FN,
        rarity: 4
    },
    {
        name: "Dr. Facilier's Top Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.PATF,
        rarity: 3
    },
    {
        name: "Dumbo Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "Dwarf Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.SNOW_WHITE,
        rarity: 2
    },
    {
        name: "Earth Day Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "Eeyore Hat Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: null,
        group: GROUPS.WTP,
        rarity: 4
    },
    {
        name: "Elsa Tiara Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "chest",
        group: GROUPS.FROZEN,
        rarity: 4
    },
    {
        name: "Ernesto Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.COCO,
        rarity: 2
    },
    {
        name: "Face Paint Studio",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.LK,
        rarity: 2
    },
    {
        name: "Froggy Cream Soda Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.PATF,
        rarity: 4
    },
    {
        name: "Frozone's Sno-Cone",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "event",
        group: GROUPS.INCREDS,
        rarity: 2
    },
    {
        name: "Fruitcake Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.FROZEN,
        rarity: 2
    },

    {
        name: "Giant Cherry Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.WIR,
        rarity: 4
    },
    {
        name: "Giant Cookie Shop",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.AIW,
        rarity: 2
    },
    {
        name: "Goofy Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: null,
        rarity: 2
    },
    {
        name: "Grilled Pineapple Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.MOANA,
        rarity: 2
    },
    {
        name: "Grilled Three-Cheese Sandwich Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: null,
        rarity: 4
    },
    {
        name: "Gummy Grubs Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.LK,
        rarity: 3
    },
    {
        name: "Hat & Beard Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: null,
        rarity: 5
    },
    {
        name: "Hook Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.MOANA,
        rarity: 4
    },
    {
        name: "Hot Chocolate Stand",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "Hot Dog Concession",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Ice Cream Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Jack-Jack Cookie Num Nums Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        group: GROUPS.INCREDS,
        rarity: 4
    },
    {
        name: "Jafar's Lamp Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.ALADDIN,
        rarity: 4
    },
    {
        name: "The Lamp Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.ALADDIN,
        rarity: 4
    },
    {
        name: "LeFou's Brew Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.BATB,
        rarity: 4
    },
    {
        name: "Lei of Flowers",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.LS,
        rarity: 5
    },
    {
        name: "Lion King Mask Shop",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.LK,
        rarity: 3
    },
    {
        name: "Lunar Balloon Lantern Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: null,
        rarity: 3
    },
    {
        name: "Lunchbox Tart Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: null,
        rarity: 4
    },
    {
        name: "Maleficent Horns Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "event",
        rarity: 5
    },
    {
        name: "Mickey Ice-Cream Wishable Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "chest",
        rarity: 5
    },
    {
        name: "Mickey Mouse Wishable Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: null,
        rarity: 4
    },
    {
        name: "Mickey Waffles Concession",
        time: "2h",
        magic: 29,
        category: categories.food,
        obtain: null,
        rarity: 5
    },
    {
        name: "Mickey's Gloves Boutique",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: null,
        rarity: 5
    },
    {
        name: "Mickey's Hat Emporium",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Minnie Ears Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: null,
        rarity: 4
    },
    {
        name: "Minnie Mouse Wishable Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: null,
        rarity: 4
    },
    {
        name: "Nemo Wishable Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.FN,
        rarity: 5
    },
    {
        name: "Nightmare Mask Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.NBC,
        rarity: 4
    },
    {
        name: "Oar Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.MOANA,
        rarity: 5
    },
    {
        name: "Oktoberfest Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "Pancake Milkshake Stand",
        time: "1h",
        magic: 16,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.WIR,
        rarity: 5
    },
    {
        name: "Partysaurus Party Supply",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Patisserie",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: null,
        rarity: 3
    },
    {
        name: "Pawpsicle Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        rarity: 2
    },
    {
        name: "Peanut Concession",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: null,
        rarity: 2
    },
    {
        name: "Peppermint Lollipops Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Peter Pan's Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Pizza Concession",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Popcorn Cart",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Pot of Honey Stand",
        time: "2h",
        magic: 29,
        category: categories.food,
        obtain: "event",
        group: GROUPS.WTP,
        rarity: 5
    },
    {
        name: "Pretzel Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Prideland Punch Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Pumpkin Demitasse Stand",
        time: "1h",
        magic: 16,
        category: categories.drink,
        obtain: "event",
        rarity: 5
    },
    {
        name: "Pumpkin Pie Stand",
        time: "2h",
        magic: 29,
        category: categories.food,
        obtain: "chest",
        rarity: 5
    },
    {
        name: "Ramen Concession",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 1
    },
    {
        name: "Red Lightsaber Stand",
        time: "12h",
        magic: 90,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 3
    },
    {
        name: "Reindeer Headband Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Rose Stand",
        time: "24h",
        magic: 121,
        category: categories.souvenir,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "Sand Pail Sundae Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "event",
        group: GROUPS.LS,
        rarity: 4
    },
    {
        name: "Santa Mickey Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Scrump Backpack Kiosk",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.LS,
        rarity: 4
    },
    {
        name: "Shell Hat Stand",
        time: "6h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.MOANA,
        rarity: 2
    },
    {
        name: "Slushies Stand",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: null,
        rarity: 3
    },
    {
        name: "Smoothie Shop",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "chest",
        rarity: 4
    },
    {
        name: "Snow White Bow Stand",
        time: "6h",
        magic: 61,
        category: categories.souvenir,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Soda Concession",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: null,
        rarity: 3
    },
    {
        name: "Sparkler Concession",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.MULAN,
        rarity: 4
    },
    {
        name: "St. Patrick's Day Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "chest",
        rarity: 2
    },
    {
        name: "Starfish Hairband Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "Stars and Stripes Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "premium",
        rarity: 2
    },
    {
        name: "Steamboat Willie Hat Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "premium",
        rarity: 4
    },
    {
        name: "Stitch Headband Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.LS,
        rarity: 2
    },
    {
        name: "Sushi Concession",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: null,
        rarity: 2
    },
    {
        name: "Swamp Gumbo Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.PATF,
        rarity: 3
    },
    {
        name: "Syndrome Wig Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.INCREDS,
        rarity: 4
    },
    {
        name: "The Lost Princess Ice Cream Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: null,
        rarity: 3
    },
    {
        name: "The Queen's Crown Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.SNOW_WHITE,
        rarity: 4
    },
    {
        name: "Tiger Tail Shake Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Toy Trident Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.TLM,
        rarity: 4
    },
    {
        name: "Turkey Legs Concession",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        rarity: 3
    },
    {
        name: "The Tweedles' Cap Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        rarity: 4
    },
    {
        name: "Unbirthday Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "chest",
        group: GROUPS.AIW,
        rarity: 3
    },
    {
        name: "Winnie the Pooh Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.WTP,
        rarity: 3
    },
    {
        name: "Wooden Sword Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "chest",
        rarity: 4
    },
    {
        name: "Tramp Ears Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: null,
        group: GROUPS.LATT,
        rarity: 4
    },
    {
        name: "Lady Ears Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: null,
        group: GROUPS.LATT,
        rarity: 5
    },
    {
        name: "Spaghetti Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: null,
        group: GROUPS.LATT,
        rarity: 1
    },
    {
        name: "Manticore Milkshake Stand",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: "chest",
        group: GROUPS.ONWARD,
        rarity: 3
    },
    {
        name: "Staff of Magic Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "chest",
        group: GROUPS.ONWARD,
        rarity: 4
    },
    {
        name: "Oswald Ears Hat Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.ONWARD,
        rarity: 5
    },
    {
        name: "Colors of the Wind Cone Stand",
        time: "2h",
        magic: 29,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.POCAHONTAS,
        rarity: 5
    },
    {
        name: "Meeko Backpack Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.POCAHONTAS,
        rarity: 5
    },
    {
        name: "Stormtrooper Helmet Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 3
    },
    {
        name: "Herculade Stand",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.HERCULES,
        rarity: 3
    },
    {
        name: "Zeus' Lightning Bolt Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.HERCULES,
        rarity: 4
    },
    {
        name: "Tigger Hat Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.WTP,
        rarity: 3
    },
    {
        name: "Maleficent Waffle Cone Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.SB,
        rarity: 3
    },
    {
        name: "Mickey Celebration Donut Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.MF,
        rarity: 2
    },
    {
        name: "Vanellope Ice Cream Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.WIR,
        rarity: 2
    },
    {
        name: "Bunny Balloon Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.WIR,
        rarity: 4
    },
    {
        name: "Kitty Balloon Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.WIR,
        rarity: 4
    },
    {
        name: "The Haunted Mansion Ears Headband Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.NBC,
        rarity: 5
    },
    {
        name: "The Child Plush Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "chest",
        group: GROUPS.STAR_WARS,
        rarity: 5
    },
    {
        name: "Bear Mug Milkshake Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "chest",
        group: GROUPS.BRAVE,
        rarity: 4
    },
    {
        name: "Iced Pastry Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.BRAVE,
        rarity: 1
    },
    {
        name: "Chef's Hat Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.RATATOUILLE,
        rarity: 5
    },
    {
        name: "Ratatouille Dish Stand",
        time: "2h",
        magic: 29,
        category: categories.food,
        obtain: "event",
        group: GROUPS.RATATOUILLE,
        rarity: 5
    },
    {
        name: "Fish Lantern Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.RAYA,
        rarity: 4
    },
    {
        name: "Kumandra Soup Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.RAYA,
        rarity: 2
    },
    {
        name: "DMK 5th-Anniversary Hat Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: null,
        group: null,
        rarity: 5
    },
    {
        name: "Death Star Balloon Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 4
    },
    {
        name: "Rebel Helmet Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 2
    },
    {
        name: "Turtle Backpack Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.FN,
        rarity: 4
    },
    {
        name: "Anemone Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "gift",
        group: GROUPS.FN,
        rarity: 3
    },
    {
        name: "Cruella De Vil Wig Stand",
        time: "8h",
        magic: 66,
        category: categories.headwear,
        obtain: "gift",
        group: null,
        rarity: 3
    },
    {
        name: "Pasta Stand",
        time: "4h",
        magic: 44,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.LUCA,
        rarity: 4
    },
    {
        name: "Dalmatian Ears Hairband Stand",
        time: "12h",
        magic: 73,
        category: categories.headwear,
        obtain: "chest",
        group: GROUPS.DALMATIANS,
        rarity: 2
    },
    {
        name: "Dalmatian Milkshake Stand",
        time: "2h",
        magic: 25,
        category: categories.drink,
        obtain: "chest",
        group: GROUPS.DALMATIANS,
        rarity: 4
    },
    {
        name: "Dalmatian Macaron Stand",
        time: "6h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.DALMATIANS,
        rarity: 3
    },
    {
        name: "WDW 50th Anniversary Sparkly Cupcake Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "chest",
        group: GROUPS.DISNEY_PARKS,
        rarity: 2
    },
    {
        name: "WDW 50th Anniversary Hat Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.DISNEY_PARKS,
        rarity: 4
    },
    {
        name: "Pinocchio's Hat Stand",
        time: "6h",
        magic: 61,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.PINOCCHIO,
        rarity: 4
    },
    {
        name: "Jiminy Cricket's Hat Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.PINOCCHIO,
        rarity: 2
    },
    {
        name: "Blackberry Pie Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "event",
        group: GROUPS.ROBIN_HOOD,
        rarity: 1
    },
    {
        name: "Robin Hood's Hat Stand",
        time: "6h",
        magic: 612,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.ROBIN_HOOD,
        rarity: 4
    },
    {
        name: "DMK 6th-Anniversary Hat Stand",
        time: "4h",
        magic: 51,
        category: categories.headwear,
        obtain: "event",
        group: null,
        rarity: 5
    },
    {
        name: "Ration Box Stand",
        time: "12h",
        magic: 60,
        category: categories.food,
        obtain: "event",
        group: GROUPS.STAR_WARS,
        rarity: 1
    },
    {
        name: "Blossom Ears Hairband Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.MF,
        rarity: 2
    },
    {
        name: "Mickey Candy Apple Stand",
        time: "8h",
        magic: 53,
        category: categories.food,
        obtain: "event",
        group: GROUPS.MF,
        rarity: 2
    },
    {
        name: "Marsh-mallow Gummy Mug Shake Stand",
        time: "4h",
        magic: 38,
        category: categories.drink,
        obtain: "event",
        group: GROUPS.RESCUERS,
        rarity: 3
    },
    {
        name: "Sox Plushie Stand",
        time: "6h",
        magic: 70,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.TS,
        rarity: 5
    },
    {
        name: "Wilderness Explorers Cap Stand",
        time: "12h",
        magic: 72,
        category: categories.headwear,
        obtain: "event",
        group: GROUPS.UP,
        rarity: 2
    },
    {
        name: "Baby Bird Plushie Stand",
        time: "8h",
        magic: 77,
        category: categories.souvenir,
        obtain: "event",
        group: GROUPS.UP,
        rarity: 4
    }
];
//end

module.exports = concessions.map((concession) => {
    return { ...concession, key: concession.name };
});
