import { Link, useNavigate } from "react-router-dom"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  const navigation = useNavigate();
  return (
    <div>
      <footer className="bg-white rounded-md flex flex-col items-center text-gray-600">
      <div className="container px-4 py-10 md:px-6 lg:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
            <img src="src/assets/travelink2.png" onClick={()=>{navigation('/')}} className="w-20 invert" />
            </div>
            <p className="text-gray-600">
              A collection of 100+ responsive HTML templates for your startup business or side project.
            </p>
            <div className="flex gap-4">
              <Link to={'/'} className="text-gray-600 hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to={'/'} className="text-gray-600 hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to={'/'} className="text-gray-600 hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to={'/'} className="text-gray-600 hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product links */}
          <div className="lg:ml-auto">
            <h3 className="mb-4 text-lg font-medium text-gray-600">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Overview
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Team
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Help
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Sales
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Advertise
                </Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and legal links */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-sm text-gray-600">&copy; 2024 Travelink.com. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link to={'/'} className="text-gray-600 hover:text-foreground">
              Terms and Conditions
            </Link>
            <Link to={'/'} className="text-gray-600 hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}
