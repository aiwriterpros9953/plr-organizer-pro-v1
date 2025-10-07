import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalPageLayout from '@/components/layouts/LegalPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Download, Star, ArrowLeft } from 'lucide-react';

const EmailTemplates = () => {
  const templates = [
    {
      title: 'Welcome Email Series (7 Days)',
      description: 'Automated sequence to onboard new subscribers and build relationships',
      format: ['DOC', 'HTML'],
      downloads: 892,
      rating: 4.9,
      features: ['7 emails included', 'Engagement tracking', 'CTA optimization', 'Unsubscribe compliance']
    },
    {
      title: 'Product Launch Sequence',
      description: 'Build anticipation and drive sales with this proven launch formula',
      format: ['DOC', 'HTML'],
      downloads: 1456,
      rating: 4.8,
      features: ['Pre-launch hype', 'Cart open sequence', 'Scarcity tactics', 'Post-launch follow-up']
    },
    {
      title: 'Newsletter Template Pack',
      description: 'Monthly newsletter templates with sections for news, tips, and promotions',
      format: ['HTML'],
      downloads: 743,
      rating: 4.7,
      features: ['Responsive design', 'Multiple layouts', 'Image placeholders', 'Social links']
    },
    {
      title: 'Re-engagement Campaign',
      description: 'Win back inactive subscribers with this proven re-activation sequence',
      format: ['DOC', 'HTML'],
      downloads: 654,
      rating: 4.6,
      features: ['4-email series', 'Survey integration', 'Special offer section', 'Preference center']
    },
    {
      title: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with strategic reminder and incentive emails',
      format: ['DOC', 'HTML'],
      downloads: 1089,
      rating: 4.9,
      features: ['3-email sequence', 'Dynamic product info', 'Discount code section', 'Urgency elements']
    },
    {
      title: 'Lead Nurture Drip Campaign',
      description: 'Educational sequence that builds trust and moves leads toward purchase',
      format: ['DOC', 'HTML'],
      downloads: 567,
      rating: 4.7,
      features: ['10-email series', 'Value-first approach', 'Soft pitch progression', 'Segmentation tags']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Email Templates | PLR Organizer Pro</title>
        <meta name="description" content="Download professional email templates. Welcome sequences, product launches, newsletters, and more. High-converting and ready to customize." />
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
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Email Templates</h1>
                <p className="text-muted-foreground">High-converting email sequences and newsletters</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
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
      </main>

      <Footer />
    </div>
  );
};

export default EmailTemplates;
