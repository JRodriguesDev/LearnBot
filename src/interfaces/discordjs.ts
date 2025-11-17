import { Client, Collection, AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder, Events, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

export class CustomClient extends Client {
    public commands = new Collection<string, Command>()
    public cooldowns = new Collection<string, Collection<string, number>>()
}

export abstract class Command {
    abstract data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder
    abstract execute: (interaction: ChatInputCommandInteraction) => Promise<void>
    abstract cooldown?: number
    abstract auto_complete?: (interaction: AutocompleteInteraction) => Promise<void | any>
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

export type CustomEvent = EventClient | EventInteraction

