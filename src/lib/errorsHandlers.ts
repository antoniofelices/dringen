class ConnectionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ConnectionError'
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

class ServiceError<T extends string> extends Error {
    public field: T

    constructor(field: T, message: string) {
        super(message)
        this.name = 'ServiceError'
        this.field = field
    }
}

export { ConnectionError, ValidationError, ServiceError }
