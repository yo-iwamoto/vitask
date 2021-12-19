import { calendar_v3 } from '@googleapis/calendar';

type Args = {
  reportName: string;
  lectureName: string;
  date: string; // yyyy-mm-dd
};

export const buildEvent = ({ lectureName, reportName, date }: Args): calendar_v3.Schema$Event => {
  return {
    summary: `〆 ${lectureName} ${reportName}`,
    start: { date },
    end: { date },
    reminders: { overrides: [{ method: 'popup', minutes: 360 }] },
    visibility: 'confidential',
  };
};
