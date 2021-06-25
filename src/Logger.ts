import chalk from 'node_modules/chalk/index'
import Context from 'node_modules/telegraf/typings/context'

export type Obj = Record<string, unknown> | any
export type ObjEntries = [string, unknown][]
export type Value = string | number | Obj
export type Arr = Value[]

export enum CHALK_COLORS {
	RED = 'red',
	GREEN = 'green',
	BLUE = 'blue',
	YELLOW = 'yellow',
	CYAN = 'cyan',
}

export class Transform {
	toTypeStr = (data?: any): string => Object.prototype.toString.call(data)
	objToEntries = (obj: Obj): ObjEntries => Object.entries(obj)
	objToStr = (obj: Obj): string => JSON.stringify(obj, null, '\t')
	arrToStr = (arr: Arr): string => arr.join('\n')
}

export class ErrorTransform extends Transform {
	toMessage(err: Error): string {
		if (!err) return 'No Error'
		if (!err?.message) return `No Error Message, Error: ${this.objToStr(err)}`
		return this.objToStr(err)
	}
}

//& For Logging
export class Console {
	public static logError = (v: Value): void => console.error(v)
	public static logLog = (v: Value): void => console.log(v)
	public static logInfo = (v: Value): void => console.info(v)
	public static logDebug = (v: Value): void => console.debug(v)
	public static logDir = (v: Value): void => console.dir(v)
	public static logTable = (v: Value[]): void => console.table(v)
	public static logTrace = (v: Value): void => console.trace(v)
	public static show = (v: Value, msg?: string): void => console.log(msg, v)
}
//& For Cute Logging
export class ConsoleColored extends Console {
	public static showRed = (v: Value): void => console.log(chalk.red(v))
	public static showGreen = (v: Value): void => console.log(chalk.green(v))
	public static showBlue = (v: Value): void => console.log(chalk.blue(v))
	public static showYellow = (v: Value): void => console.log(chalk.yellow(v))
	public static showCyan = (v: Value): void => console.log(chalk.cyan(v))
	public static showWithRandColor = (v: Value): void => console.log(chalk[Helpers.randColor()](v))
}

//& For Logging values
export class Logger extends ConsoleColored {
	//^ Values
	public static getDatestamp = (): string => new Date(Date.now()).toISOString()
	public static getType = (v: any): string => `${Object.prototype.toString.call(v)}`
	public static getTypeSimple = (v: any): string => Logger.getType(v)?.toLowerCase().replace(']', '').split(' ')?.[1]
	public static isObj = (v: any): boolean => Logger.getTypeSimple(v) === 'object'
	public static isArr = (v: any): boolean => Logger.getTypeSimple(v) === 'array'
	public static isAny = (v: any): boolean => v && !Logger.isObj(v) && !Logger.isArr(v)
	public static objToStr = (v: any): string => JSON.stringify(v, null, '\t') || Object.entries(v) || v?.toString()
	public static arrToStr = (v: any): string => v?.join('\n') || v.toString()
	public static anyToStr = (v: any): string =>
		Logger.isObj(v) ? Logger.objToStr(v) : Logger.isArr(v) ? Logger.arrToStr(v) : `${v}`

	public static showInfo = (v: any): void => {
		const lines = `\n ##### Start -> ${this.getDatestamp()} \n ${this.anyToStr(v)} \n End -> #####`.split('\n')

		lines.map((l) => ConsoleColored.showWithRandColor(l))
	}

	//^ Cute
	private dividerStr = (data: any, char = '#', size = 5) => {
		const startStr = `${`${char}`.repeat(size)}>`
		const endStr = startStr.split('').reverse().join('').replace('>', '<')
		return `\n ${startStr}\n ${Logger.getDatestamp()} \n ${data} \n ${endStr}\n`
	}
}

export class Logger {
	// bot.catch(Logger.showBotError)
	showBotError(err: Error, ctx: Context) {
		save(`showBotError -> ${err.message}`)
	}
	// Logger.uncaughtException('\x1b[31m', 'Exception: ', err, '\x1b[0m')
	uncaughtException() {}
	// Logger.unhandledRejection('\x1b[31m', 'Rejection: ', err.message, '\x1b[0m')
	unhandledRejection() {}
}
