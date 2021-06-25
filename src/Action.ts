export class Action {
  async sendMessage(chatId: number, message: string): Promise<void> {}
  async sendAudio(chatId:number, data: any): Promise<void> {}
  async sendVoice(chatId:number, data: any): Promise<void> {}
  async sendDocument(chatId:number, data: any): Promise<void> {}
  async sendSticker(chatId:number, data: any): Promise<void> {}
  async sendImage(chatId:number, data: any): Promise<void> {}
  async sendMany(chatId:number, data: any): Promise<void> {}
}