import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { VscRepo, VscCode, VscStarFull, VscRocket, VscGithubInverted, VscMail, VscDeviceMobile, VscLinkExternal, VscFilePdf } from 'react-icons/vsc';

const StatCard = ({ title, value, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-sidebar-bg p-6 rounded-xl border border-activity-bg flex items-center justify-between"
  >
    <div>
      <p className="text-text-secondary text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-text-primary">{value}</p>
    </div>
    <div className="p-4 bg-element-bg rounded-full text-accent">
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);

export const Dashboard = () => {
  const allTechs = projects.flatMap(p => p.technologies);
  const uniqueTechs = [...new Set(allTechs)];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 bg-sidebar-bg p-8 rounded-xl border border-activity-bg flex flex-col md:flex-row gap-8 items-start md:items-center"
      >
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border-2 border-accent">
          <span className="text-4xl font-bold text-accent">AE</span>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Ahmed Elbarbary</h1>
          <h2 className="text-xl text-accent mb-4">Front-End Developer</h2>
          <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
            Results-driven Front-End Developer specializing in React 18 and modern JavaScript (ES6+), with a proven record building responsive, performant web applications and data-driven dashboards.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded transition-colors text-sm">
              <VscFilePdf /> View Resume
            </a>
            <a href="https://github.com/bittmoon" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-element-bg hover:bg-element-hover text-text-primary px-4 py-2 rounded transition-colors text-sm">
              <VscGithubInverted /> GitHub
            </a>
            <a href="https://linkedin.com/in/ahmed-elbarbary-03873b326" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-element-bg hover:bg-element-hover text-text-primary px-4 py-2 rounded transition-colors text-sm">
              <VscLinkExternal /> LinkedIn
            </a>
            <a href="mailto:Ahmed.barbarycloud@icloud.com" className="flex items-center gap-2 bg-element-bg hover:bg-element-hover text-text-primary px-4 py-2 rounded transition-colors text-sm">
              <VscMail /> Email
            </a>
            <a href="tel:+201090319534" className="flex items-center gap-2 bg-element-bg hover:bg-element-hover text-text-primary px-4 py-2 rounded transition-colors text-sm">
              <VscDeviceMobile /> <span className="font-mono">+20 109 031 9534</span>
            </a>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Projects" value={projects.length} icon={VscRepo} delay={0.1} />
        <StatCard title="Technologies Used" value={uniqueTechs.length} icon={VscCode} delay={0.2} />
        <StatCard title="GitHub Stars" value="124" icon={VscStarFull} delay={0.3} />
        <StatCard title="Currently Building" value="1" icon={VscRocket} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-sidebar-bg p-6 rounded-xl border border-activity-bg"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Tech Stack Distribution</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueTechs.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-element-bg text-text-primary rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-sidebar-bg p-6 rounded-xl border border-activity-bg"
        >
          <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="flex-1 text-text-primary">Merged pull request in JobTracker</div>
              <div className="text-text-secondary">2h ago</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <div className="flex-1 text-text-primary">Deployed Smart Expense Tracker</div>
              <div className="text-text-secondary">1d ago</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <div className="flex-1 text-text-primary">Updated portfolio layout</div>
              <div className="text-text-secondary">3d ago</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
