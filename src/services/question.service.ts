import api from "./instance";
import type { NewQuestion } from "../models/question";

export async function fetchQuestions(page: number = 1) {
  const response = await api.get(`/questions?page=${page}`);
  return response.data;
}

export async function fetchQuestionById(id: string) {
  const res = await api.get(`/questions/${id}`);
  return res.data;
}

export async function createQuestion(data: NewQuestion) {
  const res = await api.post("/questions", data);
  return res.data;
}

export async function toggleQuestionActive(id: string) {
  const res = await api.patch(`/questions/${id}/toggle`);
  return res.data;
}

export async function deleteQuestion(id: string) {
  await api.delete(`/questions/${id}`);
}
