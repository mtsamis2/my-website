import Link from 'next/link'

const Header = () => (
    <header id="header">
        <h1><a href="/">Mike Tsamis</a></h1>
        <nav className="links">
            <ul>
                <li><a href="/newsletter">Newsletter</a></li>
            </ul>
        </nav>
        <nav className="main">
            <ul>
                <li className="search">
                    <a className="fa-search" href="#search">Search</a>
                    <form id="search" action="https://google.com/search" method="get">
                        <input type="hidden" name="sitesearch" value="miketsamis.com" />
                        <input type="text" name="q" placeholder="Search" />
                    </form>
                </li>
            </ul>
        </nav>
    </header>
)

export default Header