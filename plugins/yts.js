const {
	bot,
	yts,
	song,
	video,
	addAudioMetaData,
	genListMessage,
} = require('../lib/')
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

bot(
	{
		pattern: 'yts ?(.*)',
		fromMe: true,
		desc: 'YT search',
		type: 'search',
	},
	async (message, match) => {
		if (!match) return await message.sendMessage('*Example : yts baymax*')
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { title, description, metadata } = result
			return await message.sendMessage(
				`*Title :* ${title}\n*Desc :* ${description}\n*Time :* ${metadata.length_seconds}s\n*Views :* ${metadata.view_count}\n*Publish :* ${metadata.publish_date}`
			)
		}

		const result = await yts(match)
		let msg = ''
		result.forEach(
			({ title, description, url, metadata }) =>
				(msg += `• ${title}\nViews : ${metadata.view_count}\nTime : ${metadata.duration.accessibility_label}\nPublished : ${metadata.published}\nDesc : ${description}\nUrl : ${url}\n\n`)
		)
		return await message.sendMessage(msg.trim())
	}
)

bot(
	{
		pattern: 'song ?(.*)',
		fromMe: true,
		desc: 'download yt song',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.sendMessage(
				'*Example : song indila love story/ yt link*'
			)
		const vid = ytIdRegex.exec(match)
		if (vid) {
			const [result] = await yts(vid[1], true)
			const { id, author, title, thumbnail } = result
			return await message.sendMessage(
				await addAudioMetaData(
					await song(id),
					title,
					author,
					'',
					thumbnail.url
				),
				{ quoted: message.data, mimetype: 'audio/mpeg' },
				'audio'
			)
		} else {
			const result = await yts(match)
			return await message.sendMessage(
				genListMessage(
					result.map(({ title, url, metadata }) => ({
						text: title,
						id: `song ${url}`,
						desc: metadata.duration.accessibility_label,
					})),
					`Searched ${match}\nFound ${result.length} results`,
					'DOWNLOAD'
				),
				{},
				'list'
			)
		}
	}
)

bot(
	{
		pattern: 'video ?(.*)',
		fromMe: true,
		desc: 'download yt video',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match)
			return await message.sendMessage('*Example : video dandelions/yt url*')
		const vid = ytIdRegex.exec(match)
		if (!vid) {
			const result = await yts(match)
			match = result[0].id
		} else match = vid[1]
		return await message.sendMessage(
			await video(match),
			{ quoted: message.data },
			'video'
		)
	}
)
