// components/Widget.js
export default function Widget({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}
