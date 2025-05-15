import { Link, useNavigate } from "react-router-dom"

export function Footer() {
  const navigation = useNavigate();
  return (
    <div>
      <footer className="bg-transparent flex mask-t-from-70% flex-col items-center text-white">
      
      {/* Bottom section with copyright and legal links */}
      <div className="border-t-2 border-white mt-5 text-shadow-md ">
        <div className="container font-bold flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-sm text-white">&copy; 2024 Travelink.com. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link to={'/'} className="text-white hover:text-foreground">
              Terms and Conditions
            </Link>
            <Link to={'/'} className="text-white hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}
