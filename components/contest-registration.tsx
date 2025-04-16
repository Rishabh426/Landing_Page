"use client"

import { useState } from "react"
import { Trophy, Calendar, Users, MapPin, Clock, Award } from "lucide-react"
import CountdownTimer from "./countdown-timer"
import Testimonials from "./testimonials"
import Faq from "./faq"

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  contestType: string;
  teamName: string;
  teamSize: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContestRegistration() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    contestType: "",
    teamName: "",
    teamSize: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.contestType) {
      newErrors.contestType = "Please select a contest type"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          contestType: "",
          teamName: "",
          teamSize: "",
          agreeToTerms: false,
        })

        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      }, 1500)
    }
  }

  const contests = [
    {
      id: "coding",
      name: "Coding Challenge",
      date: "June 15, 2025",
      location: "Online",
      participants: "Individual",
      time: "10:00 AM - 2:00 PM",
      daysLeft: 45,
    },
    {
      id: "hackathon",
      name: "24-Hour Hackathon",
      date: "July 10-11, 2025",
      location: "Tech Hub Center",
      participants: "Teams of 2-4",
      time: "Starts at 9:00 AM",
      daysLeft: 70,
    },
    {
      id: "datascience",
      name: "Data Science Competition",
      date: "August 5, 2025",
      location: "Online",
      participants: "Individual or Team",
      time: "All day event",
      daysLeft: 96,
    },
  ]

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-4 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Contest Registration</h1>
          <p className="text-secondary">Register for upcoming tech contests and competitions</p>
        </div>
      </div>

      {/* New Feature: Countdown Timer for Next Contest */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-light dark:bg-dark p-4 rounded animate-pop">
            <h2 className="text-xl font-bold mb-3 text-center">Next Contest Starts In</h2>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Contest Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-center gap-3">
            <button
              className={`py-2 px-4 rounded transition ${activeTab === "upcoming" ? "bg-primary text-light" : "bg-light dark:bg-dark"}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Contests
            </button>
            <button
              className={`py-2 px-4 rounded transition ${activeTab === "past" ? "bg-primary text-light" : "bg-light dark:bg-dark"}`}
              onClick={() => setActiveTab("past")}
            >
              Past Contests
            </button>
          </div>
        </div>
      </div>

      {activeTab === "upcoming" && (
        <div className="row stagger-items">
          {contests.map((contest, index) => (
            <div key={contest.id} className="col-12 col-md-4 mb-4">
              <div className="p-4 bg-light dark:bg-dark rounded hover-shadow transition animate-slide-left">
                <div className="d-flex align-items-center mb-3">
                  <Trophy className="mr-2 text-primary" size={24} />
                  <h3 className="text-xl font-semibold">{contest.name}</h3>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <Calendar className="mr-2" size={16} />
                  <span>{contest.date}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <MapPin className="mr-2" size={16} />
                  <span>{contest.location}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <Users className="mr-2" size={16} />
                  <span>{contest.participants}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <Clock className="mr-2" size={16} />
                  <span>{contest.time}</span>
                </div>
                <div className="mt-3 text-center">
                  <span className="bg-primary text-light py-1 px-3 rounded-full text-sm">
                    {contest.daysLeft} days left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "past" && (
        <div className="row stagger-items">
          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 bg-light dark:bg-dark rounded hover-shadow transition animate-slide-left">
              <div className="d-flex align-items-center mb-3">
                <Trophy className="mr-2 text-warning" size={24} />
                <h3 className="text-xl font-semibold">AI Innovation Challenge</h3>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Calendar className="mr-2" size={16} />
                <span>March 15, 2025</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Award className="mr-2" size={16} />
                <span>Winner: Team Innovate</span>
              </div>
              <div className="mt-3 text-center">
                <span className="bg-secondary text-light py-1 px-3 rounded-full text-sm">Completed</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 bg-light dark:bg-dark rounded hover-shadow transition animate-slide-left">
              <div className="d-flex align-items-center mb-3">
                <Trophy className="mr-2 text-warning" size={24} />
                <h3 className="text-xl font-semibold">Web Dev Showdown</h3>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Calendar className="mr-2" size={16} />
                <span>February 20, 2025</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Award className="mr-2" size={16} />
                <span>Winner: CodeCrafters</span>
              </div>
              <div className="mt-3 text-center">
                <span className="bg-secondary text-light py-1 px-3 rounded-full text-sm">Completed</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 bg-light dark:bg-dark rounded hover-shadow transition animate-slide-left">
              <div className="d-flex align-items-center mb-3">
                <Trophy className="mr-2 text-warning" size={24} />
                <h3 className="text-xl font-semibold">Mobile App Challenge</h3>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Calendar className="mr-2" size={16} />
                <span>January 10, 2025</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Award className="mr-2" size={16} />
                <span>Winner: AppWizards</span>
              </div>
              <div className="mt-3 text-center">
                <span className="bg-secondary text-light py-1 px-3 rounded-full text-sm">Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-12 col-lg-8 offset-lg-2">
          <div className="bg-light dark:bg-dark p-4 rounded animate-fade-up">
            <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>

            {isSuccess && (
              <div className="bg-success text-light p-3 rounded mb-4 animate-pop">
                Registration successful! We'll contact you with further details.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* <div className="row"> */}
                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block mb-2 font-semibold mr-10">Full Name</label><br/>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-100 p-2 rounded border ${errors.fullName ? "border-danger" : "border"}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <div className="text-danger mt-1 text-sm">{errors.fullName}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label className="d-block mb-2 font-semibold">Email</label><br/>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-100 p-2 rounded border ${errors.email ? "border-danger" : "border"}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="text-danger mt-1 text-sm">{errors.email}</div>}
                </div><br/>
              {/* </div> */}

              {/* <div className="row"> */}
                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block mb-2 font-semibold mr-5">Phone Number</label><br/>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-100 p-2 rounded border ${errors.phone ? "border-danger" : "border"}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <div className="text-danger mt-1 text-sm">{errors.phone}</div>}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block font-semibold mr-5 mb-5">Contest Type</label>
                  <select
                    name="contestType"
                    value={formData.contestType}
                    onChange={handleChange}
                    className={`w-100 p-2 rounded border ${errors.contestType ? "border-danger" : "border"}`}
                  >
                    <option value="">Select a contest</option>
                    <option value="coding">Coding Challenge</option>
                    <option value="hackathon">24-Hour Hackathon</option>
                    <option value="datascience">Data Science Competition</option>
                  </select>
                  {errors.contestType && <div className="text-danger mt-1 text-sm">{errors.contestType}</div>}
                </div>
              {/* </div> */}

              {/* <div className="row"> */}
                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block mb-2 font-semibold">Team Name (if applicable)</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-100 p-2 rounded border"
                    placeholder="Enter your team name"
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="d-block mb-2 font-semibold mr-5">Team Size (if applicable)</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-100 p-2 rounded border"
                  >
                    <option value="">Select team size</option>
                    <option value="1">Individual</option>
                    <option value="2">2 members</option>
                    <option value="3">3 members</option>
                    <option value="4">4 members</option>
                  </select>
                </div>
              {/* </div> */}

              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mr-2"
                      id="terms"
                    />
                    <label htmlFor="terms" className="mb-0">
                      I agree to the terms and conditions
                    </label>
                  </div>
                  {errors.agreeToTerms && <div className="text-danger mt-1 text-sm">{errors.agreeToTerms}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className={`py-2 px-4 rounded font-semibold bg-primary text-light transition ${isSubmitting ? "opacity-75" : "hover-shadow"}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register Now"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* New Feature: Testimonials Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-2xl font-bold mb-4 text-center animate-fade-up">What Past Participants Say</h2>
          <Testimonials />
        </div>
      </div>

      {/* New Feature: FAQ Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-2xl font-bold mb-4 text-center animate-fade-up">Frequently Asked Questions</h2>
          <Faq />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 text-center">
          <p className="text-secondary">
            &copy; {new Date().getFullYear()} Contest Registration Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
