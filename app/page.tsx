import type { JSX } from 'react'
import { ThemeToggle } from "@/components/theme-toggle"
import ContestRegistration from "@/components/contest-registration"

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end p-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <ContestRegistration />
    </main>
  )
}
