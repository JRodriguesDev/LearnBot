import {Client, Collection, Events, GatewayIntentBits, Routes, REST, } from 'discord.js'


import {intro} from '../commands/utility.js'

export class Bot {
    private token: any = process.env.TOKEN_JS
    private client = new Client({intents: [GatewayIntentBits.Guilds]})
    private rest

    constructor() {
        this.rest = new REST().setToken(this.token)
    }

    public async start_bot() {
        this.client.once(Events.ClientReady, (info) => {console.log(`Bot Online: ${info.user.tag}`)})
        this.register_commands()
        this.commands()
        this.client.login(this.token)
    }

    private commands() {
        this.client.commands = new Collection()
        this.client.commands.set(intro.data.name, intro)
        
        this.client.on(Events.InteractionCreate, async (interaction) => {
            console.log(interaction)
            if (!interaction.isChatInputCommand()) return;
            console.log(interaction)
            
            const command = interaction.client.commands.get(interaction.commandName)
            await command.execute(interaction)
        })
    }

    private register_commands() {
        (async () => {
            try {
                const data = await this.rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID), {body: [intro.data]})
            } catch(err) {
                console.log(err)
            }  
        })()
    }
}