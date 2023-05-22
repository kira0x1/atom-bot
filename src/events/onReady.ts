import { Events } from "discord.js";
import { ClientEvent } from "../types/client";

export const event: ClientEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`meow ${client.user.tag}`);
  },
};
