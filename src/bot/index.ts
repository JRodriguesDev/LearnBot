import {Client, Events, GatewayIntentBits, Routes, REST, } from 'discord.js'
import {Comands} from './commands.js'


export class Bot {
    private token: any = process.env.TOKEN_JS
    private client = new Client({intents: [GatewayIntentBits.Guilds]})
    private commands = new Comands(this.client, this.token)

    public async start_bot() {
        this.client.once(Events.ClientReady, (info) => {console.log(`Bot Online: ${info.user.tag}`)})
        this.client.login(this.token)
    }
}