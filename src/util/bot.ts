import fs from "fs";
import { Collection, REST, Routes, SlashCommandBuilder } from "discord.js";
import path from "path";
import { SlashCommand } from "../types";
import { AtomClient } from "../types/client";

export async function SyncSlashCommands(rest: REST, client: AtomClient) {
  try {
    console.log(`Syncing Slash Commands`);

    const commands: any = [];
    client.commands.mapValues((c) => commands.push(c.data.toJSON()));

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
}

export function ReadCommandFiles() {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  const commands = new Collection<string, SlashCommand>();

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { command } = require(filePath);

    const commandSlash: SlashCommand = {
      data: new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description),
      execute: command.execute,
    };

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in commandSlash && "execute" in commandSlash) {
      commands.set(commandSlash.data.name, commandSlash);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  return commands;
}

export function ReadEventFiles(client: AtomClient) {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { event } = require(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}
