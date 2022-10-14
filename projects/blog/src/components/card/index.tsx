import { Interweave } from "interweave";
import { memo } from "react";
import { useImage } from "react-flowder/utils";

import type { FC } from "react";

type Props = {
  title: string;
  description: string;
  src: string | string[];
};

export const Card: FC<Props> = memo(({ title, description, src }) => {
  const [data] = useImage(src);

  return (
    <article>
      <h2>{title}</h2>
      <img src={data.src} width={150} height={100} />
      <Interweave content={description} />
    </article>
  );
});
