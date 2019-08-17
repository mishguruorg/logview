// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href='https://fonts.googleapis.com/css?family=Roboto&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx>{`
            body {
              font-family: 'Roboto', sans-serif;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
