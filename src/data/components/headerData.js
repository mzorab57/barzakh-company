export const headerData = {
  menuItems: [
    { label: 'Home', link: '/' },
    {
      label: 'Events',
      isParent: true,
      children: [
        { label: 'The Migration Route', link: '/events/migration-route' },
        { label: 'Turkey 2027', link: '/events/turkey-2027' },
        { label: '3-Month Stay in Medina', link: '/events/medina-stay' },
      ],
    },
    { label: 'Apply to Volunteer', link: '/apply-to-volunteer' },
    { label: 'Stalls', link: '/stalls' },
    { label: 'About Us', link: '/about' },
    { label: 'Past Events', link: '/past-events' },
    { label: 'FAQ', link: '/faq' },
    { label: 'Contact Us', link: '/contact' },
  ],
  socialItems: [
    { label: 'Facebook', link: 'https://www.facebook.com/share/1EBGUTWSKp/' },
    { label: 'Instagram', link: 'https://www.instagram.com/barzakh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { label: 'WhatsApp', link: 'https://chat.whatsapp.com/FCvEFdvkQV5E65LngTwywf?mode=ems_copy_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio' },
    { label: 'Telegram', link: 'https://t.me/qonaghiyakam' },
  ],
};
