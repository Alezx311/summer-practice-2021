const process = require('process')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Bot = new Telegraf(process.env.ORNO_BOT_TOKEN_PROD)
Bot.use(Telegraf.log())
Bot.catch((err, ctx) => console.error(err))

let OPTION_USE_MENU = true
Bot.Context = {
	menu: {},
	profile: {},
	db: {},
}
const bctx = Bot.Context

const Messages = {
	Profile: (info) => `***** Profile Menu *****\n
ID: ${info.id}
Name: ${info.first_name} ${info.last_name || ''},
Username: ${info.username}\n`,
	Orders: (arr) => `***** Orders Menu *****\n\n${JSON.stringify(arr, null, '\t')}`,
	Partners: (arr) => {
		if (!arr || arr.length < 1) return `No Partners Finded!`
		else if (arr.length > 10) arr.length = 10
		return arr.join('\n')
	},
	Main: `***** Main Menu *****
Добрый день, сейчас мы работаем над ботом.
Если вы желаете сделать заказ, задать нам вопрос, или сообщить о чём то, пожалуйста, просто напишите это после комманды /support.
Например:

/support Что сейчас можно заказать?
/support Какие акции есть?

После этого наши операторы свяжутся с вами в кратчайшие сроки.

Спасибо что зашли к нам, и хорошего вам дня!)`,
}

const Keyboards = {
	Main: Extra.markdown().markup((m) =>
		m.inlineKeyboard([m.callbackButton('Связатся с оператором', 'contact_support')], { columns: 1 }),
	),
	Back: Extra.HTML().markup((m) =>
		m.inlineKeyboard([m.callbackButton('📇 Main Menu', 'action_main_menu')], {
			columns: 1,
		}),
	),
}

const createMenu = async (ctx) => {
	ctx
		.reply(Messages.Main, Keyboards.Main)
		.then((msg) => {
			bctx.chat_id = msg.chat.id
			bctx.menu = msg.message_id
			return true
		})
		.catch((err) => {
			console.error('Error!', err)
			return false
		})
}

const BotApi = {
	Send: (opt) => {
		return new Promise((resolve, reject) => {
			if (!opt.text || !opt.from || !opt.chat) reject(`No text or from data => ${Object.entries(opt)}`)
			let message_text = `***** New Message *****\nFrom: ${opt.from}\nMessage: ${opt.text}`
			if (message_text.length > 4095) message_text = message_text.slice(0, 4095)

			Bot.telegram
				.sendMessage(opt.chat, message_text)
				.then((message_data) => resolve(message_data))
				.catch((err) => reject(err))
		})
	},
}

const sendUserChatUrl = (ctx, user_obj, user_text) => {
	let from = `<a href="tg://user?id=${user_obj.id}">Открыть чат</a>`
	let text = `${user_obj.username ? `@${user_obj.username}` : 'Пользователь скрыл свой ник'}\n\n${
		user_text ? user_text : 'Свяжитесь со мной!'
	}\n\nСсылка на пользователя: ${from}`

	Bot.telegram
		.sendMessage('-1001471730366', text, { parse_mode: 'HTML' })
		.then((msg) => {
			console.info(`Message from ${from} was sended!`, msg)
			ctx.reply('Сообщение в чат поддержки отправлено. Спасибо за обращение, мы свяжемся с вами в ближайшее время.')
		})
		.catch((err) => {
			console.error('Error on sending user URL to Support Chat!', err)
		})
}

const showMain = (ctx) => ctx.reply(Messages.Main, Keyboards.Main)

Bot.command('start', async (ctx) => {
	OPTION_USE_MENU = await createMenu(ctx)
	bctx.profile = ctx.message.from
})

Bot.action('action_profile', async (ctx) => await showUserProfile(ctx))
Bot.action('action_orders', async (ctx) => await showOrders(ctx))
Bot.action('action_partners', async (ctx) => await showPartners(ctx))
Bot.action('action_main_menu', async (ctx) => await showMain(ctx))
Bot.action('contact_support', (ctx) => sendUserChatUrl(ctx, ctx.callbackQuery.from))
Bot.hears(/\/support|\/orno/, (ctx) => sendUserChatUrl(ctx, ctx.message.from, ctx.message.text))

Bot.launch()

process.on('uncaughtException', function (error) {
	console.log('\x1b[31m', 'Exception: ', error, '\x1b[0m')
})

process.on('unhandledRejection', function (error, p) {
	console.log('\x1b[31m', 'Error: ', error.message, '\x1b[0m')
})

module.exports = BotApi


import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class AppService {
  private readonly bot: Telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  constructor() {}

  async sendMessageHandler(message: string): Promise<boolean | { message: string }> {
    try {
      await this.bot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL_ID, '`' + message + '`', { parse_mode: "MarkdownV2" });

      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject('Something wrong happened.');
    }
  }
}
