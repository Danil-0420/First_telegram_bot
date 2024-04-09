const TelegramApi = require('node-telegram-bot-api')
const {gameForm, playAgain} = require('./option')
const token = '6568155103:AAGxoOBGTGh47iF-alMGp3QmoayYUU6z0cM'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) =>{
    await bot.sendMessage(chatId, `i guessed a number between 0 and 9`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Guess`, gameForm)
}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: `Welcome`},
        {command: '/info', description: `some info`},
        {command: '/game', description: `play mini game`}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === '/start'){
            await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/7a0/e2e/7a0e2ef1-ff94-4317-a188-4bead80d1756/1.webp`)
            return  bot.sendMessage(chatId, `Welcome to the bowawo bot`)
        }
        else if(text === '/info'){
            return  bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
        }
        else if(text === '/game'){
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, `Nie rozumiem ci mordo`)

    })


    bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId)
        }
        const number = parseInt(data)
        if(number === chats[chatId]){
            return bot.sendMessage(chatId, `Let's gooo, it was number ${chats[chatId]}`, playAgain)
        } else{
            return bot.sendMessage(chatId, `No, that's wrong, the right number is ${chats[chatId]}`, playAgain)
        }

    })
}

start()