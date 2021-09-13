const {Telegraf, Markup} = require('telegraf')
require('dotenv').config()
const consts = require('./const')
const mysql = require('mysql')

const bot = new Telegraf(process.env.BOT_TOKEN)

let options = {}

bot.help(ctx => {
    ctx.reply(consts.commands)
})

bot.start(async ctx => {
   try{
        await ctx.replyWithHTML('Tilni tanlang | Выберите язык', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Uz', 'lang_uz'), Markup.button.callback('Ру', 'lang_ru')]
            ]
        ))
    }
    catch (err) {
        console.error(err) 
    }
})

bot.action('lang_uz', async ctx => {
    try{
        options.lang = 'uz'
        await ctx.answerCbQuery()
        await ctx.reply("O'zbek tili tanlandi")
        await ctx.deleteMessage()
        await ctx.reply("Atirlar kim uchun?", Markup.inlineKeyboard(
            [
                [Markup.button.callback('Erkaklar uchun', 'men'), Markup.button.callback('Ayollar uchun', 'women')]
            ]
            ))
    }
    catch (err){
        console.error(err)
    }
})

bot.action('lang_ru', async ctx => {
    try{
        options.lang = 'ru'
        await ctx.answerCbQuery()
        await ctx.reply("Выбран русский язык")
        await ctx.deleteMessage()
        await ctx.reply("Для кого духи?", Markup.inlineKeyboard(
            [
                [Markup.button.callback('Для мужчин', 'men'), Markup.button.callback('Для женщин', 'women')]
            ]
            ))
    }
    catch (err){
        console.error(err)
    }
})

bot.action('men', async ctx => {
    try{
        if (options.lang === 'uz'){
            const connect = mysql.createConnection(consts.connectOptions)
            await connect.connect(async err => {
                if(err) throw err
                else {
                    await connect.query('SELECT * FROM eau_de_parfums WHERE `category` = 1', async (err, data) => {
                        if(err) throw err
                        else{  
                            let parfums = []
                            let limit = 10
                            for (const obj of data) {
                                parfums.push({type: 'photo', media: {source: obj.img}})
                                if(parfums.length == limit){
                                    await ctx.replyWithMediaGroup(parfums)
                                    parfums = []
                                }
                            }
                            await ctx.replyWithMediaGroup(parfums)
                            await ctx.answerCbQuery()
                        }
                    })
                    await connect.end()
                    await ctx.reply("Erkaklar atirlari:")
                }
            })
        }

        else if (options.lang === 'ru'){
            const connect = mysql.createConnection(consts.connectOptions)
            await connect.connect(async err => {
                if(err) throw err
                else {
                    await connect.query('SELECT * FROM eau_de_parfums WHERE `category` = 1', async (err, data) => {
                        if(err) throw err
                        else{  
                            let parfums = []
                            let limit = 10
                            for (const obj of data) {
                                parfums.push({type: 'photo', media: {source: obj.img}})
                                if(parfums.length == limit){
                                    await ctx.replyWithMediaGroup(parfums)
                                    parfums = []
                                }
                            }
                            await ctx.replyWithMediaGroup(parfums)
                            await ctx.answerCbQuery()
                        }
                    })
                    await connect.end()
                    await ctx.reply("Мужские духи:")
                }
            })
        }
    }
    catch (err){
        console.error(err)
    }
})

bot.action('women', async ctx => {
    try{
        if (options.lang === 'uz'){
            const connect = mysql.createConnection(consts.connectOptions)
            await connect.connect(async err => {
                if(err) throw err
                else {
                    await connect.query('SELECT * FROM eau_de_parfums WHERE `category` = 2', async (err, data) => {
                        if(err) throw err
                        else{  
                            let parfums = []
                            let limit = 10
                            for (const obj of data) {
                                parfums.push({type: 'photo', media: {source: obj.img}})
                                if(parfums.length == limit){
                                    await ctx.replyWithMediaGroup(parfums)
                                    parfums = []
                                }
                            }
                            await ctx.replyWithMediaGroup(parfums)
                            await ctx.answerCbQuery()
                        }
                    })
                    await connect.end()
                    await ctx.reply("Ayollar atirlari:")
                }
            })
        }

        else if (options.lang === 'ru'){
            const connect = mysql.createConnection(consts.connectOptions)
            await connect.connect(async err => {
                if(err) throw err
                else {
                    await connect.query('SELECT * FROM eau_de_parfums WHERE `category` = 2', async (err, data) => {
                        if(err) throw err
                        else{  
                            let parfums = []
                            let limit = 10
                            for (const obj of data) {
                                parfums.push({type: 'photo', media: {source: obj.img}})
                                if(parfums.length == limit){
                                    await ctx.replyWithMediaGroup(parfums)
                                    parfums = []
                                }
                            }
                            await ctx.replyWithMediaGroup(parfums)
                            await ctx.answerCbQuery()
                        }
                    })
                    await connect.end()
                    await ctx.reply("Женские духи:")
                }
            })
        }
    }
    catch (err){
        console.error(err)
    }
})

bot.launch()


// ==================================
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
