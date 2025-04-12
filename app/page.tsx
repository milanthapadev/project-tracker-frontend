import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-blue-50/50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
            SAY GOODBYE TO TASK OVERLOAD
          </h2>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stay on top of your to-do list with<br />
            our powerful task manager
          </h1>
          <Link 
            href="/projects"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Get Started
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="mb-4 flex gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100"></div>
              <div className="w-8 h-8 rounded-full bg-blue-100"></div>
              <div className="w-8 h-8 rounded-full bg-green-100"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Roadmap View</h3>
            <p className="text-gray-600">
              Users can view their tasks in a calendar format to help with scheduling and time management
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="text-emerald-600 font-semibold">75%</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Task Progress</h3>
            <p className="text-gray-600">
              Users can see progress for upcoming tasks to ensure they don't miss important deadlines
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="mb-4 flex gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100"></div>
              <div className="w-8 h-8 rounded-full bg-blue-100"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-100"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Task Collaboration</h3>
            <p className="text-gray-600">
              Users can comment on tasks, attach files, and communicate with team members to stay up-to-date on progress
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
