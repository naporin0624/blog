import { useEffect, useState } from "react";

export const useObjectURL = (file?: File) => {
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

  return url;
};
