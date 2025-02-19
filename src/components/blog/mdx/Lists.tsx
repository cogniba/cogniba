import { ComponentProps } from "react";

export const UnorderedList = ({ ...props }: ComponentProps<"ul">) => (
  <ul className="mb-4 list-inside list-disc space-y-2" {...props} />
);
UnorderedList.displayName = "UnorderedList";

export const OrderedList = ({ ...props }: ComponentProps<"ol">) => (
  <ol className="mb-4 list-inside list-decimal space-y-2" {...props} />
);
OrderedList.displayName = "OrderedList";

export const ListItem = ({ ...props }: ComponentProps<"li">) => (
  <li className="leading-relaxed" {...props} />
);
ListItem.displayName = "ListItem";