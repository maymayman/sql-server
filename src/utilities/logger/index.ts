import {
	createLogger,
	format,
	Logger as LoggerInstance,
	LoggerOptions,
	transports
} from "winston";

const nodeEnv = process.env.NODE_ENV;

export interface Logger {
    debug(message: string, metaData?: any): void;

    verbose(message: string, metaData?: any): void;

    info(message: string, metaData?: any): void;

    warn(message: string, metaData?: any): void;

    error(message: string, metaData?: any): void;
};

let winstonLoggerInstance: LoggerInstance;

const initWinstonLoggerInstance = (options: LoggerOptions): LoggerInstance => {
    if (!winstonLoggerInstance) {
        winstonLoggerInstance = createLogger(options);
    }

    return winstonLoggerInstance;
}

class WinstonLogger implements Logger {
    private instance: LoggerInstance;

    constructor() {
        let options: LoggerOptions;

        switch (nodeEnv) {
            case 'production': {
                options = {
                    level: "info",
                    format: format.json(),
                    transports: [new transports.Console()],
                };
                break;
            }
            case 'development': {
                options = {
                    level: "debug",
                    format: format.simple(),
                    transports: [new transports.Console()],
                };
                break;
            }
            default: {
                options = {
                    level: "info",
                    format: format.simple(),
                    transports: [new transports.Console()],
                };
            }
        }

        this.instance = initWinstonLoggerInstance(options);
    }

    public debug(message: string, metaData?: any): void {
        this.instance.log("debug", message, this.buildMetaData(metaData));
    }

    public verbose(message: string, metaData?: any): void {
        this.instance.log("verbose", message, this.buildMetaData(metaData));
    }

    public info(message: string, metaData?: any): void {
        this.instance.log("info", `Logger: ${message}`, this.buildMetaData(metaData));
    }

    public warn(message: string, metaData?: any): void {
        this.instance.log("warn", message, this.buildMetaData(metaData));
    }

    public error(message: string, metaData?: any): void {
        this.instance.log("error", message, this.buildMetaData(metaData));
    }

    private buildMetaData(metaData: any): object {

        return {message: metaData};
    }
};

export default new WinstonLogger();
