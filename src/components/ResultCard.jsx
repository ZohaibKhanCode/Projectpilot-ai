import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { useState } from "react";import {
  Sparkles,
  Rocket,
  Code2,
  Map,
  Brain,
} from "lucide-react";


function cleanText(text) {
  return text
    ?.replace(/\*/g, "")
    ?.replace(/=+/g, "")
    ?.replace(/#+/g, "")
    ?.trim();
}


function parseResult(text) {
  return {
    title: cleanText(text.match(/TITLE:\s*([\s\S]*?)CATEGORY:/i)?.[1]),
    category: cleanText(text.match(/CATEGORY:\s*([\s\S]*?)DIFFICULTY:/i)?.[1]),
    difficulty: cleanText(text.match(/DIFFICULTY:\s*([\s\S]*?)TIME:/i)?.[1]),
    time: cleanText(text.match(/TIME:\s*([\s\S]*?)PORTFOLIO VALUE:/i)?.[1]),
    portfolio: cleanText(text.match(/PORTFOLIO VALUE:\s*([\s\S]*?)RESUME VALUE:/i)?.[1]),
    resume: cleanText(text.match(/RESUME VALUE:\s*([\s\S]*?)PROBLEM:/i)?.[1]),
    problem: cleanText(text.match(/PROBLEM:\s*([\s\S]*?)FEATURES:/i)?.[1]),
    features: cleanText(text.match(/FEATURES:\s*([\s\S]*?)TECH STACK:/i)?.[1]),
    tech: cleanText(text.match(/TECH STACK:\s*([\s\S]*?)ROADMAP:/i)?.[1]),
    roadmap: cleanText(text.match(/ROADMAP:\s*([\s\S]*)/i)?.[1]),
  };
}

const getCardTitle = (text) => {

  const content = text.toLowerCase();

  if (content.includes("explanation")) {
    return "💡 Explanation";
  }

  if (content.includes("approach")) {
    return "🚀 Recommended Approach";
  }

  if (
    content.includes("tools") ||
    content.includes("technologies")
  ) {
    return "🛠 Tools & Technologies";
  }

  if (content.includes("tips")) {
    return "⭐ Pro Tips";
  }

  return "🤖 AI Insight";
};



function ResultCard({
  result,
  addToFavorites,
  experience,
}) {
  const downloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  const lines = doc.splitTextToSize(result, 180);
  doc.text(lines, 10, 20);
  doc.save("ProjectPilot-AI.pdf");
};



const askAI = async (customQuestion = question) => {
    if (!question.trim()) return;

  setChatLoading(true);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful software project mentor.",
            },
            {
              role: "user",
content: `
You are ProjectPilot AI, an expert software project mentor.

Analyze this project:

${result}

User Question:
${customQuestion}

Give a helpful answer using this structure:

💡 Explanation:
Explain the concept clearly.

🚀 Recommended Approach:
Give practical steps to solve it.

🛠 Tools & Technologies:
Mention useful technologies if needed.

✅ Pro Tips:
Give important advice for building this project.

Keep the answer professional, beginner-friendly, and easy to understand.
`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const answer = data.choices[0].message.content
  .replace(/\*/g, "")
  .replace(/#+/g, "")
  .trim();

setAiAnswer(answer);
setLastQuestion(customQuestion);
  } catch (error) {
    console.error(error);
    setAiAnswer("Something went wrong.");

  } finally {
    setChatLoading(false);
  }
};


const regenerateAI = () => {
  if (!lastQuestion) return;

  askAI(lastQuestion);
};





const [copied, setCopied] = useState(false);
const [question, setQuestion] = useState("");
const [aiAnswer, setAiAnswer] = useState("");
const [chatLoading, setChatLoading] = useState(false);
const [lastQuestion, setLastQuestion] = useState("");
const cleanedResult = result.replace(/\*\*/g, "");

const project = parseResult(cleanedResult);

if (!project.title) {
  project.title =
    cleanedResult.split("\n")[0].trim() ||
    "Untitled Project";
}

console.log(cleanedResult);

    const badgeColors = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

  const cards = [
    {
      title: "Project Idea",
      description:
        "AI creates a unique solution based on your skills and interests.",
      icon: Rocket,
    },
    {
      title: "Smart Tech Stack",
      description:
        "Get recommended technologies for building your project.",
      icon: Code2,
    },
    {
      title: "Development Roadmap",
      description:
        "Follow an AI generated path from idea to deployment.",
      icon: Map,
    },
  ];


  return (
    <motion.div
  key={result}
  initial={{
    opacity: 0,
    y: 50
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
  className="
  mt-10
  bg-gradient-to-br 
  from-slate-900 
  to-slate-950
  border border-slate-800
  rounded-3xl
  p-8
  shadow-2xl
  "
>
    


      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div
        className="
        p-3 rounded-2xl
        bg-cyan-500/10
        "
        >
          <Brain className="text-cyan-400"/>
        </div>


        <div>
          <h2 className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-purple-500
          text-transparent
          bg-clip-text
          ">
            AI Generated Project Plan
          </h2>

          <p className="text-slate-400">
  Powered by Artificial Intelligence
</p>

<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3 }}
  className={`
    inline-block
    mt-3
    px-4
    py-2
    rounded-full
    border
    font-semibold
    ${badgeColors[experience]}
  `}
>
  {experience} Level
</motion.div>

        </div>

      </div>



      {/* Animated Cards */}

      <div className="
      grid
      md:grid-cols-3
      gap-6
      mb-10
      ">

      {cards.map((card,index)=>{

        const Icon = card.icon;


        return(

       <motion.div

key={index}

initial={{
  opacity: 0,
  y: 50,
  scale: 0.9
}}

animate={{
  opacity: 1,
  y: 0,
  scale: 1
}}

transition={{
  duration: 0.5,
  delay: index * 0.3,
  type: "spring"
}}

whileHover={{
  y: -12,
  scale: 1.05,
  transition: {
    duration: 0.2
  }
}}

        className="
        bg-slate-800/60
        backdrop-blur-xl
        border
        border-slate-700
        rounded-2xl
        p-6
        cursor-pointer
        "

        >

          <Icon 
          className="
          text-cyan-400
          mb-4
          "
          size={35}
          />


          <h3 className="
          text-xl
          font-semibold
          mb-2
          ">
            {card.title}
          </h3>


          <p className="
          text-slate-400
          ">
            {card.description}
          </p>


        </motion.div>

        )

      })}


      </div>



      {/* AI Response */}

      <motion.div

      initial={{
        opacity:0
      }}

      animate={{
        opacity:1
      }}

      transition={{
        delay:0.8
      }}

      className="
      bg-black/40
      border
      border-slate-800
      rounded-3xl
      p-7
      "

      >

     <div className="flex items-center justify-between mb-4">

  <div className="flex items-center gap-2">
    <Sparkles className="text-yellow-400" />

    <h3 className="text-xl font-bold">
      AI Analysis
    </h3>
  </div>

<div className="flex gap-2">

  <button
    onClick={() => {
      navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }}
    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
  >
    {copied ? "✅ Copied!" : "📋 Copy"}
  </button>

  <button
    onClick={downloadPDF}
    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition"
  >
    📄 PDF
  </button>

  <button
  onClick={addToFavorites}
  className="
  px-4
  py-2
  rounded-xl
  bg-yellow-500
  hover:bg-yellow-600
  transition
  "
>
  ⭐ Favorite
</button>




</div>

</div>

<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
  }}
  className="
    group
    relative
    overflow-hidden
    bg-gradient-to-br
    from-cyan-500/10
    via-slate-900
    to-purple-500/10
    border
    border-cyan-400/20
    rounded-3xl
    p-8
    mb-8
shadow-xl
hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]
transition-all
duration-300">

  {/* Glow Effect */}
  <div
    className="
      absolute
      -top-20
      -right-20
      w-48
      h-48
  bg-cyan-400/20
  group-hover:bg-cyan-400/50
    rounded-full
    blur-3xl
    transition-all
    duration-500
    "
  />


  <div className="
    relative
    flex
    items-center
    gap-4
    mb-5
  ">

    <div
      className="
        w-14
        h-14
        rounded-2xl
        bg-cyan-500/20
        flex
        items-center
        justify-center
        text-3xl
      "
    >
      🚀
    </div>


    <div>

      <p className="
        text-cyan-400
        text-sm
        font-semibold
      ">
        AI GENERATED PROJECT
      </p>


      <p className="
        text-slate-400
        text-sm
      ">
        Created by ProjectPilot AI
      </p>

    </div>


  </div>



  <h1
  className="
    relative
    text-2xl
    font-bold
    text-white
    leading-tight
  "
>
{project.title}</h1>


  <div className="
    mt-5
    flex
    flex-wrap
    gap-3
  ">

    <span
      className="
        px-4
        py-2
        rounded-full
        bg-cyan-500/10
        border
        border-cyan-400/30
        text-cyan-300
        text-sm
      "
    >
      🤖 AI Generated
    </span>


    <span
      className="
        px-4
        py-2
        rounded-full
        bg-purple-500/10
        border
        border-purple-400/30
        text-purple-300
        text-sm
      "
    >
      🚀 Portfolio Ready
    </span>


  </div>




  

</motion.div>



<motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
className="
mt-6
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-cyan-500
hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
transition-all
duration-300
">
  <h3 className="text-cyan-400 text-lg font-bold mb-3">
    🎯 Problem Solved
  </h3>
  <p className="text-slate-300 leading-7">
    {project.problem}
  </p>
</motion.div>



<motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
className="
mt-6
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-cyan-500
hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
transition-all
duration-300
">
  <h3 className="text-cyan-400 text-lg font-bold mb-2">
    ✨ Key Features
  </h3>

  <div className="space-y-3 mt-4">
  {project.features
    ?.split("\n")
    .filter((feature) => feature.trim() !== "")
    .map((feature, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.15,
        }}
        whileHover={{
          scale: 1.02,
          x: 5,
        }}
        className="
          flex
          items-center
          gap-3
          bg-slate-800/80
          border
          border-slate-700
          rounded-xl
          p-4
          hover:border-cyan-400
          transition-all
        "
      >
        <div
          className="
            w-8
            h-8
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          ✓
        </div>

        <p className="text-slate-200">
          {feature.replace("-", "").trim()}
        </p>
      </motion.div>
    ))}
</div>


</motion.div>



<motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
className="
mt-6
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-cyan-500
hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
transition-all
duration-300
">
<h3 className="text-cyan-400 text-lg font-bold mb-2">
    🛠 Tech Stack
  </h3>
  <div className="flex flex-wrap gap-3 mt-4">
  {project.tech
    ?.split("\n")
    .filter((tech) => tech.trim() !== "")
    .map((tech, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: index * 0.1,
        }}
        whileHover={{
          scale: 1.08,
        }}
        className="
          px-4
          py-2
          rounded-full
          bg-cyan-500/10
          border
          border-cyan-500/30
          text-cyan-300
          font-medium
          cursor-default
        "
      >
        {tech.trim()}
      </motion.div>
    ))}
</div>


</motion.div>



<motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
className="
mt-6
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-cyan-500
hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
transition-all
duration-300
">
  <h3 className="text-cyan-400 text-lg font-bold mb-2">
    📅 Development Roadmap
  </h3>

  <div className="space-y-5 mt-4">
  {project.roadmap
    ?.split("\n")
    .filter((step) => step.trim() !== "")
    .map((step, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.2,
        }}
        className="flex items-start gap-4"
      >
        {/* Timeline Circle */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-cyan-400 border-4 border-slate-900"></div>

          {index !==
            project.roadmap
              .split("\n")
              .filter((step) => step.trim() !== "").length - 1 && (
            <div className="w-1 h-12 bg-cyan-500/40 mt-1 rounded-full"></div>
          )}
        </div>

        {/* Timeline Content */}
        <div
          className="
            flex-1
            bg-slate-800/80
            border
            border-slate-700
            rounded-xl
            p-4
            hover:border-cyan-400
            transition-all
          "
        >
          <p className="text-slate-200">
            {step}
          </p>
        </div>
      </motion.div>
    ))}
</div>
</motion.div>

      </motion.div>


{/* AI Assistant Section */}

<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    delay: 1
  }}
  className="
  mt-10
  bg-slate-900
  border
  border-slate-800
  rounded-3xl
  p-6
  "
>

  <div className="flex items-center gap-3 mb-4">

  <div
    className="
      w-12
      h-12
      rounded-2xl
      bg-gradient-to-br
      from-cyan-400
      to-purple-500
      flex
      items-center
      justify-center
      text-2xl
      shadow-lg
    "
  >
    🤖
  </div>


  <div>
    <h3 className="
      text-xl
      font-bold
      text-white
    ">
      ProjectPilot AI Assistant
    </h3>

    <p className="
      text-sm
      text-slate-400
    ">
      Ask anything about your project
    </p>
  </div>

</div>


  <textarea
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="Ask anything about this project..."
  className="
  w-full
  min-h-[120px]
  bg-slate-900/70
  backdrop-blur-xl
  border
  border-slate-700
  rounded-2xl
  p-5
  text-slate-200
  placeholder:text-slate-500
  focus:outline-none
  focus:border-cyan-400
  focus:ring-2
  focus:ring-cyan-400/20
  transition-all
  resize-none
"
  />


  <motion.button
  onClick={askAI}
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.97,
  }}
  className="
    mt-4
    w-full
    py-3
    rounded-xl
    font-semibold
    text-white
    bg-gradient-to-r
    from-cyan-500
    to-purple-500
    shadow-lg
    hover:shadow-cyan-500/30
    transition-all
  "
>
  {chatLoading 
    ? "🤖 AI is thinking..."
    : "🚀 Ask AI"
  }
</motion.button>

{chatLoading && (
  <motion.div
    initial={{
      opacity:0,
      y:20
    }}
    animate={{
      opacity:1,
      y:0
    }}
    className="
      mt-5
      bg-slate-900/80
      border
      border-cyan-500/30
      rounded-2xl
      p-5
      flex
      items-center
      gap-4
    "
  >

    <div className="
      text-3xl
      animate-bounce
    ">
      🤖
    </div>


    <div>

      <p className="
        text-cyan-400
        font-bold
      ">
        ProjectPilot AI is thinking...
      </p>

      <p className="
        text-slate-400
        text-sm
      ">
        Analyzing your project and preparing suggestions
      </p>

    </div>

  </motion.div>
)}




<button
  onClick={regenerateAI}
  className="
    mt-3
    w-full
    bg-purple-500
    hover:bg-purple-600
    py-3
    rounded-xl
    font-semibold
    transition
  "
>
  🔄 Regenerate Answer
</button>

  {aiAnswer && (
  <motion.div
    initial={{
      opacity: 0,
      y: 30,
      scale: 0.95,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.4,
    }}
    className="
      mt-8
      rounded-3xl
      bg-gradient-to-br
from-cyan-500/30
via-slate-900
to-purple-500/30
      border
      border-cyan-400/30
      p-6
    "
  >

    <div className="
      flex
      items-center
      gap-4
      mb-5
    ">
      <div className="
        w-12
        h-12
        rounded-2xl
        bg-cyan-500/20
        flex
        items-center
        justify-center
        text-2xl
      ">
        🤖
      </div>

      <div>
        <h3 className="
          text-xl
          font-bold
          text-cyan-400
        ">
          ProjectPilot AI Assistant
        </h3>

        <p className="text-sm text-slate-400">
          Your project development guide
        </p>
      </div>

    </div>


    <div className="
      bg-slate-950/70
      border
      border-slate-800
      rounded-2xl
      p-5
    ">

      <div className="space-y-4">

  {aiAnswer
    .split("\n\n")
    .filter((item) => item.trim() !== "")
    .map((item, index) => (

      <motion.div
        key={index}
        initial={{
        opacity: 0,
        y: 50,
        scale: 0.95,
        }}
        animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        }}
        transition={{
          delay: index * 0.15
        }}
        className="
          bg-slate-800/70
          border
          border-slate-700
          rounded-2xl
          p-5
          hover:border-cyan-400
          transition-all
        "
      >

        <div>

  <h4 className="
    text-cyan-400
    font-bold
    mb-2
    flex
    items-center
    gap-2
  ">

    {getCardTitle(item)}

  </h4>


  <p className="
    text-slate-200
    leading-7
    whitespace-pre-line
  ">
    {item}
  </p>

</div>

      </motion.div>

  ))}

</div>

    </div>


  </motion.div>
)}

</motion.div>


    </motion.div>
  );
}


export default ResultCard;