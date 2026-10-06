import { useEffect, useState } from "react";
import {
  ACTOR_PLACEHOLDER,
  POSTER_PLACEHOLDER,
  BACKDROP_PLACEHOLDER,
} from "../assets/placeholders.js";

const FALLBACKS = {
  poster: POSTER_PLACEHOLDER,
  backdrop: BACKDROP_PLACEHOLDER,
  profile: ACTOR_PLACEHOLDER,
};


export default function SafeImage({
  src,
  alt,
  className = "",
  fallback = "poster",
  loading = "lazy",
  fetchPriority,
  sizes,
  srcSet,
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const resolved = !src || failed ? FALLBACKS[fallback] || FALLBACKS.poster : src;

  return (
    <img
      src={resolved}
      srcSet={failed ? undefined : srcSet}
      sizes={sizes}
      alt={alt || ""}
      className={`img-reveal ${className}`.trim()}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
