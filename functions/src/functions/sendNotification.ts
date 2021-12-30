import { functions } from '../lib/firebase';
import { notify } from '../lib/notify';

type Data = {
  message: string;
};

export const sendNotification = functions.https.onCall(async (data: Data, ctx) => {
  // 認証されていないリクエストを弾く
  const uid = ctx.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'user is not authenticated');
  }

  notify({ uid, ...data });
});
