import { HTMLAttributes } from "react";

type ListProps = HTMLAttributes<
  HTMLUListElement | HTMLOListElement | HTMLLIElement
>;

export function UnorderedList(props: ListProps) {
  return <ul {...props} className="mb-4 ml-6 list-disc" />;
}

export function OrderedList(props: ListProps) {
  return <ol {...props} className="mb-4 ml-6 list-decimal" />;
}

export function ListItem(props: ListProps) {
  return <li {...props} className="mb-1" />;
}
