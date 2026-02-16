import { TelegramPost } from "@/types/telegram-post";

import photo1 from "@/components/telegram_posters/photo-1.jpg";
import photo2 from "@/components/telegram_posters/photo-2.jpg";
import photo3 from "@/components/telegram_posters/photo-3.jpg";

export const TELEGRAM_POSTS: TelegramPost[] = [
  {
    id: "1",
    category: "Update",
    image: photo1.src,
    text: `В мастерской сейчас так❤️: тишина после творчества, готовые работы на полке ждут своих хозяев, а за окном холодная метель и манят домашние огни🥺`,
    timestamp: "2 часа назад",
  },
  {
    id: "2",
    category: "Update",
    image: photo2.src,
    text: `❤️Совсем скоро весенние праздники❤️

А значит, отличный повод дарить что-то особенное интерьерное📍

Тарелочки с росписью — гранат, лимон, ботаника — каждая уникальна и расписана вручную.
#керамика #ручнаяработа 

Эти тарелочки уже готовы 💌
Забронировать можно прямо в сообщениях💌`,
    timestamp: "Вчера",
  },
  {
    id: "3",
    category: "Update",
    image: photo3.src,
    text: `Пара преподавателей говорили мне: «Рисуй так, как надо, как сказали!»

​Говорили: «У тебя штриховка — "солома", твои работы видно за версту, можешь даже не подписывать. Много теней, рефлексов — перебор!»

​А я стояла и думала: а пусть эту штриховку даже с космоса видно будет🌟`,
    timestamp: "22 ноя",
  },
  {
    id: "4",
    category: "Announcement",
    text: "Теперь доступна доставка по всему миру для наших праздничных коллекций!",
    timestamp: "20 ноя",
    telegramUrl: "#",
  },
];
