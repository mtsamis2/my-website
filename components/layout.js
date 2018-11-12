import Header from './header'
import { IntlProvider } from 'react-intl';
import Router from 'next/router'
import Head from 'next/head';

import * as gtag from '../lib/gtag'
import { GA_TRACKING_ID } from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Layout = (props) => (
    <IntlProvider locale="en">
        <div className="container divided">
        <Head>
            <title>{props.title}</title>
            <meta property="og:title" content={props.title} />
            <meta property="twitter:title" content={props.title} />
            <meta property="description" content={props.description}/>
            <meta property="og:description" content={props.description}/>
            <meta property="twitter:description" content={props.description}/>
            <meta property="image" content={props.image} />
            <meta property="og:image" content={props.image} />
            <meta property="twitter:image" content={props.image} />
            <meta property="og:type" content={props.type} />
            <meta property="og:url" content={props.url} />
            <meta property="twitter:url" content={props.url} />
            <meta name="google-site-verification" content="9cIjLHNbjwsAGc0xOD498waalz2pWlgk8m5LmLdSLMY" />
            <link rel="canonical" href={props.url} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicons/favicon-16x16.png" />
            <link rel="stylesheet" href="/static/assets/css/main.css" />
            <script src="/static/assets/js/jquery.min.js" />
            <script src="/static/assets/js/skel.min.js" />
            <script src="/static/assets/js/util.js" />
            <script src="/static/assets/js/main.js" />
             {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
            `}}
            />
        </Head>
            <Header />
            {props.children}
        </div>
    </IntlProvider >
)

export default Layout