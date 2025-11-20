// packages/core/src/utils/logger.ts
import { ENABLE_DEBUG_LOGS, IS_DEV } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (level === 'error' || level === 'warn') return true;
    return IS_DEV && ENABLE_DEBUG_LOGS;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    ...args: any[]
  ): void {
    const timestamp = new Date().toISOString().substring(11, 19);
    const emoji = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    }[level];

    const prefix = `${emoji} [${timestamp}]`;

    if (level === 'error') {
      console.error(prefix, message, ...args);
    } else if (level === 'warn') {
      console.warn(prefix, message, ...args);
    } else {
      console.log(prefix, message, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      this.formatMessage('debug', message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      this.formatMessage('info', message, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      this.formatMessage('warn', message, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      this.formatMessage('error', message, ...args);

      // In production, send to Sentry
      if (!IS_DEV) {
        // TODO: Send to Sentry when implemented
      }
    }
  }
}

export const logger = new Logger();
