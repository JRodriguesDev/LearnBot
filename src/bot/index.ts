import {GatewayIntentBits} from 'discord.js'

import {Comands} from './commands.js'
import {Events as ev} from './events.js'
import {CustomClient} from '#interfaces'

export class Bot {
    private token: string = process.env.TOKEN_JS!
    private client = new CustomClient({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]})
    private commands = new Comands(this.client, this.token)
    private events = new ev(this.client)

    public async start() {
        this.client.login(this.token)
    }
}