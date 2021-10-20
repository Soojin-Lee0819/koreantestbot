require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Define options for command arguments
const commands = [

  new SlashCommandBuilder().setName('level2').setDescription('replies with instruction for level 2'),
  new SlashCommandBuilder().setName('color').setDescription('replies with Korean Color Words'),
	new SlashCommandBuilder().setName('hello').setDescription('the bot will start and give instruction'),
  new SlashCommandBuilder()
    .setName('level1')
    .setDescription('Replies with a strawberry gif!')
    .addStringOption((option) =>
      option.setName('keywords').setDescription('The gif to search for').setRequired(false)
    ),

new SlashCommandBuilder()
    .setName('종료')
    .setDescription('Replies with a congratulations gif!')
    .addStringOption((option) =>
      option.setName('keywords').setDescription('The gif to search for').setRequired(false)
    ),

].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID), {
    body: commands,
  })
  .then(() => console.log('application command registered!'))
  .catch(console.error);


