// import { chalk } from 'chalk'
const chalk = require('chalk')
import { CHALK_COLORS, TruthyData, TruthyValue } from './src/constants'
import { ErrorInvalidValue } from './errors'

//& For Logging
export class Console {
	public static logError = (v: TruthyValue): void => console.error(v)
	public static logLog = (v: TruthyValue): void => console.log(v)
	public static logInfo = (v: TruthyValue): void => console.info(v)
	public static logDebug = (v: TruthyValue): void => console.debug(v)
	public static logDir = (v: TruthyValue): void => console.dir(v)
	public static logTable = (v: TruthyValue[]): void => console.table(v)
	public static logTrace = (v: TruthyValue): void => console.trace(v)
	public static show = (v: TruthyValue, msg?: string): void => console.log(msg, v)
}
//& For Cute Logging
export class ConsoleColored extends Console {
	public static showRed = (v: TruthyValue): void => console.log(chalk.red(v))
	public static showGreen = (v: TruthyValue): void => console.log(chalk.green(v))
	public static showBlue = (v: TruthyValue): void => console.log(chalk.blue(v))
	public static showYellow = (v: TruthyValue): void => console.log(chalk.yellow(v))
	public static showCyan = (v: TruthyValue): void => console.log(chalk.cyan(v))
	public static showWithRandColor = (v: TruthyValue): void => console.log(chalk[Helpers.randColor()](v))
}
//& For Values Working
export class Values {
	public static getUnical = (...v: any[]): any[] => [...new Set([...v])]
	public static getLength = (v: any): number => v?.length
	public static getChars = (v: string): string[] => Values.getUnical(v.split(''))
}

//& For Bot Commands
export class Stat {
	public static len = (v: any): number => ~~v?.length
	public static toType = (v: any): string => Object.prototype.toString.call(v)
	public static toTypeSimple = (v: any): string => Stat.toType(v)?.toLowerCase().replace(']', '').split(' ')?.[1]
	public static anyData = (v: any): string => `Type: ${Stat.toTypeSimple(v)}, Length: ${Stat.len(v)}`
	public static text = (v: any): string => `${Stat.anyData(v)}, Unical Chars: [${Values.getChars(v)}]`
	public static audio = (v: any): string => `${Stat.text(v)}, Audio File: [${v}]`
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

export class Helpers extends Logger {
	//^ Numbers
	public static rand = (): number => Math.random()
	public static randFixed = (size = 3): number => Number(Helpers.rand().toFixed(size))
	public static randInt = (max = 100): number => 1 + Number(Helpers.rand() * (max - 1) - 1)
	public static randMany = (size = 10, fillWith = Helpers.rand): number[] =>
		Array(size)
			.fill(fillWith)
			.map((v) => (v instanceof Function ? v() : v))
	public static randArrInd = (arr: any[]): number => (~~arr?.length < 3 ? ~~arr?.length : 0)
	public static randArrEl = (arr: any[]): any => arr[Helpers.randArrInd(arr)]
	public static randColor = (): CHALK_COLORS => Helpers.randArrEl(Object.values(CHALK_COLORS))
	public static randChances = (): any => ({ primary: Helpers.rand(), value: 1 })
	public static randChancesBoth = (a: any): any =>
		Object.assign(a, { secondary: a.value - a.primary, chance: ~~(a.primary / a.value - a.primary) })
	public static randBool = (chance = 0.5): boolean => Helpers.rand() > chance
	public static throwError = (err = ErrorInvalidValue): void => {
		throw err
	}
}
