import logger, { LoggerOptions } from "pino";
import dayjs from "dayjs";

const log = logger({
  // prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
} as LoggerOptions);


export default log;
