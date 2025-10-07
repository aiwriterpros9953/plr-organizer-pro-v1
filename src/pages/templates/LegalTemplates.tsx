import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Download, Star, ArrowLeft } from 'lucide-react';

const LegalTemplates = () => {
  const templates = [
    {
      title: 'GDPR-Compliant Privacy Policy',
      description: 'Comprehensive privacy policy template that meets EU GDPR requirements',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 2156,
      rating: 4.9,
      features: ['GDPR compliant', 'CCPA ready', 'Cookie policy section', 'Data rights explained']
    },
    {
      title: 'Terms of Service Template',
      description: 'Protect your business with comprehensive terms and conditions',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 1843,
      rating: 4.8,
      features: ['Liability limitations', 'User obligations', 'Dispute resolution', 'Refund policy']
    },
    {
      title: 'Cookie Policy Template',
      description: 'Explain cookie usage to comply with international regulations',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 1432,
      rating: 4.7,
      features: ['Cookie categories', 'Third-party cookies', 'User consent', 'Opt-out instructions']
    },
    {
      title: 'Disclaimer Template',
      description: 'Limit liability with professional disclaimer statements',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 987,
      rating: 4.6,
      features: ['General disclaimer', 'Affiliate disclosure', 'Medical/legal advice', 'Earnings disclaimer']
    },
    {
      title: 'End User License Agreement (EULA)',
      description: 'Software and digital product licensing agreement',
      format: ['DOC', 'PDF'],
      downloads: 654,
      rating: 4.8,
      features: ['License grant', 'Restrictions', 'Warranty disclaimer', 'Termination clause']
    },
    {
      title: 'Acceptable Use Policy',
      description: 'Define acceptable behavior for your platform or service users',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 543,
      rating: 4.5,
      features: ['Prohibited activities', 'User conduct', 'Content guidelines', 'Enforcement']
    },
    {
      title: 'Return & Refund Policy',
      description: 'Clear refund terms for physical and digital products',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 1234,
      rating: 4.7,
      features: ['Return conditions', 'Refund timeline', 'Exchange policy', 'Digital products']
    },
    {
      title: 'Affiliate Agreement',
      description: 'Legal terms for affiliate marketing partnerships',
      format: ['DOC', 'PDF'],
      downloads: 456,
      rating: 4.6,
      features: ['Commission structure', 'Payment terms', 'Prohibited practices', 'Termination']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Legal Document Templates | PLR Organizer Pro</title>
        <meta name="description" content="Download professional legal templates. Privacy policies, terms of service, GDPR compliance, and more. Protect your business legally." />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <Link to="/templates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Template Library
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Legal Templates</h1>
                <p className="text-muted-foreground">Essential legal documents for your business</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Legal Disclaimer:</strong> These templates are provided as starting points and should be reviewed by a qualified attorney before use. Laws vary by jurisdiction, and these templates may need customization for your specific situation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2">
                        {template.format.map((format) => (
                          <Badge key={format} variant="secondary">{format}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h4 className="font-semibold mb-2 text-sm">Includes:</h4>
                    <ul className="space-y-1">
                      {template.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <span className="bg-primary/20 p-0.5 rounded-full mr-2 text-xs">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <span className="text-sm text-muted-foreground">
                      {template.downloads.toLocaleString()} downloads
                    </span>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Customize Legal Templates</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <h3 className="font-semibold mb-1">Download the Template</h3>
                      <p className="text-muted-foreground">Choose the format that works best for your workflow (DOC, PDF, or HTML).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <h3 className="font-semibold mb-1">Fill in Your Details</h3>
                      <p className="text-muted-foreground">Replace placeholder text with your business name, address, contact info, and specific terms.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <h3 className="font-semibold mb-1">Customize for Your Jurisdiction</h3>
                      <p className="text-muted-foreground">Modify sections to comply with local laws and regulations in your area.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <h3 className="font-semibold mb-1">Get Legal Review</h3>
                      <p className="text-muted-foreground">Have an attorney in your jurisdiction review the document before publishing.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</span>
                    <div>
                      <h3 className="font-semibold mb-1">Publish and Update</h3>
                      <p className="text-muted-foreground">Add to your website with a "Last Updated" date. Review annually or when laws change.</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalTemplates;
