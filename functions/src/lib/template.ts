import { LectureDocument } from '../types';

export const buildTemplate = (lectures: LectureDocument[]) => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  const defaultFromDate = `${now.getFullYear()}${('0' + (now.getMonth() + 1)).slice(-2)}${('0' + now.getDate()).slice(
    -2
  )}`;
  now.setDate(now.getDate() + 1);
  const defaultToDate = `${now.getFullYear()}${('0' + (now.getMonth() + 1)).slice(-2)}${('0' + now.getDate()).slice(
    -2
  )}`;

  let body = ''
    .concat('\n今日も勉強お疲れ様です！\n')
    .concat('課題が出ているなら、今のうちにカレンダーに登録しましょう！\n')
    .concat('下のリンクからそれぞれの講義の課題を簡単に登録できます。\n');

  lectures.map((item) => {
    body = body
      .concat(`\n${item.name}\n`)
      .concat(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=〆${item.name}レポート&dates=${defaultFromDate}/${defaultToDate}\n`
      );
  });

  return body;
};
