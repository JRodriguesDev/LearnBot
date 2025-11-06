import fs from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'

import {CustomClient, Event} from '#interfaces'

export class Events {
    private client: CustomClient

    constructor(client: CustomClient) {
        this.client = client

        this.set_events()
    }

    private async set_events() {
        const commands_path = './src/events'
        const commands_files = (await fs.readdir(commands_path)).filter((file) => file.endsWith('.js') || file.endsWith('ts'))

        for (const file of commands_files) {
            const file_path = pathToFileURL(path.join(commands_path, file)).href
            const event: Event = (await import(file_path)).event
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args))
            }
        }
    }
}