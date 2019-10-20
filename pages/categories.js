import Layout from '../components/layout'
import { FormattedDate } from  'react-intl';
import fetch from 'isomorphic-unfetch'
import {API_URL, WEBSITE} from '../config'
import Footer from '../components/footer'
import AdSense from 'react-adsense';

const Category = (props) => (
    <div className='single'>
        <div id='wrapper'>
            <Layout 
                title={`${props.category.fields.title} - MikeTsamis.com`}
                description={`Posts with the category ${props.category.fields.title}`}
                type='website'
                url={props.currentUrl}
            >
                <AdSense.Google client='ca-pub-5287798851641238' slot='7619023422' style={{ display:'block'}} format='auto' responsive='true' />
                <header>
                    <h3>Posts with the category "{props.category.fields.title}"</h3>
                </header>
                <div className="categories">
                    {props.posts.map((data, key) => (
                        <article className="mini-post" key={key}>
                            <header>
                                <h3>
                                    <a href={`/posts/${data.sys.id}/${data.fields.slug}`} >{data.fields.title}</a>
                                </h3>
                                <time className="published">
                                    <FormattedDate
                                        value={data.fields.date}
                                        day='numeric'
                                        month='long'
                                        year='numeric'
                                    />
                                </time>
                            </header>
                            <a className="image" href={`/posts/${data.sys.id}/${data.fields.slug}`}>
                                <img src={data.featuredImage.fields.file.url}/>
                            </a>
                        </article>
                    ))}
                </div>
                <AdSense.Google client='ca-pub-5287798851641238' slot='6152036699' style={{ display:'block'}} format='auto' responsive='true' />
            </Layout>
        </div>
        <Footer />
    </div>
)

Category.getInitialProps = async function (context) {
    const { id } = context.query
    const categoryRes = await fetch(`${API_URL}/entries/${id}`);
    const category = await categoryRes.json()

    const res = await fetch(`${API_URL}/entries?content_type=2wKn6yEnZewu2SCCkus4as&fields.category.sys.id=${id}&order=-fields.date`)
    const entries = await res.json()
  
    if (entries.sys.type == 'Error' || entries.total == 0) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }
  
    let posts = []
  
    for (let post of entries.items) {
        const imageRes = await fetch(`${API_URL}/assets/${post.fields.featuredImage.sys.id}`)
        post["featuredImage"] = await imageRes.json()
  
        posts.push(post);
    };

    const currentUrl = WEBSITE + context.asPath;
  
    return {
        category,
        posts,
        currentUrl
    }
}
  
export default Category