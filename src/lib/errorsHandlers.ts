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

export { ConnectionError, ValidationError }
