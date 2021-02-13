import ReactDom from "react-dom";
import ApolloProvider from "./ApolloProvider";
/* tailwind 적용방법 쉬움
공식 문서대로 하다가 마지막에, package.json에서 script로
"tailwind build src/styles/tailwind.css -o styles/style.css" 끝. */
import "./styles/style.css";

ReactDom.render(ApolloProvider, document.querySelector("#root"));
