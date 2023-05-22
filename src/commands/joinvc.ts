import { joinVoiceChannel } from "@discordjs/voice";
import { Command } from "../types";
import { ChannelType } from "discord.js";

export const command: Command = {
  name: "joinvc",
  description: "meow join vc",
  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    let vc = member?.voice.channel;

    if (!vc) {
      await interaction.reply({
        content: "you're not in a vc so ill join the first vc i see",
        ephemeral: true,
      });

      const guild = member.guild;
      const channels = await guild.channels.fetch();

      const voiceChannels = channels
        .filter((c) => c.type === ChannelType.GuildVoice)
        .sort((c, c1) => c.rawPosition - c1.rawPosition);

      for (const channel of voiceChannels.values()) {
        if (channel.type === ChannelType.GuildVoice) {
          vc = channel;
          break;
        }
      }
    }

    joinVoiceChannel({
      channelId: vc.id,
      guildId: vc.guild.id,
      adapterCreator: vc.guild.voiceAdapterCreator,
    });
  },
};
