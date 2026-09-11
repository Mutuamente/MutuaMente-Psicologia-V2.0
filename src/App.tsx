/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuotesSection } from './components/QuotesSection';
import { ServicesSection } from './components/ServicesSection';
import { PartnershipsAndPricing } from './components/PartnershipsAndPricing';
import { WhyTherapySection } from './components/WhyTherapySection';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { FaqAndTestimonials } from './components/FaqAndTestimonials';
import { ArticlesSection } from './components/ArticlesSection';
import { SocialIntegrations } from './components/SocialIntegrations';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ClinicalDashboard } from './components/ClinicalDashboard';
import { EmailNotificationViewer } from './components/EmailNotificationViewer';
import { InvoiceReceiptModal } from './components/InvoiceReceiptModal';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#545454]">
        {/* Navigation & Urgent Bar */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          <HeroSection />
          <QuotesSection />
          <ServicesSection />
          <PartnershipsAndPricing />
          <WhyTherapySection />
          <AboutSection />
          <TeamSection />
          <FaqAndTestimonials />
          <ArticlesSection />
          <SocialIntegrations />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <BookingModal />
        <ClinicalDashboard />
        <EmailNotificationViewer />
        <InvoiceReceiptModal />
      </div>
    </BookingProvider>
  );
}
