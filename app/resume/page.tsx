"use client";

import React from "react";
import { Mail, Phone, MapPin, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Navigation & Actions */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 print:hidden">
        <Link 
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
        </Link>
        <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
        >
            <Download size={18} />
            <span>Download PDF</span>
        </button>
      </div>

      {/* Resume Paper */}
      <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-8 md:p-12 shadow-2xl text-black print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0">
        
        {/* Header */}
        <header className="border-b-2 border-neutral-900 pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">María Sebares</h1>
            <p className="text-xl text-neutral-600 font-medium mb-4">Data Scientist / AI Engineer</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>London, United Kingdom</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Mail size={14} />
                    <span>mariasebares9@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Phone size={14} />
                    <span>07561076885</span>
                </div>
            </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-neutral-800 text-justify">
                AI Engineer and Data Scientist with over 3 years of experience specialising in cutting-edge Agentic AI systems and &apos;full-stack&apos; AI/ML system workflows. Expert in building, deploying, and scaling intelligent Agentic AI solutions using frameworks like DSPy and LangGraph. Adept at leveraging cloud platforms (GCP, AWS) to develop scalable APIs and integrate advanced conversational logic. Proven track record of engaging clients to translate business needs into robust AI-enabled solutions. Committed to advancing the field of AI with a strong foundation in neuroscience and continuous professional growth.
            </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-4">Employment History</h2>
            
            <div className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">Consultant Data Scientist / AI Engineer</h3>
                    <span className="text-sm font-medium">Nov 2022 – Present</span>
                </div>
                <div className="text-sm text-neutral-600 mb-2 font-medium">IBM | London, UK</div>
                <ul className="list-disc list-outside ml-4 text-sm text-neutral-800 space-y-1.5">
                    <li>Developed an <strong>Agentic Gen-AI Virtual Assistant</strong>, significantly improving customer spending insights and driving revenue growth.</li>
                    <li>Led development of complex conversational logic (Multi-turn, context-aware, guardrails) using <strong>DSPy, LangGraph, and OpenAI Agents SDK</strong>.</li>
                    <li>Implemented production-ready APIs using <strong>FastAPI</strong> to facilitate real-time system interactions.</li>
                    <li>Managed client communication from POC to full deployment, securing a total contract value of <strong>£5M+ over 5 quarters</strong>.</li>
                    <li>Developed predictive financial models using XGBoost, SVM, and Random Forests to improve forecasting accuracy.</li>
                    <li>Oversaw version control workflows (GitHub) and enforced team-wide coding best practices.</li>
                </ul>
            </div>

            <div>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">Intern</h3>
                    <span className="text-sm font-medium">Aug 2021</span>
                </div>
                <div className="text-sm text-neutral-600 mb-2 font-medium">Centre for Finance, Technology and Entrepreneurship (CFTE) | London</div>
                <ul className="list-disc list-outside ml-4 text-sm text-neutral-800 space-y-1.5">
                    <li>Conducted research on emerging FinTech trends, focusing on blockchain and AI applications.</li>
                    <li>Assisted in preparing analytical reports on the impact of technology on traditional finance.</li>
                    <li>Supported the development of educational content for online courses and webinars.</li>
                </ul>
            </div>
        </section>

        {/* Side Projects */}
        <section className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-4">Side Projects</h2>
            
            <div>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">Real Estate AI Agent (Tumai)</h3>
                    <span className="text-sm font-medium">Jan 2024 – Present</span>
                </div>
                <div className="text-sm text-neutral-600 mb-2 font-medium">Founder · AI Agents for Real Estate Operations</div>
                <ul className="list-disc list-outside ml-4 text-sm text-neutral-800 space-y-1.5">
                    <li>Building AI agents that automate end-to-end real estate operations—rent collection, tenant communications, property evaluation, and reporting—running over WhatsApp and connected directly to clients&apos; CRMs.</li>
                    <li>Shipped pre-built, production-tested automation modules customized to each client&apos;s business rules, with paying customers live in production across the <strong>US and Spain</strong>.</li>
                    <li>Built with <strong>Python, OpenAI Agents SDK, PostgreSQL, and React</strong>, leveraging RAG and embeddings for intelligent document and workflow handling.</li>
                </ul>
            </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
            {/* Skills */}
            <section>
                <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Skills</h2>
                <div className="text-sm text-neutral-800 space-y-2">
                    <div>
                        <span className="font-bold">Languages & Core:</span> Machine Learning, Python, SQL, JavaScript, Go, React, Node.js
                    </div>
                    <div>
                        <span className="font-bold">Agentic Frameworks:</span> LangGraph, DSPy, OpenAI
                    </div>
                    <div>
                        <span className="font-bold">Cloud & Infra:</span> AWS, GCP, PostgreSQL, Docker, Git
                    </div>
                    <div>
                        <span className="font-bold">Other:</span> Prompt Engineering, Team Leadership, N8N
                    </div>
                </div>
            </section>

            {/* Education */}
            <section>
                <h2 className="text-lg font-bold uppercase border-b border-neutral-300 pb-1 mb-3">Education</h2>
                <div className="space-y-4">
                    <div>
                        <div className="font-bold text-sm">University College London (UCL)</div>
                        <div className="text-sm italic">MSci Neuroscience (Upper 2.1)</div>
                        <div className="text-xs text-neutral-500">Sep 2018 - Jun 2022</div>
                    </div>
                    <div>
                        <div className="font-bold text-sm">Imperial College London</div>
                        <div className="text-sm italic">Mathematics for Machine Learning</div>
                        <div className="text-xs text-neutral-500">Jun 2021 - Aug 2021</div>
                    </div>
                </div>
            </section>
        </div>

        {/* Certifications & Languages */}
        <section className="mt-8 pt-4 border-t border-neutral-200">
             <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-bold uppercase mb-2">Certifications & Awards</h3>
                    <ul className="list-disc list-outside ml-4 text-xs text-neutral-800 space-y-1">
                        <li>AWS Cloud Practitioner</li>
                        <li>Datathon Winner 2024, IBM</li>
                        <li>Machine Learning Award, Lloyds</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase mb-2">Languages</h3>
                    <ul className="text-sm text-neutral-800 space-y-1">
                        <li><strong>English:</strong> Native</li>
                        <li><strong>Spanish:</strong> Native</li>
                        <li><strong>French:</strong> Highly proficient</li>
                    </ul>
                </div>
             </div>
        </section>

      </div>
      
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}

