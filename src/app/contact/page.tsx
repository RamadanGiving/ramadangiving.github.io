"use client";

import { Mail, Phone, MapPin, Clock, ExternalLink, MessageCircle, HelpCircle, Instagram, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Donations & Tax Receipts",
    questions: [
      {
        q: "Is my donation tax-deductible?",
        a: "Yes! Ramadan Giving operates under Bridging Borders, a registered 501(c)(3) nonprofit organization. You will receive a tax receipt for all donations over $25 automatically via email."
      },
      {
        q: "How is my donation used?",
        a: "100% of Zakat-designated funds go directly to eligible recipients. For general donations, at least 90% goes to programs, with minimal overhead for essential operations."
      },
      {
        q: "Can I donate monthly?",
        a: "Absolutely! Monthly giving helps us plan long-term programs. You can set up recurring donations on our Donate page and manage your subscription anytime."
      }
    ]
  },
  {
    category: "Volunteering",
    questions: [
      {
        q: "What is the time commitment for volunteers?",
        a: "It varies! Event volunteers typically commit 3-4 hours per event. Regular volunteers may help weekly or monthly. We work with your schedule."
      },
      {
        q: "Do I need special skills to volunteer?",
        a: "No special skills required for most roles. We need help with packing, distribution, driving, and general event support. Training is provided."
      },
      {
        q: "Can students volunteer for community service hours?",
        a: "Yes! We provide documentation for community service hours. Please mention this in your volunteer application."
      }
    ]
  },
  {
    category: "Faith & Values",
    questions: [
      {
        q: "Is this a religious organization?",
        a: "Ramadan Giving is inspired by Islamic principles of charity and compassion, but we serve ALL people regardless of faith, background, or identity."
      },
      {
        q: "How do you handle Zakat distribution?",
        a: "Zakat funds are distributed according to Islamic guidelines to the eight categories of eligible recipients. We maintain strict oversight to ensure compliance."
      }
    ]
  },
  {
    category: "Transparency",
    questions: [
      {
        q: "How can I see where my donation went?",
        a: "We publish quarterly impact reports and annual financial statements. Donors also receive periodic updates on specific programs they supported."
      },
      {
        q: "Are you a legitimate organization?",
        a: "Yes. We are a project of Bridging Borders, a registered 501(c)(3) nonprofit. Our EIN is available upon request, and we maintain full financial transparency."
      }
    ]
  }
];

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/ramadan.giving?igsh=MXJqZjJnNWRqNzY3eg==", icon: Instagram },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/ramadan-giving", icon: Linkedin },
];

export default function Contact() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4">
      {/* Header */}
      <section className="text-center space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact & FAQ</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions? Find answers below or reach out to us directly.
        </p>
      </section>

      {/* Contact Info */}
      <section className="grid md:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">info@ramadangiving.org</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="font-medium text-foreground">Within 48 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-gold" />
              Follow Us
            </h2>
            <p className="text-muted-foreground text-sm">
              Stay connected with our latest updates, events, and impact stories.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  className="rounded-xl gap-2"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Button>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Serving communities nationwide
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Frequently Asked Questions
        </h2>

        {faqs.map((category) => (
          <Card key={category.category} className="border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gold mb-3">{category.category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, idx) => (
                  <AccordionItem key={idx} value={`${category.category}-${idx}`} className="border-b-0">
                    <AccordionTrigger className="text-left text-foreground hover:no-underline py-3">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form CTA */}
      <section>
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6 text-center space-y-4">
            <Mail className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-lg font-bold text-foreground">Still Have Questions?</h3>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Send us an email and we'll get back to you within 48 hours.
            </p>
            <Button 
              className="rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={() => window.location.href = "mailto:info@ramadangiving.org"}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
