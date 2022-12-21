import { useEffect } from "react";

export default function SEO({ title, description, type, url, image }) {
  useEffect(() => {
    /** Standard metadata tags */
    document.title = title;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description);

    /** Facebook tags */
    /*document.querySelector("meta[name='og:url']").setAttribute("content", url);
    document
      .querySelector("meta[name='og:type']")
      .setAttribute("content", type);
    document
      .querySelector("meta[name='og:title']")
      .setAttribute("content", title);
    document
      .querySelector("meta[name='og:description']")
      .setAttribute("content", description);
    document
      .querySelector("meta[name='og:image']")
      .setAttribute("content", image);*/
    var link = document.createElement("meta");
    link.setAttribute("property", "og:url");
    link.content = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [title, description, url, type, image]);

  return null;
}
