import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Error404 from '@pages/Error'

vi.mock('@tanstack/react-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('Error404', () => {
    it('Should render the title', () => {
        render(<Error404 />)
        expect(screen.getByRole('heading')).toHaveTextContent('We are lost')
    })
})
