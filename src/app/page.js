import Banner from "@/components/banner/Banner";
import Footer from "@/components/footer/Footer";
import BecomeDonor from "@/components/home/BecomeDonor";
import FAQ from "@/components/home/FAQ";
import FindDonor from "@/components/home/FindDonor";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";
import UrgentBloodRequests from "@/components/home/UrgentBloodRequests";
import WhyChooseUs from "@/components/home/WhyChooseUs";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <ImpactStats />
      <HowItWorks />
      <FindDonor />
      <UrgentBloodRequests />
      <WhyChooseUs />
      <BecomeDonor />
      <FAQ />
      <Footer></Footer>
    </div>
  );
}
