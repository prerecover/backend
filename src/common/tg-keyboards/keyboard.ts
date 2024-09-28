import { TelegramInlineKeyboardMarkup, TelegramInlineKeyboardButton } from 'nestjs-telegram';

const buttonApproove: TelegramInlineKeyboardButton = {
    text: 'Подтвердить',
};
const buttonReject: TelegramInlineKeyboardButton = {
    text: 'Отклонить',
};

export const AppointmentKeyboard: TelegramInlineKeyboardMarkup = {
    inline_keyboard: [[buttonApproove, buttonReject]],
};
