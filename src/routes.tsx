import { Routes, Route } from "react-router-dom";
import QuestionsTable from "./components/questions-table";
import QuestionDetails from "./components/question-details";
import CreateQuestion from "./components/create-question";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<QuestionsTable />} />
      <Route path="/questions/:id" element={<QuestionDetails />} />
      <Route path="/questions/create" element={<CreateQuestion />} />
    </Routes>
  );
}
