import request, { gql } from "graphql-request";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const query = gql`
  mutation Test($data: CreatePostInput!) {
    createPost(data: $data) {
      id
    }
  }
`;

const emptyFiles = new DataTransfer().files;
const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  const files = useSyncExternalStore(
    (onSnapshot) => {
      const handler = () => {
        onSnapshot();
      };
      ref.current?.addEventListener("change", handler);

      return () => {
        ref.current?.removeEventListener("change", handler);
      };
    },
    () => {
      console.log("call get", ref.current?.files);

      return ref.current?.files ?? emptyFiles;
    }
  );
  const file = useMemo(() => files.item(0), [files]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await request("http://localhost:4000/graphql", query, {
        data: {
          title: "title",
          body: "body",
          thumbnail: file,
        },
      });
    },
    [file]
  );
  const [url, setURL] = useState<string>();
  useEffect(() => {
    console.log(file);
    if (!file) return;
    const url = URL.createObjectURL(file);
    setURL(url);

    return () => {
      URL.revokeObjectURL(url);
      setURL(undefined);
    };
  }, [file]);

  return (
    <section>
      <h1>App</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <img src={url} width={80} height={80} />
          <input type="file" ref={ref} required />
        </fieldset>

        <button type="submit">submit</button>
      </form>
    </section>
  );
};

export default memo(App);
