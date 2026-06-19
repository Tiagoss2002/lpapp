import React from 'react';
import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import CategoriesSection from '@/components/public/CategoriesSection';
import FeaturedProducts from '@/components/public/FeaturedProducts';
import InfoSection from '@/components/public/InfoSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <InfoSection />
      <ContactSection />
      <Footer />
    </div>
  );
}