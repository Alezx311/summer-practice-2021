require('dotenv').config()
const { Context, Telegraf } = require('telegraf')
// import { Context, Telegraf } from 'telegraf'
import { Logger } from './helpers'

const bot = new Telegraf(process.env.BOT_TOKEN)

function handleMessage(ctx: any): string {
	Logger.showInfo('handleMessage')
	Logger.logDir(ctx)
	return 'Is Message'
}
function handleText(ctx: any): string {
	Logger.showInfo('handleText')
	Logger.logDir(ctx)
	return 'Is Text'
}
function handleAudio(ctx: any): string {
	Logger.showInfo('handleAudio')
	Logger.logDir(ctx)
	return 'Is Audio'
}
function handleVoice(ctx: any): string {
	Logger.showInfo('handleVoice')
	Logger.logDir(ctx)
	return 'Is Voice'
}
//? Text Handlers
bot.on('message', (ctx: any): any => bot.handleMessage(ctx))
bot.on('text', (ctx: any): any => bot.handleText(ctx))

//? Audio Handlers
bot.on('audio', (ctx: any): any => bot.handleAudio(ctx))
bot.on('voice', (ctx: any): any => bot.handleVoice(ctx))
