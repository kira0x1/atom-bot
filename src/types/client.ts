import {
  ChatInputCommandInteraction,
  Client,
  ClientOptions,
  Collection,
  Events,
} from "discord.js";
import { SlashCommand } from "./command";

export class AtomClient extends Client {
  public commands: Collection<string, SlashCommand>;

  constructor(
    commands: Collection<string, SlashCommand>,
    options: ClientOptions
  ) {
    super(options);
    this.commands = commands;
  }
}

export interface ClientEvent {
  name: Events;
  once: boolean;
  execute: (client: AtomClient) => void;
}

export interface InteractionEvent {
  name: Events;
  once: boolean;
  execute: (interaction: ChatInputCommandInteraction) => void;
}
