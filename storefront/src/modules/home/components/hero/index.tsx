import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    // <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
    <div className="h-[50vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 mt-10">
          <Heading
            level="h1"
            className="text-xl text-ui-fg-base font-normal grey"
          >
            Welcome to
          </Heading>
          <img
          className="w-100 h-100 max-h-50 max-w-50"
          src="https://api.studiosammii.com/uploads/1717161177125-9503D529-ADEB-4C35-A0FF-8EED83F6394A_1_105_c.jpeg" />
      </div>
    </div>
  )
}

export default Hero
