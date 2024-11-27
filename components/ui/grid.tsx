import * as React from "react"
import { cn } from "@/lib/utils"

const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid",
      className
    )}
    {...props}
  />
))
Grid.displayName = "Grid"

const GridItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-span-1",
      className
    )}
    {...props}
  />
))
GridItem.displayName = "GridItem"

export { Grid, GridItem }
