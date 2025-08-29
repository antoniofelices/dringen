import { useThemeContext } from '@/hooks/useThemeContext'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@data/settings/appearance'

const Appearance = () => {
    const { setTheme } = useThemeContext()

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-6">
                    <div
                        onClick={() => setTheme('light')}
                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        {content.textLight}
                    </div>
                    <div
                        onClick={() => setTheme('dark')}
                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        {content.textDark}
                    </div>
                    <div
                        onClick={() => setTheme('system')}
                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        {content.textSystem}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Appearance
