import { useQuery } from "@tanstack/react-query";

function getImages(folder) {
  return async () => {
    try {
      const response = await fetch(
        `https://smileordontpictures.s3.amazonaws.com/?list-type=2&prefix=${folder}`
      );
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      const contents = xmlDoc.getElementsByTagName("Contents");
      let imageURLs = [];

      for (let i = 0; i < contents.length; i++) {
        const key = contents[i].getElementsByTagName("Key")[0].textContent;
        if (key.endsWith("/")) continue;
        imageURLs.push(`https://smileordontpictures.s3.amazonaws.com/${key}`);
      }

      return imageURLs;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export function useImages() {
  const carouselQuery = useQuery({
    queryKey: ["carousel"],
    queryFn: getImages("carousel"),
  });

  const subjectQuery = useQuery({
    queryKey: ["subject"],
    queryFn: getImages("subject"),
  });

  const landscapeQuery = useQuery({
    queryKey: ["landscape"],
    queryFn: getImages("landscape"),
  });

  const musicQuery = useQuery({
    queryKey: ["music"],
    queryFn: getImages("live_music"),
  });

  return {
    carouselQuery,
    subjectQuery,
    landscapeQuery,
    musicQuery,
  };
}
