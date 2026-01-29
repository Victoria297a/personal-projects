import { Link } from 'react-router-dom'

export default function About() {
  const techStack = [
    { name: 'React', icon: 'code', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'terminal', color: '#3178C6' },
    { name: 'Node.js', icon: 'dns', color: '#339933' },
    { name: 'Leaflet', icon: 'map', color: '#137fec' },
    { name: 'TailwindCSS', icon: 'palette', color: '#06B6D4' },
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div
        className="relative min-h-[60vh] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 25, 34, 0.85), rgba(16, 25, 34, 0.95)), url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl">
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Sofia Smart City Initiative
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Revolutionizing Sofia's Urban Flow
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-driven smart parking and congestion prediction built to modernize the Bulgarian capital's infrastructure.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <span className="material-symbols-outlined">map</span>
            Launch Live Map
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The hidden cost of urban friction in Sofia.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <div
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1570242825934-d9dde0e3c3d3?q=80&w=2000')`,
              }}
            />
            <div className="p-6">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Congestion Crisis
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white my-2">
                45 Hours Lost Annually
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sofia residents spend nearly two full days a year stuck in traffic. Inefficient parking searches account for 30% of this congestion.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            The Solution
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Predictive AI for a seamless urban journey.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    analytics
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Predictive Heatmaps
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time availability forecasting using historical data and traffic flow sensors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    school
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Social Impact: School Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prioritizing safety by reducing traffic density around school zones during peak hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    event
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Event Surge Alerts
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Proactive notifications about parking demand spikes during major events and weekends.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    navigation
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Smart Recommendations
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI-powered suggestions for best parking locations based on your destination and time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 text-center">
            Modern Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Card */}
        <section className="bg-primary p-10 rounded-2xl text-white text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Our Vision</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              We aren't just building a parking app. We are creating the data layer for Sofia's autonomous future.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Phase 1: Pilot Launching Q4 2026
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
