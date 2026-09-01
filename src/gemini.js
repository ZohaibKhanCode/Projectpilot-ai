import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateProject(skills, interest, experience) {

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

  console.log(response.choices[0].message.content);

  return response.choices[0].message.content;
}