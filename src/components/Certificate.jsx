import React, { useRef } from 'react';

const Certificate = ({ name = "John Doe", score = 95 }) => {
  const certRef = useRef(null);

  const handlePrint = () => {
    const printContents = certRef.current?.innerHTML;
    if (!printContents) return;

    const win = window.open('', '', 'width=900,height=700');
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
              text-align: center;
              background-color: #f3f4f6;
            }
            .certificate {
              width: 800px;
              margin: auto;
              background: white;
              border: 10px solid #facc15;
              border-radius: 12px;
              padding: 60px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .certificate h1 {
              color: #facc15;
              font-size: 2rem;
            }
            .certificate h2 {
              color: #1d4ed8;
              text-decoration: underline;
            }
            .certificate p {
              color: #374151;
              margin: 8px 0;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="certificate">
            ${printContents}
          </div>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div
        ref={certRef}
        className="w-[800px] bg-white border-[10px] border-yellow-500 rounded-xl shadow-xl px-12 py-16 text-center"
      >
        <h1 className="text-4xl font-extrabold text-yellow-600 mb-6 tracking-wider">
          🎓 Certificate of Completion
        </h1>
        <p className="text-lg text-gray-600">This certifies that</p>
        <h2 className="text-3xl font-bold text-blue-800 underline my-4">{name}</h2>
        <p className="text-lg text-gray-600">has successfully completed the MCQ Knowledge Test</p>
        <p className="text-2xl font-bold text-green-700 mt-6">Score: {score}/20</p>

        <div className="mt-12 text-sm text-gray-500 flex justify-between">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>MCQ Test Authority</p>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md transition"
      >
        Print Certificate
      </button>
    </div>
  );
};

export default Certificate;
