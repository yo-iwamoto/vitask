import * as functions from 'firebase-functions';

type Env = {
  'calendar-api-key': string;
};

const config = functions.config();
export const env = config['report-manager-dt'] as Env;
