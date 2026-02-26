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

// === DATA (from resume) ===
const skillsData = [
  { name: "Advanced SQL", level: 95 },
  { name: "Power BI", level: 90 },
  { name: "Python", level: 88 },
  { name: "Testing/Validation", level: 92 },
  { name: "AWS + REST APIs", level: 80 },
];

const experienceTimeline = [
  {
    year: "Jan 2024 – Dec 2025",
    role: "ITS Student Assistant – Library Technology Services",
    company: "Binghamton University • Binghamton, NY",
    highlights: [
      "Delivered enterprise-level technical support across academic computing environments and networked systems.",
      "Diagnosed and resolved hardware, software, and connectivity issues across campus-wide systems.",
      "Assisted with system configuration, workstation provisioning, and access control setup.",
      "Monitored digital learning systems for performance stability and uptime reliability.",
      "Documented troubleshooting workflows and improved service response efficiency.",
    ],
  },
  {
    year: "Feb 2025 – May 2025",
    role: "Software & Data Engineering Intern",
    company: "Upunikslef • United States",
    highlights: [
      "Designed and deployed interactive BI dashboards using Power BI and Excel; improved reporting efficiency by 35%.",
      "Built optimized SQL transformations; reduced dashboard refresh latency by 25%.",
      "Automated reporting via Power Automate + scheduled pipelines; eliminated 10+ hours weekly manual effort.",
      "Integrated RESTful APIs with cloud-hosted backend services; maintained 99% data availability.",
      "Performed structured data validation, regression testing, and integrity checks; reduced discrepancies by 30%.",
    ],
  },
  {
    year: "Aug 2021 – Jul 2023",
    role: "Software Engineer (System Engineer & Analysis Associate)",
    company: "Kerala Cooperative Banks – Intellect Design Arena • Chennai, India",
    highlights: [
      "Provided production/application support for enterprise banking platforms across multiple institutions and branches.",
      "Resolved complex issues across multi-tier architectures; ensured uninterrupted transaction processing + compliance.",
      "Designed advanced SQL queries (joins, aggregations, tuning) for high-volume financial reporting and analytics.",
      "Optimized indexing/query strategies; improved data retrieval performance by ~20%.",
      "Executed functional + regression testing with ~97% defect detection accuracy before releases.",
      "Validated APIs, backend mappings, and UI behavior; performed performance validation under simulated transaction loads.",
      "Supported release cycles impacting 20+ branches; improved incident recurrence through RCA + documentation.",
    ],
  },
];

const projects = [
  {
    title: "Credit Card Fraud Detection",
    meta: "Binghamton University • Feb 2023",
    desc: "Built an end-to-end ML pipeline (ingestion → ETL → feature engineering → training → evaluation) using Python + scikit-learn. Used threshold tuning to reduce false positives while preserving recall; applied balancing + cross-validation; reported Precision/Recall/F1 with Matplotlib/Seaborn visuals.",
    tags: ["Python", "scikit-learn", "ETL", "Classification", "Model Eval"],
  },
  {
    title: "Quality Control & Defect Prediction in Manufacturing",
    meta: "Binghamton University • Dec 2024",
    desc: "Developed predictive classification models on industrial datasets. Performed EDA + statistical testing; ranked features for accuracy gains; built interactive Power BI dashboards for defect trends + efficiency; automated preprocessing/validation workflows.",
    tags: ["EDA", "Stat Testing", "Power BI", "Automation", "ML"],
  },
  {
    title: "Student Registration System",
    meta: "Binghamton University • May 2024",
    desc: "Full-stack system using MongoDB + REST APIs with MVC architecture. Implemented CRUD with server-side validation/error handling, designed schema with referential integrity, and performed integration/system testing for consistent workflows.",
    tags: ["MongoDB", "REST APIs", "MVC", "CRUD", "Testing"],
  },
  {
    title: "Quiz Application",
    meta: "Binghamton University • May 2024",
    desc: "Interactive quiz platform with timed flow, persistent scoring, and question management. Added validation/error handling and performed functional + integration testing to ensure consistent submissions and DB updates.",
    tags: ["Full-Stack", "DB", "Validation", "Testing"],
  },
  {
    title: "An Analysis of Flight Delay in the US",
    meta: "Binghamton University • Apr 2024",
    desc: "Processed large-scale aviation datasets using SQL, Excel, and Tableau. Performed time-series + trend analysis to identify key delay drivers; communicated insights through dashboards; applied correlation + hypothesis tests to validate findings.",
    tags: ["SQL", "Tableau", "Excel", "Time Series", "Hypothesis Testing"],
  },
  {
    title: "Salary Intelligence Dashboard",
    meta: "Siddharth Institute • Jan 2023",
    desc: "Analyzed 6,600+ salary records to identify compensation patterns and regional differences. Built forecasting models for 5-year growth trends and delivered interactive dashboards supporting HR strategy and planning.",
    tags: ["Forecasting", "Dashboards", "Analytics", "Tableau/Excel"],
  },
];

// === UI ===
export default function PortfolioClient() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_55%)]" />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open to Software Engineering • Data Engineering • Cloud Apps • Quality Engineering
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            Nikitha Reddy Birudala
          </h1>

          {/* Objective / Summary */}
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Computer Science graduate with 3+ years of experience in enterprise software engineering, data analytics, system testing,
            and cloud-supported applications. Experienced in developing and supporting multi-tier banking platforms, optimizing SQL-driven
            data systems, performing structured regression testing, and delivering analytical insights for technical leadership. Strong foundation
            in Java, Python, SQL, AWS, REST APIs, and performance validation within high-availability environments.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="bg-indigo-600 hover:bg-indigo-500"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Dashboard
            </Button>

            <a
              className="ml-auto text-sm text-slate-300 hover:text-white underline underline-offset-4"
              href="mailto:nbirudala@binghamton.edu"
            >
              nbirudala@binghamton.edu
            </a>
          </div>

          <div className="mt-4 text-sm text-slate-400">
            Binghamton, NY • +1 (656)-347-8981 •{" "}
            <a
              className="underline underline-offset-4 hover:text-white"
              href="https://www.linkedin.com/in/nikitha-reddy-birudala-5aa2631a6/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </section>

      {/* DASHBOARD GRID */}
      <section
        id="skills"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-14 md:grid-cols-2"
      >
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
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                    axisLine={{ stroke: "#334155" }}
                    tickLine={{ stroke: "#334155" }}
                  />
                  <YAxis
                    tick={{ fill: "#cbd5e1", fontSize: 12 }}
                    axisLine={{ stroke: "#334155" }}
                    tickLine={{ stroke: "#334155" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0b1220",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                    itemStyle={{ color: "#a5b4fc" }}
                  />
                  <Bar dataKey="level" fill="#6366f1" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Focus: Advanced SQL (CTEs, Window Functions), ETL Design, Data Cleaning, EDA & Hypothesis Testing • BI: Power BI, Tableau, Excel (VBA) • Engineering: Java, REST APIs, Git, Agile/Scrum • Cloud: AWS (EC2, S3, RDS – foundational)
            </div>
          </CardContent>
        </Card>

        {/* Experience Timeline */}
        <Card className="bg-slate-900/60 backdrop-blur border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Experience Timeline</h2>
            </div>

            <div className="mt-5 space-y-3">
              {experienceTimeline.map((item) => (
                <motion.div
                  key={`${item.year}-${item.role}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="rounded-2xl bg-slate-800/60 p-4 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.role}</p>
                    <span className="text-xs text-slate-400">{item.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{item.company}</p>

                  <ul className="mt-3 list-disc pl-5 text-sm text-slate-300/90 space-y-1">
                    {item.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-emerald-500/10 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-200">
                Strengths: Production support • SQL performance tuning • Regression testing • Data integrity validation • BI dashboards • API validation • High-availability systems
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
            <p className="mt-2 text-sm text-slate-400">
              A selection of academic and personal projects demonstrating applied skills in software engineering, data analytics, and machine learning.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.article
              key={`${p.title}-${p.meta}`}
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
                  <span
                    key={`${p.title}-${t}`}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                  >
                    {t}
                  </span>
                ))}
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
                href="mailto:nbirudala@binghamton.edu?subject=Opportunity%20to%20Connect&body=Hi%20Nikitha,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect."
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
              >
                📬 Email Me
              </a>

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

          <p className="mt-6 text-xs text-slate-500">
            Built with Next.js • Tailwind • Framer Motion • Recharts
          </p>
        </div>
      </footer>
    </main>
  );
}