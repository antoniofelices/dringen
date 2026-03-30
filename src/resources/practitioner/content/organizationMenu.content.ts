import type { RoutesProps } from '@shared/types/routes.model'
import { Building } from 'lucide-react'
import { MEDPLUM_CONFIG } from '@config/config'

export const organizationMenuTitle = 'Menu Organization'

export const organizationMenu: RoutesProps[] = [
    {
        id: 1,
        icon: Building,
        url: `organization/${MEDPLUM_CONFIG.organizationId}`,
        text: 'Organization',
        orderMenu: 1,
    },
]
