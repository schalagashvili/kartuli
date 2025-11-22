import { SeverityLevel } from '@sentry/core';
import * as Sentry from '@sentry/react-native';

import { ENABLE_DEBUG_LOGS, Env, IS_DEV } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  tag?: string;
  [key: string]: unknown;
}

const IS_PROD_LIKE = Env.APP_ENV === 'production' || Env.APP_ENV === 'preview';

const SENTRY_SEVERITY: Record<LogLevel, SeverityLevel> = {
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (level === 'error' || level === 'warn') return true;
    return IS_DEV && ENABLE_DEBUG_LOGS;
  }

  private formatConsole(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    const timestamp = new Date().toISOString().substring(11, 19);
    const emoji = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    }[level];

    const prefix = `${emoji} [${timestamp}]`;
    const consoleFn = level === 'error' ? console.error : console.warn;

    if (context && Object.keys(context).length > 0) {
      consoleFn(prefix, message, context);
    } else {
      consoleFn(prefix, message);
    }
  }

  private safeAddBreadcrumb(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    if (!IS_PROD_LIKE) return;

    try {
      Sentry.addBreadcrumb({
        category: 'app.log',
        message,
        level: SENTRY_SEVERITY[level],
        data: context,
      });
    } catch {
      // Silent fail — breadcrumb loss is acceptable
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      this.formatConsole('debug', message, context);
    }
    this.safeAddBreadcrumb('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      this.formatConsole('info', message, context);
    }
    this.safeAddBreadcrumb('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      this.formatConsole('warn', message, context);
    }
    this.safeAddBreadcrumb('warn', message, context);

    if (IS_PROD_LIKE) {
      try {
        Sentry.captureMessage(message, {
          level: 'warning',
          extra: context,
        });
      } catch {
        // Silent fail
      }
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorObj = this.normalizeError(error);

    if (this.shouldLog('error')) {
      this.formatConsole('error', message, { ...context, error: errorObj });
    }

    if (IS_PROD_LIKE) {
      try {
        Sentry.withScope((scope) => {
          scope.setExtra('logMessage', message);
          if (context) scope.setExtras(context);
          if (context?.tag) scope.setTag('feature', String(context.tag));

          if (errorObj) {
            Sentry.captureException(errorObj);
          } else {
            Sentry.captureMessage(message, 'error');
          }
        });
      } catch (e) {
        console.warn('Sentry error capture failed', e);
      }
    }
  }

  private normalizeError(error: unknown): Error | undefined {
    if (!error) return undefined;
    if (error instanceof Error) return error;
    if (typeof error === 'string') return new Error(error);

    try {
      return new Error(JSON.stringify(error));
    } catch {
      const type = typeof error;
      const constructor = (error as object)?.constructor?.name ?? 'Unknown';
      return new Error(`[Unstringifiable ${type}: ${constructor}]`);
    }
  }

  child(baseContext: LogContext): ChildLogger {
    return new ChildLogger(this, baseContext);
  }
}

class ChildLogger {
  constructor(
    private parent: Logger,
    private baseContext: LogContext
  ) {}

  private merge(context?: LogContext): LogContext {
    return { ...this.baseContext, ...context };
  }

  debug(message: string, context?: LogContext): void {
    this.parent.debug(message, this.merge(context));
  }

  info(message: string, context?: LogContext): void {
    this.parent.info(message, this.merge(context));
  }

  warn(message: string, context?: LogContext): void {
    this.parent.warn(message, this.merge(context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    this.parent.error(message, error, this.merge(context));
  }
}

export const logger = new Logger();

export const rideLogger = logger.child({ tag: 'ride' });
export const paymentLogger = logger.child({ tag: 'payment' });
export const locationLogger = logger.child({ tag: 'location' });
export const authLogger = logger.child({ tag: 'auth' });
