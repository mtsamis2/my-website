import Footer from './footer'
import Intro from './intro'
import Featured from './featured'

const Sidebar = () => (
    <div>
        <Intro className="introSideBar" />
        <section id="sidebar">
            <Featured/>
            <section className="blurb">
                <h2>About</h2>
                <p>
                    I am a Software Engineer based in New York City. 
                    I graduated Summa Cum Laude with a bachelor's degree in Computer Information Systems and minor in English back in 2011. 
                    Based on my academic performance, I was a recipient of the HS-STEM Career Development Grant which gave me the opportunity to conduct research related to cybersecurity under the guidance of distinguished professors.
                    In my free time, I enjoy coding side projects, tinkering with the latest gadgets, creating/designing video games, and traveling.
                </p>
                <p>
                    This blog is used to share my own projects, findings, and opinions. My objective is to share fun, interesting, and useful tech projects and break them down as simple as possible to inspire more interest in STEM. 
                </p>
            </section>
            <Footer />
        </section>
    </div>
)

export default Sidebar