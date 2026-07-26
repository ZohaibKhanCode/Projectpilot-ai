import { motion } from "framer-motion";
import {
  FolderOpen,
  Star,
  BarChart3,
  Sparkles,
} from "lucide-react";


function Dashboard({
  totalProjects,
  totalFavorites,
  lastProject,
}) {

  const cards = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "cyan",
      description: "AI generated projects",
    },

    {
      title: "Favorite Projects",
      value: totalFavorites,
      icon: Star,
      color: "yellow",
      description: "Saved ideas",
    },

    {
      title: "Latest Project",
      value: lastProject || "No project yet",
      icon: BarChart3,
      color: "purple",
      description: "Recently created",
    },
  ];


  return (

    <div className="
      grid
      md:grid-cols-3
      gap-6
      mt-10
    ">

      {cards.map((card,index)=>{

        const Icon = card.icon;


        return (

          <motion.div

          key={index}

          initial={{
            opacity:0,
            y:30
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:index * 0.2
          }}

          whileHover={{
            y:-8,
            scale:1.03
          }}

          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-slate-900
            to-slate-950
            border
            border-slate-800
            rounded-3xl
            p-6
            shadow-xl
            group
          "

          >


          {/* Glow */}

          <div className="
            absolute
            -top-10
            -right-10
            w-32
            h-32
            bg-cyan-500/20
            rounded-full
            blur-3xl
            group-hover:bg-cyan-400/30
            transition
          " />


          <div className="
            flex
            justify-between
            items-start
          ">


            <div>


              <p className="
                text-slate-400
                text-sm
              ">
                {card.title}
              </p>


              <h2 className="
                text-3xl
                font-bold
                text-white
                mt-3
                truncate
                max-w-[200px]
              ">
                {card.value}
              </h2>


              <p className="
                text-slate-500
                text-sm
                mt-2
              ">
                {card.description}
              </p>


            </div>



            <div className="
              p-3
              rounded-2xl
              bg-cyan-500/10
            ">

              <Icon
                size={35}
                className="text-cyan-400"
              />

            </div>


          </div>


          </motion.div>

        );

      })}


    </div>

  );
}


export default Dashboard;