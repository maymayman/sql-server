import {
	createLogger,
	format,
	Logger as LoggerInstance,
	transports,
	addColors
} from "winston";

const nodeEnv = process.env.NODE_ENV;
const customLevels = {
	levels: {
		trace: 5,
		debug: 4,
		info: 3,
		warn: 2,
		error: 1,
		fatal: 0,
	},
	colors: {
		trace: 'white',
		debug: 'green',
		info: 'green',
		warn: 'yellow',
		error: 'red',
		fatal: 'red',
	},
};
    
const formatter = format.combine(
	format.colorize(),
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.splat(),
	format.printf((info) => {
		const { timestamp, level, message, ...meta } = info;
	
		return `${timestamp} [${level}]: ${message} ${
			Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
		}`;
	}),
);
    
class Logger {
	private logger: LoggerInstance;

	constructor() {
		const isProd = nodeEnv !== 'production';
		const prodTransport = new transports.File({
			filename: 'logs/error.log',
			level: 'error',
		});
		const transport = new transports.Console({
			format: formatter,
		});
		this.logger = createLogger({
			level: isProd ? 'trace' : 'error',
			levels: customLevels.levels,
			transports: [isProd ? transport : prodTransport],
		});
		addColors(customLevels.colors);
	}

	trace(msg: any, meta?: any) {
		this.logger.log('trace', msg, meta);
	}

	debug(msg: any, meta?: any) {
		this.logger.debug(msg, meta);
	}

	info(msg: any, meta?: any) {
		this.logger.info(msg, meta);
	}

	warn(msg: any, meta?: any) {
		this.logger.warn(msg, meta);
	}

	error(msg: any, meta?: any) {
		this.logger.error(msg, meta);
	}

	fatal(msg: any, meta?: any) {
		this.logger.log('fatal', msg, meta);
	}
}
    
export const logger = new Logger();
