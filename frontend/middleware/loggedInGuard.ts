import { Middleware } from '@nuxt/types'

const loggedInGuard: Middleware = ({ $auth }) => {
  const authStatus = $auth.check()

  if ($auth.$state.loggedIn && !authStatus.valid) {
    $auth.logout()
    window.location.replace('/login')
  }
}

export default loggedInGuard
