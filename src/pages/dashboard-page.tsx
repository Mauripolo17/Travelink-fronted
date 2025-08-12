import { AppSidebar } from "@/components/app-sidebar";
import DashboardContent from "@/components/dashboard-content";
import { DashboardProvider } from "@/context/DashboardContext";

export default function Dashboard() {
    return (
       <DashboardProvider>
         <div className="flex min-h-svh flex-row items-start justify-start  p-6 md:p-10">
            <div>
                <AppSidebar />
            </div>
            <div className="flex-1 px-6 md:px-10">
                <DashboardContent />
            </div>
        </div>
       </DashboardProvider>

    )
}