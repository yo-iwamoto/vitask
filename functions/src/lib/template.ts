import { LectureDocument } from '../types';

export const buildTemplate = (lectures: LectureDocument[]) => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  const defaultFromDate = `${now.getFullYear()}${('0' + now.getMonth()).slice(-2)}${('0' + now.getDate()).slice(-2)}`;
  now.setDate(now.getDate() + 1);
  const defaultToDate = `${now.getFullYear()}${('0' + now.getMonth()).slice(-2)}${('0' + now.getDate()).slice(-2)}`;

  let body = ''
    .concat('<body style="padding-inline: 30px;">')
    .concat('<h1>vitask</h1>')
    .concat('<p>今日も勉強お疲れ様です！</p>')
    .concat('<p>課題が出ているなら、今のうちにカレンダーに登録しましょう！</p>')
    .concat('<p>下のリンクからそれぞれの講義の課題を簡単に登録できます。</p>');

  lectures.map((item) => {
    body = body
      .concat(`<p style="font-weight: bold;">${item.name}</p>`)
      .concat(
        `<a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=〆${item.name}レポート&dates=${defaultFromDate}/${defaultToDate}" target="_blank" rel="noopener noreferrer">Googleカレンダーに登録</a>`
      );
  });

  body = body.concat('</body>');

  return body;
};
