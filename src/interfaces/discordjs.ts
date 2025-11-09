import { Client, Collection, ChatInputCommandInteraction, SlashCommandBuilder, Events, Interaction} from "discord.js";

export class CustomClient extends Client {
    public commands = new Collection<string, Command>()
    public cooldowns = new Collection<string, Collection<string, number>>()
}

export abstract class Command {
    abstract data: SlashCommandBuilder
    abstract execute: (interaction: ChatInputCommandInteraction) => Promise<void>
    abstract cooldown?: number
}

export abstract class EventInteraction {
    abstract name: Events
    abstract execute: (...args: any[]) => Promise<unknown>
}

export abstract class EventClient {
    abstract name: Events
    abstract once: boolean
    abstract execute: (...args: any[]) => void
}

export type Event = EventClient | EventInteraction

