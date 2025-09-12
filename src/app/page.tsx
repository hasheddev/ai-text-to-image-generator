import Description from "@/components/description";
import GenerateButton from "@/components/generate-button";
import Header from "@/components/header";
import Steps from "@/components/steps";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateButton />
    </div>
  );
}
