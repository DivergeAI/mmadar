import { marked } from "marked";
import { Fragment, useEffect, useRef, useState } from "react";
import { revertSanitizedResponseContent } from "../../../utils/functions";
import CodeBlock from "./CodeBlock";
import { Box } from "@mui/material";


function MarkdownTokens({tokens,id}:any) {
    const containerElement = useRef<HTMLDivElement>(null);
    const [codes, setCodes] = useState<{ code: string; lang: string }[]>([]);
    const [images, setImages] = useState<{ href: string; title: string; text: string }[]>([]);
    const renderer = new marked.Renderer();
  // For code blocks with simple backticks
  renderer.codespan = (code) => {
    return `<code class="codespan">${code?.text?.replace(/&amp;/g, '&')}</code>`;
  };


  renderer.code = (code:string, lang:string) => {
    const newCode = { code, lang };
    setCodes((prevCodes) => [...prevCodes, newCode]);
    const codeId = `${id}-${codes.length + 1}`;

    const interval = setInterval(() => {
      const codeElement = document.getElementById(`code-${codeId}`);
      if (codeElement) {
        clearInterval(interval);
        // If the code is already loaded, don't load it again
        if (codeElement.innerHTML) {
          return;
        }
{/* <div ref={codeElement}> */}

    <CodeBlock  
    id = {`${id}-${codes.length + 1}`}
        lang = { lang}
        code= { revertSanitizedResponseContent(code)}
    />
// </div>
        // new CodeBlock({
        //   target: codeElement,
        //   props: {
        //     id: `${id}-${codes.length + 1}`,
        //     lang: lang,
        //     code: revertSanitizedResponseContent(code)
        //   },
        //   hydrate: true,
        //   $$inline: true
        // });
      }
    }, 10);

    return `<div id="code-${id}-${codes.length + 1}"></div>`;
  };

  renderer.image = (href:string, title:string, text:string) => {
    const newImage = { href, title, text };
    setImages((prevImages) => [...prevImages, newImage]);

    const imageId = `${id}-${images.length + 1}`;
    const interval = setInterval(() => {
      const imageElement = document.getElementById(`image-${imageId}`);
      if (imageElement) {
        clearInterval(interval);

        // If the image is already loaded, don't load it again
        if (imageElement.innerHTML) {
          return;
        }

        console.log('image', href, text);
        // new Image({
        //   target: imageElement,
        //   props: {
        //     src: href,
        //     alt: text
        //   },
        //   $$inline: true
        // });
      }
    }, 10);

    return `<div id="image-${id}-${images.length + 1}"></div>`;
  };

    // Open all links in a new tab/window
    const origLinkRenderer = renderer.link;
    renderer.link = (href:any) => {
      const html = origLinkRenderer.call(renderer, href);
      return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
  
    const { extensions, ...defaults } = marked.getDefaults() as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extensions: any;
      };

    useEffect(() => {
        setImages([]);
        setCodes([]);
      }, [tokens]);

    return (
        <div ref={containerElement}>
{tokens?.map((token: any, tokenIdx: number) => (
    <Fragment key={`${id} - ${tokenIdx}`}>
        {token?.type === 'code' ? (
            token?.lang === 'mermaid' ? 
                <pre className="mermaid" >{revertSanitizedResponseContent(token.text)}</pre> 
                : 
                (
                    <CodeBlock
                	id={`${id}-${tokenIdx}`}
                	lang={token?.lang ?? ''}
                	code={revertSanitizedResponseContent(token?.text ?? '')}
                />
                )
        ) : (
        <Box
              dangerouslySetInnerHTML={{
                __html: marked.parse(token.raw, {
                  ...defaults,
                  gfm: true,
                  breaks: true,
                  renderer
                })
              }}
               sx={{
                            fontSize: '1rem',
                                    width: '100%',
                                    maxWidth: '100%',
                                    color: 'inherit',
                                    '& p': { margin: 0 },
                                    '& img': { margin: '4px 0' },
                                    '& h1, h2, h3, h4, h5, h6': { marginBottom: 0 },
                                    '& pre': { margin: 0 },
                                    '& table': { margin: 0 },
                                    '& blockquote': { margin: 0 },
                                    '& ul': { margin: '1rem', marginLeft: '2rem' },
                                    '& ol': { margin: '2rem 0',marginLeft: '2rem'  },
                                    '& li': { marginTop: '1rem',  },
                                    // whiteSpace: 'pre-line',
                                }}
            />
        )}
    </Fragment>
))}
            
        </div>
    );
}

export default MarkdownTokens;