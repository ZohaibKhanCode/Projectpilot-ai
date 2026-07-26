import { motion } from "framer-motion";

function Particles() {
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
  key={index}
  className="absolute rounded-full"
  style={{
    width: Math.random() * 5 + 2,
    height: Math.random() * 5 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    background:
      index % 3 === 0
        ? "#22d3ee"
        : index % 3 === 1
        ? "#a855f7"
        : "#ffffff",
    boxShadow:
      index % 3 === 0
        ? "0 0 12px #22d3ee"
        : index % 3 === 1
        ? "0 0 12px #a855f7"
        : "0 0 10px white",
  }}
  animate={{
    y: [0, -80, 0],
    x: [0, 40, -20, 0],
    opacity: [0.2, 1, 0.3],
    scale: [1, 1.6, 1],
  }}
  transition={{
    duration: Math.random() * 10 + 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
      ))}
    </div>
  );
}

export default Particles;