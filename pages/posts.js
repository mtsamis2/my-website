import Layout from '../components/layout'
import Footer from '../components/footer'
import fetch from 'isomorphic-unfetch'
import { FormattedDate } from  'react-intl';
import marked from 'marked';
import {API_URL, WEBSITE} from '../config'

const Post =  (props) => (
    <div className='single'>
        <div id='wrapper'>
            <Layout 
                title={props.post.fields.title + ' - MikeTsamis.com'}
                description={props.post.fields.subtitle}
                image={props.featuredImage.fields.file.url}
                type='article'
                url={props.currentUrl}
            >
                <div id='main'>
                    <article className="post">
                        <header>
                            <div className="title">
                                <h2>{props.post.fields.title}</h2>
                                <p>{props.post.fields.subtitle}</p>
                            </div>
                            <div className="meta">
                                <time className="published">
                                    <FormattedDate
                                        value={props.post.sys.updatedAt}
                                        day='numeric'
                                        month='long'
                                        year='numeric'/>
                                </time>
                                <div className="author">
                                    <span className="name">{props.author.fields.name}</span>
                                    <img src={props.authorImage.fields.file.url}/>
                                </div>
                            </div>
                        </header>
                        <span className="image featured">
                            <img src={props.featuredImage.fields.file.url}/>
                        </span>
                        <div dangerouslySetInnerHTML={props.body} />
                        <footer>
                            <ul className="actions">
                                <li>
                                    <a href='/' className="button big">
                                        Back
                                    </a>
                                </li>
                            </ul>
                        </footer>
                    </article>
                    <Footer />
                </div>
            </Layout>
        </div>
    </div>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const postRes = await fetch(`${API_URL}/entries/${id}`)
  const post = await postRes.json()

  const body = {
    __html: marked(post.fields.body, {sanitize: true})
  }

  const imageRes = await fetch(`${API_URL}/assets/${post.fields.featuredImage.sys.id}`)
  const featuredImage = await imageRes.json()

  const authorRes = await fetch(`${API_URL}/entries/${post.fields.author[0].sys.id}`)
  const author = await authorRes.json()

  const authorImageRes = await fetch(`${API_URL}/assets/${author.fields.profilePhoto.sys.id }`)
  const authorImage = await authorImageRes.json()

  const currentUrl = WEBSITE + context.asPath;

  return { 
      currentUrl,
      post, 
      author, 
      authorImage, 
      featuredImage, 
      body 
    }
}

export default Post