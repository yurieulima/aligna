"use client";
import { useEffect, useState } from "react";

type Question = {
  id: number;
  question_text: string;
  trait: string;
};

export default function PersonalityTest() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Erro ao buscar perguntas:", err));
  }, []);

  const handleAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const convertAnswer = (value: number) => {
    switch (value) {
      case 1:
        return "Discordo totalmente";
      case 2:
        return "Discordo";
      case 3:
        return "Neutro";
      case 4:
        return "Concordo";
      case 5:
        return "Concordo totalmente";
      default:
        return "";
    }
  }

  const handleSubmit = () => {
    console.log("Respostas:", answers);
    // TODO: enviar para a API
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teste de Personalidade</h1>
      {questions.map((q) => (
        <div key={q.id} className="my-6">
          <p className="mb-2 font-medium">{q.question_text}</p>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={answers[q.id] ?? 3}
            onChange={(e) => handleAnswer(q.id, Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-1">Resposta: {convertAnswer(answers[q.id] ?? 3)}</div>
        </div>
      ))}
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </div>
  );
}