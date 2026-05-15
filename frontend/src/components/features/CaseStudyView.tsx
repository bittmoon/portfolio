import type { CaseStudy } from '../../data/projects';
import { VscCheck, VscWarning } from 'react-icons/vsc';

export const CaseStudyView = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans pb-24">
      <h1 className="text-3xl font-bold text-text-primary mb-8 border-b border-activity-bg pb-4">
        Case Study
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-4">Problem Statement</h2>
        <div className="bg-sidebar-bg p-6 rounded-lg border border-activity-bg">
          <p className="text-text-primary leading-relaxed">{caseStudy.problem}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-4">Goals</h2>
        <ul className="space-y-3">
          {caseStudy.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-3 text-text-primary">
              <VscCheck className="w-6 h-6 text-green-500 shrink-0" />
              <span className="leading-relaxed">{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-4">Architecture & Features</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-primary leading-relaxed mb-6">{caseStudy.architectureOverview}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.features.map((feature, i) => (
              <div key={i} className="bg-sidebar-bg p-4 rounded border border-activity-bg text-text-primary">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-4">Challenges & Solutions</h2>
        <div className="space-y-6">
          {caseStudy.challengesAndSolutions.map((item, i) => (
            <div key={i} className="bg-sidebar-bg rounded-lg border border-activity-bg overflow-hidden">
              <div className="bg-element-bg p-4 flex gap-3 items-start">
                <VscWarning className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-text-primary font-medium">{item.challenge}</p>
              </div>
              <div className="p-4 bg-sidebar-bg">
                <p className="text-text-secondary leading-relaxed"><strong className="text-text-primary">Solution:</strong> {item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">Trade-offs</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-secondary">
            {caseStudy.tradeOffs.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">Results</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-primary">
            {caseStudy.results.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
};
