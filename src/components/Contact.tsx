import React from 'react';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { StarDivider } from './StarDivider';
import { Reveal } from './Reveal';
import { contact } from '../data/portfolio';

const mapSrc =
contact.mapEmbedUrl ||
`https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&z=15&output=embed`;

const details = [
{ icon: MapPinIcon, label: contact.address },
{ icon: PhoneIcon, label: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}` },
{ icon: MailIcon, label: contact.email, href: `mailto:${contact.email}` }];


export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1248px] px-6">
        <Reveal className="text-center">
          <p className="font-label text-sm font-semibold text-[#8A8A8A]">Stay in Touch with Us</p>
          <h2
            id="contact-heading"
            className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[44px]">

            Contact Information
          </h2>
          <StarDivider className="mt-5" />
        </Reveal>

        <div className="mt-12 h-[300px] w-full md:h-[360px]">
          <iframe
            src={mapSrc}
            title={`Map showing ${contact.address}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />

        </div>

        <ul className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:gap-16 lg:gap-24">
          {details.map(({ icon: Icon, label, href }) =>
          <li key={label} className="flex max-w-[260px] flex-col items-center gap-3 text-center">
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
              {href ?
            <a
              href={href}
              className="break-words font-label text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-150 ease-out hover:text-gold">

                  {label}
                </a> :

            <span className="font-label text-xs uppercase tracking-[0.15em] text-muted">{label}</span>
            }
            </li>
          )}
        </ul>
      </div>
    </section>);

}
