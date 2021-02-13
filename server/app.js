const express = require("express");
const cors = require("cors");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const scheeeema = require("./graphql/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://rahula:1234@cluster0.rxtr4.mongodb.net/graphql-hominid?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
mongoose.connection
  .once("open", () => console.log("✅ mongoDB connected~"))
  .on("error", (e) => console.log(`❌Error on DB connection : ${e}`));

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: scheeeema,
    graphiql: true,
  })
);

// /* : 모든 요상한 링크에 대해 html파일 렌더링
app.get("/*", (req, res) => {
  res
    .status(404)
    // .send(
    //   `<h1><a href="http://localhost:${PORT}/graphql">go to graphql🤔</h1>`
    // );
    .sendFile("wrong.html", { root: path.join(__dirname, "./") });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`server listening to http://localhost:${PORT}/graphql`);
});
