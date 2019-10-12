import Layout from '../components/layout'
import Footer from '../components/footer'
import fetch from 'isomorphic-unfetch'
import { FormattedDate } from  'react-intl';
import marked from 'marked';
import getYouTubeID from 'get-youtube-id';
import Video from '../components/video'
import {API_URL, WEBSITE} from '../config'
import { DiscussionEmbed } from 'disqus-react';
import AdSense from 'react-adsense';

const Post =  (props) => (
    <div className='single'>
        <div id='wrapper'>
            <Layout 
                title={props.post.fields.title + ' - MikeTsamis.com'}
                description={props.post.fields.description}
                image={props.featuredImage.fields.file.url}
                type='article'
                url={props.currentUrl}
            >
                <div id='main'>
                    <AdSense.Google client='ca-pub-5287798851641238' slot='9201055683' style={{ display:'block'}} format='auto' responsive='true' />
                    <article className="post">
                        <header>
                            <div className="title">
                                <h2>{props.post.fields.title}</h2>
                                <p>{props.post.fields.subtitle}</p>
                            </div>
                            <div className="meta">
                                <time className="published">
                                    <FormattedDate
                                        value={props.post.fields.date}
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
                        {props.videoId != null ?
                            <div>
                                <Video videoId={props.videoId} />
                                <p />
                            </div>
                            : null}
                        <div className="align-center">
                            <AdSense.Google client='ca-pub-5287798851641238' slot='9388207227' style={{ display:'block'}} format='auto' responsive='true' />
                        </div>
                        <DiscussionEmbed shortname={props.disqusShortname} config={props.disqusConfig} />
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

  if (post.sys.type == 'Error') {
    const err = new Error()
    err.code = 'ENOENT'
    throw err
  }

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

  const videoId = getYouTubeID(post.fields.body);

  const disqusShortname = 'MikeTsamis';
  const disqusConfig = {
    url: currentUrl,
    identifier: post.sys.id,
    title: post.fields.title,
  };

  return { 
      currentUrl,
      post, 
      author, 
      authorImage, 
      featuredImage, 
      body,
      videoId,
      disqusShortname,
      disqusConfig
    }
}

export default Post