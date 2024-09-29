"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { supabase } from "../utils/supabase";
import TaskCard from "../components/TaskCard";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const { data: tasksData } = await supabase
          .from("tasks")
          .select("*")
          .eq("assigned_to", currentUser.id);
        setTasks(tasksData);

        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .eq("owner_id", currentUser.id);
        setProjects(projectsData);

        const tasksSubscription = supabase
          .from("tasks")
          .on("*", (payload) => {
            if (payload.new.assigned_to === currentUser.id) {
              setTasks((currentTasks) => [...currentTasks, payload.new]);
            }
          })
          .subscribe();
        return () => {
          supabase.removeSubscription(tasksSubscription);
        };
      }
    };
    fetchUserData();
  }, []);
  if (!user) {
    return <div>Please sign in to view your dashboard</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
