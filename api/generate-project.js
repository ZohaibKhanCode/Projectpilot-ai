import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { skills, interest, experience } = req.body;

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing");

      return res.status(500).json({
        error: "GROQ_API_KEY is not configured on the server",
      });
    }

    const prompt = `
You are an expert software project mentor.

Skills: ${skills}
Interest: ${interest}
Experience Level: ${experience}

Generate a project plan in this exact format:

TITLE:
(Project name)

CATEGORY:
(Project category)

DIFFICULTY:
(Beginner, Intermediate, Advanced)

TIME:
(Example: 2-4 Weeks)

PORTFOLIO VALUE:
(High, Medium, Low)

RESUME VALUE:
(High, Medium, Low)

PROBLEM:
(Problem description)

FEATURES:
- Feature 1
- Feature 2
- Feature 3

TECH STACK:
- Technology 1
- Technology 2
- Technology 3

ROADMAP:
1. Step one
2. Step two
3. Step three

Keep the headings exactly the same.

Format the response clearly using headings.
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response?.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("Groq returned an empty response");
    }

    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.error("Groq API Error:", error);

    return res.status(500).json({
      error: error?.message || "Failed to generate project",
    });
  }
}