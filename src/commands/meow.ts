import { Command } from "../types";

export const command: Command = {
  name: "meow",
  description: "nyaaa",
  async execute(interaction) {
    await interaction.reply("meeow");
  },
};
