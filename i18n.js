/* ── Bilingual toggle (FR default / EN translation) ──
   Reversible: original French text is captured from the live DOM
   the first time it's translated, then restored on toggle back. */
(function () {
  'use strict';

  var STORAGE_KEY = 'pp-lang';

  var translations = {
    /* meta */
    'meta.home.title': 'Peinture Proactif | Painter in Quebec City – Residential and Commercial',
    'meta.home.description': "Peinture Proactif – Residential and commercial painter in Quebec City. Careful work, flawless results. Free quote: 418-932-8427.",
    'meta.about.title': 'About Us | Peinture Proactif – Quebec City',
    'meta.about.description': "Meet the Peinture Proactif team – over 10 years of experience in residential and commercial painting in Quebec City.",
    'meta.careers.title': 'Careers | Peinture Proactif – Quebec City',
    'meta.careers.description': "Join the Peinture Proactif team. We're looking for professional painters in Quebec City. Apply now.",
    'meta.contact.title': 'Contact | Peinture Proactif – Free Quote in Quebec City',
    'meta.contact.description': "Request your free quote from Peinture Proactif. Residential and commercial painting in Quebec City. We respond as quickly as possible.",
    'meta.gallery.title': 'Our Work | Peinture Proactif – Quebec City',
    'meta.gallery.description': 'See the work completed by Peinture Proactif – residential and commercial projects across the Quebec City region.',
    'meta.services.title': 'Services | Peinture Proactif – Quebec City',
    'meta.services.description': "Interior, exterior and commercial painting in Quebec City. Discover all of Peinture Proactif's services.",

    /* nav / footer (shared) */
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Our Work',
    'nav.about': 'About',
    'nav.careers': 'Careers',
    'nav.ctaFree': 'Free Quote',
    'nav.contact': 'Contact',
    'footer.descLong': 'Residential and commercial painting in Quebec City. Careful work, lasting results, spotless job sites.',
    'footer.descShort': 'Residential and commercial painting in Quebec City. Careful work, lasting results.',
    'footer.license': 'RBQ License: 5762-2433-01',
    'footer.navHeading': 'Navigation',
    'footer.contactHeading': 'Contact',
    'footer.rights': '© 2025 Peinture Proactif. All rights reserved.',

    /* shared / common */
    'cta.freeQuote': 'Request a Free Quote',
    'cta.myQuote': 'Request My Quote',
    'cta.freeEstimate': 'Request a Free Estimate',
    'common.before': 'Before',
    'common.after': 'After',
    'common.learnMore': 'Learn more →',
    'common.areasServed': 'Areas We Serve',
    'common.areasTagline': 'Quebec City and Surrounding Areas',
    'common.ctaTitleTransform': 'Ready to Transform Your Space?',
    'common.ctaTitleWorkWithUs': 'Ready to Work With Us?',
    'common.ctaSubFreeNoCommit': "Free quote, no obligation. We'll get back to you as quickly as possible.",
    'services.interiorExterior': 'Interior and Exterior Painting',
    'services.commercialIndustrial': 'Commercial & Industrial',

    /* alt text */
    'alt.exteriorHouse': 'Exterior painting of a residential home',
    'alt.commercialRenovation': 'Commercial painting — unit under renovation',
    'alt.painterCorridor': 'Peinture Proactif painter at work in a residential hallway',
    'alt.painterCorridor2': 'Painter at work in a residential hallway',
    'alt.stairsBefore': 'Patio staircase before painting work',
    'alt.stairsAfter': 'Patio staircase after painting work',
    'alt.stairsFreshlyPainted': 'Freshly painted patio staircase',
    'alt.freshlyPaintedHouse': 'Freshly painted residential home',
    'alt.sprayCeiling': 'Spray painting of a commercial ceiling',
    'alt.workingHeight': 'Painter working at height',
    'alt.truck': 'Peinture Proactif truck',
    'alt.commercialUnitRenovation': 'Commercial unit under renovation',
    'alt.rooftopSite': 'Job site on a commercial rooftop',

    /* stats labels reused across pages */
    'stats.experience': 'Years of Experience',
    'stats.projects': 'Projects Completed',
    'stats.freeEstimate': 'Free Estimate',
    'stats.licensedInsured': 'Licensed & Insured',
    'stats.projectsRegion': 'Projects Completed in the Quebec City Region',
    'stats.yearsExpResCom': 'Years of Experience in Residential and Commercial Painting',
    'stats.licenseInsuredCertified': 'License 5762-2433-01 — Insured and Certified',
    'stats.projectsRegion500': 'Projects Completed in the Quebec City Region',
    'stats.yearsExpPaintingResCom': 'Years of Experience in Residential and Commercial Painting',
    'stats.licensedInsuredGuaranteed': 'Licensed and Insured — Guaranteed Work',

    /* trust bar */
    'trust.license': 'RBQ License 5762-2433-01',
    'trust.available': 'Available 7 Days a Week',
    'trust.freeNoCommit': 'Free Quote & No Obligation',
    'trust.resCom': 'Residential & Commercial',
    'trust.ecoPaints': 'Eco-Friendly Paints',

    /* gallery captions reused across pages */
    'gallery.captionResExt': 'Residential Exterior',
    'gallery.captionCeiling': 'Commercial Ceiling',
    'gallery.captionHeight': 'Working at Height',
    'gallery.captionTruck': 'Our Team on the Road',

    /* HOME PAGE */
    'home.badge': 'Painting in Quebec City for over 10 years',
    'home.title': 'A <em>flawless</em> finish,<br>the first time.',
    'home.sub': 'Residential, commercial, condos and apartment buildings — we transform your spaces with care across the Quebec City region.',
    'home.services.eyebrow': 'Our Services',
    'home.services.title': 'Everything Your Project Needs',
    'home.services.sub': 'From surface prep to the final touch, we handle every step with care.',
    'home.services.viewAll': 'View All Our Services',
    'home.approach.eyebrow': 'Our Approach',
    'home.approach.title': 'A clean job site.<br>A result that lasts.',
    'home.approach.sub': "Every project gets the same level of attention — whether it's a single room or an entire building. We prep, we protect, and we deliver flawless results.",
    'home.approach.cta': 'Learn More About Us',
    'home.feat1.title': 'Thorough Surface Preparation',
    'home.feat1.sub': 'Sanding, patching, priming — we never skip a step.',
    'home.feat2.title': 'Complete Protection of Your Belongings',
    'home.feat2.sub': 'Furniture, floors, trim — everything is protected before we start.',
    'home.feat3.title': 'Eco-Friendly Paints, No Harmful VOCs',
    'home.feat3.sub': "For your health and your family's.",
    'home.feat4.title': 'Thorough Cleanup After the Job',
    'home.feat4.sub': 'We leave once your space is clean and tidy.',
    'home.gallery.eyebrow': 'Our Work',
    'home.gallery.title': 'Results That Speak for Themselves',
    'home.gallery.sub': 'A look at some of our recent projects — residential, commercial and exterior.',
    'home.gallery.baHint': 'Drag the slider to compare before / after',
    'home.gallery.viewAll': 'View All Our Work',
    'home.commit.eyebrow': 'Our Commitment',
    'home.commit.title': 'Attention to detail,<br>in every brushstroke.',
    'home.commit.sub': "For over 10 years, we've worked in homes and businesses across the Quebec City region with the same rigour. No shortcuts, no bad surprises.",
    'home.commit1.title': 'Licensed RBQ & Fully Insured',
    'home.commit1.sub': "License 5762-2433-01 — you're protected at every step.",
    'home.commit2.title': 'Always on Schedule',
    'home.commit2.sub': 'We plan carefully and deliver on the agreed date.',
    'home.commit3.title': 'A Stable, Experienced Team',
    'home.commit3.sub': 'The same skilled painters from start to finish on your project.',
    'home.commit4.title': 'Transparent Pricing, No Surprises',
    'home.commit4.sub': 'A detailed, free quote before any work begins.',
    'home.careers.eyebrow': "We're Hiring",
    'home.careers.title': 'Are You a Painter? Join the Team.',
    'home.careers.sub': "We're looking for reliable people who take pride in a job well done.",
    'home.careers.cta': 'See Available Positions',
    'home.ctaBanner.sub': "Tell us about your project and we'll get back to you quickly. Free quote, no obligation.",

    /* ABOUT PAGE */
    'about.title': 'We know Quebec City.<br>We know painting.',
    'about.heroSub': 'For over 10 years, Peinture Proactif has worked in homes and businesses across the Quebec City region.',
    'about.story.eyebrow': 'Our Story',
    'about.story.title': 'A Local Team, Rigorous Work.',
    'about.story.p1': "Peinture Proactif is a painting company founded and rooted in the Quebec City region. We've painted kitchens, living rooms, facades, offices — and every time, we don't leave until the client is satisfied.",
    'about.story.p2': "What sets us apart is simple: we're clean, we're punctual, and we do the job right. No bad surprises, no shortcuts.",
    'about.story.p3': 'We know the Quebec City market, we know its winters, and we choose products that stand the test of time. Residential or commercial — we bring the same level of rigour to every job site.',
    'about.values.eyebrow': 'Our Values',
    'about.values.title': 'What Sets Us Apart',
    'about.values.sub': 'Four principles that guide every job site, from the first brushstroke to the final cleanup.',
    'about.value1.title': 'Reliability',
    'about.value1.sub': 'An agreed schedule is a schedule we keep. We show up on time and finish when we say we will. No excuses, no delays.',
    'about.value2.title': 'Cleanliness',
    'about.value2.sub': "Complete protection of your furniture and floors before work begins. Careful cleanup at the end of the job. We don't leave until everything is in order.",
    'about.value3.title': 'Local Roots',
    'about.value3.sub': "We know the Quebec City market, its winters, its homes. We're part of this community, and it shows in our work.",
    'about.value4.title': 'Transparency',
    'about.value4.sub': 'A clear, detailed quote before we start. No surprises on the invoice. We explain everything and answer your questions.',
    'about.certs.eyebrow': 'Certifications',
    'about.certs.title': 'Licensed, Insured, Certified',
    'about.certs.sub': 'For your peace of mind, we work by the book.',
    'about.certs.box1': 'RBQ License 5762-2433-01<br>Painting Contractor',
    'about.certs.box2': 'Liability Insurance<br>Covered and Guaranteed Work',
    'about.certs.box3': 'Eco-Friendly Paints<br>Free of Harmful VOCs',
    'about.ctaBanner.sub': "Free quote, no obligation. Tell us about your project and we'll get back to you as quickly as possible.",

    /* CAREERS PAGE */
    'careers.title': 'Join the Proactif Team',
    'careers.heroSub': 'Are you a professional painter who takes pride in your work? We want to meet you.',
    'careers.available.eyebrow': 'Open Positions',
    'careers.whatWeSeek': "What We're Looking For",
    'careers.role1': 'Residential painter with experience',
    'careers.role1NoExp': 'Residential Painter',
    'careers.role2': 'Commercial painter',
    'careers.role3': "Apprentice / Painter's helper",
    'careers.whatWeOffer': 'What We Offer',
    'careers.offer1': 'Stable, year-round work',
    'careers.offer2': 'A serious, respectful team',
    'careers.offer3': 'Varied projects in Quebec City and surrounding areas',
    'careers.offer4': 'Clean, organized work environment',
    'careers.offer5': 'Materials and equipment provided',
    'careers.whyJoin': 'Why Join Us',
    'careers.why1.title': 'We Do Things Right',
    'careers.why1.sub': 'No shortcuts. We take the time to do the job well.',
    'careers.why2.title': 'A Team That Respects Each Other',
    'careers.why2.sub': 'Professional atmosphere, clear communication, mutual respect.',
    'careers.why3.title': 'Varied Projects',
    'careers.why3.sub': 'Residential, commercial, interior, exterior — never monotonous.',
    'careers.note': 'Questions? Call us directly at <a href="tel:4189328427" style="color:var(--navy);font-weight:600;">418 932-8427</a> or email <a href="mailto:peinture.proactif@gmail.com" style="color:var(--navy);font-weight:600;">peinture.proactif@gmail.com</a>.',
    'careers.form.title': 'Application Form',
    'careers.form.positionType': 'Position Type *',
    'careers.form.experience': 'Years of Experience *',
    'careers.form.availability': 'Availability',
    'careers.form.tellUs': 'Tell Us About Yourself',
    'careers.form.tellUsPlaceholder': "Briefly describe your experience, the types of projects you've worked on, your strengths...",
    'careers.form.submit': 'Submit My Application',
    'careers.form.success': "✓ Your application has been received! We'll contact you shortly.",
    'careers.form.error': 'An error occurred. Please email us directly at <strong>peinture.proactif@gmail.com</strong> or call 418-932-8427.',

    /* CONTACT PAGE */
    'contact.title': 'Request Your Free Quote',
    'contact.heroSub': "Tell us about your project and we'll get back to you as quickly as possible. No obligation.",
    'contact.coords': 'Contact Information',
    'contact.weekdays': 'Monday to Friday',
    'contact.replyFast': 'We reply as quickly as possible',
    'contact.why1': 'Detailed estimate, no cost or obligation',
    'contact.why2': 'We visit to assess your project',
    'contact.why3': 'Clear, detailed quote in writing',
    'contact.why4': 'No surprises on the final bill',
    'contact.zonesList': 'Quebec City and Surrounding Areas',
    'contact.form.title': 'Your Project',
    'contact.form.emailOptional': 'Email',
    'contact.form.city': 'City *',
    'contact.form.cityPlaceholder': 'E.g.: Sainte-Foy, Charlesbourg...',
    'contact.form.projectType': 'Project Type *',
    'contact.form.type1': 'Residential interior painting',
    'contact.form.type2': 'Residential exterior painting',
    'contact.form.type3': 'Commercial painting',
    'contact.form.type4': 'Interior and exterior painting',
    'contact.form.type5': 'Other / Not sure yet',
    'contact.form.describe': 'Describe Your Project *',
    'contact.form.describePlaceholder': "Describe what you'd like painted, the approximate surface area, and your availability for a visit...",
    'contact.form.submit': 'Send My Quote Request',
    'contact.form.success': "✓ Your request has been received! We'll contact you as quickly as possible.",
    'contact.form.error': 'An error occurred. Please email us directly at <strong>peinture.proactif@gmail.com</strong> or call 418-932-8427.',

    /* shared form fields (careers + contact) */
    'form.firstName': 'First Name *',
    'form.lastName': 'Last Name *',
    'form.phone': 'Phone *',
    'form.email': 'Email *',
    'form.select': 'Select...',
    'form.other': 'Other',
    'form.exp.lessThan1': 'Less than 1 year',
    'form.exp.1to3': '1 to 3 years',
    'form.exp.3to5': '3 to 5 years',
    'form.exp.5to10': '5 to 10 years',
    'form.exp.10plus': '10 years or more',
    'form.avail.now': 'Immediately',
    'form.avail.2weeks': 'Within 2 weeks',
    'form.avail.1month': 'Within a month',
    'form.avail.discuss': 'To be discussed',
    'form.consent': 'By submitting this form, you consent to your information being used solely to respond to your request.',

    /* GALLERY / REALISATIONS PAGE */
    'gallery.title': 'Our Work',
    'gallery.heroSub': 'A few examples of our recent work. Every project reflects our attention to detail.',
    'gallery.residential.eyebrow': 'Residential',
    'gallery.residential.title': 'Homes and Exteriors',
    'gallery.residential.sub': 'Flawless finishes, indoors and out.',
    'gallery.captionExteriorProgress': 'Exterior Painting in Progress',
    'gallery.captionFinalResult': 'Final Result',
    'gallery.captionPatioRefreshed': 'Refreshed Patio and Staircase',
    'gallery.commercial.eyebrow': 'Commercial',
    'gallery.commercial.title': 'Commercial Spaces',
    'gallery.commercial.sub': 'Large-scale projects completed with the same rigour as our residential work.',
    'gallery.captionCommercialUnit': 'Commercial Unit',
    'gallery.captionIndustrialCeiling': 'Industrial Ceiling',
    'gallery.onSite.eyebrow': 'On Site',
    'gallery.onSite.title': 'Our Team at Work',
    'gallery.onSite.sub': 'From the first brushstroke to handover, we work with rigour and cleanliness.',
    'gallery.captionCorridor': 'Residential Hallway',
    'gallery.captionCommercialSite': 'Commercial Job Site',
    'gallery.ctaBanner.title': 'Your Project Will Be Our Next Success Story.',

    /* SERVICES PAGE */
    'services.title': 'Our Services',
    'services.heroSub': 'Meticulous work, whether at home or at your business. Every project is treated with the same care.',
    'services.service01': 'Service 01',
    'services.interior.sub': 'We transform your living spaces from the inside out. Walls, ceilings, woodwork, doors, stair railings and floors — every surface is treated with care from start to finish.',
    'services.interior.li1': 'Complete surface preparation and sanding',
    'services.interior.li2': 'Protection of your furniture and floors',
    'services.interior.li3': 'VOC-free paints available',
    'services.interior.li4': 'Careful finish on every detail',
    'services.interior.li5': 'Thorough cleanup at the end of the job',
    'services.service02': 'Service 02',
    'services.exterior.title': 'Exterior Painting',
    'services.exterior.sub': "Your exterior is your home's first impression. We use products designed to withstand Quebec's harsh winters — frost, humidity, temperature swings.",
    'services.exterior.li1': 'Siding, soffits, garage doors',
    'services.exterior.li2': 'Fences, patios and decks',
    'services.exterior.li3': 'Window frames and shutters',
    'services.exterior.li4': 'Thorough preparation and cleaning',
    'services.exterior.li5': 'Products suited to the Quebec climate',
    'services.service03': 'Service 03',
    'services.commercial.sub': 'Offices, businesses, restaurants. We work quickly and cleanly, adapting to your schedule to minimize disruption to your operations.',
    'services.commercial.li1': 'Offices, businesses, restaurants',
    'services.commercial.li3': 'Work scheduled around your availability',
    'services.commercial.li4': 'Detailed quote before work begins',
    'services.commercial.li5': 'Large surfaces and large-scale projects'
  };

  var originals = new Map();

  function capture(el, kind) {
    if (originals.has(el)) return;
    if (kind === 'meta') originals.set(el, el.getAttribute('content'));
    else if (kind === 'html') originals.set(el, el.innerHTML);
    else if (kind === 'alt') originals.set(el, el.getAttribute('alt'));
    else if (kind === 'placeholder') originals.set(el, el.getAttribute('placeholder'));
    else originals.set(el, el.textContent);
  }

  function applyOne(el, key, kind, lang) {
    capture(el, kind);
    var en = translations[key];
    var value = (lang === 'en' && en) ? en : originals.get(el);
    if (kind === 'meta') el.setAttribute('content', value);
    else if (kind === 'html') el.innerHTML = value;
    else if (kind === 'alt') el.setAttribute('alt', value);
    else if (kind === 'placeholder') el.setAttribute('placeholder', value);
    else el.textContent = value;
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var kind = el.tagName === 'META' ? 'meta' : 'text';
      applyOne(el, el.getAttribute('data-i18n'), kind, lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      applyOne(el, el.getAttribute('data-i18n-html'), 'html', lang);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      applyOne(el, el.getAttribute('data-i18n-alt'), 'alt', lang);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      applyOne(el, el.getAttribute('data-i18n-placeholder'), 'placeholder', lang);
    });

    document.documentElement.setAttribute('lang', lang);

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'FR' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Afficher le site en français' : 'View website in English');
    }
  }

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'fr'; } catch (e) { return 'fr'; }
  }
  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function init() {
    applyLang(getLang());
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = getLang() === 'en' ? 'fr' : 'en';
        setLang(next);
        applyLang(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
