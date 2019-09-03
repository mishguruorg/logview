import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import JSONlanguage from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import colorscheme from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow'

SyntaxHighlighter.registerLanguage('json', JSONlanguage)

type PayloadJSONProps = {
  payload: Record<string, any>
}

const PayloadJSON = (props: PayloadJSONProps) => {
  const { payload } = props

  return (
    <SyntaxHighlighter
      language='json'
      style={colorscheme}
      customStyle={{
        margin: 0,
        whiteSpace: 'pre-wrap'
      }}
    >
      {JSON.stringify(payload, null, 2)}

    </SyntaxHighlighter>
  )
}

export default PayloadJSON
