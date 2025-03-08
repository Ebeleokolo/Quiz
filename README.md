# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

import { useQuiz } from "../hooks/useQuiz";

const Quiz = () => {
  const { currentQuestion, handleAnswer, quizFinished, score, resetQuiz } = useQuiz();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {!quizFinished ? (
        <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score}</p>
          <button
            onClick={resetQuiz}
            className="mt-4 p-3 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;