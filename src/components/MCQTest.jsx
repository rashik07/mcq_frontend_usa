import React, { useEffect, useState } from 'react';
import Certificate from './Certificate';

const MCQTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleOptionChange = (id, option) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleAutoAnswer = () => {
    const autoAnswers = {};
    questions.forEach(q => {
      autoAnswers[q.id] = q.answer;
    });
    setSelectedAnswers(autoAnswers);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-blue-800 mb-8 sm:mb-12 tracking-wide">
          🧠 MCQ Knowledge Test
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="border border-gray-300 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all"
              >
                <p className="text-lg sm:text-xl font-semibold mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map(opt => (
                    <label
                      key={opt}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition text-sm sm:text-base ${
                        selectedAnswers[q.id] === opt
                          ? 'border-blue-500 bg-blue-100 font-semibold'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={selectedAnswers[q.id] === opt}
                        onChange={() => handleOptionChange(q.id, opt)}
                        className="mr-3"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center space-y-4 sm:space-x-4 sm:space-y-0 flex flex-col sm:flex-row justify-center">
              <button
                type="button"
                onClick={handleAutoAnswer}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-base sm:text-lg font-bold px-6 py-3 rounded-full shadow-md transition"
              >
                Auto Answer
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white text-base sm:text-lg font-bold px-8 py-3 rounded-full shadow-lg transition"
              >
                Submit Answers
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-4xl font-bold text-green-600">
                Your Score: {score}/20
              </h2>
              {score >= 16 ? (
                <Certificate name="John Doe" score={score} />
              ) : (
                <p className="text-lg sm:text-xl text-red-500 font-semibold mt-4">
                  ❌ You didn’t qualify for a certificate. Try again!
                </p>
              )}
            </div>

            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.answer;

              return (
                <div
                  key={q.id}
                  className={`border-2 rounded-xl p-4 sm:p-6 ${
                    isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  }`}
                >
                  <p className="text-lg sm:text-xl font-semibold mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {q.options.map(opt => {
                      const isUserAnswer = userAnswer === opt;
                      const isRightAnswer = q.answer === opt;

                      return (
                        <div
                          key={opt}
                          className={`p-3 rounded-lg border text-sm sm:text-base ${
                            isRightAnswer
                              ? 'border-green-600 bg-green-100 font-semibold'
                              : isUserAnswer
                              ? 'border-red-500 bg-red-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {opt}
                          {isUserAnswer && !isRightAnswer && (
                            <span className="ml-2 text-xs sm:text-sm text-red-700 font-medium">
                              ✘ Your Answer
                            </span>
                          )}
                          {isUserAnswer && isRightAnswer && (
                            <span className="ml-2 text-xs sm:text-sm text-green-700 font-medium">
                              ✔ Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {!isCorrect && (
                    <p className="text-xs sm:text-sm text-gray-800 italic">
                      ✅ Correct Answer: <span className="font-semibold">{q.answer}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQTest;
