import fs  from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'
import { Collection, Events, REST, Routes } from 'discord.js'

export class Comands {
    private client: any
    private token: any

    constructor(client: any, token: any) {
        this.client = client
        this.token = token

        this.client.commands = new Collection()
        this.set_commands()
    }

    async set_commands() {
        const commands = []
        const commands_path = './src/commands' 
        const commands_files = (await fs.readdir(commands_path)).filter((file) => file.endsWith('.js') || file.endsWith('ts'))

        for (const file of commands_files) {
            const file_path = pathToFileURL(path.join(commands_path, file)).href
            const command = (await import(file_path)).command
            if (('data' in command) && ('execute' in command)) {
                this.client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            } else {
                console.log(`Warning the command at ${path.join(commands_path, file)} is missing required data and execute property`)
            }
        }

        this.client.on(Events.InteractionCreate, async (interaction: any) => {
            const command = interaction.client.commands.get(interaction.commandName)
            if (!command) {
                console.log(`No command mathcing ${interaction.commandName} was found`)
                return
            }
            await command.execute(interaction)
        })

        this.deploy_commands(commands)
    }

    deploy_commands(commands: any[]) {
        const rest = new REST().setToken(this.token);
        (async () => {
            try {
                console.log(`Start refreshing ${commands.length} aplication (/) commands.`)
                const data: any = await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID), {body: commands})
                console.log(`Sucessfully reloaded ${data.length} aplication (/) commands`)
            } catch (err) {
                console.log(err)
            }
        })()
    }
}