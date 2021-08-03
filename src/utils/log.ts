import { Debugout } from 'debugout.js';

const uLog = new Debugout();

export const log = (v: any) => {
  uLog.log(v);
};
