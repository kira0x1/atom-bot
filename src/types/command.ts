import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => void;
}

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (Interaction: ChatInputCommandInteraction) => void;
}
