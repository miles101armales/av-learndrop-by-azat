import { Scenes, Context } from '/root/av-learndrop-by-azat/node_modules/telegraf/typings/index';


export interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

export interface MySession extends Scenes.WizardSession<MyWizardSession> {
  mySessionProp: number;
  chat_id: number; // id чата
  username: string; // ник пользователя
  phone: string; // указанный номер телефона
  name: string; // имя пользователя
  type: number; // разновидность сцены с отправкой номера
  answer1: string; // ответ на первый вопрос
  answer2: string; // ответ на второй вопрос
}

export interface MyContext extends Context {
  myContextProp: string;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}
