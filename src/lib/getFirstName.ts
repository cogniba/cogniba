export default function getFirstName(fullName: string): string {
  return fullName.split(" ").slice(0, -1).join(" ");
}
