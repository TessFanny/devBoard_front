import React, { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'
import './index.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {html} from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { Button } from '@chakra-ui/react';

function Playground() {
  const [htmldata, setHtml] = useLocalStorage('html', '')
  const [cssdata, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${htmldata}</body>
          <style>${cssdata}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [htmldata, cssdata, js])

  const copyToClipboard= (editor) => {
    navigator.clipboard.writeText(editor);

  };

  return (
    <>
      <div className="pane">
       <div className='top-pane'>
       <div>
       <CodeMirror
          value={js}
          placeholder='Please enter the JavaScript code.'
          height="100%"
          width="400px"
          theme={okaidia}
          extensions={[javascript({ jsx: true })]}      
          onChange={setJs}
        />
        <Button onClick={() => copyToClipboard(js)}>Copy
        </Button>
        </div>
        <div>
          <CodeMirror
            value={htmldata}
            placeholder='Please enter the Html code.'
            height="100%"
            width="400px"
            theme={okaidia}
            extensions={[html({
              matchClosingTags: true
            })]}      
            onChange={setHtml}
          />
          <Button onClick={() => copyToClipboard(htmldata)}>Copy</Button>
        </div>
        
        <div>
          <CodeMirror
              placeholder='Please enter the Css code.'
              value={cssdata}
              height="100%"
              width="400px"
              theme={okaidia}
              extensions={[css()]}    
              onChange={setCss}
            />
            <Button onClick={() => copyToClipboard(cssdata)}>Copy</Button>
        </div>
          
        </div>
        <div className="botom-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-same-origin"
          width="300px"
          height="100%"
        />
      </div>
      </div>
      
    </>
  )
}

export default Playground;