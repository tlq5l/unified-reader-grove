
import { 
  Inbox, 
  Clock, 
  Archive, 
  Plus, 
  Settings, 
  Search, 
  Home
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();
  
  const mainNavItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Inbox", url: "/inbox", icon: Inbox },
    { title: "Read Later", url: "/later", icon: Clock },
    { title: "Archive", url: "/archive", icon: Archive },
  ];
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </div>
        <div className="mt-4">
          <Button className="w-full gap-2">
            <Plus size={16} /> Add Content
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild 
                    active={isActive(item.url)}
                    className={isActive(item.url) ? "bg-bondwise-50 text-bondwise-800 dark:bg-bondwise-950/50 dark:text-bondwise-200" : ""}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/search" className="flex items-center gap-2">
                <Search size={18} />
                <span>Search</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
