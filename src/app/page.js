"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
 const { data: session } = useSession();
 const router = useRouter();

 useEffect(() => {
   if (session) {
     // Redirect to the dashboard if the user is logged in
     router.push("/dashboard");
   }
 }, [session, router]);

 if (session) {
   return null; // If already logged in, don't show the banner
 }

  return (
    <div className="bg-black text-white min-h-screen">

      <main className="py-12">
        <section className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Transform Your Workflow with WorkMater
          </h1>
          <p className="text-lg mb-8">
            Optimize, automate, and streamline your business processes with our
            innovative solutions.
          </p>
          <Link
            href="/signup"
            className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition-all duration-200 link-animation"
          >
            Get Started
          </Link>
        </section>

        <section id="features" className="bg-gray-900 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">
                  Automated Workflows
                </h3>
                <p>
                  Streamline repetitive tasks and focus on what matters most.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">
                  Real-Time Analytics
                </h3>
                <p>
                  Gain insights into your operations with comprehensive reports
                  and analytics.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">
                  Custom Integrations
                </h3>
                <p>
                  Integrate seamlessly with your existing tools and platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Pricing</h2>
            <p className="text-lg mb-8">
              Choose a plan that fits your needs. No hidden fees, just
              transparent pricing.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">Basic Plan</h3>
                <p className="text-2xl font-bold mb-4">$19/month</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Basic features</li>
                  <li>5 integrations</li>
                  <li>Email support</li>
                </ul>
                <Link
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 link-animation"
                >
                  Sign Up
                </Link>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">Pro Plan</h3>
                <p className="text-2xl font-bold mb-4">$49/month</p>
                <ul className="list-disc list-inside mb-4">
                  <li>All Basic features</li>
                  <li>20 integrations</li>
                  <li>Priority support</li>
                </ul>
                <Link
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 link-animation"
                >
                  Sign Up
                </Link>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md spotlight-item">
                <h3 className="text-xl font-semibold mb-3">Enterprise Plan</h3>
                <p className="text-2xl font-bold mb-4">Contact Us</p>
                <ul className="list-disc list-inside mb-4">
                  <li>All Pro features</li>
                  <li>Unlimited integrations</li>
                  <li>Dedicated account manager</li>
                </ul>
                <Link
                  href="/contact"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 link-animation"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="bg-gray-900 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Download WorkMater</h2>
            <p className="text-lg mb-8">
              Get the latest version of WorkMater for your operating system.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/downloads/WorkMater.dmg"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 link-animation"
              >
                Download for macOS (.dmg)
              </Link>
              <Link
                href="/downloads/WorkMater.exe"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 link-animation"
              >
                Download for Windows (.exe)
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} WorkMater. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .link-animation:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }

        .spotlight-item {
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .spotlight-item::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 60%
          );
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0;
        }

        .spotlight-item:hover::before {
          opacity: 1;
        }

        .spotlight-item:hover::before {
          transform: translate(-50%, -50%) scale(1.5);
        }
      `}</style>
    </div>
  );
}
