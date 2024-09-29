import Link from "next/link";
import React from "react";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block mb-4">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
    </Link>
  );
}
