import type { ComponentProps } from "react";

export const PreBlock = ({ ...props }: ComponentProps<"pre">) => (
  <pre
    className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
    {...props}
  />
);
PreBlock.displayName = "PreBlock";

export const CodeBlock = ({ ...props }: ComponentProps<"code">) => (
  <code
    className="rounded-md bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-900"
    {...props}
  />
);
CodeBlock.displayName = "CodeBlock";
