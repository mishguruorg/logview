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
          <link rel="stylesheet" href="//brick.freetls.fastly.net/Source+Sans+Pro:400,600/Source+Code+Pro:400,600" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;

              --white: #FFFFFF;
              --black: #000000;

              --blue: #0499F2;
              --blue-darker: #03659e;

              --turquoise: #4ecdc4;

              --c0-fg: #1a535c;

              /* nav bar */
              --c1-bg: #1a535c;
              --c1-fg: var(--white);

              /* login screen gradient */
              --c2-bg: #26F596;

              /* selection */
              --c3-bg: var(--blue);
              --c3-bg-1: var(--blue-darker);
              --c3-fg: var(--white);

              /* white */
              --c4-bg: #d6fff2;
              --c4-bg-1: var(--white);
              --c4-fg: var(--black);

              /* turquoise */
              --c5-bg: var(--turquoise);
              --c5-fg: var(--black);

              --font-sans: 'Source Sans Pro', sans-serif;
              --font-monospace: 'Source Code Pro', monospace;
            }
            body, button, input, mark {
              font-family: var(--font-sans);
            }
            code {
              font-family: var(--font-monospace);
            }
          `}</style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
