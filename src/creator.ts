export interface CreatorOptions {
	size?: number
	source?: any[]
	filterBy?: Function
	mapBy?: Function
	reduceBy?: Function
}

export class Creator {
	text(opt?: CreatorOptions) {
		const result = 'text'

		return result
	}

	button(opt?: CreatorOptions) {
		const result = 'button'

		return result
	}

	message(opt?: CreatorOptions) {
		const result = 'message'

		return result
	}

	voice(opt?: CreatorOptions) {
		const result = 'voice'

		return result
	}

	audio(opt?: CreatorOptions) {
		const result = 'audio'

		return result
	}

	image(opt?: CreatorOptions) {
		const result = 'image'

		return result
	}

	sticker(opt?: CreatorOptions) {
		const result = 'sticker'

		return result
	}
}
