import { ActivityType, Events } from "discord.js";
import { ClientEvent } from "../types/client";

export const event: ClientEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "Catgirl UFC", type: ActivityType.Competing }],
      status: "online",
    });

    console.log(`meow ${client.user.tag}`);
  },
};
