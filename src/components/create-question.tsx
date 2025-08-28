import {
  Paper,
  TextInput,
  Button,
  Stack,
  Title,
  Textarea,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NewQuestion, Answer } from "../models/question";
import AnswerInput from "./answer-input";
import { createQuestion } from "../services/question.service";
import { Link } from "react-router-dom";

export default function CreateQuestion() {
  const form = useForm<NewQuestion>({
    initialValues: {
      question: "",
      answers: [{ text: "", score: 0 }],
      category: "",
      isActive: true,
    },
    validate: {
      question: (value) => (!value.trim() ? "Question is required" : null),
      answers: (answers: Answer[]) => {
        if (answers.length === 0) return "At least one answer is required";
        for (const [i, a] of answers.entries()) {
          if (!a.text.trim()) return `Answer #${i + 1} text is required`;
          if (!a.score || a.score < 1)
            return `Answer #${i + 1} score must be at least 1`;
        }
        const total = answers.reduce((sum, a) => sum + a.score, 0);
        if (total > 100) return "Total score must not exceed 100";
        return null;
      },
    },
  });

  const addAnswer = () => {
    form.setFieldValue("answers", [
      ...form.values.answers,
      { text: "", score: 0 },
    ]);
  };

  const updateAnswer = (idx: number, value: Answer) => {
    const updated = [...form.values.answers];
    updated[idx] = value;
    form.setFieldValue("answers", updated);
  };

  const removeAnswer = (idx: number) => {
    const updated = [...form.values.answers];
    updated.splice(idx, 1);
    form.setFieldValue("answers", updated);
  };

  const handleSubmit = async (values: NewQuestion) => {
    const sortedAnswers = [...values.answers].sort((a, b) => b.score - a.score);
    try {
      await createQuestion({
        ...values,
        answers: sortedAnswers,
      });
      alert("Question created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <Stack justify="center" align="center" h="100%">
      <Group justify="space-between" w="100%">
        <Title order={1} style={{ alignSelf: "flex-start" }}>
          Add new question
        </Title>
        <Button component={Link} to="/">
          Back
        </Button>
      </Group>
      <Paper p={24} shadow="sm" withBorder miw={800} mih={600}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Textarea
              label="Question"
              required
              autosize
              minRows={2}
              maxRows={4}
              {...form.getInputProps("question")}
            />
            <TextInput label="Category" {...form.getInputProps("category")} />
            <Stack gap={0}>
              <Title order={3}>Answers</Title>
              {form.errors.answers && (
                <div style={{ color: "red", fontSize: 14 }}>
                  {form.errors.answers}
                </div>
              )}
            </Stack>
            <Stack gap="xs">
              {form.values.answers.map((answer, idx) => (
                <AnswerInput
                  key={idx}
                  index={idx + 1}
                  value={answer}
                  onChange={(val) => updateAnswer(idx, val)}
                  onRemove={() => removeAnswer(idx)}
                  showRemove
                />
              ))}
              <Button
                variant="light"
                onClick={addAnswer}
                mt="xs"
                disabled={form.values.answers.length >= 8}
              >
                Add Answer
              </Button>
            </Stack>
            <Button type="submit">Create</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
