
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, FileCode, Map, Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const links = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/blog", label: "Blog", icon: <BookOpen size={18} /> },
    { path: "/uml", label: "UML Diagrams", icon: <FileCode size={18} /> }
  ];
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-faculty-primary to-faculty-accent text-white py-2 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Map className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Faculty Locator Pro</span>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <Button
              key={link.path}
              asChild
              variant={isActive(link.path) ? "secondary" : "ghost"}
              className={isActive(link.path) 
                ? "bg-white/20 text-white hover:bg-white/30" 
                : "text-white hover:bg-white/10"
              }
            >
              <Link to={link.path} className="flex items-center">
                {link.icon}
                <span className="ml-1">{link.label}</span>
              </Link>
            </Button>
          ))}
          
          {location.pathname === "/blog" && (
            <Button asChild variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              <Link to="/blog/create" className="flex items-center">
                <span>Create Post</span>
              </Link>
            </Button>
          )}
        </div>
        
        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gradient-to-r from-faculty-primary to-faculty-accent border-0">
            <div className="flex flex-col space-y-4 mt-8">
              {links.map((link) => (
                <Button
                  key={link.path}
                  asChild
                  variant={isActive(link.path) ? "secondary" : "ghost"}
                  className={isActive(link.path) 
                    ? "bg-white/20 text-white hover:bg-white/30" 
                    : "text-white hover:bg-white/10"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={link.path} className="flex items-center">
                    {link.icon}
                    <span className="ml-2">{link.label}</span>
                  </Link>
                </Button>
              ))}
              
              {location.pathname === "/blog" && (
                <Button 
                  asChild 
                  variant="secondary" 
                  className="bg-white/20 text-white hover:bg-white/30"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/blog/create" className="flex items-center">
                    <span>Create Post</span>
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
