import { Client, ClientOptions, Collection } from "discord.js";
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
