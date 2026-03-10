"use client"

import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/#collections" },
  { name: "Products", href: "/products" },
  { name: "Showrooms", href: "/showrooms" },
]

const supportLinks = [
  { name: "Contact Us", href: "#contact" },
  { name: "Book Appointment", href: "/showrooms" },
  { name: "FAQ", href: "#" },
  { name: "Careers", href: "#" },
]

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Pinterest", href: "#" },
  { name: "LinkedIn", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl tracking-[0.2em] font-light uppercase text-primary-foreground">
                Ramstack
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-8 max-w-xs">
              Premium architectural surfaces and materials for spaces that
              inspire. Visit our showrooms to experience our collections.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs tracking-wider uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mb-6">
              Stay Connected
            </h4>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-sm text-primary-foreground/70 mb-4">
                Subscribe for design inspiration and updates.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40"
                />
                <button
                  type="submit"
                  className="px-4 bg-primary-foreground text-primary transition-colors duration-300 hover:bg-primary-foreground/90"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <span>info@ramstack.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  123 Design District
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            {new Date().getFullYear()} Ramstack. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
