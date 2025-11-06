import { Client, Collection, ChatInputCommandInteraction, SlashCommandBuilder, Events, Interaction} from "discord.js";

export class CustomClient extends Client {
    public commands = new Collection<string, Command>()
}

export abstract class Command {
    abstract data: SlashCommandBuilder
    abstract execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export abstract class EventInteraction {
    abstract name: Events
    abstract execute: (interaction: Interaction) => Promise<void>
}

export abstract class EventClient {
    abstract name: Events
    abstract once: boolean
    abstract execute: (client: Client) => void
}

export type Event = EventClient | EventInteraction

