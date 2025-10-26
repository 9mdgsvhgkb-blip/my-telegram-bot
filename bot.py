import os
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

BOT_TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.answer("Привет! Я твой бот. Я онлайн 24/7 на Railway 🚀")

@dp.message_handler()
async def echo(message: types.Message):
    await message.answer(f"Ты сказал: {message.text}")

if __name__ == "__main__":
    executor.start_polling(dp)
