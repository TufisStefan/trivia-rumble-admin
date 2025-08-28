import { Group, TextInput, NumberInput, Button, Text } from "@mantine/core";

interface AnswerInputProps {
  value: { text: string; score: number };
  index?: number;
  onChange: (value: { text: string; score: number }) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export default function AnswerInput({
  value,
  index,
  onChange,
  onRemove,
  showRemove,
}: AnswerInputProps) {
  return (
    <Group gap="sm" align="flex-end">
      {index && <Text fw={700} fz={18}>{`${index}.`}</Text>}
      <TextInput
        label="Answer"
        value={value.text}
        onChange={(e) => onChange({ ...value, text: e.currentTarget.value })}
        required
        style={{ flex: 2 }}
      />
      <NumberInput
        label="Score"
        value={value.score}
        min={0}
        hideControls
        onChange={(val) => onChange({ ...value, score: Number(val) })}
        required
        style={{ flex: 1 }}
      />
      {showRemove && (
        <Button color="red" variant="light" onClick={onRemove}>
          Remove
        </Button>
      )}
    </Group>
  );
}
