import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { UserType } from "@/database/schemas/auth";
import getFirstName from "@/lib/getFirstName";

interface AnalyticsFiltersProps {
  userChildren: UserType[];
}

export default function AnalyticsFilters({
  userChildren,
}: AnalyticsFiltersProps) {
  const isParent = userChildren.length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      {isParent && (
        <Select>
          <SelectTrigger>Select a child</SelectTrigger>
          <SelectContent>
            {userChildren.map((child, index) => (
              <SelectItem value={child.id} key={index}>
                {/* TODO */}
                {getFirstName(child.name as string)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Select>
        <SelectTrigger>Select a metric</SelectTrigger>
        <SelectContent>
          <SelectItem value="level">Level</SelectItem>
          <SelectItem value="accuracy">Accuracy</SelectItem>
          <SelectItem value="stats">Stats</SelectItem>
          <SelectItem value="gamesPlayed">Games played</SelectItem>
          <SelectItem value="timePlayed">Time played</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectContent>
            <SelectItem>Child 1</SelectItem>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
}
