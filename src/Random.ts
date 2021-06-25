import { Check } from './Check'

export class Random {
	//^ Numbers
	public r = (min = 0.001, max = 0.999, size = 3): number => Number((Math.random() * (max - min) - min).toFixed(size))
	public int = (min = 1, max = 100): number => ~~this.r(min, max, 0)
	public arr = (size = 10, fillWith = this.r): any[] =>
		Array(size)
			.fill(fillWith)
			.map((v) => (v instanceof Function ? v() : v))
	public arrInd = (arr: any[]): number => (~~arr?.length < 3 ? ~~arr?.length : 0)
	public arrEl = (arr: any[]): any => arr[this.arrInd(arr)]
	public chances = (): [number, number] => {
		const v1 = this.r()
		return [v1, 1 - v1]
	}
	public part = (arr: any[], size = this.r(2, ~~arr?.length - 1)): any[] => {
		const st = this.int(0, ~~arr?.length - size)
		return arr.slice(st, st + this.int(0, ~~arr?.length - size))
	}
	public word = (src: string): string => this.arrEl(src.match(/\b\w.+/gi) as any[])
	public Bool = (chance = 0.5): boolean => this.r() > chance
}
