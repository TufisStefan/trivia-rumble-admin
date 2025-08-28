import { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Loader,
  Stack,
  Title,
  Group,
  Button,
  ActionIcon,
  ThemeIcon,
  Flex,
  Popover,
  Text,
} from "@mantine/core";
import type { Question } from "../models/question";
import {
  deleteQuestion,
  fetchQuestions,
  toggleQuestionActive,
} from "../services/question.service";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";

function QuestionsTable() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletePopover, setDeletePopover] = useState<string | null>(null);

  const loadQuestions = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetchQuestions(pageNum);
      setQuestions(res.questions);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions(page);
  }, [page]);

  const handleToggleActive = async (id: string) => {
    setLoading(true);
    try {
      await toggleQuestionActive(id);
      loadQuestions(page);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteQuestion(id);
      loadQuestions(page);
      setDeletePopover(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap={32} w="100%" h="100%" bg={"grayscale.0"}>
      <Group justify="space-between" align="center">
        <Title order={1}>Questions</Title>
        <Button onClick={() => navigate("/questions/create")}>Add</Button>
      </Group>
      <Stack
        w="100%"
        h="100%"
        gap={32}
        justify="space-between"
        align="flex-end"
        p={24}
        style={{ border: "1px solid var(--mantine-color-grayscale-3)" }}
      >
        {loading ? (
          <Flex justify={"center"} align="center" h="100%" w={"100%"}>
            <Loader />
          </Flex>
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Question</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created At</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {questions.map((q) => (
                <Table.Tr
                  key={q._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/questions/${q._id}`)}
                >
                  <Table.Td>{q.question}</Table.Td>
                  <Table.Td>{q.category}</Table.Td>
                  <Table.Td>{q.isActive ? "Active" : "Inactive"}</Table.Td>
                  <Table.Td>
                    {q.createdAt
                      ? dayjs(q.createdAt).format("DD MMM YYYY")
                      : "-"}
                  </Table.Td>
                  <Table.Td>
                    <Group>
                      <ThemeIcon
                        variant="white"
                        size={32}
                        color={q.isActive ? "teal" : "gray"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActive(q._id);
                        }}
                        title={q.isActive ? "Deactivate" : "Activate"}
                      >
                        {q.isActive ? (
                          <FaToggleOn size={32} />
                        ) : (
                          <FaToggleOff size={32} />
                        )}
                      </ThemeIcon>
                      <Popover
                        opened={deletePopover === q._id}
                        onClose={() => setDeletePopover(null)}
                        position="bottom"
                        withArrow
                        shadow="md"
                      >
                        <Popover.Target>
                          <ThemeIcon
                            variant="white"
                            size={32}
                            color="red"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletePopover(q._id);
                            }}
                            title="Delete"
                          >
                            <FaTrash />
                          </ThemeIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Text mb="xs">Delete this question?</Text>
                          <Group gap="xs">
                            <Button
                              color="red"
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(q._id);
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="subtle"
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletePopover(null);
                              }}
                            >
                              Cancel
                            </Button>
                          </Group>
                        </Popover.Dropdown>
                      </Popover>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
        <Pagination value={page} onChange={setPage} total={totalPages} />
      </Stack>
    </Stack>
  );
}

export default QuestionsTable;
