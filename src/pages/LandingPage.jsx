/**
 * Landing Page
 * Minimal, clean design focused on claiming free diagnostic test
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLandingPageStyles } from '../styles/landing/LandingPage.styles';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import Logo from '../components/common/Logo';
import DiagnosticSignupModal from '../components/common/DiagnosticSignupModal';
import UniversityLogos from '../components/landing/UniversityLogos';

const LandingPage = () => {
  const classes = useLandingPageStyles();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const testimonials = [
    [
      {
        stars: 5,
        quote: "I went from a 28 to a 35 in just 8 weeks! The personalized study plan made all the difference.",
        author: "Sarah M.",
        score: "28 → 35 • Stanford"
      },
      {
        stars: 5,
        quote: "Got a perfect 36! The practice tests were incredibly similar to the real ACT.",
        author: "James K.",
        score: "32 → 36 • MIT"
      },
      {
        stars: 5,
        quote: "Improved my score by 7 points in 6 weeks. The diagnostic test pinpointed exactly what I needed to work on.",
        author: "Emily R.",
        score: "27 → 34 • Yale"
      }
    ],
    [
      {
        stars: 5,
        quote: "The breakdown of each section helped me focus on my weaknesses. Scored a 34 on my first real test!",
        author: "Michael T.",
        score: "29 → 34 • Columbia"
      },
      {
        stars: 5,
        quote: "Best ACT prep I've used. The explanations are clear and the practice questions match the real test perfectly.",
        author: "Amanda L.",
        score: "26 → 33 • Duke"
      },
      {
        stars: 5,
        quote: "Jumped 9 points in 10 weeks! The study schedule kept me on track and the results speak for themselves.",
        author: "David H.",
        score: "25 → 34 • Northwestern"
      }
    ],
    [
      {
        stars: 5,
        quote: "The practice questions are challenging but fair. Went from struggling to confident in just 2 months!",
        author: "Jessica L.",
        score: "24 → 31 • USC"
      },
      {
        stars: 5,
        quote: "Finally broke 30! The targeted practice made studying so much more efficient.",
        author: "Ryan P.",
        score: "28 → 32 • Cornell"
      },
      {
        stars: 5,
        quote: "The insights after each practice test were invaluable. I knew exactly what to improve.",
        author: "Olivia K.",
        score: "30 → 35 • Brown"
      }
    ]
  ];

  const faqs = [
    {
      question: "What is this free diagnostic assessment?",
      answer: "It's a personalized analysis that shows you exactly where you stand with the ACT and what score you can realistically achieve. Created by students who scored 36 and got into schools like Stanford and MIT, this diagnostic helps you understand your strengths, weaknesses, and the fastest path to your target score—completely free, no strings attached."
    },
    {
      question: "How does the diagnostic work?",
      answer: "After answering a few quick questions about your goals and current skill level, you'll get a customized breakdown of what to focus on for each ACT section. We'll show you the exact strategies that helped our founders score perfect 36s, and create a personalized study roadmap based on your timeline and target score."
    },
    {
      question: "Is this really free? What's the catch?",
      answer: "Yes, it's 100% free! No credit card needed, no hidden fees. We built this because we wish something like this existed when we were studying for the ACT. Our goal is to help you see what's possible—if you find it valuable and want more, great. If not, you still walk away with a clear game plan for improving your score."
    },
    {
      question: "What will I learn from the diagnostic?",
      answer: "You'll discover your current scoring potential across all four ACT sections—English, Math, Reading, and Science. We'll identify your biggest opportunities for quick score gains, show you proven test-taking strategies that work, and give you a personalized study plan. Think of it as a roadmap that shows you exactly how to get from where you are now to a 34+ score."
    },
    {
      question: "Who is this for?",
      answer: "This diagnostic is perfect for any student who wants to improve their ACT score, whether you're just starting out or aiming for a perfect 36. It's especially helpful for students targeting competitive schools who want a clear, proven strategy instead of generic study tips. Our approach has helped students get into Harvard, Stanford, MIT, and other top universities."
    }
  ];

  // Detect OAuth callback and redirect to /auth/callback
  useEffect(() => {
    // Check if URL has OAuth hash fragments (access_token, refresh_token, etc.)
    const hash = window.location.hash;
    if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
      console.log('OAuth callback detected on landing page, redirecting to /auth/callback with hash:', hash);
      // Preserve the hash when redirecting
      window.location.replace(`/auth/callback${hash}`);
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);
      setScrollProgress(progress);

      // Show sticky bar after scrolling 300px down
      setShowStickyBar(scrolled > 300);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGetStarted = () => {
    // Show the signup modal instead of navigating
    setShowSignupModal(true);
  };

  const handleAboutUs = () => {
    // Navigate to About Us page
    navigate('/about');
  };

  const handleLogoClick = () => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesDropdownOpen && !event.target.closest(`.${classes.coursesDropdown}`)) {
        setCoursesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [coursesDropdownOpen, classes.coursesDropdown]);

  return (
    <div
      className={classes.container}
      style={{
        '--scroll-progress': scrollProgress,
      }}
    >
      {/* Navigation Bar */}
      <nav className={classes.navbar}>
        <div className={classes.navContent}>
          <div className={classes.navLogo}>
            <Logo size="medium" clickable onClick={handleLogoClick} />
          </div>
          <div className={classes.navRight}>
            <div className={classes.coursesDropdown}>
              <button
                className={`${classes.coursesDropdownButton} ${coursesDropdownOpen ? classes.coursesDropdownButtonActive : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                }}
              >
                Courses
                <svg className={classes.dropdownArrow} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {coursesDropdownOpen && (
                <div className={classes.coursesDropdownMenu}>
                  <button className={classes.coursesDropdownItem} onClick={() => setCoursesDropdownOpen(false)}>
                    ACT
                  </button>
                  <button className={classes.coursesDropdownItemDisabled} disabled>
                    SAT - Coming Soon
                  </button>
                </div>
              )}
            </div>
            <button className={classes.getStartedButton} onClick={handleGetStarted}>
              Join <span style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.05em' }}>NomiAcademy</span>
            </button>
            <button className={classes.hamburgerButton} onClick={() => setMobileMenuOpen(true)}>
              <HiBars3 />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`${classes.mobileMenuOverlay} ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`${classes.mobileMenu} ${mobileMenuOpen ? 'open' : ''}`}>
        <div className={classes.mobileMenuHeader}>
          <Logo size="small" />
          <button className={classes.mobileMenuClose} onClick={() => setMobileMenuOpen(false)}>
            <HiXMark />
          </button>
        </div>
        <div className={classes.mobileMenuLinks}>
          <div className={classes.mobileCoursesSection}>
            <div className={classes.mobileCoursesHeader}>Courses</div>
            <button className={classes.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>
              ACT
            </button>
            <button className={classes.mobileMenuLinkDisabled} disabled>
              SAT - Coming Soon
            </button>
          </div>
        </div>
        <button className={classes.mobileMenuButton} onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }}>
          Join <span style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.05em' }}>NomiAcademy</span>
        </button>
      </div>

      {/* Mobile Typeform - Full Screen */}
      <div className={classes.mobileTypeformContainer}>
        <div className={classes.mobileTypeformHeader}>
          <h1 className={classes.mobileTypeformTitle}>
            Want Your FREE 1-1 ACT Tutoring Session?
          </h1>
          <div className={classes.mobileTypeformTimer}>
            <span className={classes.mobileTimerIcon}>⏱</span>
            <span>Offer expires in <span className={classes.mobileTimerText}>29:58</span></span>
          </div>
          <p className={classes.mobileTypeformSubtitle}>
            Just a few quick questions to unlock your FREE 1-1 ACT Tutoring Call
          </p>
        </div>
        <iframe
          src="https://form.typeform.com/to/okRIME6U"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Free Training Signup"
          style={{ border: 'none' }}
          className={classes.mobileTypeformIframe}
        />
      </div>

      {/* Main Content */}
      <div className={classes.mainContent}>
        <div className={classes.heroSection}>
          <div className={classes.badge}>
            <div className={classes.badgeAvatars}>
              <img src="https://i.pravatar.cc/150?img=1" alt="Student" className={classes.badgeAvatar} />
              <img src="https://i.pravatar.cc/150?img=5" alt="Student" className={classes.badgeAvatar} />
              <img src="https://i.pravatar.cc/150?img=9" alt="Student" className={classes.badgeAvatar} />
              <img src="https://i.pravatar.cc/150?img=15" alt="Student" className={classes.badgeAvatar} />
              <img src="https://i.pravatar.cc/150?img=20" alt="Student" className={classes.badgeAvatar} />
            </div>
            <span className={classes.badgeText}>
              Trusted by 20k+ students across 20+ countries | 21% of users scored 32+
            </span>
          </div>

          <h1 className={classes.headline}>
            Claim Your <span className={classes.highlightText}>FREE</span> 34+ ACT Training to Get Into The Ivy League!
          </h1>

          <p className={classes.ctaSubtext}>
            This FREE Training Teaches You Everything You Need To Know To Get a 34+!
          </p>

          <div className={classes.ctaButtonContainer}>
            <button className={classes.ctaButton} onClick={handleGetStarted}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                Get Free Training and Exclusive Bonuses
                <svg width="20" height="14" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h24M20 2l6 6-6 6"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div className={classes.videoSection}>
          <div className={classes.videoContainer}>
            <iframe
              className={classes.videoIframe}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="ACT Prep Training Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p className={classes.spotsRemaining}>
            Only 47 free trainings remaining this month!
          </p>
        </div>

        {/* Statistics */}
        <div id="statistics" className={classes.statisticsSection}>
            <div className={classes.statisticsLabel}>Student Track Record</div>
            <div className={classes.statisticsDescription}>
              The percentage of Nomi Academy's students over the last 2 years who achieved the following metrics with their ACT scores.
            </div>
            <div className={classes.statisticsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Scored 30+</div>
                <div className={classes.statNumber}>88%</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Scored 33+</div>
                <div className={classes.statNumber}>52%</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Scored 35+</div>
                <div className={classes.statNumber}>22%</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Improved by 4+ Points</div>
                <div className={classes.statNumber}>96%</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Improved by 6+ Points</div>
                <div className={classes.statNumber}>71%</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statLabel}>Improved by 8+ Points</div>
                <div className={classes.statNumber}>28%</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div id="testimonials" className={classes.testimonialsSection}>
            <div className={classes.testimonialsContainer}>
              <div
                className={classes.testimonialsTrack}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((slide, slideIndex) => (
                  <div key={slideIndex} className={classes.testimonialsSlide}>
                    {slide.map((testimonial, index) => (
                      <div key={index} className={classes.testimonialCard}>
                        <div className={classes.testimonialStars}>
                          ★★★★★
                        </div>
                        <div className={classes.testimonialQuote}>
                          "{testimonial.quote}"
                        </div>
                        <div className={classes.testimonialAuthor}>{testimonial.author}</div>
                        <div className={classes.testimonialScore}>{testimonial.score}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className={classes.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${classes.testimonialDot} ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* University Logos - Scrolling */}
          <UniversityLogos />

          {/* FAQ Section */}
          <div id="faq" className={classes.faqSection}>
            <h2 className={classes.faqHeadline}>Frequently Asked Questions</h2>
            <div className={classes.faqContainer}>
              {faqs.map((faq, index) => (
                <div key={index} className={classes.faqItem}>
                  <button
                    className={classes.faqQuestion}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <span className={classes.faqIcon}>
                      {openFaqIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className={classes.faqAnswer}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className={classes.bottomCtaSection}>
            <h2 className={classes.bottomCtaHeadline}>
              Let's get you started with a <span className={classes.highlightText}>FREE training.</span>
            </h2>
            <p className={classes.bottomCtaSubtext}>
              Click below to claim your FREE training before resources run out!
            </p>
            <button className={classes.bottomCtaButton} onClick={handleGetStarted}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                Get FREE Training
                <svg width="20" height="14" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h24M20 2l6 6-6 6"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

      {/* Footer */}
      <footer className={classes.footer}>
        <div className={classes.footerContent}>
          <div className={classes.footerTitle}>NomiAcademy</div>
          <div className={classes.footerText}>Premiere ACT prep for all students.</div>
          <div className={classes.footerText}>&copy; 2025 The Student Society Co LLC</div>
          <div className={classes.footerEmail}>
            <a href="mailto:cadenatnomi@gmail.com">cadenatnomi@gmail.com</a>
          </div>
          <div className={classes.footerDisclaimer}>
            ACT® is a trademark registered by ACT, Inc., which is not affiliated with, and does not endorse, this product.
          </div>
          <div className={classes.footerSocial}>
            <a href="https://discord.gg/uJ3C7ee5" target="_blank" rel="noopener noreferrer" className={classes.socialIcon} aria-label="Discord">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
        <a href="/app/home" className={classes.footerLearnLink}>Learn</a>
      </footer>

      {/* Sticky Bottom CTA Bar - Only shows after scrolling */}
      {showStickyBar && (
        <div className={classes.stickyBottomBar}>
          <div className={classes.stickyBarText}>
            {isMobile ? 'Get your FREE training!' : 'Claim your FREE training for immediate results!'}
          </div>
          <button className={classes.stickyBarButton} onClick={handleGetStarted}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Get FREE Training
              <svg width="20" height="14" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8h24M20 2l6 6-6 6"/>
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Diagnostic Signup Modal with Typeform */}
      <DiagnosticSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default LandingPage;
