import NextApp from 'next/app'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'
import Layout from '../components/Layout'
import Head from 'next/head'
import nookies from 'nookies'

// dev fix for css loader
if (process.env.NODE_ENV !== 'production') {
  Router.events.on('routeChangeComplete', () => {
    const path = '/_next/static/css/styles.chunk.css'
    const chunksSelector = `link[href*="${path}"]`
    const chunksNodes = document.querySelectorAll(chunksSelector)
    const timestamp = new Date().valueOf()
    chunksNodes[0].href = `${path}?${timestamp}`
  })
}

// UI loading top bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class AppWrapper extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let collapsed = false

    if (!ctx.req) {
      // client-side
      collapsed = JSON.parse(sessionStorage.getItem('collapsed')) || false
    } else {
      const { collapsed: collapsedCookie } = nookies.get(ctx)
      if (collapsedCookie) {
        collapsed = JSON.parse(collapsedCookie)
      }
    }

    return { pageProps, collapsed }
  }

  render() {
    const { Component, pageProps, collapsed } = this.props

    return (
      <>
        <Head>
          <title>LMS</title>
        </Head>
        <Layout collapsed={collapsed}>
          <div style={{ position: 'fixed', bottom: 0, right: 0, maxWidth: '100px' }}>
            <img src="/static/olimpiade.png" style={{ width: '100%' }} />
          </div>
          <div style={{ position: 'fixed', bottom: 0, left: 0, maxWidth: '150px' }}>
            <img src="https://suaranahdliyin.com/wp-content/uploads/2018/08/IPNU-IPPNU.jpg" style={{ width: '100%' }} />
          </div>
          <Component {...pageProps} />
        </Layout>
      </>
    )
    Î
  }
}

export default withRouter(AppWrapper)
