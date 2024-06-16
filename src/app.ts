import { MyContext } from './interfaces/context.interface';
import { Command } from './classes/command.class';
import { Scene } from './classes/scene.class';
import { ConfigService } from './utils/config/config.service';
import { LoggerService } from './utils/logger/logger.service';
import { FirstScene } from './scenes/first.scene';
import { SecondScene } from './scenes/second.scene';
import { ThirdScene } from './scenes/third.scene';
import { Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';

export class Bot {
	bot: Telegraf<MyContext>;
	stage: any;
	commands: Command[] = [];
	scenes: Scene[] = [];
	scenesNames: Scenes.WizardScene<MyContext>[] = [];

	constructor(
		private readonly configService: ConfigService,
		private readonly loggerService: LoggerService,
	) {
		this.bot = new Telegraf<MyContext>(this.configService.get('API_TOKEN_TEST'));
		this.bot.use(
			new LocalSession({ database: 'sessions.json' })
			.middleware()
		);
	}

	init() {
		try {
			this.commands = [
				// new StartCommand(this.bot),
			];
			for (const command of this.commands) {
				command.handle();
			}

			this.scenes = [
				new FirstScene(this.bot),
				new SecondScene(this.bot),
				new ThirdScene(this.bot),
			];
			for (const scene of this.scenes) {
				scene.handle();
				this.scenesNames.push(scene.scene);
			}
			const stage = new Scenes.Stage(this.scenesNames);
			this.bot.use(stage.middleware());

			this.bot.launch();
			this.loggerService.log('Bot init success');

			this.bot.start(ctx => {
				ctx.session.type = Math.floor(Math.random() * 3) + 1;
				ctx.session.chat_id = ctx.chat.id;
				ctx.session.name = ctx.from.first_name;
				ctx.session.username = ctx.from.username;
				if(ctx.session.type === 1) {
					ctx.scene.enter('first-scene')
				} else if(ctx.session.type === 2) {
					ctx.scene.enter('second-scene')
				} else if(ctx.session.type === 3) {
					ctx.scene.enter('third-scene')
				} else {
					ctx.reply('Ошибка работы бота. Повторите попытку\n\n/start')
				}
			})

			
		} catch (error) {
			this.loggerService.error(error);
		}
	}
}

const bot = new Bot(new ConfigService, new LoggerService);
bot.init();