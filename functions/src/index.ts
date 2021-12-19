import { env } from './config/env';
import { buildEvent } from './utils/event';
import * as functions from 'firebase-functions';
import { google } from 'googleapis';

const getClient = () => {
  const auth = new google.auth.GoogleAuth({ scopes: 'https://www.googleapis.com/auth/calendar.events' });
  return google.calendar({ version: 'v3', auth });
};

type InsertEventData = {
  oauthAccessToken: string;
  event: {
    reportName: string;
    lectureName: string;
    date: string;
  };
};

export const insertEvent = functions.https.onCall(async (data: InsertEventData, ctx) => {
  const calendar = getClient();

  await calendar.events
    .insert({
      calendarId: 'primary',
      key: env['calendar-api-key'],
      oauth_token: data.oauthAccessToken,
      requestBody: buildEvent(data.event),
    })
    .catch((err) => {
      console.log(err);
    });
});
