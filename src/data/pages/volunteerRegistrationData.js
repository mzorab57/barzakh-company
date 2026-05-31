export const volunteerRegistrationPageData = {
  whatsappNumber: '9647713857171',
  hero: {
    eyebrow: 'Get Involved',
    title: 'Volunteer Registration Form',
    description:
      'Thank you for your interest in volunteering with us. All your information will be kept confidential. After submitting the form, we will contact you. Acceptance as a volunteer is subject to the approval of the Nukhba.global team.',
  },
  note: {
    title: 'Important Note',
    description:
      'After being accepted as a volunteer, you will be added to the private Nukhba staff group. Through the group, you will receive:',
    updates: [
      'Preparation dates and times',
      'Event and course schedules',
      'All updates and announcements related to the organization',
    ],
  },
  requirements: {
    title: 'Requirements',
    items: [
      'Female volunteers are required to wear full Islamic dress and niqab during events and courses.',
      'The official staff dress color for both men and women is black.',
      'Volunteers must wear the official Nukhba Organization staff badge.',
      'Applicants must be 18 years old or older.',
      'Outstanding volunteers may later be selected for official paid roles based on qualifications and performance.',
    ],
  },
  form: {
    badge: 'Join The Team',
    title: 'Apply Through WhatsApp',
    personalInformationTitle: 'Personal Information',
    volunteerInformationTitle: 'Volunteer Information',
    confirmationTitle: 'Confirmation',
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      whatsappNumber: 'WhatsApp Number',
      phoneNumber: 'Phone Number',
      age: 'Age',
      address: 'Address',
      reason: 'Why do you want to become a volunteer?',
      volunteeredBefore: 'Have you volunteered before?',
      experience: 'If yes, please explain',
      confirmCorrect: 'I confirm that all provided information is correct.',
      agreeRules: 'I agree to the rules and conditions.',
    },
    radioOptions: ['Yes', 'No'],
    submitLabel: 'Export Excel And Send To WhatsApp',
    helperText:
      'This form creates an Excel-compatible file, then sends or prepares it for WhatsApp to `0771-385-7171`.',
    errors: {
      confirm: 'Please confirm the information and agree to the rules before submitting.',
      required: 'Please complete all required fields before submitting.',
      shared: 'The Excel file is ready and shared. Please choose WhatsApp from the share sheet if it appears.',
      canceled: 'Sharing was canceled. You can submit again to retry.',
      downloaded:
        'The Excel file has been downloaded. Please attach the downloaded file in WhatsApp and send it.',
    },
    excel: {
      filePrefix: 'nukhba-volunteer',
      title: 'Volunteer Registration Form',
      followUpMessage: 'I have downloaded the Excel file and will attach it here.',
      shareTitle: 'Nukhba Volunteer Registration',
      emptyValue: 'N/A',
    },
  },
};
