import * as dotenv from "dotenv";
import { GatewayIntentBits, REST } from "discord.js";
import { ReadCommandFiles, ReadEventFiles, SyncSlashCommands } from "./util";
import { AtomClient } from "./types/client";
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

export const client = new AtomClient(ReadCommandFiles(), {
  intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildVoiceStates,
});

SyncSlashCommands(rest, client);
ReadEventFiles(client);
client.login(process.env.TOKEN);
