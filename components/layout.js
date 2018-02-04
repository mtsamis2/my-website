import Header from './header'
import { IntlProvider } from 'react-intl';
import Head from 'next/head';

const Layout = (props) => (
    <IntlProvider locale="en">
        <div className="container divided">
        <Head>
            <title>Mike Tsamis</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicons/favicon-16x16.png" />
            <link rel="stylesheet" href="/static/assets/css/main.css" />
            <script src="/static/assets/js/jquery.min.js" />
            <script src="/static/assets/js/skel.min.js" />
            <script src="/static/assets/js/util.js" />
            <script src="/static/assets/js/main.js" />
        </Head>
            <Header />
            {props.children}
        </div>
    </IntlProvider >
)

export default Layout