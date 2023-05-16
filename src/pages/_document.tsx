import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="sl-SI">
            <Head>
                <title>Watt4Cast</title>
                <meta name="description" content="Application for forecasting electricity production" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/lightning.svg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
