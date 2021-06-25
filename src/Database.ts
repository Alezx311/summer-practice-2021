export class Database {
	private readonly _url = process.env.DB_URL

	constructor(url: string) {
		this._url = url
	}

  async connect(opt?: any): Promise<any> {
    const connection = 
  }
}
