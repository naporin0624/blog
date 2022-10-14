import { useMutation, useQuery } from "@apollo/client";
import React, {
  memo,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

import { Card } from "~/components/card";
import {
  CreatePostDocument,
  DeletePostDocument,
  PostDocument,
} from "~/graphql";
import { useObjectURL } from "~/shared/hooks/use-object-url";

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
  const file = useMemo(() => files.item(0) ?? undefined, [files]);
  const src = useObjectURL(file);

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

  const [deleteMutate, deleteOption] = useMutation(DeletePostDocument, {
    refetchQueries: [PostDocument],
  });
  const deletePost = useCallback((id: number) => {
    return deleteMutate({ variables: { where: { id } } });
  }, []);

  return (
    <section>
      <h1>App</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <img src={src} width={80} height={80} />
          <input type="file" ref={ref} required />
        </fieldset>

        <button type="submit" disabled={loading}>
          submit
        </button>
      </form>

      <section>
        {data?.posts?.map((post) => (
          <Suspense key={post.id}>
            <div>
              <Card
                title={post.title}
                description={post.abstract}
                src={[
                  post.thumbnail.blur,
                  post.thumbnail.small,
                  post.thumbnail.medium,
                  post.thumbnail.large,
                ]}
              />
              <button
                onClick={() => deletePost(post.id)}
                disabled={deleteOption.loading}
              >
                dust
              </button>
            </div>
          </Suspense>
        ))}
      </section>
    </section>
  );
};

export default memo(App);
