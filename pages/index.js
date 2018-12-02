import Link from 'next/link'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Intro from '../components/intro'
import Pagination from '../components/pagination'
import fetch from 'isomorphic-unfetch'
import { FormattedDate } from  'react-intl';
import {API_URL, WEBSITE} from '../config'
import _JSXStyle from 'styled-jsx/style'
import AdSense from 'react-adsense';

const Index = (props) => (
  <div id='wrapper'>
    <Layout 
        title='Mike Tsamis' 
        description='IDEATE. CREATE. ITERATE. REPEAT.'
        image={`${WEBSITE}/static/images/logo.png`}
        type='website'
        url={WEBSITE}
    >
        <Intro jsxClass='jsx-1'/>
        <_JSXStyle styleId='1' css={
            `@media (min-width: 1280px) {
                section.jsx-1 {
                    display: none;
                }
            }`
            } />
        <div id = 'main'>
            <AdSense.Google client='ca-pub-5287798851641238' slot='9544083889' style={{ display:'inline-block', width:970, height:90 }} />
            {props.posts.map((data, key) => (
                <article className="post" key={key}>
                    <header>
                        <div className="title">
                            <h2>
                                <Link href={`/posts/${data.sys.id}/${data.fields.slug}`}>
                                    <a>
                                        {data.fields.title}
                                    </a>
                                </Link>
                            </h2>
                            <p>{data.fields.subtitle}</p>
                        </div>
                        <div className="meta">
                            <time className="published">
                            <FormattedDate
                                value={data.fields.date}
                                day='numeric'
                                month='long'
                                year='numeric'/>
                            </time>
                            <div className="author">
                                <span className="name">{data.author.fields.name}</span>
                                <img src={data.authorImage.fields.file.url}/>
                            </div>
                        </div>
                    </header>
                    <Link href={"/posts/" + data.sys.id + "/" + data.fields.slug}>
                        <a className="image featured">
                            <img src={data.featuredImage.fields.file.url}/>
                        </a>
                    </Link>
                    <p>{data.fields.description}</p>							
                    <footer>
                        <ul className="actions">
                            <li>
                                <Link href={`/posts/${data.sys.id}/${data.fields.slug}`}>
                                    <a className="button big">Continue Reading</a>
                                </Link>
                            </li>
                        </ul>
                    </footer>
                </article>
            ))}
            <Pagination pagination={props.pagination}/>
        </div>
    </Layout>
    <Sidebar/>
  </div>
)

Index.getInitialProps = async function(context) {
    const page = context.query.page;

    const pageNumber = page ? page * 2 : 0;

    const res = await fetch(`${API_URL}/entries?content_type=2wKn6yEnZewu2SCCkus4as&order=-fields.date&limit=2&skip=${pageNumber}`)
    const entries = await res.json()

    if (entries.sys.type == 'Error' || entries.total == 0) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }

    const total = entries.total;

    let data = []

    for (let post of entries.items) {
        const imageRes = await fetch(`${API_URL}/assets/${post.fields.featuredImage.sys.id}`)
        post["featuredImage"] = await imageRes.json()

        const authorRes = await fetch(`${API_URL}/entries/${post.fields.author[0].sys.id}`)
        post["author"] = await authorRes.json()

        const authorImageRes = await fetch(`${API_URL}/assets/${post.author.fields.profilePhoto.sys.id }`)
        post["authorImage"] = await authorImageRes.json()

        data.push(post);
    };

    const currentPage = pageNumber / 2;
    const previousPage = currentPage - 1 == 0 ? "" : currentPage - 1;
    const nextPage = currentPage + 1;

    const previousDisabled = previousPage < 0;
    const nextDisabled = total <= nextPage * 2;

    return { 
        posts: data,
        pagination: {
            previousPage: previousPage,
            nextPage: nextPage,
            previousDisabled: previousDisabled,
            nextDisabled: nextDisabled
        }
    }
}

export default Index