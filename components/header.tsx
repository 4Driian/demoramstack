"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "#collections" },
  { name: "Spaces", href: "#spaces" },
  { name: "Products", href: "/products" },
  { name: "Showrooms", href: "/showrooms" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span
                className={cn(
                  "text-xl tracking-[0.2em] font-light uppercase transition-colors duration-300",
                  isScrolled ? "text-foreground" : "text-warm-white"
                )}
              >
                Ramstack
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-60",
                    isScrolled ? "text-foreground" : "text-warm-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                className={cn(
                  "hidden lg:block transition-colors duration-300",
                  isScrolled ? "text-foreground" : "text-warm-white"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden transition-colors duration-300 relative z-50",
                  isMobileMenuOpen
                    ? "text-foreground"
                    : isScrolled
                    ? "text-foreground"
                    : "text-warm-white"
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-2xl tracking-wider uppercase text-foreground transition-all duration-300 hover:opacity-60",
                isMobileMenuOpen && "animate-fade-up",
                `animation-delay-${(index + 1) * 100}`
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
