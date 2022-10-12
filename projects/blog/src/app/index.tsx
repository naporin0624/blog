import { useMutation, useQuery } from "@apollo/client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { CreatePostDocument, PostDocument } from "~/graphql";

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
    () => ref.current?.files ?? emptyFiles
  );
  const file = useMemo(() => files.item(0), [files]);
  const { data } = useQuery(PostDocument);
  const [mutate, { loading }] = useMutation(CreatePostDocument, {
    refetchQueries: [PostDocument],
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (!file) return;
      e.preventDefault();

      try {
        await mutate({
          variables: {
            data: {
              title: "title",
              body: "body",
              thumbnail: file,
            },
          },
        });
      } catch {
        alert("error");
      }
    },
    [file]
  );
  const [url, setURL] = useState<string>();
  useEffect(() => {
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

        <button type="submit" disabled={loading}>
          submit
        </button>
      </form>

      <section>
        {data?.posts?.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <img src={post.thumbnail} width={600} height={400} />
          </article>
        ))}
      </section>
    </section>
  );
};

export default memo(App);
