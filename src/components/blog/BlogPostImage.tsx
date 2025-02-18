"use client";

import Image from "next/image";

interface BlogPostImageProps {
  src: string;
  alt: string;
}

export default function BlogPostImage({ src, alt }: BlogPostImageProps) {
  return (
    <div className="relative mb-12 aspect-[16/9] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-lg object-cover"
        priority
      />
    </div>
  );
}
