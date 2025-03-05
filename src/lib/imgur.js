import { ImgurClient } from "imgur";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const client = new ImgurClient({
  clientId: import.meta.env.VITE_IMGUR_CLIENT_ID,
});

export function useImgur() {
  const landscape = useQuery({
    queryKey: ["landscape"],
    queryFn: async () => {
      return await client.getAlbum("Ar0o9H0");
    },
  });

  const subject = useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      return await client.getAlbum("1l4RRXs");
    },
  });

  const carousel = useQuery({
    queryKey: ["carousel"],
    queryFn: async () => {
      return await client.getAlbum("Ao28ixm");
    },
  });

  const subjectLink = useQuery({
    queryKey: ["subject_link"],
    queryFn: async () => {
      return await client.getAlbum("kZ9QIb5");
    },
  });

  const landscapeLink = useQuery({
    queryKey: ["landscape_link"],
    queryFn: async () => {
      return await client.getAlbum("p18CQAr");
    },
  });

  const isAnyLoading = useMemo(() => {
    return (
      landscape.isLoading ||
      subject.isLoading ||
      carousel.isLoading ||
      subjectLink.isLoading ||
      landscapeLink.isLoading
    );
  }, [
    landscape.isLoading,
    subject.isLoading,
    carousel.isLoading,
    subjectLink.isLoading,
    landscapeLink.isLoading,
  ]);

  return {
    landscape,
    landscapeLink,
    subject,
    subjectLink,
    carousel,
    isAnyLoading,
  };
}
