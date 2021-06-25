import { Extra } from 'node_modules/telegraf-ts/typings/extra'
import { InlineKeyboardButton } from 'node_modules/telegraf-ts/typings/markup'

export class KeyboardMain {}
export class KeyboardGuitar {}
export class KeyboardNotes {}

export class Keyboard {
	createKbButton(m: any, title: string, cb: string): any {
		return m.callbackButton(title, cb)
	}
	createKbButtons(m: any, buttons: [string, string][]): any {
		return buttons.map((btn) => this.createKbButton(m, ...btn))
	}
	createMarkdownKb(buttons: [string, string][], opt = {}) {
		return Extra.markdown().markup((m: any) => m.inlineKeyboard(this.createKbButtons(m, buttons), opt))
	}
	createHtmlKb(buttons: [string, string][], opt = {}) {
		return Extra.HTML().markup((m: any) => m.inlineKeyboard(this.createKbButtons(m, buttons), opt))
	}
	notesAll() {
		const buttons = 'A A# B C C# D D# E F F# G G#'.split(' ').reduce((char, char) => {
			const charButtons = Array(8)
				.fill(char)
				.reduce((acc, c, i) => [...acc, [`${c}${~~i}`, `note_${c}${~~i}`]], [])
			return [...accButtons, ...charButtons]
		}, [])
		const kb = this.createHtmlKb(buttons, { columns: 7 })
	}
}

// const Keyboards = {
// 	Main: Extra.markdown().markup((m) =>
// 		m.inlineKeyboard([m.callbackButton('Связатся с оператором', 'contact_support')], { columns: 1 }),
// 	),
// 	Back: Extra.HTML().markup((m) =>
// 		m.inlineKeyboard([m.callbackButton('📇 Main Menu', 'action_main_menu')], {
// 			columns: 1,
// 		}),
// 	),
// }
