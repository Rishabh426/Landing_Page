"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I register for a contest?",
      answer:
        "To register for a contest, simply fill out the registration form on this page. Select the contest you're interested in, provide your personal details, and submit the form. You'll receive a confirmation email with further instructions.",
    },
    {
      question: "Can I participate in multiple contests?",
      answer:
        "Yes, you can register for and participate in multiple contests. Each contest requires a separate registration. Make sure to check the dates to ensure there are no scheduling conflicts.",
    },
    {
      question: "What are the requirements for team registration?",
      answer:
        "For team registrations, you'll need to provide a team name and the number of team members. Each team member should be registered individually, mentioning the same team name. Team size requirements vary by contest, so please check the specific contest details.",
    },
    {
      question: "Are there any registration fees?",
      answer:
        "Registration fees vary by contest. Some contests are free to enter, while others may have a nominal fee. The fee details are provided in the specific contest information. Payment can be made online during registration.",
    },
    {
      question: "How will I know if my registration is confirmed?",
      answer:
        "After submitting your registration, you'll receive an immediate confirmation on the website. Additionally, a confirmation email will be sent to the email address you provided. If you don't receive an email within 24 hours, please check your spam folder or contact our support team.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="stagger-items">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-3 bg-light dark:bg-dark rounded overflow-hidden animate-slide-left">
          <button
            className="w-100 p-3 d-flex justify-content-between align-items-center text-left font-semibold"
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openIndex === index && <div className="p-3 border-top animate-fade-up">{faq.answer}</div>}
        </div>
      ))}
    </div>
  )
}
