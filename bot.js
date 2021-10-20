// Programming from A-Z 
//Mid-term Project: Creating Discord Bot
//Author: Soojin 
//Oct 18 2021 


//Require dovenv
require('dotenv').config();

//Require node-fetch
const fetch = require('node-fetch');

console.log('Welcome!');

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


// Login to Discord with your client's token
client.login(process.env.TOKEN);

// When the client is ready, run this code (only once)
client.once('ready', readyDiscord);

function readyDiscord() {

  //Require the node deploy-commands.js
  require('./deploy-commands');
	console.log('Discord is Ready');
}


//code message sending function 
client.on('messageCreate', msg => {
  console.log(msg);
if(msg.content === 'hello') {
msg.channel.send(' I am here to teach you korean!') 
msg.channel.send('To start, type "/level1" and hit enter') 
msg.channel.send('Then write down the name of the fruit in Korean') 
}

if(msg.content === '딸기') {
msg.channel.send('Good Job!') 
msg.channel.send('Now type "/level2" to start level 2') 

}

if(msg.content === '빨강') {
msg.channel.send('Good Job!') 
msg.channel.send('Now, type "/finish" but in Korean, to finish the game') 
}


});


const replies = ['노랑', '빨강', '파랑', '초록'];

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user, options } = interaction;

  console.log(commandName, user.username);


if (commandName === 'level1') {

    //get keyword or set 'coffee' as a default keyword
    let keywords = options.getString('keywords') || 'strawberries';
	 
    // Avoiding the 3 second issue?
    await interaction.deferReply();
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);

    await interaction.editReply({
      content: `GIF from Tenor: ${keywords}\n${json.results[index].url}`,
    });

  }
  else if (commandName === 'color') {
    const index = Math.floor(Math.random() * replies.length);
    await interaction.reply({
      content: replies[index],
    });
  } 

	
	else if (commandName ==='level2'){
		  const index = Math.floor(Math.random() * replies.length);
    await interaction.reply({
      content: 'type "/color" to receive a color that describes the image. Continue doing this until you find the right answer.',
		
	 })
  }

  else if(commandName === '종료') {
    //get keyword or set 'coffee' as a default keyword
    let keywords = options.getString('keywords') || 'congratulations';
   
    // Avoiding the 3 second issue?
    await interaction.deferReply();
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);

    await interaction.editReply({
      content: `GIF from Tenor: ${keywords}\n${json.results[index].url}`,
    });

}

    });
