import { firestore, functions } from '../lib/firebase';
import { notify } from '../lib/notify';
import { buildTemplate } from '../lib/template';
import { LectureDocument } from '../types';

const schedule = 'every mon, tue, wed, thu, fri ';

const buildFunction = (time: string, period: number) =>
  functions
    .region('asia-northeast2')
    .pubsub.schedule(schedule + time)
    .onRun(async (_ctx) => {
      const day = new Date().getDay();

      // 呼び出された時刻に終了した講義を取得
      firestore
        .collection('lectures')
        .where('dayId', '==', day)
        .where('period', '==', period)
        .get()
        .then((result) => {
          result.docs.forEach(async (doc) => {
            const data = doc.data() as LectureDocument;
            const sameUserLectures = await firestore
              .collection('lectures')
              .where('dayId', '==', day)
              .where('uid', '==', data.uid)
              .get();
            // 現在終了した講義より後に講義がある場合，離脱
            if (sameUserLectures.docs.map((doc) => (doc.data() as LectureDocument).period > data.period).length) {
              return;
            }

            // LINE Notifyにて通知
            notify({
              uid: data.uid,
              message: buildTemplate(sameUserLectures.docs.map((doc) => doc.data() as LectureDocument)),
            });
          });
        });
    });

/**
 * 各時限ごとに，最終講義が終わったユーザーに通知を送信するスケジュール関数．
 * schedule構文で1日未満の不定期実行が表現できないため，それぞれ別個の関数としてデプロイ．
 */
export const sendNotificationForFirstClass = buildFunction('10:10', 1);
export const sendNotificationForSecondClass = buildFunction('12:00', 2);
export const sendNotificationForThirdClass = buildFunction('14:30', 3);
export const sendNotificationForFourthClass = buildFunction('16:20', 4);
export const sendNotificationForFifthlass = buildFunction('18:10', 5);
export const sendNotificationForSixthClass = buildFunction('20:00', 6);
