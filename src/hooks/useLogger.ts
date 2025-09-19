import { logger } from '@/lib/Logger'

export const useLogger = (componentName: string) => {
    const logError = (message: string, error?: unknown, action?: string) => {
        logger.error(message, error, {
            component: componentName,
            action,
        })
    }

    const logSuccess = (message: string, action?: string) => {
        logger.info(message, {
            component: componentName,
            action,
        })
    }

    return { logError, logSuccess }
}
