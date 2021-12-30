import { firestore, functions } from '../lib/firebase';
import axios from 'axios';

export const revokeAccessToken = functions.region('asia-northeast2').https.onCall(async (_data, ctx) => {
  // 認証されていないリクエストを弾く
  const uid = ctx.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'user is not authenticated');
  }

  // トークンが未発行の場合失効処理を行わず，エラーを投げる
  const tokenDoc = await firestore.collection('lineAccessTokens').doc(uid).get();
  const tokenDocData = tokenDoc.data();
  if (!tokenDoc.exists || tokenDocData === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'user is not authorize notify api yet');
  }

  // トークンの失効
  await axios
    .post('https://notify-api.line.me/api./revoke', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${tokenDocData.lineAccessToken}`,
      },
    })
    .catch((err) => {
      functions.logger.error(err);
      throw new functions.https.HttpsError('unknown', 'unknwon error uccurs while requesting LINE access token');
    });

  // トークンを記録したドキュメントを削除
  tokenDoc.exists && (await tokenDoc.ref.delete());
});
