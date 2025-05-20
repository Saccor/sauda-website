import { cn } from "@/utils/styles"

interface SectionProps {
  /**
   * Background utility class (e.g. 'bg-black', 'bg-gradient-hero')
   * @default 'bg-black'
   */
  bgClass?: string
  /**
   * Additional classes to apply to the section
   */
  className?: string
  /**
   * Content to render inside the section
   */
  children: React.ReactNode
}

export function Section({
  bgClass = 'bg-black',
  className,
  children
}: SectionProps) {
  return (
    <section 
      className={cn(
        bgClass,
        'py-28 text-on-dark',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-[1280px] min-w-0">
        {children}
      </div>
    </section>
  )
} 