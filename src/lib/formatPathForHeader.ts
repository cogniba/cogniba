interface PathSegment {
  formatted: string;
  raw: string;
}

export default function formatPathForHeader(pathname: string): PathSegment[] {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      raw: segment,
      formatted: segment
        .replace(/-/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" "),
    }));
}
