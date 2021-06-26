import path from 'path';
import { Request, Response } from 'express';
import renderToString from 'preact-render-to-string';
import { h, FunctionalComponent } from 'preact';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile, publicPath: '/build' });

import App from 'client/components/App/App';

interface IServerAppProps {
  url: string;
}

const ServerApp: FunctionalComponent<IServerAppProps> = (props) => {
  const { url } = props;

  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
};

export default function render(req: Request, res: Response) {
  const jsx = extractor.collectChunks(<ServerApp url={req.url} />);
  const appHtml = renderToString(jsx);

  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  const scriptTags = extractor.getScriptTags();

  return res.send(`
<html>
    <head>
        <title>Что по холодильнику?</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png">
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
        <link rel="manifest" href="/public/manifest.json" />
        ${linkTags}
        ${styleTags}
    </head>

    <body>
        <div id="root">${appHtml}</div>

        ${scriptTags}
    </body>
</html>
    `);
}
