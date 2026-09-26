export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/config.js') {
      const config = {
        defaultBackendURL: env.DEFAULT_BACKEND_URL || '',
      }
      if (env.GITHUB_TOKEN) config.githubToken = env.GITHUB_TOKEN
      return new Response(`window.__METACUBEXD_CONFIG__ = ${JSON.stringify(config)}\n`, {
        headers: {
          'content-type': 'text/javascript; charset=utf-8',
          'cache-control': 'no-store',
        },
      })
    }
    return env.ASSETS.fetch(request)
  },
}
