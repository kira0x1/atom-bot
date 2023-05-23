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

    // TODO: use chalk
    console.log(`Logged in as ${client.user.tag}`);
  },
};
