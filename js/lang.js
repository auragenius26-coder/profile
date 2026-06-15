/**
 * Aura Genius - Shared Language System
 * Handles English <-> Gujarati switching across all pages.
 * Each page also loads its own lang-{page}.js for page-specific strings.
 *
 * Usage: add  data-i18n="key"  to any element.
 * For placeholders: data-i18n-placeholder="key"
 * For aria-labels:  data-i18n-aria="key"
 */

window.KiderLang = (function () {

    /* ── COMMON TRANSLATIONS (shared across all pages) ─────────────────── */
    const common = {
        en: {
            /* ── Navbar ── */
            nav_home:            'Home',
            nav_about:           'About Us',
            nav_classes:         'Classes',
            nav_pages:           'Pages',
            nav_gallery:         'Gallery',
            nav_popular_teachers:'Popular Teachers',
            nav_become_teacher:  'Become A Teacher',
            nav_appointment:     'Make Appointment',
            nav_contact:         'Contact Us',
            lang_label:          'English',

            /* ── Footer – Get In Touch ── */
            footer_touch:        'Get In Touch',
            footer_quick:        'Quick Links',
            footer_gallery:      'Photo Gallery',
            footer_newsletter:   'Newsletter',
            footer_newsletter_p: 'Subscribe to stay updated on school events and enrollment dates!',
            footer_email_ph:     'Your email',
            footer_signup:       'Sign Up',

            /* ── Footer – Quick Links ── */
            footer_about:        'About Us',
            footer_contact:      'Contact Us',
            footer_appointment:  'Book Appointment',
            footer_services:     'Our Classes',
            footer_privacy:      'Privacy Policy',
            footer_terms:        'Terms of Service',


            /* ── Footer – menu ── */
            footer_menu_home:    'Home',
            footer_menu_cookies: 'Cookies',
            footer_menu_help:    'Help',
            footer_menu_faq:     'FAQs',
        },

        gu: {
            /* ── Navbar ── */
            nav_home:            'હોમ',
            nav_about:           'અમારા વિશે',
            nav_classes:         'વર્ગો',
            nav_pages:           'પૃષ્ઠો',
            nav_gallery:         'ગેલેરી',
            nav_popular_teachers:'લોકપ્રિય શિક્ષકો',
            nav_become_teacher:  'શિક્ષક બનો',
            nav_appointment:     'મુલાકાત નક્કી કરો',
            nav_contact:         'સંપર્ક કરો',
            lang_label:          'ગુજરાતી',

            /* ── Footer – Get In Touch ── */
            footer_touch:        'સંપર્ક કરો',
            footer_quick:        'ઝડપી લિંક્સ',
            footer_gallery:      'ફોટો ગેલેરી',
            footer_newsletter:   'ન્યૂઝલેટર',
            footer_newsletter_p: 'શાળાના કાર્યક્રમો અને પ્રવેશ તારીખો અંગે અપ-ટૂ-ડેટ રહેવા માટે સબ્સ્ક્રાઇબ કરો!',
            footer_email_ph:     'તમારો ઇ-મેઇલ',
            footer_signup:       'સબ્સ્ક્રાઇબ',

            /* ── Footer – Quick Links ── */
            footer_about:        'અમારા વિશે',
            footer_contact:      'સંપર્ક કરો',
            footer_appointment:  'મુલાકાત નક્કી કરો',
            footer_services:     'અમારા કોર્સ',
            footer_privacy:      'ગોપનીયતા નીતિ',
            footer_terms:        'સેવાની શરતો',

            /* ── Footer – menu ── */
            footer_menu_home:    'હોમ',
            footer_menu_cookies: 'કૂકીઝ',
            footer_menu_help:    'મદદ',
            footer_menu_faq:     'પ્રશ્નો',
        }
    };

    /* ── Merge common + page-specific dictionaries ─────────────────────── */
    function buildDict(lang) {
        const base   = common[lang]   || common.en;
        const pageEn = (window.KiderPageLang && window.KiderPageLang.en) || {};
        const pageLo = (window.KiderPageLang && window.KiderPageLang[lang]) || {};
        return Object.assign({}, base, lang === 'en' ? pageEn : pageLo);
    }

    /* ── Apply translations to DOM ──────────────────────────────────────── */
    function apply(lang) {
        const dict = buildDict(lang);

        /* text content */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        /* placeholder attributes */
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
        });

        /* aria-label attributes */
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
        });

        /* Globe button label */
        const lbl = document.getElementById('currentLang');
        if (lbl) lbl.textContent = dict['lang_label'] || (lang === 'gu' ? 'ગુજરાતી' : 'English');

        /* html lang attribute */
        document.documentElement.lang = lang === 'gu' ? 'gu' : 'en';

        /* mark active lang option */
        document.querySelectorAll('.lang-option').forEach(el => {
            el.style.fontWeight = el.dataset.lang === lang ? '700' : '400';
        });

        localStorage.setItem('kiderLang', lang);
    }

    /* ── Public init ────────────────────────────────────────────────────── */
    function init() {
        const saved = localStorage.getItem('kiderLang') || 'en';
        apply(saved);

        document.querySelectorAll('.lang-option').forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                apply(this.dataset.lang);
            });
        });
    }

    return { init, apply };

})();

document.addEventListener('DOMContentLoaded', KiderLang.init);