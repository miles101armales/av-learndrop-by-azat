import { MyContext } from '../interfaces/context.interface';
import { Scene } from '../classes/scene.class';
import { Telegraf, Composer, Scenes, Markup } from 'telegraf';
import { WizardScene } from 'telegraf/typings/scenes';

export class FirstScene extends Scene {
	public scene: WizardScene<MyContext>
	constructor(public bot: Telegraf<MyContext>) {
		super(bot)
	}

	handle(): void {
		const answer1Handler = new Composer<MyContext>();
		answer1Handler.action('0-5',async (ctx) => {
			ctx.session.answer1 = 'от 0 до 5к';
			ctx.reply('Вопрос 1️⃣ → 2️⃣:\n\nСколько времени в день вы готовы уделять дропам?', {
				reply_markup: {
					inline_keyboard: [
						[{text: 'до 15 минут в день', callback_data: '15'}],
						[{text: 'до 1 часа в день', callback_data: '15-60'}],
						[{text: 'больше 1 часа в день', callback_data: '60'}],
					]
				}
			})
			return ctx.wizard.next();

		})
		answer1Handler.action('50-100', async ctx => {
			ctx.session.answer1 = 'от 50 до 100к';
			ctx.reply('Вопрос 1️⃣ → 2️⃣:\n\nСколько времени в день вы готовы уделять дропам?', {
				reply_markup: {
					inline_keyboard: [
						[{text: 'до 15 минут в день', callback_data: '15'}],
						[{text: 'до 1 часа в день', callback_data: '15-60'}],
						[{text: 'больше 1 часа в день', callback_data: '60'}],
					]
				}
			})
			return ctx.wizard.next();
		})
		answer1Handler.action('100', async ctx => {
			ctx.session.answer1 = 'от 100к';
			ctx.reply('Вопрос 1️⃣ → 2️⃣:\n\nСколько времени в день вы готовы уделять дропам?', {
				reply_markup: {
					inline_keyboard: [
						[{text: 'до 15 минут в день', callback_data: '15'}],
						[{text: 'до 1 часа в день', callback_data: '15-60'}],
						[{text: 'больше 1 часа в день', callback_data: '60'}],
					]
				}
			})
			return ctx.wizard.next();
		})

		const answer2Handler = new Composer<MyContext>();
		answer2Handler.action('15', async (ctx) => {
			ctx.session.answer2 = 'до 15 минут в день';
			ctx.reply('Урок сформирован. Нажмите кнопку, чтобы начать загрузку!', {reply_markup: { inline_keyboard: [[{text: 'Получить!', callback_data: 'callback'}]]}})
			return ctx.wizard.next();
		})
		answer2Handler.action('15-60', async ctx => {
			ctx.session.answer2 = 'до 1 часа в день';
			ctx.reply('Урок сформирован. Нажмите кнопку, чтобы начать загрузку!', {reply_markup: { inline_keyboard: [[{text: 'Получить!', callback_data: 'callback'}]]}})
			return ctx.wizard.next();
		})
		answer2Handler.action('60', async ctx => {
			ctx.session.answer2 = 'больше 1 часа в день';
			ctx.reply('Урок сформирован. Нажмите кнопку, чтобы начать загрузку!', {reply_markup: { inline_keyboard: [[{text: 'Получить!', callback_data: 'callback'}]]}})
			return ctx.wizard.next();
		})

		this.scene = new Scenes.WizardScene(
			'first-scene',
			async ctx => {
				ctx.reply('Загрузка информации по действующим дропам...')
				ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/videos/video2.mp4' }, {
					width: 720,
					height: 1280,
					reply_markup: {
						inline_keyboard: [[{text: 'Узнать подходящий вам дроп', callback_data: 'callback'}]]
					}
				});
				return ctx.wizard.next();
			},
			async ctx => {
				ctx.reply('Вопрос 1️⃣ → 2:\n\nКакую сумму вы собираетесь использовать для работы с дропами?', {
					reply_markup: {
						inline_keyboard: [
							[{text: 'от 0 до 50.000', callback_data: '0-5'}],
							[{text: 'от 50.000 до 100.000', callback_data: '50-100'}],
							[{text: 'от 100.000', callback_data: '100'}],
						]
					}
				})

				return ctx.wizard.next();
			},
			answer1Handler,
			answer2Handler,
			async ctx => {
				ctx.reply('Ваш урок уже формируется! Ожидайте...')
				switch (ctx.session.answer1) {
					case 'от 0 до 5к':
						await ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/videos/berachain.mp4' }, {
							width: 720,
							height: 1280,
							caption: '☝️ Посмотрите скорее видео и вы узнаете:\n\n' +
 							'1️⃣ Секреты, которые не вошли в эфир\n' +
							'2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)\n' +
							'3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности'
						});
						await ctx.reply('Нажмите, чтобы получить инструкцию', 
							Markup.inlineKeyboard([
								Markup.button.url('Получить инструкцию Berachain', 'https://wa.me/79870577014?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9D%D1%83%D0%B6%D0%BD%D0%B0%20%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%20berachain')
							])
						)
						break;

					case 'от 50 до 100к':
						await ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/videos/zora.mp4' }, {
							width: 720,
							height: 1280,
							caption: '☝️ Посмотрите скорее видео и вы узнаете:\n\n' +
 							'1️⃣ Секреты, которые не вошли в эфир\n' +
							'2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)\n' +
							'3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности'
						});
						await ctx.reply('Нажмите, чтобы получить инструкцию', 
							Markup.inlineKeyboard([
								Markup.button.url('Получить инструкцию Zora', 'https://wa.me/79870577014?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9D%D1%83%D0%B6%D0%BD%D0%B0%20%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%20zora')
							])
						)
						break;

					case 'от 100к':
						await ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/videos/linea.mp4' }, {
							width: 720,
							height: 1280,
							caption: '☝️ Посмотрите скорее видео и вы узнаете:\n\n' +
 							'1️⃣ Секреты, которые не вошли в эфир\n' +
							'2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)\n' +
							'3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности'
						});
						await ctx.reply('Нажмите, чтобы получить инструкцию', 
							Markup.inlineKeyboard([
								Markup.button.url('Получить инструкцию Linea', 'https://wa.me/79870577014?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9D%D1%83%D0%B6%D0%BD%D0%B0%20%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%20linea')
							])
						)
						break;
				
					default:
						break;
				}
				ctx.scene.leave();
			},
		)
	}
}