import React from "react";
import { useQuiz } from "./hooks/useQuiz";

const Quiz: React.FC = () => {
  const {
    currentQuestion,
    handleAnswer,
    score,
    quizFinished,
    selectedAnswer,
    showCorrectAnswer,
    correctAnswer,
    performanceMessage,
    resetQuiz,
  } = useQuiz();

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-blue-300">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
          <h2 className="text-3xl font-bold text-gray-800"> Quiz Completed!</h2>
          <p className="text-xl mt-4 text-gray-600">Your Score: <span className="font-semibold text-blue-500">{score} / 10</span></p>
          <p className="text-lg mt-2 font-semibold text-green-500">{performanceMessage}</p>
          <button
            onClick={resetQuiz}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300"
          >
            🔄 Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-blue-400">
      <div className="bg-blue-500 text-white p-6 rounded-tl-3xl rounded-tr-3xl rounded-bl-md rounded-br-md text-center w-80 shadow-lg">
        <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
      </div>
      <div className="mt-6 w-80 space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`flex items-center w-full p-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 
              ${selectedAnswer === option ? (option === correctAnswer ? "bg-green-500" : "bg-red-500") : "bg-blue-400 hover:bg-blue-500"} 
              disabled:opacity-50`}
          >
            <span className="bg-white text-blue-500 font-bold rounded-full px-4 py-2 mr-3">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
      {showCorrectAnswer && (
        <p className="mt-4 text-lg font-semibold text-white">
          ✅ Correct Answer: <span className="text-green-500 font-bold">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
};

export default Quiz;

