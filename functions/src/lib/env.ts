import * as functions from 'firebase-functions';

const config = functions.config();
const env = config['vitask-dd803'];

export const ENV = {
  lineCallbackUrl: env.linecallbackurl as string,
  lineCallbackUrlProd: env.linecallbackurlprod as string,
  lineClientSecret: env.lineclientsecret as string,
};
