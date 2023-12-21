import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative py-24">
      <section id="hero" aria-labelledby="hero-heading">
        <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Swiftly informed: Dive into Taylor's latest stories!
          </h1>
          <h3 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            From chart-topping hits to exclusive behind-the-scenes, uncover the
            essence of Taylor Swift's ever-envolving narrative.
          </h3>
          <Button variant="secondary">Get started</Button>
        </div>
        <img src="hero.png" className="w-full"></img>
      </section>
    </div>
  );
};
export default Hero;
