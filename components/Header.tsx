import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${isScrolled
          ? 'bg-befinlit-cream/95 backdrop-blur-sm py-3 border-befinlit-navy/10 shadow-sm'
          : 'bg-transparent py-6 border-transparent'
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex flex-col cursor-pointer group"
          onClick={() => handleLinkClick('home')}
        >
          {/* Brand Logo - Stacked like the image */}
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black text-befinlit-navy tracking-tighter">
              BeFinLit
            </span>
            <span className="text-2xl font-black text-befinlit-navy tracking-tighter -mt-1">
              India
            </span>
            <p className="text-[0.55rem] tracking-[0.15em] text-befinlit-lightNavy font-bold opacity-60 mt-1 uppercase">
              #BecomeFinanciallyLiterate
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-befinlit-navy">
          <button
            onClick={() => handleLinkClick('home')}
            className={`hover:text-befinlit-gold transition-colors relative py-1 ${currentPage === 'home' ? 'text-befinlit-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-befinlit-gold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className={`hover:text-befinlit-gold transition-colors relative py-1 ${currentPage === 'about' ? 'text-befinlit-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-befinlit-gold' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('playbooks')}
            className={`hover:text-befinlit-gold transition-colors relative py-1 ${currentPage === 'playbooks' ? 'text-befinlit-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-befinlit-gold' : ''}`}
          >
            The Playbooks
          </button>
          <button
            onClick={() => handleLinkClick('tools')}
            className={`hover:text-befinlit-gold transition-colors relative py-1 ${currentPage === 'tools' ? 'text-befinlit-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-befinlit-gold' : ''}`}
          >
            The Toolkits
          </button>
          <button className="bg-befinlit-navy text-befinlit-cream px-5 py-2.5 rounded-sm hover:bg-befinlit-lightNavy transition-colors text-xs font-bold tracking-tight shadow-sm">
            Schedule a Paid Consultation
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-befinlit-navy p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-befinlit-cream border-b border-befinlit-navy/10 p-6 flex flex-col gap-4 shadow-lg animate-fade-in">
          <button onClick={() => handleLinkClick('home')} className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">Home</button>
          <button onClick={() => handleLinkClick('about')} className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">About</button>
          <button onClick={() => handleLinkClick('playbooks')} className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">The Playbooks</button>
          <button onClick={() => handleLinkClick('tools')} className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">The Toolkits</button>
          <button className="bg-befinlit-navy text-befinlit-cream text-center py-4 rounded-sm font-bold tracking-wider text-xs">Schedule a Paid Consultation</button>
        </div>
      )}
    </header>
  );
};

export default Header;