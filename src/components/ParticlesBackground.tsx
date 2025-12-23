'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
  }
}

export default function ParticlesBackground() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Load particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.particlesJS !== 'undefined') {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            color: {
              value: ['#2D6E7A', '#D4AF37', '#3D8A99']
            },
            shape: {
              type: ['circle', 'triangle'],
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.4,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#2D6E7A',
              opacity: 0.15,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.4
                }
              },
              push: {
                particles_nb: 3
              }
            }
          },
          retina_detect: true
        });
        initialized.current = true;
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed as particles container stays
    };
  }, []);

  return <div id="particles-js" />;
}

