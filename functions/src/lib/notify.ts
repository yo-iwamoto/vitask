import { firestore, functions } from './firebase';
import axios from 'axios';

export const notify = async ({ uid, message }: { uid: string; message: string }) => {
  // トークン未発行の場合通知を行わず，エラーを投げる
  const tokenDocData = (await firestore.collection('lineAccessTokens').doc(uid).get()).data();
  if (tokenDocData === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'user is not authorize notify api yet');
  }

  // data.messageをメッセージとして通知する
  const res = await axios
    .post('https://notify-api.line.me/api/notify', new URLSearchParams({ message }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${tokenDocData.lineAccessToken}`,
      },
    })
    .catch((err) => functions.logger.error(err));

  if (!res) {
    return;
  }

  functions.logger.info(`LINE Notification send to user with uid: ${uid}`);
};
