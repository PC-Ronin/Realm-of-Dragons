let level = 1;
let xp = 0;
let health = 100;
let stamina = 100;
let gold = 50;
let maxHealth = 100;
let maxStamina = 100;
let currentWeapon = 0;
let currentShield = 0;
let potions = 0;
let inventory = ["stick"];
let shieldInventory = [];
let keys = [];
let fighting;
let monsterLevel;
let monsterHealth;

let currentLocation = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const startButton = document.querySelector("#startButton");
const text = document.querySelector("#text");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const staminaText = document.querySelector("#staminaText");
const atkText = document.querySelector("#atkText");
const defText = document.querySelector("#defText");
const potionText = document.querySelector("#potionText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterLevelText = document.querySelector("#monsterLevel");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'wooden sword', power: 10},
    { name: 'dagger', power: 25 },
    { name: 'pike', power: 40 },
    { name: 'steel sword', power: 55},
    { name: 'mace', power: 75},
    { name: 'mythril sword', power: 100 }
];
const shields = [
    { name: 'pot lid', toughness: 5},
    { name: 'wooden buckler', toughness: 10},
    { name: 'bronze targe', toughness: 25},
    { name: 'iron buckler', toughness: 40},
    { name: 'steel kite', toughness: 55},
    { name: 'scutum', toughness: 75},
    { name: 'mythril kite shield', toughness: 100}
];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "bat",
        level: 5,
        health: 60
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "squirrel knight",
        level: 12,
        health: 80
    },
    {
        name: "giant crab",
        level: 15,
        health: 200
    },
    {
        name: "shark",
        level: 25,
        health: 250
    },
    {
        name: "kraken",
        level: 35,
        health: 380
    },
    {
        name: "golem",
        level: 35,
        health: 800
    },
    {
        name: "Gaea",
        level: 20,
        health: 300
    },
    {
        name: "Aegaeon",
        level: 30,
        health: 500
    },
    {
        name: "Netheril",
        level: 40,
        health: 600
    },
    {
        name: "Zephyr",
        level: 45,
        health: 675
    },
    {
        name: "Ragnarron",
        level: 50,
        health: 800
    }
];
const locations = [
    { // 0
        name: "town",
        "button text": ["Enter the Shop", "Visit the Inn", "Leave Town"],
        "button functions": [goStore, goInn, goMeadow],
        text: "You are in the town square. You see a sign that says \"Shop\" and another that says \"Inn\"."
    },
    { // 1
        name: "store",
        "button text": ["Buy Weapon (30 Gold)", "Buy Shield (30 Gold)", "Sell Weapon (15 Gold)", "Sell Shield (15 Gold)", "Leave Shop"],
        "button functions": [buyWeapon, buyShield, sellWeapon, sellShield, goTown],
        text: "You enter the shop. The walls are decorated with swords and shield of various designs."
    },
    { // 2
        name: "inn",
        "button text": ["Restore 10 health (10 gold)", "Restore 10 stamina (10 gold)", "Rest (120 gold)", "Buy Potion (30 Gold)", "Leave Inn"],
        "button functions": [buyHealth, buyStamina, rest, buyPotion, goTown],
        text: "You enter the inn. The smell of fresh bread and roasted meat fill the air."
    },
    { // 3
        name: "meadow",
        "button text": ["Go into Town", "Head towards the Mountains", "Go into the Forest", "Head towards the Ocean", "Search the Meadows"],
        "button functions": [goTown, goNorthForest, goForest, goEastForest, searchArea],
        text: "Which way do you want to go?"
    },
    { // 4
        name: "forest",
        "button text": ["Go North", "Go South", "Go East", "Go West", "Search the Forest"],
        "button functions": [goNorthForest, goCliff, goEastForest, goMeadow, searchArea],
        text: "Which way do you want to go?"
    },
    { // 5
        name: "forestNorth",
        "button text": ["Go North", "Go South", "Go East", "Go West", "Search the North Forest"],
        "button functions": [goMountain, goForest, goEastForest, goMeadow, searchArea],
        text: "Which way do you want to go?"
    },
    { // 6
        name: "forestEast",
        "button text": ["Go North", "Go South", "Go East", "Go West", "Search the East Forest"],
        "button functions": [goNorthForest, goCliff, goShore, goForest, searchArea],
        text: "Which way do you want to go?"
    },
    { // 7
        name: "mountain",
        "button text": ["Into the Forest", "Up the Mountain", "Into the Cave", "Search the Mountains"],
        "button functions": [goNorthForest, goPeak, goCave, searchArea],
        text: "Which way do you want to go?"
    },
    { // 8
        name: "cave",
        "button text": ["Search the Cave", "Fight Dragon", "Leave Cave", "Open the Door"],
        "button functions": [fightMonster, fightDragon, goMountain, openPortal],
        text: "You enter the cave. You see some monsters."
    },
    { // 9
        name: "peak",
        "button text": ["Back Down the Mountain", "Fight Dragon"],
        "button functions": [goMountain, fightDragon],
        text: "Which way do you want to go?"
    },
    { // 10
        name: "cliff",
        "button text": ["Go North", "Go South?", "Go East", "Go West", "Search the Cliffs"],
        "button functions": [goForest, goCliff, goEastForest, goMeadow, searchArea],
        text: "Standing at the edge of the cliff, you can see a ship stranded on the shore, and a small island off to the south."
    },
    { // 11
        name: "shore",
        "button text": ["Into the Forest", "Use the Ship", "Try Swimming", "Search the Shores"],
        "button functions": [goEastForest, goShip, goSwim, searchArea],
        text: "A gentle breeze blows across the sea. The ocean is calm today. Bird chirp in the distance and waves beat against the sand. What shall you do?"
    },
    { // 12
        name: "ship",
        "button text": ["Sail to Shore", "Sail to Island", "Sail to the Shipwreck", "Go Fishing", "Search the Ship"],
        "button functions": [goShore, goIsland, goShipwreck, goFishing, searchArea],
        text: "What would you like to do?"
    },
    { // 13
        name: "shipwreck",
        "button text": ["Back to the Ship", "Fight Dragon"],
        "button functions": [goShip, fightDragon],
        text: "What will you do?"
    },
    { // 14
        name: "island",
        "button text": ["Return to the Ship", "Go Fishing", "Fight Dragon", "Search the Island"],
        "button functions": [goShip, goFishing, fightDragon, searchArea],
        text: "What will you do?"
    },
    { // 15
        name: "fight",
        "button text": ["Attack", "Strong Attack", "Potion", "Block", "Run"],
        "button functions": [attack, strAttack, usePotion, guard, run],
        text: "You are fighting a monster."
    },
    { // 16
        name: "monster defeated",
        "button text": ["Check Inventory", "Use Potion", "Go Back"],
        "button functions": [displayInventory, usePotion, goBack],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    { // 17
        name: "lose",
        "button text": ["CONTINUE?", "RESTART?"],
        "button functions": [respawn, restart],
        text: "You died... &#x2620;"
    },
    { // 18
        name: "win",
        "button text": ["REPLAY?"],
        "button functions": [restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    }
];

// initialize buttons
button1.onclick = goTown;
button2.onclick = goNorthForest;
button3.onclick = goForest;
button4.onclick = goEastForest;
button5.onclick = searchArea;
startButton.onclick = function() {
    document.getElementById('game').style.display = 'inherit';
    document.getElementById('intro').style.display = 'none';
    goMeadow();
};

// -- Update Functions --
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button5.innerText = location["button text"][4];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    button5.onclick = location["button functions"][4];
    text.innerHTML = location.text;

    if (location.name !== 'fight' && location.name !== 'monster defeated') {
        currentLocation = locations.indexOf(location);
    }
}

function updateStats() {
    levelText.innerText = level;
    xpText.innerText = xp;
    healthText.innerText = health + " / " + maxHealth;
    staminaText.innerText = stamina + " / " + maxStamina;
    atkText.innerText = weapons[currentWeapon].power;
    defText.innerText = shields[currentShield].toughness;
    potionText.innerText = potions;
    goldText.innerText = gold;
}

function allButtonsOn() {
    document.getElementById('button1').style.display = 'inline';
    document.getElementById('button2').style.display = 'inline';
    document.getElementById('button3').style.display = 'inline';
    document.getElementById('button4').style.display = 'inline';
    document.getElementById('button5').style.display = 'inline';
}

function hideButtons(place) {
    switch(place) {
        case "town":
        case "monster defeated":
            button4.style.display = 'none';
            button5.style.display = 'none';
        break;

        case "mountain":
        case "cave":
        case "cliff":
        case "shore":
            button5.style.display = 'none';
        break;

        case "ship":
            if (keys.includes("compass") === false || keys.includes("amulet") === true) {
                button3.style.display = 'none';
            }
        break;

        case "peak":
            button3.style.display = 'none';
        break;

        case "shipwreck":
            button3.style.display = 'none';
            button4.style.display = 'none';
            button5.style.display = 'none';
        break;

        case "island":
            button5.style.display = 'none';
        break;
    }
}

// -- Button Action Functions --
function goTown() {
    goTo("town");
}

function goStore() {
    goTo("store");
}

function goInn() {
    goTo("inn");
}

function goMeadow() {
    goTo("meadow");
}
  
function goForest() {
    goTo("forest");
}

function goNorthForest() {
    goTo("forestNorth");
}

function goEastForest() {
    goTo("forestEast");
}

function goMountain() {
    goTo("mountain");
}

function goCave() {
    goTo("cave");
}

function goPeak() {
    goTo("peak");
}

function goCliff() {
    goTo("cliff");
}

function goShore() {
    goTo("shore");
}

function goShip() {
    if (keys.includes("wood")) {
        goTo("ship");
    } else {
        text.innerText = "The ship is in desprate need of repair... You cannot sail it like this.";
    }
}

function goShipwreck() {
    goTo("shipwreck");
}

function goIsland() {
    goTo("island");
}

function goBack() {
    goTo(locations[currentLocation].name);
}

function goTo(place) {
    update(locations[locations.findIndex(obj => obj.name === place)]);
    allButtonsOn();
    hideButtons(place);
}

// -- interaction functions --
function goSwim() {
    if (keys.includes("compass")) {
        fighting = monsters.findIndex(obj => obj.name === "kraken");
    } else {
        fighting = monsters.findIndex(obj => obj.name === "shark");
    }
    goFight();
}

function goFishing() {
    if (Math.floor(Math.random() * 10) > 5) {
        fightMonster();
    } else {
        text.innerText = "You caught a " + randomObject() + "...";
    }
}

function openPortal() {
    if (keys.includes('amulet')) {
        fightDragon();
    } else {
        text.innerText = "The door is shut tight.";
    }
}

// -- Shop and Inn functions --
function buyHealth() {
    if (gold >= 10) {
        if (health < maxHealth) {
            gold -= 10;
            gainHealth(10);
            updateStats();
        } else {
            text.innerText = "Your health is already at max.";
        }
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyStamina() {
    if (gold >= 10) {
        if ( stamina < maxStamina) {
            gold -= 10;
            gainStamina(10);
            updateStats();
        } else {
            text.innerText = "Your stamina is already at max.";
        }
    } else {
        text.innerText = "You do not have enough gold to buy stamina.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 2) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            updateStats();
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + "!";
            inventory.push(newWeapon);
            displayInventory();
        } else {
            text.innerText = "You do not have enough gold to buy a weapon...";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        updateStats();
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + "!";
        displayInventory();
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function buyShield() {
    if (currentShield < shields.length - 2) {
        if (gold >= 30) {
            gold -= 30;
            currentShield++;
            updateStats();
            let newShield = shields[currentShield].name;
            text.innerText = "You now have a " + newShield + "!";
            shieldInventory.push(newShield);
            displayInventory();
        } else {
            text.innerText = "You do not have enough gold to buy a shield...";
        }
    } else {
        text.innerText = "You already have the most powerful shield!";
    }
}

function sellShield() {
    if (shieldInventory.length > 1) {
        gold += 15;
        updateStats();
        let currentShield = shieldInventory.shift();
        text.innerText = "You sold a " + currentShield + "!";
        displayInventory();
    } else {
        text.innerText = "Don't sell your only shield!";
    }
}

function displayInventory() {
    let display = "";
    for (i = 0; i < inventory.length; i++) {
        display += inventory[i] + ", "
    }

    for (i = 0; i < shieldInventory.length; i++) {
        display += shieldInventory[i] + ", "
    }
    text.innerText += " In your inventory you have: " + display.replace(/,\s*$/, ".");
}

function buyPotion() {
    if (gold >= 30) {
        gold -= 30;
        potions++;
        updateStats();
        text.innerText = "You now have " + potions + " potions!";
    } else {
        text.innerText = "You do not have enough gold to buy a potion...";
    }
}

function usePotion() {
    if (potions > 0) {
        if (health < maxHealth) {
            potions--;
            gainHealth(30);
            updateStats();
        } else {
            text.innerText = "Your health is already at max.";
        }
    } else {
        text.innerText = "You do not have any potions left...";
    }
}

function rest() {
    if (gold >= 120) {
        if (health !== maxHealth && stamina !== maxStamina) {
            gold -= 120;
            health = maxHealth;
            stamina = maxStamina;
            updateStats();
        } else {
            text.innerText = "Your health and stamina are already at max.";
        }
    } else {
        text.innerText = "You do not have enough gold to stay at the Inn...";
    }
}

// -- hidden item functions --
function foundMythrilSword() {
    if (inventory.includes('mythril sword') === false) {
        currentWeapon = weapons.length - 1;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText += " You now have a " + newWeapon + "!";
        inventory.push(newWeapon);
    }
}

function foundMythrilShield() {
    if (shieldInventory.includes('mythril kite shield') === false) {
        currentShield = shields.length - 1;
        let newShield = shields[currentShield].name;
        text.innerText += " You now have a " + newShield + "!";
        shieldInventory.push(newShield);
    }
}

function foundKeyItem(item) {
    if (keys.includes(item) === false) {
        keys.push(item);
        text.innerText += "\nYou have found " + item + "!";
    }
}

// -- MONSTER ENCOUNTER FUNCTIONS --
function fightMonster() {
    switch (locations[currentLocation].name) {
        case "meadow":
            fighting = monsters.findIndex(obj => obj.name === "slime");
        break;

        case "forest":
        case "North Forest":
        case "East Forst":
            let forestMonsters = ["slime", "fanged beast", "squirrel knight"];
            fighting = getRandomEncounter(forestMonsters);
        break;

        case "island":
        case "shore":
        case "ship":
            let islandMonsters = ["slime", "giant crab", "shark"];
            if (keys.includes("compass")) {
                islandMonsters.push("kraken");
            }
            fighting = getRandomEncounter(islandMonsters);
        break;

        case "cave":
        case "mountain":
           let mountainMonsters = ["slime", "bat", "fanged beast"];
           if (keys.includes("amulet")) {
                mountainMonsters.push("golem");
           }
           fighting = getRandomEncounter(mountainMonsters);
        break;
    }
    goFight();
}

function getRandomEncounter(encounter) {
    let randomMonster = encounter[(Math.floor(Math.random() * encounter.length))];
    return monsters.findIndex(obj => obj.name === randomMonster);
}

function fightDragon() {
    switch (locations[currentLocation].name) {
        case "forest":
        case "north forest":
        case "east forest":
            fighting = monsters.findIndex(obj => obj.name === "Gaea");
            break;
        case "island":
            fighting = monsters.findIndex(obj => obj.name === "Aegaeon");
            break;
        case "shipwreck":
            fighting = monsters.findIndex(obj => obj.name === "Netheril");
            break;
        case "peak":
            fighting = monsters.findIndex(obj => obj.name === "Zephyr");
            break;
        case "cave":
            fighting = monsters.findIndex(obj => obj.name === "Rangarron");
            break;
    }
    goFight();
}

function goFight() {
    goTo("fight");
    monsterLevel = monsters[fighting].level;
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterLevelText.innerText = monsterLevel;
    monsterHealthText.innerText = monsterHealth;
}

function searchArea() {
    let random = Math.floor(Math.random() * 20) + 1;
    switch (locations[currentLocation].name) {
        case 'meadow':
            if (shieldInventory.includes('pot lid') === false && keys.includes('pot lid') === false) {
                foundKeyItem('pot lid');
                let newShield = shields[0].name;
                text.innerText += " You found a " + newShield + "!";
                shieldInventory.unshift(newShield);
            } else {
                fightMonster();
            }
        break;

        case 'forest':
        case 'north forest':
        case 'east forest':
            if (random >= 15) {
                fightDragon();
            } else if (random <= 5){
                if (keys.includes('wood') === false){
                    foundKeyItem('wood');
                } else {
                    potions += 1;
                    text.innerText += "You found a potion!";
                }
            } else {
                fightMonster();
            }
        break;

        case 'cliff':
            if (keys.includes('rusty key') === false) {
                foundKeyItem('rusty key');
            } else {
                fightMonster();
            }
        break;

        case 'island':
            if (keys.includes('rusty key')) {
                button4.innerText = "???";
                button4.onclick = function() {
                    text.innerText += "The rusty key opens the lock!"
                    foundMythrilShield();
                    button4.innerText = "Search the Island";
                    button4.onclick = searchArea();
                };
                text.innerText = "What's this? A treasure chest?";
            } else if (Math.floor(Math.random() * 10) <= 3) {
                potions += 1;
                text.innerText += "You've found rum- I mean.. A potion!";
            } else {
                fightMonster();
            }

        default:
            fightMonster();
        break;
    }
}

// -- COMBAT FUNCTIONS --
function attack() {
    text.innerText = " You attack it with your " + weapons[currentWeapon].name + ".";

    if (Math.random() > .5 || health < 20) { // Is Monster hit?
        monsterHealth -= getDamage(weapons[currentWeapon].power + level, monsters[fighting].level) + 1;
    } else {
        text.innerText += " You miss.";
    }

    monsterHealthText.innerText = monsterHealth;
    
    if (monsterHealth <= 0) {
        defeatMonster();
    } else {
        monstersTurn();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }

    updateStats();
}

function strAttack() {
    if (stamina >= 10) {
        stamina -= 20;
        text.innerText = " You perform a powerful attack using your " + weapons[currentWeapon].name + "!";
        monsterHealth -= Math.floor(getDamage(weapons[currentWeapon].power + level, monsters[fighting].level) * 1.5);

        monsterHealthText.innerText = monsterHealth;

        if (monsterHealth <= 0) {
            defeatMonster();
        } else {
            monstersTurn();
        }

        if (Math.random() <= .1 && inventory.length !== 1) {
            text.innerText += " Your " + inventory.pop() + " breaks.";
            currentWeapon--;
        }

        updateStats();

    } else {
        text.innerText = "You do not have enough stamina."
    }
}

function monstersTurn() {
    text.innerText += "\n" + monsters[fighting].name + " attacks.";
    health -= getDamage(monsters[fighting].level, shields[currentShield].toughness);

    if (health <= 0) {
        lose();
    }
}

function getDamage(atk, def) {
    const dmg = Math.floor(Math.pow(atk, 2) / (atk + def));
    return dmg > 0 ? dmg : 0;
}

function run() {
    if (Math.floor(Math.random() * 10) > 5 || health < 20) {
        update(locations[currentLocation]);
    } else {
        text.innerText = "You slip and hit a " + randomObject() + "...";
        health -= 5;
        updateStats();
    }
}

function guard() {
    if (shieldInventory.length > 0) {
        stamina += 10;
        health -= Math.floor(getDamage(monsters[fighting].level, shields[currentShield].toughness) / 4);

        if (health <= 0) {
            lose();
        }
        updateStats();
        text.innerText = "You blocked " + monsters[fighting].name + "'s attack!";
    } else {
        text.innerText = "You do not have a shield...";
    }
}

function defeatMonster() {
    goTo("monster defeated");

    switch (monsters[fighting].name) {
        case "Gaea":
            foundKeyItem('wood');
            break;
        case "Aegaeon":
            foundKeyItem('compass');
            break;
        case "Netheril":
           foundKeyItem('amulet');
            break;
        case "Zephyr":
            foundMythrilSword();
            break;
        case "Rangarron":
            winGame();
            break;
    }

    gold += Math.floor(monsters[fighting].level * 3.5);
    xp += Math.floor(monsters[fighting].level * 1.8);
    levelUp();
    updateStats();
}

function levelUp() {
    if (xp >= (level * 5)) {
        xp -= (level * 5);
        level++;
        health += 10;
        stamina += 10;
        maxHealth += 10;
        maxStamina += 10;
    }
}

function gainHealth(gain) {
    health += gain;
    if (health > maxHealth) {
        health = maxHealth;
    }
}

function gainStamina(gain) {
    stamina += gain;
    if (stamina > maxStamina) {
        stamina = maxStamina;
    }
}

function randomObject() {
    let object = ["rock", "log", "fish", "duck", "tree", "bush", "stone", "boulder", "rock", "stump"];
    return object[Math.floor(Math.random() * object.length)];
}

function lose() {
    goTo("lose");
    button3.style.display = 'none';
    button4.style.display = 'none';
    button5.style.display = 'none';
}

function winGame() {
    goTo("win");
    button3.style.display = 'none';
    button4.style.display = 'none';
    button5.style.display = 'none';
}

function restart() {
    level = 1;
    xp = 0;
    health = 100;
    stamina = 100;
    maxHealth = 100;
    maxStamina = 100;
    gold = 50;
    currentWeapon = 0;
    currentShield = 0;
    potions = 0;
    inventory = ["stick"];
    shieldInventory = [];
    keys = [];
    updateStats();
    goMeadow();
}

function respawn() {
    xp = 0;
    health = maxHealth;
    stamina = maxStamina;
    gold = 0;
    potions = 0;
    inventory = [weapons[currentWeapon].name];
    shieldInventory = [shields[currentShield].name];
    updateStats();
    goTown();
}