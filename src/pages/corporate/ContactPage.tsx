import { useState } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/corporate/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InquiryTab = 'partnership' | 'artbonbon' | 'school';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<InquiryTab>('partnership');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  const openHappyTalk = () => {
    // HappyTalk widget integration
    // Opens HappyTalk chat with 3 options: 아트봉봉 문의, 아트봉봉 스쿨 문의, 제휴 문의
    window.open('https://happytalk.io/i-screamarts', '_blank');
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-white/10 bg-[#1A1A1A] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors";

  return (
    <>
      <SEO titleKey="nav.contact" />
      
      <div className="pt-24 md:pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        {/* Hero */}
        <section className="container-corporate mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="container-corporate mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            {t('contact.form.title')}
          </h2>
          
          <div className="max-w-3xl">
            {language === 'en' ? (
              // English: 3 Tabs with Email Forms
              <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as InquiryTab)} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-white/5 border border-white/10">
                  <TabsTrigger 
                    value="partnership" 
                    className="py-3 text-sm text-white/60 data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    {t('contact.tab.partnership')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="artbonbon"
                    className="py-3 text-sm text-white/60 data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    {t('contact.tab.artbonbon')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="school"
                    className="py-3 text-sm text-white/60 data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    {t('contact.tab.school')}
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Partnership Inquiry */}
                <TabsContent value="partnership">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.organization')} *
                        </label>
                        <input
                          type="text"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.organization.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.contactperson')} *
                        </label>
                        <input
                          type="text"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.contactperson.placeholder')}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.email.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.phone')}
                        </label>
                        <input
                          type="tel"
                          className={inputClasses}
                          placeholder={t('contact.form.phone.placeholder')}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.country')} *
                        </label>
                        <input
                          type="text"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.country.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.partnershiptype')} *
                        </label>
                        <Select required>
                          <SelectTrigger className="w-full h-12 bg-[#1A1A1A] border-white/10 text-white">
                            <SelectValue placeholder={t('contact.form.select')} />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1A] border border-white/10 z-50">
                            <SelectItem value="school" className="text-white hover:bg-white/10">{t('contact.form.partnership.school')}</SelectItem>
                            <SelectItem value="district" className="text-white hover:bg-white/10">{t('contact.form.partnership.district')}</SelectItem>
                            <SelectItem value="enterprise" className="text-white hover:bg-white/10">{t('contact.form.partnership.enterprise')}</SelectItem>
                            <SelectItem value="other" className="text-white hover:bg-white/10">{t('contact.form.partnership.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        required
                        rows={5}
                        className={`${inputClasses} resize-none`}
                        placeholder={t('contact.form.message.placeholder')}
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                      >
                        {t('contact.form.submit')}
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </TabsContent>

                {/* Tab 2: ART BONBON Inquiry */}
                <TabsContent value="artbonbon">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.email.placeholder')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        {t('contact.form.subject')} *
                      </label>
                      <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder={t('contact.form.subject.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        required
                        rows={5}
                        className={`${inputClasses} resize-none`}
                        placeholder={t('contact.form.message.placeholder')}
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                      >
                        {t('contact.form.submit')}
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </TabsContent>

                {/* Tab 3: ART BONBON SCHOOL Inquiry */}
                <TabsContent value="school">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          className={inputClasses}
                          placeholder={t('contact.form.email.placeholder')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        {t('contact.form.subject')} *
                      </label>
                      <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder={t('contact.form.subject.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        required
                        rows={5}
                        className={`${inputClasses} resize-none`}
                        placeholder={t('contact.form.message.placeholder')}
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                      >
                        {t('contact.form.submit')}
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              // Korean: Single button to open HappyTalk
              <div className="bg-[#1A1A1A] rounded-xl p-8 border border-white/10 text-center">
                <div className="mb-6">
                  <MessageCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {t('contact.happytalk.title')}
                  </h3>
                  <p className="text-white/60 mb-2">
                    {t('contact.happytalk.desc')}
                  </p>
                  <ul className="text-sm text-white/50 space-y-1">
                    <li>• 아트봉봉 문의</li>
                    <li>• 아트봉봉 스쿨 문의</li>
                    <li>• 제휴 문의</li>
                  </ul>
                </div>
                <button
                  onClick={openHappyTalk}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('contact.happytalk.button')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Office Info - 찾아오시는 길 */}
        <section className="bg-[#111111] py-16 md:py-20">
          <div className="container-corporate">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  {t('contact.location.title')}
                </h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1 text-white">{t('contact.location.address.label')}</p>
                      <p className="text-white/60">
                        {t('contact.location.address')}
                      </p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1 text-white">{t('contact.location.phone.label')}</p>
                      <a 
                        href={language === 'ko' ? 'tel:1833-2477' : 'tel:+82-1833-2477'}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        {language === 'ko' ? '1833-2477' : '+82-1833-2477'}
                      </a>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1 text-white">{t('contact.location.email.label')}</p>
                      <a 
                        href="mailto:support@i-screamarts.com" 
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        support@i-screamarts.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Google Map */}
              <div className="aspect-video bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584.7702778915043!2d127.10569845685683!3d37.40069632375865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca53953a05041%3A0x9fef1e712a5858aa!2z7JWE7J207Iqk7YGs66a87JWE7Yq4!5e0!3m2!1sko!2skr!4v1770184135954!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="i-Scream arts Office Location"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}