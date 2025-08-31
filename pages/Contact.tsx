import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';

const Contact = () => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(t('contactSubject') + ` from ${name}`);
        const body = encodeURIComponent(
            `${message}\n\nFrom: ${name} <${email}>`
        );
        window.location.href = `mailto:contact@ayitikonpa.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-konpa-blue tracking-tight">{t('contactPageTitle')}</h1>
                    <p className="mt-4 text-lg text-gray-600">{t('contactPageSubtitle')}</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('contactName')}</label>
                            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('contactName')} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contactEmail')}</label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('contactEmail')} required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contactMessage')}</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('contactMessage')}
                                required
                                rows={6}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-konpa-gold-500 focus-visible:ring-offset-2"
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full bg-konpa-gold-600 hover:bg-konpa-gold-700 text-white font-bold transition-all duration-300 transform hover:scale-105">{t('contactSend')}</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;