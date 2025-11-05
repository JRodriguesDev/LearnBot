import {Bot} from './bot/index.js'
import fs  from 'fs/promises'

import {Comands} from './bot/commands.js'

const bot = new Bot()
bot.start_bot()
