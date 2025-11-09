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
        //this.client.cooldowns = new Collection()
        this.handler_commands()
    }

    private async handler_commands() {
        const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
        const commands_path = './src/commands' 
        const commands_files = (await fs.readdir(commands_path)).filter((file) => file.endsWith('.js') || file.endsWith('ts'))

        for (const file of commands_files) {
            const file_path = pathToFileURL(path.join(commands_path, file)).href
            const command: Command  = (await import(file_path)).command
            if (('data' in command) && ('execute' in command)) {
                this.client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            } else {
                console.log(`Warning the command at ${path.join(commands_path, file)} is missing required data and execute property`)
            }
        }

        //this.deploy_commands(commands)
    }

    private deploy_commands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
        const rest = new REST().setToken(this.token);
        (async () => {
            try {
                console.log(`Start refreshing ${commands.length} aplication (/) commands.`)
                const data = await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!), {body: commands}) as RESTPostAPIChatInputApplicationCommandsJSONBody[]
                console.log(`Sucessfully reloaded ${data.length} aplication (/) commands`)
            } catch (err) {
                console.log(err)
            }
        })()
    }
}