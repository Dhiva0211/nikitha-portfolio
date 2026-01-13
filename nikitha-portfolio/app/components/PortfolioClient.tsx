"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const skillsData = [
  { name: "SQL", level: 95 },
  { name: "Power BI", level: 90 },
  { name: "Excel", level: 92 },
  { name: "Tableau", level: 88 },
  { name: "Python/ML", level: 85 },
];

const experienceTimeline = [
  { year: "2024 – 2025", role: "ITS Student Assistant", company: "Binghamton University • Binghamton, NY" },
  { year: "Feb 2024 – May 2024", role: "Frontend Developer Intern", company: "Upunikslef • United States" },
  { year: "Aug 2021 – Jul 2023", role: "Software Engineer (System Engineer Associate)", company: "Kerala Cooperative Banks - Intellect Design Arena • Chennai, India" },
];

const projects = [
  {
    title: "Credit Card Fraud Detection",
    meta: "Binghamton University • Feb 2023",
    desc: "End-to-end fraud detection system using supervised ML. ETL, feature engineering, and evaluation pipelines to reduce false positives.",
    tags: ["ML", "ETL", "Classification"],
  },
  {
    title: "Quality Control & Defect Prediction in Manufacturing",
    meta: "Binghamton University • Dec 2024",
    desc: "Predictive ML application for defect identification. Built ETL pipelines, performed EDA, trained models, and created insight dashboards.",
    tags: ["EDA", "Dashboards", "ML"],
  },
  {
    title: "An Analysis of Flight Delay in the US",
    meta: "Binghamton University • Apr 2024",
    desc: "Excel + Tableau analysis of delay factors across US flights; identified key causes and proposed actions (reported 10% reduction).",
    tags: ["Tableau", "Excel", "Insights"],
  },
  {
    title: "Salary Intelligence Dashboard",
    meta: "Siddharth University • Jan 2023",
    desc: "Analyzed 6,600+ salary records with Tableau/Excel. Built forecasting dashboards projecting analyst salaries over 5 years.",
    tags: ["Forecasting", "Tableau", "Excel"],
  },
  {
    title: "Student Registration System",
    meta: "Binghamton University • May 2024",
    desc: "Full-stack registration system with MongoDB backend and responsive UI to improve student workflow efficiency.",
    tags: ["Full-Stack", "MongoDB", "UI"],
  },
  {
    title: "Quiz Application",
    meta: "Binghamton University • May 2024",
    desc: "Interactive quiz platform with database-driven scoring and results tracking.",
    tags: ["App", "DB", "UI"],
  },
];

export default function PortfolioClient() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_55%)]" />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open to Data Analyst / BI / Analytics roles
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            Nikitha Reddy Birudala
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Detail-oriented Data Analyst with hands-on experience in SQL, Excel, Power BI, and reporting across banking and enterprise platforms.
            Skilled in dashboarding, data validation, and translating complex datasets into clear business insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Dashboard
            </Button>

            {/* Replace href with your real links */}
            <a className="ml-auto text-sm text-slate-300 hover:text-white underline underline-offset-4" href="mailto:nbirudala@binghamton.edu">
              nbirudala@binghamton.edu
            </a>
          </div>

          <div className="mt-4 text-sm text-slate-400">
            Binghamton, NY • +1 (656)-347-8981 • LinkedIn • Portfolio
          </div>
        </motion.div>
      </section>

      {/* DASHBOARD GRID */}
      <section id="skills" className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-14 md:grid-cols-2">
        {/* Skill Chart */}
        <Card className="bg-slate-900/60 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Skill Proficiency</h2>
              <span className="text-xs text-slate-400">interactive chart</span>
            </div>

            <div className="mt-5 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={{ stroke: "#334155" }} tickLine={{ stroke: "#334155" }} />
                  <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={{ stroke: "#334155" }} tickLine={{ stroke: "#334155" }} />
                  <Tooltip
                    contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                    labelStyle={{ color: "#e2e8f0" }}
                    itemStyle={{ color: "#a5b4fc" }}
                  />
                  <Bar dataKey="level" fill="#6366f1" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Tools: Power BI, Tableau, Excel (VBA), SQL reporting queries • Techniques: EDA, Hypothesis Testing, Supervised/Unsupervised ML
            </div>
          </CardContent>
        </Card>

        {/* Experience Timeline */}
        <Card className="bg-slate-900/60 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Experience Timeline</h2>
              <span className="text-xs text-slate-400">hover cards</span>
            </div>

            <div className="mt-5 space-y-3">
              {experienceTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="rounded-2xl bg-slate-800/60 p-4 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.role}</p>
                    <span className="text-xs text-slate-400">{item.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{item.company}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-emerald-500/10 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-200">
                Highlights: SQL extraction + reporting, dashboard delivery, data validation, workflow automation, UI performance optimization, enterprise support.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="mt-2 text-slate-300">Click-ready cards (you can later link each to GitHub, demo, or dashboard screenshots).</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group rounded-3xl bg-slate-900/60 p-6 ring-1 ring-white/10 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="text-xs text-slate-400">{p.meta}</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-slate-400 group-hover:text-slate-200 transition">Add GitHub / Demo</span>
                <span className="text-indigo-300 group-hover:text-indigo-200 transition">↗</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-400">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Nikitha Reddy Birudala</p>
            <div className="flex flex-wrap gap-4">
              <a
  href="mailto:nbirudala@binghamton.edu?subject=Data%20Analyst%20Opportunity&body=Hi%20Nikitha,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect."
  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
>
  📬 Contact Me
</a>

              {/* replace with your real links */}
              <a
  href="https://www.linkedin.com/in/nikitha-reddy-birudala-5aa2631a6/"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition"
>
  LinkedIn <span className="text-indigo-300">↗</span>
</a>
              
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
