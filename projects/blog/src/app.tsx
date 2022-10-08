import request, { gql } from "graphql-request";
import { memo } from "react";

const query = gql`
  query HelloWorld {
    hello
  }
`;
void request("https://blog-api-t3bloi7uiq-an.a.run.app/graphql", query);

const App = () => {
  return (
    <section>
      <h1>App</h1>
    </section>
  );
};

export default memo(App);
