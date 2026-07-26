import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateProject } from "./gemini";
import ResultCard from "./components/ResultCard";
import Dashboard from "./components/Dashboard";
import GeneratorForm from "./components/GeneratorForm";
import Particles from "./components/Particles";
import {
  Brain,
  Rocket,
  Code2,
  Sparkles,
  FolderOpen,
  Star,
  BarChart3,
} from "lucide-react";

function App() {

const [skills, setSkills] = useState("");
const [interest, setInterest] = useState("Education");
const [experience, setExperience] = useState("Beginner");

const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const [loadingText, setLoadingText] = useState("Initializing AI...");
const [history, setHistory] = useState(() => {
const savedHistory = localStorage.getItem("projectHistory");
  return savedHistory ? JSON.parse(savedHistory) : [];
});

const [search, setSearch] = useState("");

const [favorites, setFavorites] = useState(() => {
const saved = localStorage.getItem("favorites");

  return saved ? JSON.parse(saved) : [];
});

const addToFavorites = () => {
  if (!result) return;

  setFavorites((prev) => {
    if (prev.includes(result)) {
      return prev;
    }

    return [result, ...prev];
  });
};

const removeFromFavorites = (item) => {
  setFavorites((prev) =>
    prev.filter((fav) => fav !== item)
  );
};


const removeFromHistory = (item) => {
  setHistory((prev) =>
    prev.filter((project) => project !== item)
  );
};


useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);


useEffect(() => {
  localStorage.setItem(
    "projectHistory",
    JSON.stringify(history)
  );
}, [history]);


const filteredHistory = history.filter((item) =>
  item
    .toLowerCase()
    .includes(search.toLowerCase())
);


const totalProjects = history.length;

const totalFavorites = favorites.length;

const lastProject =
  history.length > 0
    ? history[0]
        .split("PROBLEM:")[0]
        .replace("TITLE:", "")
        .replace(/\*/g, "")
        .trim()
    : "None";



const loadingMessages = [
  "Analyzing your skills...",
  "Finding the best project idea...",
  "Choosing the ideal tech stack...",
  "Designing the development roadmap...",
  "Finalizing your AI project..."
];


const handleGenerate = async () => {
  let index = 0;

  setLoading(true);
  setLoadingText(loadingMessages[0]);

  const interval = setInterval(() => {
    index++;

    if (index < loadingMessages.length) {
      setLoadingText(loadingMessages[index]);
    }
  }, 1200);

  try {
    const response = await generateProject(
      skills,
      interest,
      experience
    );

    setResult(response);
setHistory((prev) => [response, ...prev]);


} catch (error) {
    console.error(error);
    setResult("Error generating project ideas.");

  } finally {
    clearInterval(interval);
    setLoading(false);
  }
};

const particles = Array.from({ length: 35 });


 return (
  <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

    <Particles />

    {/* Animated Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 6 + (index % 5),
            repeat: Infinity,
          }}
        />
      ))}
    </div>

    {/* Glow Background */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

    <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-slate-800">

        <div className="flex items-center gap-3">

  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
    <Brain className="text-cyan-400" />
  </div>

  <div>
    <h1 className="text-2xl font-bold">
      ProjectPilot AI
    </h1>

    <p className="text-xs text-slate-400">
      Smart AI Development Assistant
    </p>
  </div>

</div>


      <div
  className="
    hidden
    md:flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    bg-cyan-500/10
    border
    border-cyan-400/30
    text-cyan-300
    text-sm
    font-medium
  "
>
  ✨ AI Project Planner
</div>



      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">

       <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative"
>

  {/* Add these two lines */}
  <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>

  <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>


  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 px-5 py-2 rounded-full mb-8">
  <Sparkles size={16} className="text-cyan-400" />
  <span className="text-cyan-300 font-medium">
    AI-Powered Software Project Generator
  </span>
</div>

<h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
  Turn Your Skills Into

  <motion.span
  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
  Real-World Projects
</motion.span>
</h1>

<p className="mt-8 text-slate-400 text-lg max-w-3xl mx-auto leading-8">
  Generate personalised software project ideas, discover the best
  technology stack, receive a complete development roadmap, and get
  AI-powered guidance—all in one place.
</p>


        </motion.div>

      </section>

      {/* AI Cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ y: -8 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6"
        >
          <Rocket className="text-cyan-400 mb-4" size={35} />
          <h3 className="text-xl font-bold mb-2">
            Project Ideas
          </h3>

          <p className="text-slate-400">
            AI generates personalized project ideas based on your skills and interests.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6"
        >
          <Code2 className="text-purple-400 mb-4" size={35} />
          <h3 className="text-xl font-bold mb-2">
            Tech Stack
          </h3>

          <p className="text-slate-400">
            Receive the best frontend, backend, database and deployment recommendations.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6"
        >
          <Brain className="text-cyan-400 mb-4" size={35} />
          <h3 className="text-xl font-bold mb-2">
            Development Roadmap
          </h3>

          <p className="text-slate-400">
            Get a complete step-by-step roadmap from idea to deployment.
          </p>
        </motion.div>

      </section>




      <section className="max-w-3xl mx-auto px-6 py-20">

<div
  className="
    relative
    bg-slate-900/70
    backdrop-blur-2xl
    border
    border-cyan-400/20
    rounded-3xl
    p-8
    shadow-[0_0_40px_rgba(34,211,238,0.15)]
    overflow-hidden
  "
>
    <div className="text-center mb-8">

  <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm">
    🤖 AI Project Generator
  </span>

<div className="
  inline-flex
  items-center
  gap-2
  px-4
  py-2
  rounded-full
  bg-purple-500/10
  border
  border-purple-400/30
  text-purple-300
  text-sm
  font-medium
">
  🤖 Powered by AI
</div>


  <h2 className="text-4xl font-bold mt-5">
    Generate Your
    <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
      Dream Project
    </span>
  </h2>

  <p className="text-slate-400 mt-4 max-w-xl mx-auto">
    Tell ProjectPilot AI about your skills and experience, and receive a complete software project idea with a roadmap and recommended technologies.
  </p>

</div>

    <div className="space-y-5">

      <div>
  <label className="block mb-2 text-sm font-medium text-cyan-300">
    💻 Your Skills
  </label>

 <div className="relative">

  <span className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    text-cyan-400
  ">
    💻
  </span>

  <input
    type="text"
    value={skills}
    onChange={(e) => setSkills(e.target.value)}
    placeholder="Enter your skills (React, PHP, JavaScript...)"
    className="
      w-full
      pl-12
      p-4
      rounded-2xl
      bg-slate-800/80
      border
      border-slate-700
      focus:outline-none
      focus:border-cyan-400
      focus:ring-2
      focus:ring-cyan-400/20
      transition-all
      placeholder:text-slate-500
    "
  />

</div>
</div>

      <div>
  <label className="block mb-2 text-sm font-medium text-cyan-300">
    ❤️ Project Interest
  </label>

  <div className="relative">

  <span className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    text-purple-400
  ">
    ❤️
  </span>

  <select
    value={interest}
    onChange={(e) => setInterest(e.target.value)}
    className="
      w-full
      pl-12
      p-4
      rounded-2xl
      bg-slate-800/80
      border
      border-slate-700
      focus:outline-none
      focus:border-cyan-400
      focus:ring-2
      focus:ring-cyan-400/20
      transition-all
    "
  >
    <option>Education</option>
    <option>Healthcare</option>
    <option>Business</option>
    <option>AI</option>
    <option>E-Commerce</option>
  </select>

</div>
    
</div>
        

      <div>
  <label className="block mb-2 text-sm font-medium text-cyan-300">
    🎯 Experience Level
  </label>

  <div className="relative">

  <span className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    text-yellow-400
  ">
    🎯
  </span>

  <select
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
    className="
      w-full
      pl-12
      p-4
      rounded-2xl
      bg-slate-800/80
      border
      border-slate-700
      focus:outline-none
      focus:border-cyan-400
      focus:ring-2
      focus:ring-cyan-400/20
      transition-all
    "
  >
    <option>Beginner</option>
    <option>Intermediate</option>
    <option>Advanced</option>
  </select>

</div>
    
</div>

     <button
  onClick={handleGenerate}
  disabled={loading}
  className="
    w-full
    py-4
    rounded-2xl
    font-semibold
    text-lg
    bg-gradient-to-r
    from-cyan-500
    to-purple-500
    hover:from-cyan-400
    hover:to-purple-400
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
>
  {loading ? (
    <>🤖 Generating Your Project...</>
  ) : (
    <>🚀 Generate AI Project</>
  )}
</button>


{loading && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6"
  >
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 5,
          ease: "linear",
        }}
      />
    </div>

    <p className="text-center text-slate-400 mt-3 text-sm">
      {loadingText}
    </p>
  </motion.div>
)}


       </div>

  </div>

{result && (
 <ResultCard
  result={result}
  addToFavorites={addToFavorites}
  experience={experience}
/>
)}


<Dashboard
  totalProjects={totalProjects}
  totalFavorites={totalFavorites}
  lastProject={lastProject}
/>

<GeneratorForm />

{history.length > 0 && (
  <div className="mt-10">

    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">
        Recent Projects
      </h2>

<input
  type="text"
  placeholder="Search your projects..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    w-80
    px-4
    py-3
    rounded-xl
    bg-slate-800
    border
    border-slate-700
    text-white
    placeholder:text-slate-400
    focus:outline-none
    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-400/30
    transition
  "
/>


      <button
        onClick={() => setHistory([])}
        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
      >
        Clear History
      </button>
    </div>

    <div className="space-y-3">

{filteredHistory.length === 0 ? (

  <div className="text-center py-8 text-slate-400">
    No matching projects found.
  </div>

) : (
  filteredHistory.map((item, index) => (
  <motion.div
    key={index}
    whileHover={{ scale: 1.02 }}
    className="rounded-2xl bg-slate-900 border border-slate-800 p-5"
  >

    <div className="flex justify-between items-center">

      <div
        onClick={() => setResult(item)}
        className="cursor-pointer"
      >
        <h3 className="font-bold text-cyan-400">
  {item.split("\n")[0].replace("TITLE:", "").replace(/\*/g, "").trim()}
</h3>

        <p className="text-slate-400 text-sm">
          Click to open this project again
        </p>
      </div>

      <button
        onClick={() => removeFromHistory(item)}
        className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition"
      >
        Remove
      </button>

    </div>

  </motion.div>

  ))
)}
    </div>

  </div>
)}

{favorites.length > 0 && (
  <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
  ⭐ Favorite Projects

  <span className="
  text-sm
  bg-yellow-500/20
  text-yellow-400
  px-3
  py-1
  rounded-full
  ">
    {favorites.length}
  </span>

</h2>

    <div className="space-y-3">

 {favorites.map((item, index) => (

<motion.div

key={index}

initial={{
  opacity: 0,
  y: 40,
  scale: 0.9
}}

animate={{
  opacity: 1,
  y: 0,
  scale: 1
}}

transition={{
  duration: 0.5,
  delay: index * 0.2,
  type: "spring"
}}

whileHover={{
  y: -8,
  scale: 1.03
}}

className="
bg-gradient-to-br
from-yellow-500/10
to-slate-900
border
border-yellow-500/30
rounded-3xl
p-6
cursor-pointer
hover:border-yellow-400
hover:shadow-[0_0_35px_rgba(250,204,21,0.35)]
transition-all
duration-300
"
>


<div className="flex items-center justify-between">


<div
onClick={() => setResult(item)}
className="
flex
items-center
gap-4
cursor-pointer
"
>

<div
className="
w-12
h-12
rounded-2xl
bg-yellow-500/20
flex
items-center
justify-center
text-2xl
"
>
⭐
</div>


<div>

<h3 className="
text-lg
font-bold
text-white
">

{item
.split("PROBLEM:")[0]
.replace("TITLE:", "")
.replace(/\*/g,"")
.replace(/=+/g,"")
.trim()
}

</h3>


<p className="
text-sm
text-slate-400
mt-1
">
Saved AI Project
</p>

</div>


</div>

<button

onClick={() => removeFromFavorites(item)}

className="
px-4
py-2
rounded-xl
bg-red-500/20
text-red-400
border
border-red-500/30
hover:bg-red-500
hover:text-white
transition
"

>
Remove
</button>


</div>


</motion.div>

))}

    </div>

  </div>
)}

</section>

</div>
  );
}

export default App;