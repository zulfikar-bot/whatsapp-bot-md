const { bot, getUrl, getJson } = require('../lib/')

bot(
	{
		pattern: 'google ?(.*)',
		fromMe: true,
		desc: 'Google Image Search',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.sendMessage('*Reply to a image*')
		const { result } = await getJson(`
        https://levanter.up.railway.app/google?q=${await getUrl(
					await message.reply_message.downloadAndSaveMediaMessage('google')
				)}`)
		if (!result.length) return await message.sendMessage('_Not found_')
		return await message.sendMessage(result.join('\n'), {
			quoted: message.data,
		})
	}
)
