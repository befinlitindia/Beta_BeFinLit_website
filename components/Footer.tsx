import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-befinlit-navy text-befinlit-cream py-16 mt-20 border-t-4 border-befinlit-gold">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2
              className="text-2xl font-bold font-serif italic mb-4 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              BeFinLit India
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-sm">
              Empowering Indian professionals to master their finances. From tax saving to wealth creation, we simplify the complex world of money.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/befinlit_india?igsh=N3dnaHlmZW9ienp3" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/befinlit_india?s=11" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                {/* X Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/befinlit-india/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.reddit.com/r/IndiaTaxation/s/fQQ7hYsCOQ" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-befinlit-gold transition-colors">
                {/* Reddit Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.67 15.39c.1.33.16.68.16 1.04 0 2.45-3.05 4.43-6.83 4.43s-6.83-1.98-6.83-4.43c0-.36.06-.71.16-1.04-.63-.33-1.07-1-1.07-1.78 0-1.13.91-2.04 2.04-2.04.53 0 1.02.2 1.39.54 1.15-.81 2.7-1.34 4.43-1.42l.94-4.41 3.08.66c.03.88.75 1.58 1.62 1.58 1.13 0 2.04-.91 2.04-2.04s-.91-2.04-2.04-2.04c-.87 0-1.59.7-1.62 1.58l-3.39-.73c-.11-.02-.22.04-.26.14l-1.04 4.86c-1.73.08-3.28.61-4.43 1.42.37-.34.86-.54 1.39-.54 1.13 0 2.04.91 2.04 2.04 0 .78-.44 1.45-1.07 1.78zm-1.84-2.03c-.58 0-1.04.47-1.04 1.04s.47 1.04 1.04 1.04 1.04-.47 1.04-1.04-.47-1.04-1.04-1.04zm-5.66 1.04c0-.58-.47-1.04-1.04-1.04s-1.04.47-1.04 1.04.47 1.04 1.04 1.04 1.04-.47 1.04-1.04zm5.54 2.9c-.14.14-.35.14-.49 0-.96-.96-2.52-.96-3.48 0-.14.14-.35.14-.49 0-.14-.14-.14-.35 0-.49 1.23-1.23 3.23-1.23 4.46 0 .14.14.14.35 0 .49z" /></svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-befinlit-gold text-xs uppercase tracking-widest font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => onNavigate('playbooks')} className="hover:text-white transition-colors text-left">The Playbooks</button></li>
                <li><button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors text-left">The Toolkit</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-befinlit-gold text-xs uppercase tracking-widest font-semibold mb-4">Connect with Us</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="mailto:befinlitindia@gmail.com" className="hover:text-white transition-colors">Email Us</a></li>
                <li><button className="hover:text-white transition-colors text-left font-normal">Schedule a Paid Consultation</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>BeFinLit India: Empowering Financial Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>befinlitindia@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;