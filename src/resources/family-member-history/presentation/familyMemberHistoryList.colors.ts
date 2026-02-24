const statusColor: Record<string, string> = {
    completed: 'text-green-400',
    partial: 'text-yellow-400',
    'health-unknown': 'text-gray-400',
    'entered-in-error': 'text-red-400',
}

const statusDotColor: Record<string, string> = {
    completed: 'bg-green-400',
    partial: 'bg-yellow-400',
    'health-unknown': 'bg-gray-400',
    'entered-in-error': 'bg-red-400',
}

export { statusColor, statusDotColor }
