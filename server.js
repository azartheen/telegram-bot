const TelegramBot = require("node-telegram-bot-api");

const token = "";

const bot = new TelegramBot(token, { polling: true });

let users = [];

bot.on("message", (msg) => {
  console.log("incoming user message...");
  const chatId = msg.chat.id;

  /* check if the user is already registered */
  if (
    users.length > 0 &&
    users.find((userInfo) => userInfo.userId === chatId)
  ) {
    for (let i = 0; i < users.length; i++) {
      bot.sendMessage(
        chatId,
        `Dear ${users[i].userName}, what do you think about the following?`
      );
      bot.sendPoll(chatId, "Is Telegram great?", ["Sure", "Of course"]);
    }
  } else {
    bot.sendMessage(chatId, "Press '/register' to register");
    console.log("no user registered");
  }
});

bot.onText(/\/register/, (msg, match) => {
  const chatId = msg.chat.id;

  let userInfo = {
    userId: chatId,
    userName: `${msg.chat.first_name} ${msg.chat.last_name} (${msg.chat.username})`,
  };

  users.push(userInfo); /* save registred users into array */
  console.log(userInfo.userId + " is registered");
  console.table(users);

  bot.sendMessage(
    chatId,
    "User registration has been completed. \n\nType any message to bot."
  );
});