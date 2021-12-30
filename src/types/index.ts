export type Lecture = {
  id: string;
  uid: string;
  name: string;
  dayId: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  period: 1 | 2 | 3 | 4 | 5 | 6;
};
