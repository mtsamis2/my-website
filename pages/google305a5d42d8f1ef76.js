function createMarkup() {
    return  {__html: 'google-site-verification: google305a5d42d8f1ef76.html' }
}

export default () => <div dangerouslySetInnerHTML={createMarkup()} />;