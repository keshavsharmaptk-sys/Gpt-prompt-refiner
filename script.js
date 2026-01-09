const API_KEY = "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";


async function refinePrompt() {
  const prompt = document.getElementById("promptInput").value;
  const output = document.getElementById("outputInput").value;
  const resultBox = document.getElementById("result");

  if (!prompt.trim()) {
    alert("Please enter a prompt");
    return;
  }

  resultBox.innerText = "Analyzing...";

  const systemPrompt = `
You are an AI Prompt Quality Evaluator and Refiner.

Tasks:
1. Refine the prompt for clarity and specificity.
2. Detect ambiguity or missing constraints.
3. Explain refinements.
4. Score the prompt (0–10) for clarity, specificity, completeness.
5. Evaluate model output if provided.
`;

  const userMessage = `
Original Prompt:
${prompt}

Model Output:
${output || "Not provided"}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.2
    })
  });

  const data = await response.json();
  resultBox.innerText = data.choices[0].message.content;
    }
