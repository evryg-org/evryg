import { NotFoundPage } from 'nextra-theme-docs'
import { SuggestedPages } from '../../components/SuggestedPages'

export default function NotFound() {
  return (
    <NotFoundPage content="Submit an issue" labels="broken-link">
      <h1>Page not found</h1>
      <SuggestedPages />
    </NotFoundPage>
  )
}
