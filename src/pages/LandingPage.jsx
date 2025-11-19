/**
 * Landing Page
 * Minimal, clean design focused on claiming free diagnostic test
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLandingPageStyles } from '../styles/landing/LandingPage.styles';

const LandingPage = () => {
  const classes = useLandingPageStyles();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      question: "Who created Nomi Academy?",
      answer: "Nomi Academy was founded by Ivy League students who scored a perfect 36 on the ACT. We built this platform to share the exact strategies and techniques that helped us achieve top scores, making elite test prep accessible to everyone."
    },
    {
      question: "Is the diagnostic test really free?",
      answer: "Yes! Our diagnostic test is 100% free with no credit card required. We believe every student should have access to quality ACT prep tools to identify their strengths and weaknesses before investing in a study plan."
    },
    {
      question: "What's included in Nomi Academy?",
      answer: "Beyond the free diagnostic test, Nomi Academy offers comprehensive ACT prep including written lessons covering all four sections (English, Math, Reading, Science), thousands of practice questions, full-length practice tests, detailed explanations, and personalized study plans that adapt to your progress."
    },
    {
      question: "How do the lessons work?",
      answer: "Our lessons are taught using the same methods that helped our founders score 36. Each lesson breaks down complex concepts into easy-to-understand steps, includes practice problems, and provides detailed explanations. You'll learn test-taking strategies, time management techniques, and subject-specific tips that actually work."
    },
    {
      question: "What makes Nomi Academy different from other ACT prep?",
      answer: "Unlike expensive tutoring or generic prep courses, Nomi Academy combines personalized learning with strategies developed by perfect scorers. Our platform adapts to your specific needs, focusing your time on areas where you'll see the biggest score improvements. Plus, you can start with a free diagnostic test to see exactly where you stand."
    }
  ];

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/login?mode=signin');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
            Nomi Academy
          </div>
          <div className={classes.navLinks}>
            <button className={classes.navLink} onClick={() => document.querySelector('#statistics')?.scrollIntoView({ behavior: 'smooth' })}>
              Results
            </button>
            <button className={classes.navLink} onClick={() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })}>
              Testimonials
            </button>
            <button className={classes.navLink} onClick={() => document.querySelector('#universities')?.scrollIntoView({ behavior: 'smooth' })}>
              Universities
            </button>
            <button className={classes.navLink} onClick={() => document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' })}>
              FAQ
            </button>
          </div>
          <div className={classes.navRight}>
            <button className={classes.signInButton} onClick={handleSignIn}>
              Sign in
            </button>
            <button className={classes.getStartedButton} onClick={handleGetStarted}>
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={classes.mainContent}>
        <div className={classes.heroSection}>
          <div className={classes.badge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800"/>
            </svg>
            Free • No Credit Card Required
          </div>

          {/* Product Demo Screenshot */}
          <div className={classes.productDemoContainer}>
            <img
              src="/productdemo.png"
              alt="Nomi Academy Platform Demo"
              className={classes.productDemoImage}
            />
          </div>

          <h1 className={classes.headline}>
            Want to improve your <span className={classes.highlightText}>ACT Score?</span>
          </h1>

          <p className={classes.subheadline}>
            Discover your strengths and weaknesses with a comprehensive ACT diagnostic test. Get personalized insights and a custom study plan to help you score 34+.
          </p>

          <button className={classes.ctaButton} onClick={handleGetStarted}>
            FREE DIAGNOSTIC TEST
          </button>

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
          <div id="universities" className={classes.universitiesSection}>
            <div className={classes.universitiesLabel}>Students accepted to top universities</div>
            <div className={classes.universitiesScroller}>
              <div className={classes.universitiesTrack}>
                <img src="https://logo.clearbit.com/ucla.edu" alt="UCLA" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/120px-MIT_logo.svg.png" alt="MIT" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/stanford.edu" alt="Stanford" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/120px-Yale_University_Shield_1.svg.png" alt="Yale" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/120px-Princeton_seal.svg.png" alt="Princeton" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/columbia.edu" alt="Columbia" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/duke.edu" alt="Duke" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/120px-Seal_of_University_of_California%2C_Berkeley.svg.png" alt="UC Berkeley" className={classes.universityLogo} />
                {/* Duplicate for infinite scroll */}
                <img src="https://logo.clearbit.com/ucla.edu" alt="UCLA" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/120px-MIT_logo.svg.png" alt="MIT" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/stanford.edu" alt="Stanford" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/120px-Yale_University_Shield_1.svg.png" alt="Yale" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/120px-Princeton_seal.svg.png" alt="Princeton" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/columbia.edu" alt="Columbia" className={classes.universityLogo} />
                <img src="https://logo.clearbit.com/duke.edu" alt="Duke" className={classes.universityLogo} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/120px-Seal_of_University_of_California%2C_Berkeley.svg.png" alt="UC Berkeley" className={classes.universityLogo} />
              </div>
            </div>
          </div>

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
              Let's get you started with a free diagnostic test
            </h2>
            <p className={classes.bottomCtaSubtext}>
              Click below to claim your test before resources run out!
            </p>
            <button className={classes.bottomCtaButton} onClick={handleGetStarted}>
              FREE DIAGNOSTIC TEST
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={classes.footer}>
        <p className={classes.footerText}>
          Already have an account?{' '}
          <button className={classes.signInButton} onClick={handleSignIn}>
            Sign in
          </button>
        </p>
        <p className={classes.footerText}>
          &copy; 2024 Nomi Academy. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom CTA Bar */}
      <div className={classes.stickyBottomBar}>
        <div className={classes.stickyBarText}>
          Claim your free diagnostic test for immediate feedback!
        </div>
        <button className={classes.stickyBarButton} onClick={handleGetStarted}>
          FREE DIAGNOSTIC TEST
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
