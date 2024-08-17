import { HeroSection } from "./_components/hero-section";
import { JoinCommunity } from "./_components/join-community";
import { ProductFeatures } from "./_components/product-features";
import { ProductShowcaseVideo } from "./_components/product-showcase-video";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col justify-center pt-36 md:pt-56 pb-10 lg:items-center gap-10 md:gap-24 overflow-y-auto">
      <div className="w-full flex items-center justify-center">
        <HeroSection />
      </div>
      <ProductShowcaseVideo />
      <ProductFeatures />
    </div>
  );
}
