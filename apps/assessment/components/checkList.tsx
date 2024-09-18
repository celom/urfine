import { Check } from '../types/check';
import CheckItem from './CheckItem';

interface CheckListProps {
  checks: Check[];
}

export default function CheckList({ checks }: CheckListProps) {
  return (
    <ul className="space-y-2">
      {checks.map((check) => (
        <CheckItem key={check.id} check={check} />
      ))}
    </ul>
  );
}
