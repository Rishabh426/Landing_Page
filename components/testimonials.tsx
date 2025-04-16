"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Mayank Joshi",
      role: "Student",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The Coding Challenge was an incredible experience! It pushed me to think outside the box and improve my problem-solving skills.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rishabh Sharma",
      role: "Student",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Participating in the Data Science Competition helped me showcase my skills and connect with industry professionals. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Aadarsh Singh",
      role: "Developer",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The 24-Hour Hackathon was intense but incredibly rewarding. Our team created something amazing in just one day!",
      rating: 4,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <div className="bg-light dark:bg-dark p-4 rounded animate-fade-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={prevTestimonial}
          className="bg-primary text-light p-2 rounded-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center animate-slide-right" key={testimonials[currentIndex].id}>
          <div
            className="mb-3 mx-auto"
            style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden" }}
          >
            <img
              src={testimonials[currentIndex].image || "/placeholder.svg"}
              alt={testimonials[currentIndex].name}
              className="w-100 h-100 object-cover"
            />
          </div>
          <div className="mb-2 d-flex justify-content-center">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="text-warning" size={16} fill="#ffc107" />
            ))}
          </div>
          <p className="mb-3 text-lg font-light italic">"{testimonials[currentIndex].quote}"</p>
          <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
          <p className="text-sm text-secondary">{testimonials[currentIndex].role}</p>
        </div>

        <button
          onClick={nextTestimonial}
          className="bg-primary text-light p-2 rounded-full"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-secondary"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
