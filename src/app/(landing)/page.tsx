import { CallToAction } from "./_components/call-to-action";
import { JoinCommunity } from "./_components/join-community";
import { ProductFeatures } from "./_components/product-features";
import { ProductShowcaseVideo } from "./_components/product-showcase-video";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col justify-center pt-20 md:pt-32 pb-10 lg:items-center gap-10 md:gap-20 overflow-y-auto">
      <div className="w-full flex items-center justify-center">
        <CallToAction />
      </div>
      <ProductShowcaseVideo />
      <ProductFeatures />
      <JoinCommunity />
    </div>
  );
}
