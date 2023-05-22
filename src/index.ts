import * as dotenv from "dotenv";
import { GatewayIntentBits, REST } from "discord.js";
import { ImportCommandFiles, SyncSlashCommands } from "./util";
import { AtomClient } from "./types/client";
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const client = new AtomClient(ImportCommandFiles(), {
  intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildVoiceStates,
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Command: ${interaction.commandName} not found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command.",
        ephemeral: true,
      });
    }
  }
});

SyncSlashCommands(rest, client);
client.login(process.env.TOKEN);
