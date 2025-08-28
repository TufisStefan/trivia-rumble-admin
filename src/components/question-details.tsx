import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Loader,
  Paper,
  Text,
  Group,
  Title,
  Button,
  Stack,
  Grid,
} from "@mantine/core";
import { fetchQuestionById } from "../services/question.service";
import dayjs from "dayjs";
import type { Answer } from "../models/question";

export default function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchQuestionById(id)
      .then(setQuestion)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (!question) return <Text>No question found.</Text>;

  return (
    <Stack justify="center" align="center" h="100%">
      <Title order={1} style={{ alignSelf: "flex-start" }}>
        Question details
      </Title>
      <Paper p={24} shadow="sm" withBorder miw={800} mih={600}>
        <Group justify="space-between" mb="md" gap={32}>
          <Title order={3}>{question.question}</Title>
          <Button component="a" href="/">
            Back
          </Button>
        </Group>
        <Stack gap={16}>
          <Text>{`Category: ${question.category}`}</Text>
          <Text>{`Status: ${question.isActive ? "Active" : "Inactive"}`}</Text>
          <Text>
            {`Created: ${
              question.createdAt
                ? dayjs(question.createdAt).format("DD MMM YYYY")
                : "-"
            }`}
          </Text>
          <Grid gutter={8} mt="md">
            <Grid.Col span={11}>
              <Title order={4}>Answers</Title>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={4}>Score</Title>
            </Grid.Col>
            {question.answers.map((answer: Answer, idx: number) => (
              <React.Fragment key={idx}>
                <Grid.Col span={11}>
                  <Text fw={500}>{answer.text}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text c="grayscale.6">{answer.score}</Text>
                </Grid.Col>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
}
