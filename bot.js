const prefix = "!"; // Set bot prefix here

const auth = require("./auth.json"); // Load token
const data = require("./heroes.json"); // Load token
const Discord = require("discord.io"); // Load discord.io
const bot = new Discord.Client({ // Load bot
    token: auth.token,
    autorun: true
});

const stdin = process.stdin; // Use the terminal to run JS code
stdin.on("data", function(input) {
    input = input.toString();
    try { // Attempt to run input
        let output = eval(input);
        console.log(output);
    } catch (e) { // Failed
        console.log("Error in eval.\n"+e.stack);
    }
});

bot.on("ready", function() { // When the bot comes online...
    console.log("I'm online!");
});

bot.on("message", function(user, userID, channelID, message, event) { // Message detected
    if (message.startsWith(prefix)) { // Message starts with prefix
        let command = message.slice(prefix.length).split(" "); // Split message into words
        switch (command[0]) { // Execute code depending on first word
        case "ping": // ping: reply "pong"
        bot.sendMessage({to: channelID, message: ":grin:"});
        break;
        case "roll": // roll: choose a random number
        let max = parseInt(command[1]) || 100;
        let min = 1;
        let result = Math.floor(Math.random()*(max-min+1)+min);
        bot.sendMessage({to: channelID, message: "From "+min+" to "+max+", you rolled: **"+result+"**"});
        break;
        case "hero":
        let item = data.heroes.find(elem => elem.name.toLowerCase() == command[1].toLowerCase());
        if(!item){
            bot.sendMessage({to: channelID, message: "Nincs ilyen :confused:"});
            break;
        }
        let msg = getTemplate("hero", item)
console.log(msg)
        bot.sendMessage({to: channelID, message: msg});
        
        break;
    }
}
});

bot.on("disconnect", function() { // Occasionally the bot disconnects.
    bot.connect(); // Just reconnect when that happens.
});

function getTemplate(type, item){

    let skills = item.skills.reduce((carry, i) => {
        return carry + `
        >       ${i.id} számú képessége: **${i.name}**
        >       Típusa: **${i.type}**
        >       Ára: **${i.price}**
        >       Leírás: **${i.description}**
        > `
    }, "> ")

    return `
    > Név: **${item.name}**
    > 
    > Származása: **${item.origin}**
    > 
    > Karakterleírás: **${item.description}**
    > 
    > Pontok az Ultimate képesség megszerzéséhez: **${item.ultimate}**
    ${skills} 
    `
}

//
//>    ${item.skills[0].id} számú képessége:
//>    Neve: **${item.skills[0].name}**
//>    Típusa: **${item.skills[0].type}**
//>    Ára: **${item.skills[0].price}**
//>    Leírás: **${item.skills[0].description}**
//> 
//>    ${item.skills[1].id} számú képessége:
//>    Neve: **${item.skills[1].name}**
//>    Típusa: **${item.skills[1].type}**
//>    Ára: **${item.skills[1].price}**
//>    Leírás: **${item.skills[1].description}**