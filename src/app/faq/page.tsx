"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    title: "Donations & Giving",
    icon: Heart,
    items: [
      {
        question: "How do I make a donation?",
        answer: "You can donate by clicking the 'Donate' button anywhere on our website. We accept credit cards, Google Pay, Apple Pay, and PayPal. You can also make recurring monthly donations to provide ongoing support.",
      },
      {
        question: "Is my donation tax-deductible?",
        answer: "Yes! Ramadan Giving operates under Bridging Borders, a registered non-profit organization. You will receive a tax receipt for all eligible donations.",
      },
      {
        question: "Can I donate to a specific cause?",
        answer: "Absolutely! When donating, you can choose from specific causes like Winter Relief Kits, Grocery Packs, Meals for the Unhoused, and more. You can also select 'Where Most Needed' to let us allocate funds where they're needed most.",
      },
      {
        question: "What is Zakat and which campaigns are Zakat-eligible?",
        answer: "Zakat is one of the Five Pillars of Islam, requiring Muslims to give a portion of their wealth to those in need. Campaigns marked with 'Zakat Eligible' badges meet the requirements for Zakat distribution.",
      },
      {
        question: "Can I make a recurring donation?",
        answer: "Yes! You can set up monthly recurring donations to provide consistent support. This helps us plan and deliver programs more effectively.",
      },
    ],
  },
  {
    title: "Transparency & Accountability",
    icon: Shield,
    items: [
      {
        question: "How is my donation used?",
        answer: "100% of your donation goes directly to program delivery. We operate with a 100% volunteer-led model, meaning administrative costs are covered separately, ensuring maximum impact for your generosity.",
      },
      {
        question: "How can I track the impact of my donation?",
        answer: "We provide regular updates through our blog, social media, and email newsletters. You can see real stories and photos from our programs showing exactly how donations are making a difference.",
      },
      {
        question: "Is Ramadan Giving a registered charity?",
        answer: "Yes, Ramadan Giving operates as a project under Bridging Borders, a registered Non-Profit Organization (NPO) in Canada.",
      },
      {
        question: "Who oversees Ramadan Giving's operations?",
        answer: "Our organization is led by dedicated community leaders and overseen by a board of directors who ensure accountability and transparency in all our operations.",
      },
    ],
  },
  {
    title: "Volunteering & Getting Involved",
    icon: Users,
    items: [
      {
        question: "How can I volunteer?",
        answer: "Visit our 'Get Involved' page to learn about volunteer opportunities. We have roles for event coordination, community outreach, youth ambassadors, and more. Fill out our volunteer form and we'll match you with opportunities.",
      },
      {
        question: "Do I need special skills to volunteer?",
        answer: "Not at all! We welcome volunteers of all backgrounds and skill levels. Whether you have an hour or many hours to give, there's a place for you in our volunteer family.",
      },
      {
        question: "Can organizations partner with Ramadan Giving?",
        answer: "Yes! We welcome partnerships with businesses, mosques, schools, and other organizations. Contact us through our 'Get Involved' page to discuss partnership opportunities.",
      },
      {
        question: "How can I host a fundraiser for Ramadan Giving?",
        answer: "We love community-led fundraising! Contact our team and we'll provide you with resources, materials, and support to run a successful fundraiser in your community.",
      },
    ],
  },
];

export default function Faq() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      {/* Header */}
      <div className="text-center space-y-4 pt-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about donations, volunteering, and how we operate.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <category.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {category.title}
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <AccordionItem
                  key={itemIndex}
                  value={`${categoryIndex}-${itemIndex}`}
                  className="border border-border/50 rounded-xl px-4 bg-card"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center p-8 bg-secondary/50 rounded-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Still have questions?
        </h3>
        <p className="text-muted-foreground mb-4">
          Our team is here to help. Reach out and we'll get back to you as soon as possible.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-medium transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
