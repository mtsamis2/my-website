const Header = () => (
    <header id="header">
        <h1><a href="/">Mike Tsamis</a></h1>
        <nav className="links">
            <ul>
                <li><a href="/categories/45JeSWkirCOSOICWmyYw22/raspberry-pi-projects">Raspberry Pi Projects</a></li>
                <li><a href="/categories/47qniL6iBOqOUQygWoOIqy/software-development">Software Development</a></li>
                <li><a href="/categories/1zfmxhCUagUKOwMwK6GMwQ/git-faq">Git FAQ</a></li>
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