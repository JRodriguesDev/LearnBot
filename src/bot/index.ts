import {Events, GatewayIntentBits} from 'discord.js'

import {Comands} from './commands.js'
import {Events as ev} from './events.js'
import {CustomClient} from '#interfaces'

export class Bot {
    private token: string = process.env.TOKEN_JS!
    private client = new CustomClient({intents: [GatewayIntentBits.Guilds]})
    private commands = new Comands(this.client, this.token)
    private events = new ev(this.client)

    public async start() {
        this.client.once(Events.ClientReady, (client_ready) => {console.log(`Bot Online: ${client_ready.user.tag}`)})
        this.client.login(this.token)
    }
}