import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Viewport meta tag moved to _app.tsx to avoid Next.js warning */}
        <meta name="description" content="Field Nodes - Collaborative Research Platform" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
