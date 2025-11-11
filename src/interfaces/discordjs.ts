import { Client, Collection, AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, Events, SlashCommandOptionsOnlyBuilder} from "discord.js";

export class CustomClient extends Client {
    public commands = new Collection<string, Command>()
    public cooldowns = new Collection<string, Collection<string, number>>()
}

export abstract class Command {
    abstract data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
    abstract execute: (interaction: ChatInputCommandInteraction) => Promise<void>
    abstract cooldown?: number
    abstract auto_complete?: (interaction: AutocompleteInteraction) => Promise<void>
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

