export async function generateProject(skills, interest, experience) {
  const response = await fetch("/api/generate-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skills,
      interest,
      experience,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate project");
  }

  return data.result;
}