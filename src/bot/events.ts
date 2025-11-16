import fs from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'

import {CustomClient, Event} from '#interfaces'
import { ClientEvents } from 'discord.js'

export class Events {
    private client: CustomClient

    constructor(client: CustomClient) {
        this.client = client
        this.handler_events()
    }

    private async handler_events() {
        const events_path = './src/events'
        const events_folders = await fs.readdir(events_path)

        for (const folder of events_folders) {
            const event_files = await fs.readdir(path.join(events_path, folder))
            for (const file of event_files) {
                const file_path = pathToFileURL(path.join(events_path, folder, file)).href
                const event: Event = (await import(file_path)).event
                if ('once' in event) {
                    this.client.once(event.name as keyof ClientEvents, (...args: any[]) => event.execute(...args))
                } else {
                    this.client.on(event.name as keyof ClientEvents, (...args: any[]) => event.execute(...args))
                }
            }
        }
    }   
}