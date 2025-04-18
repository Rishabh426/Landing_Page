"use client"

import { useState } from "react"
import { Trophy, Calendar, Users, MapPin, Clock, Award } from "lucide-react"
import CountdownTimer from "./countdown-timer"
import Testimonials from "./testimonials"
import Faq from "./faq"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"

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

// Define the form schema with zod
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  contestType: z.string().min(1, { message: "Please select a contest type" }),
  teamName: z.string().optional(),
  teamSize: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// TypeScript interface for our form values
type FormValues = z.infer<typeof formSchema>;

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

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      contestType: "",
      teamName: "",
      teamSize: "",
      agreeToTerms: false,
    },
  })

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

        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      }, 1500)
    }
  }
  
  // Handle form submission with react-hook-form
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      console.log("Form submitted:", data)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      form.reset()
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  const contests = [
    {
      id: "coding",
      name: "Codeathon",
      date: "April 21, 2025",
      location: "Graphic Era Hill University, Bhimtal",
      participants: "Individual",
      time: "10:00am - 4:00am",
      daysLeft: 3,
    },
    {
      id: "hackathon",
      name: "Hack the Spring (Hackathon)",
      date: "April-22, 2025",
      location: "Graphic Era Hill University",
      participants: "Teams of 2-4",
      time: "Starts at 9:00 AM",
      daysLeft: 4,
    },
    {
      id: "Sports",
      name: "Volleyball",
      date: "April 21, 2025",
      location: "Graphic Era Hill University",
      participants: "Team",
      time: "10:00AM - 4:00PM",
      daysLeft: 3,
    },
  ]

  return (
    <div className="container py-5">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .slide-delay-1 {
          animation-delay: 100ms;
        }
        
        .slide-delay-2 {
          animation-delay: 200ms;
        }
        
        .slide-delay-3 {
          animation-delay: 300ms;
        }
        
        .slide-delay-4 {
          animation-delay: 400ms;
        }
        
        .slide-delay-5 {
          animation-delay: 500ms;
        }
        
        .slide-delay-6 {
          animation-delay: 600ms;
        }
      `}</style>
      
      <div className="row">
        <div className="col-12 text-center mb-4 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Contest Registration</h1>
          <p className="text-secondary">Register for upcoming tech contests and competitions</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-light dark:bg-dark p-4 rounded animate-pop">
            <h2 className="text-xl font-bold mb-3 text-center">Next Contest Starts In</h2>
            <CountdownTimer />
          </div>
        </div>
      </div>

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
                <h3 className="text-xl font-semibold">Web-3 Hackathon</h3>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Calendar className="mr-2" size={16} />
                <span>March 15, 2025</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <Award className="mr-2" size={16} />
                <span>Winner: 100x Dev</span>
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
                <h3 className="text-xl font-semibold">AI Spring</h3>
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
          <Card className="shadow-lg border-0 overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="text-2xl font-bold text-center animate-pulse">Registration Form</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 pt-8">
              {isSuccess && (
                <div className="bg-green-100 text-green-800 p-3 rounded mb-4 flex items-center animate-bounce">
                  <Check className="h-5 w-5 mr-2" />
                  <p className="m-0">Registration successful! We'll contact you with further details.</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-slide-up">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                className="w-full p-2 rounded"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-danger text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="animate-slide-up slide-delay-1">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Enter your email" 
                                className="w-full p-2 rounded"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-danger text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="animate-slide-up slide-delay-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="Enter your phone number" 
                                className="w-full p-2 rounded"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-danger text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="animate-slide-up slide-delay-3">
                      <FormField
                        control={form.control}
                        name="contestType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Contest Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full p-2 rounded">
                                  <SelectValue placeholder="Select a contest" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="coding">Coding Challenge</SelectItem>
                                <SelectItem value="hackathon">24-Hour Hackathon</SelectItem>
                                <SelectItem value="datascience">Data Science Competition</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-danger text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="animate-slide-up slide-delay-4">
                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Team Name (if applicable)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your team name" 
                                className="w-full p-2 rounded"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="animate-slide-up slide-delay-5">
                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Team Size (if applicable)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full p-2 rounded">
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Individual</SelectItem>
                                <SelectItem value="2">2 members</SelectItem>
                                <SelectItem value="3">3 members</SelectItem>
                                <SelectItem value="4">4 members</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="animate-slide-up slide-delay-6">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms">
                              I agree to the terms and conditions
                            </FormLabel>
                            <FormMessage className="text-danger text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 text-center">
                    <Button 
                      type="submit"
                      className="bg-primary text-light py-2 px-6 rounded font-semibold transition hover:shadow-lg transform hover:scale-105"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
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