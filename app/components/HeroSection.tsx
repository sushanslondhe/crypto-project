import { TrendingUp, Zap, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow Effect */}
      <div className="hero-glow" />
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Stars */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-accent rounded-full animate-twinkle-slow" />
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-accent rounded-full animate-twinkle-slow" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-twinkle-fast" />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-success rounded-full animate-twinkle" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-twinkle-fast" />
        
        {/* Medium Stars */}
        <div className="absolute top-1/5 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-slow" />
        <div className="absolute top-3/5 right-1/5 w-0.5 h-0.5 bg-accent rounded-full animate-twinkle-fast" />
        <div className="absolute top-1/5 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-twinkle-slow" />
        <div className="absolute top-3/5 right-1/5 w-0.5 h-0.5 bg-accent rounded-full animate-twinkle-fast" />
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-primary-glow rounded-full animate-twinkle-slow" />
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        
        {/* Small Stars */}
        <div className="absolute top-1/6 right-2/3 w-px h-px bg-white rounded-full animate-twinkle-fast" />
        <div className="absolute top-5/6 left-2/3 w-px h-px bg-accent rounded-full animate-twinkle" />
        <div className="absolute top-1/6 right-2/3 w-px h-px bg-white rounded-full animate-twinkle-fast" />
        <div className="absolute top-5/6 left-2/3 w-px h-px bg-accent rounded-full animate-twinkle" />
        <div className="absolute bottom-1/2 right-1/2 w-px h-px bg-primary rounded-full animate-twinkle-slow" />
        <div className="absolute top-2/5 left-4/5 w-px h-px bg-success rounded-full animate-twinkle-fast" />
        <div className="absolute bottom-1/2 right-1/2 w-px h-px bg-primary rounded-full animate-twinkle-slow" />
        <div className="absolute top-2/5 left-4/5 w-px h-px bg-success rounded-full animate-twinkle-fast" />
        <div className="absolute bottom-2/5 left-1/6 w-px h-px bg-white rounded-full animate-twinkle" />
        <div className="absolute bottom-2/5 left-1/6 w-px h-px bg-white rounded-full animate-twinkle" />
        
        {/* Moving Stars */}
        <div className="absolute animate-float-slow">
          <div className="w-0.5 h-0.5 bg-primary rounded-full" />
        </div>
        <div className="absolute animate-float-medium" style={{left: '70%', top: '30%'}}>
          <div className="w-px h-px bg-accent rounded-full" />
        </div>
        <div className="absolute animate-float-fast" style={{left: '20%', top: '70%'}}>
          <div className="w-0.5 h-0.5 bg-white rounded-full" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className=" bg-clip-text ">
              Next-Gen
            </span>
            <br />
            <span className="text-foreground">Crypto Exchange</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 ">
            Trade with confidence on the most advanced crypto platform. 
            Real-time data, lightning-fast execution, and institutional-grade security.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className=" p-6 text-center">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Analytics</h3>
            <p className="text-muted-foreground text-sm">
              Live market data and advanced charting tools
            </p>
          </div>

          <div className=" p-6 text-center">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Execute trades in milliseconds with our matching engine
            </p>
          </div>

          <div className=" p-6 text-center">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-muted-foreground text-sm">
              Your assets are protected by military-grade encryption
            </p>
          </div>
        </div>

       
        {/* <div className="mb-16">
          <button className=" hover:glow-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
            Start Trading Now
          </button>
        </div>

       
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">$2.4B+</div>
            <div className="text-muted-foreground text-xs sm:text-sm">24h Volume</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">500K+</div>
            <div className="text-muted-foreground text-sm">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">200+</div>
            <div className="text-muted-foreground text-sm">Trading Pairs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-glow mb-2">99.9%</div>
            <div className="text-muted-foreground text-sm">Uptime</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;