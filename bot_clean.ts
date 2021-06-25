require('dotenv').config()

import { Logger } from 'helpers'
import { Context, Telegraf, Extra } from 'telegraf'

export async function initBot() {
	const bot = new Telegraf(process.env.BOT_TOKEN)

	bot.use(Telegraf.log())
	bot.catch(Logger.showBotError)
	bot.setCommands()

	bot.command('start', Command.start)
	// ... Bot Commands

	bot.action('voice', Action.voice)
	// ... Bot Actions

	// bot.hears(someMatchPhrase, Hears.someMatchPhrase)
	// ... Context Messages

	bot.launch()

	process.on('uncaughtException', function (err: Error) {
		Logger.uncaughtException('\x1b[31m', 'Exception: ', err, '\x1b[0m')
		console.log('\x1b[31m', 'Exception: ', err, '\x1b[0m')
	})

	process.on('unhandledRejection', function (err: Error, p) {
		Logger.unhandledRejection('\x1b[31m', 'Rejection: ', err.message, '\x1b[0m')
		console.log('\x1b[31m', 'Error: ', err.message, '\x1b[0m')
	})
}

// // Define your own context type
// interface MyContext extends Context {
// 	myProp?: string
// 	myOtherProp?: number
// }

// // Create your bot and tell it about your context type
// const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN)

// // Register middleware and launch your bot as usual
// bot.use((ctx, next) => {
// 	// Yay, `myProp` is now available here as `string | undefined`!
// 	ctx.myProp = ctx.chat?.first_name?.toUpperCase()
// 	return next()
// })

// bot.use(async (ctx, next) => {
// 	console.time(`Processing update ${ctx.update.update_id}`)
// 	console.dir(ctx)
// 	await next() // runs next middleware
// 	// runs after next middleware finishes
// 	console.timeEnd(`Processing update ${ctx.update.update_id}`)
// })

// bot.command('date', (ctx) => ctx.reply(`Current Date: ${new Date(Date.now()).toISOString()}`))
// bot.on('text', (ctx) => ctx.reply('Text'))
// bot.on('callback_query', (ctx) => ctx.answerCbQuery())
// bot.on('inline_query', (ctx) => ctx.answerInlineQuery())

// bot.launch()

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
