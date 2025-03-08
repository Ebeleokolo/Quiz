import { useState } from "react";

export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    question: "What is Solidity primarily used for?",
    options: ["Frontend development", "Writing smart contracts", "Managing databases", "Web scraping"],
    correctAnswer: "Writing smart contracts",
  },
  {
    question: "Which keyword is used to declare an immutable state variable in Solidity?",
    options: ["constant", "immutable", "final", "static"],
    correctAnswer: "immutable",
  },
  {
    question: "What is the purpose of the require() function in Solidity?",
    options: ["To return a value", "To validate conditions and revert if false", "To import external files", "To create events"],
    correctAnswer: "To validate conditions and revert if false",
  },
  {
    question: "What is msg.sender in Solidity?",
    options: ["The address of the sender of the transaction", "The hash of the transaction", "The contract's address", "The block number"],
    correctAnswer: "The address of the sender of the transaction",
  },
  {
    question: "Which storage type is used for variables that persist between function calls in Solidity?",
    options: ["memory", "calldata", "storage", "stack"],
    correctAnswer: "storage",
  },
  {
    question: "What does the payable keyword in Solidity do?",
    options: ["Allows a function to accept Ether payments", "Makes the function free to use", "Reduces gas costs", "Makes the function run automatically"],
    correctAnswer: "Allows a function to accept Ether payments",
  },
  {
    question: "In Web3.js, which method is used to call a read-only function on a smart contract?",
    options: ["contract.methods.functionName().call()", "contract.methods.functionName().send()", "web3.eth.call()", "contract.invokeFunction()"],
    correctAnswer: "contract.methods.functionName().call()",
  },
  {
    question: "What is the default visibility of a Solidity function?",
    options: ["private", "internal", "public", "external"],
    correctAnswer: "public",
  },
  {
    question: "Which network is NOT an Ethereum testnet?",
    options: ["Ropsten", "Kovan", "Goerli", "Binance Smart Chain"],
    correctAnswer: "Binance Smart Chain",
  },
  {
    question: "Which Solidity function modifier prevents a function from modifying the state?",
    options: ["view", "pure", "constant", "immutable"],
    correctAnswer: "pure",
  }
];

export function useQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setQuizFinished(true);
      }
    }, 2000);
  };

  const getPerformanceMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Congratulations! You Passed!";
    if (percentage >= 50) return "Good Job! Keep Improving.";
    return "❌ You Failed. Try Again!";
  };

  return {
    currentQuestion,
    handleAnswer,
    score,
    quizFinished,
    selectedAnswer,
    showCorrectAnswer,
    correctAnswer: currentQuestion?.correctAnswer,
    performanceMessage: getPerformanceMessage(),
    resetQuiz: () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizFinished(false);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    },
  };
}
