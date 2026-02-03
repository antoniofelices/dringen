import { useThemeContext } from '@shared/hooks/useThemeContext'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import dark from '@/assets/images/dark.webp'
import light from '@/assets/images/light.webp'
import system from '@/assets/images/system.svg'
import content from './Appearance.content'

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
                <div className="grid grid-cols-3 gap-8">
                    <div
                        onClick={() => setTheme('light')}
                        className="rounded-lg cursor-pointer"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        <img
                            src={light}
                            alt={content.altImageLight}
                            className="blur-[1px]"
                        />
                        <p className="font-black mt-4">{content.textLight}</p>
                    </div>
                    <div
                        onClick={() => setTheme('dark')}
                        className="rounded-lg cursor-pointer"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        <img
                            src={dark}
                            alt={content.altImageDark}
                            className="blur-[1px]"
                        />
                        <p className="font-black mt-4">{content.textDark}</p>
                    </div>
                    <div
                        onClick={() => setTheme('system')}
                        className="rounded-lg cursor-pointer"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                            }
                        }}
                    >
                        <img
                            src={system}
                            alt={content.altImageSystem}
                            className="blur-[1px]"
                        />
                        <p className="font-black mt-4">{content.textSystem}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Appearance
