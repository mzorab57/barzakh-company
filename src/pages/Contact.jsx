import React from 'react';
import { useTranslation } from 'react-i18next';
import { getContactPageContent } from '@/data/pageContent';

const Contact = () => {
  const { t } = useTranslation();
  const contactPageContent = getContactPageContent(t);

  return (
    <div>{contactPageContent.title}</div>
  );
};

export default Contact;
