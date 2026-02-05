type LogLevel = 'error' | 'warn' | 'info' | 'debug'

type LogContext = {
    component?: string
    action?: string
    userId?: string
    patientId?: string
    [key: string]: string | number | boolean | null | undefined
}

type LogConfig = {
    enableConsole: boolean
    minLevel: LogLevel
}

class Logger {
    private config: LogConfig
    private isDevelopment: boolean

    constructor() {
        this.isDevelopment = import.meta.env.DEV

        this.config = {
            enableConsole: this.isDevelopment,
            minLevel: 'debug',
        }
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: Record<LogLevel, number> = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        }

        return levels[level] >= levels[this.config.minLevel]
    }

    private logToConsole(
        level: LogLevel,
        message: string,
        error?: Error | unknown,
        context?: LogContext
    ) {
        if (!this.config.enableConsole || !this.shouldLog(level)) return

        const timestamp = new Date().toISOString()
        const contextString = context ? JSON.stringify(context, null, 2) : ''

        switch (level) {
            case 'error':
                console.group(`[${timestamp}] ERROR: ${message}`)
                if (error) {
                    console.error('Error details:', error)
                    if (error instanceof Error && error.stack) {
                        console.error('Stack trace:', error.stack)
                    }
                }
                if (contextString) {
                    console.error('Context:', context)
                }
                console.groupEnd()
                break

            case 'warn':
                console.group(`[${timestamp}] WARN: ${message}`)
                if (error) console.warn('Warning details:', error)
                if (contextString) console.warn('Context:', context)
                console.groupEnd()
                break

            case 'info':
                console.group(`[${timestamp}] INFO: ${message}`)
                if (contextString) console.info('Context:', context)
                console.groupEnd()
                break

            case 'debug':
                console.group(`[${timestamp}] DEBUG: ${message}`)
                if (contextString) console.debug('Context:', context)
                console.groupEnd()
                break
        }
    }

    error(message: string, error?: unknown, context?: LogContext) {
        this.logToConsole('error', message, error, context)
    }

    warn(message: string, error?: unknown, context?: LogContext) {
        this.logToConsole('warn', message, error, context)
    }

    info(message: string, context?: LogContext) {
        this.logToConsole('info', message, undefined, context)
    }

    debug(message: string, context?: LogContext) {
        this.logToConsole('debug', message, undefined, context)
    }

    time(label: string) {
        if (this.isDevelopment) {
            console.time(`${label}`)
        }
    }

    timeEnd(label: string) {
        if (this.isDevelopment) {
            console.timeEnd(`${label}`)
        }
    }

    table(data: Record<string, unknown> | unknown[], label?: string) {
        if (this.isDevelopment) {
            if (label) console.log(`${label}:`)
            console.table(data)
        }
    }
}

export const logger = new Logger()
