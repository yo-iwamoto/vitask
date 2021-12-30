import { auth, firestore, functions } from '../lib/firebase';
import type { SendMailOptions } from '../lib/mail';
import { sendMail } from '../lib/mail';
import { buildTemplate } from '../lib/template';
import { LectureDocument } from '../types';

/**
 * 現在時刻から，曜日id, 終了時限を求めて返す
 */
const calcCurrentDayAndPeriod = () => {
  const now = new Date();

  const day = now.getDay();

  const period = (() => {
    switch (now.getHours()) {
      case 10:
        return 1;
      case 12:
        return 2;
      case 14:
        return 3;
      case 16:
        return 4;
      case 18:
        return 5;
      case 20:
        return 6;
      default:
        throw new functions.https.HttpsError('aborted', 'function was called on invalid schedule');
    }
  })();

  return { day, period };
};

export const sendNotificationEmail = functions.pubsub
  .schedule('every mon, tue, wed, thu, fri 10:10, 12:00, 14:30, 16:20, 18:10, 20:00')
  .onRun(async (_ctx) => {
    const { day, period } = calcCurrentDayAndPeriod();

    // 呼び出し時点で終了した講義のドキュメントを取得
    const lectures = await firestore
      .collection('lectures')
      .where('dayId', '==', day)
      .where('period', '==', period)
      .get();

    const options: SendMailOptions[] = [];

    lectures.docs.forEach(async (doc) => {
      try {
        // 現在終了した講義がその日の最後の講義でなければ無視
        const data = doc.data() as LectureDocument;
        const sameUserLectures = await firestore.collection('lectures').where('uid', '==', data.uid).get();
        const restLectures = sameUserLectures.docs.filter(
          (doc) => (doc.data() as LectureDocument).period > data.period
        );
        if (restLectures.length !== 0) {
          return;
        }

        const email = (await auth.getUser(data.uid)).email;
        if (!email) {
          throw new functions.https.HttpsError('aborted', 'user has no email');
        }

        // メール送信オプション (宛先，件名，本文を登録)
        options.push({
          to: email,
          subject: '【vitask】課題の登録',
          text: buildTemplate(sameUserLectures.docs.map((l) => l.data() as LectureDocument)),
        });
      } catch (err) {
        functions.logger.error(err);
      }
    });

    // 登録された送信オプションを元に1件ずつメールを送信
    options.forEach((option) => {
      sendMail(option);
      functions.logger.info(`email sent to ${option.to} as ${new Date().toLocaleString()}`);
    });
  });
