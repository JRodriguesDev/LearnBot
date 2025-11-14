import fs  from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'
import { RESTPostAPIChatInputApplicationCommandsJSONBody, Interaction, Collection, Events, REST, Routes } from 'discord.js'

import {CustomClient, Command} from '#interfaces'

export class Comands {
    private client: CustomClient
    private token: string

    constructor(client: CustomClient, token: string) {
        this.client = client
        this.token = token

        this.client.commands = new Collection()
        this.client.cooldowns = new Collection()
        this.handler_commands()
    }

    private async handler_commands() {
        const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
        const commands_path = './src/commands' 
        const commands_folders = (await fs.readdir(commands_path))

        for (const folder of commands_folders) {
            const commands_files = (await fs.readdir(path.join(commands_path, folder)))
            for (const file of commands_files) {
                const file_path = pathToFileURL(path.join(commands_path, folder, file)).href
                const command: Command = (await import(file_path)).command
                if (('data' in command) && ('execute' in command)) {
                    this.client.commands.set(command.data.name, command)
                    commands.push(command.data.toJSON())
                } else {
                    console.log(`Warning the command at ${file_path} is missing required data and execute property`)
                }
            }
        }
        this.deploy_commands_dev(commands)
    }

    private deploy_commands_dev(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
        const rest = new REST().setToken(this.token);
        (async () => {
            try {
                console.log(`Start refreshing ${commands.length} aplication (/) commands.`)
                const data = await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!), {body: commands}) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
                //console.log(data)
                console.log(`Sucessfully reloaded ${data.length} aplication (/) commands`)
            } catch (err) {
                console.log(err)
            }
        })()
    }

    private deploy_commands_global(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
        const rest = new REST().setToken(this.token); 
        (async () => {
            try {
                console.log(`Start refreshing ${commands.length} aplication (/) commands.`)
                const data = await rest.put(Routes.applicationCommands(process.env.BOT_ID!), {body: commands}) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
                console.log(`Sucessfully reloaded ${data.length} aplication (/) commands`)
            } catch (err) {
                console.log(err)
            }
        })()
    }

    private clear_commands_global() {
        const rest = new REST().setToken(this.token);
        (async () => {
            try {
                console.log(`start clear commands`)
                const data = await rest.put(Routes.applicationCommands(process.env.BOT_ID!), {body: []}) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
            } catch (err) {
                console.log(`Error: ${err}`)
            }
        })()
    }

    private clear_commands_dev() {
        const rest = new REST().setToken(this.token);
        (async () => {
            try {
                console.log(`start clear commands`)
                const data = await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!), {body: []}) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
            } catch (err) {
                console.log(`Error: ${err}`)
            }
        })()
    }
}