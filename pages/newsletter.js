import MailchimpSubscribe from "react-mailchimp-subscribe"
import Layout from '../components/layout'
import {MAILCHIMP_URL, WEBSITE} from '../config'

const Newsletter = () => (
    <div className='single'>
        <div id='wrapper'>
            <Layout 
                title='Newsletter - MikeTsamis.com' 
                description='Newsletter Signup'
                type='website'
                url={WEBSITE + "/newsletter"}
            />
            <article className="post">
                    <div>
                        <div className="align-center">
                            <h2>Signup for My Newsletter!</h2>
                            <p>You'll receive an email whenever I publish a new blog post.</p>
                            <MailchimpSubscribe url={MAILCHIMP_URL}/>
                        </div>
                    </div>
            </article>
        </div>
    </div>
)

export default Newsletter