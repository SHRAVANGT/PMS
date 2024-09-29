import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task.id}`} className="block mb-4">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">Status:{task.status}</p>
        <p className="text-sm text-gray-600">Priority:{task.priority}</p>
      </div>
    </Link>
  );
}
