import { SheetIcon } from "lucide-react";

const features = [
  {
    Icon: SheetIcon,
    title: "Backed By Science",
    description: "Feature 1 explanation",
  },
  {
    Icon: SheetIcon,
    title: "Backed By Science",
    description: "Feature 1 explanation",
  },
  {
    Icon: SheetIcon,
    title: "Backed By Science",
    description: "Feature 1 explanation",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl items-center justify-center gap-6">
      {features.map((feature) => (
        <div className="size-full rounded-lg border px-8 py-6">
          <feature.Icon className="size-12" />
          <h2 className="text-2xl font-semibold">{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
