const {
	bot,
	genHydratedButtons,
	mentionMessage,
	enableMention,
	clearFiles,
} = require('../lib/')

bot(
	{
		pattern: 'mention ?(.*)',
		fromMe: true,
		desc: 'To set and Manage mention',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.sendMessage(
				await genHydratedButtons(
					[
						{
							urlButton: {
								text: 'example',
								url: 'https://wa.me/+6282279425257',
							},
						},
						{ button: { id: 'mention on', text: 'ON' } },
						{ button: { id: 'mention off', text: 'OFF' } },
						{ button: { id: 'mention get', text: 'GET' } },
					],
					'Mention Message Manager'
				),
				{},
				'template'
			)
		if (match == 'get') {
			const msg = await mentionMessage()
			if (!msg)
				return await message.sendMessage('_Reply to Mention not Activated._')
			return await message.sendMessage(msg)
		} else if (match == 'on' || match == 'off') {
			await enableMention(match == 'on')
			return await message.sendMessage(
				`_Reply to mention ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableMention(match)
		clearFiles()
		return await message.sendMessage('_Mention Updated_')
	}
)
