const HEADERSCONFIG = {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.APP_API_TOKEN || ''}`,
}

const MEDPLUM_CONFIG = {
    baseUrl: import.meta.env.APP_MEDPLUM_BASE_URL || 'https://api.medplum.com',
    clientId: import.meta.env.APP_MEDPLUM_CLIENT_ID || '',
    clientSecret: import.meta.env.APP_MEDPLUM_CLIENT_SECRET,
    projectId: import.meta.env.APP_MEDPLUM_PROJECT_ID,
    organizationId: import.meta.env.APP_MEDPLUM_ORGANIZATION_ID,
}

export { HEADERSCONFIG, MEDPLUM_CONFIG }
