export class Check {
	public isValue = (v: any): boolean => ~~v !== 0
	public hasLength = (v: any): boolean => !!v?.length
	public isLength = (v: any, min: number): boolean => ~~v?.length >= ~~min
}
