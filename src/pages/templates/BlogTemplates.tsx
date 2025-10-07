import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Star, ArrowLeft } from 'lucide-react';

const BlogTemplates = () => {
  const templates = [
    {
      title: 'Ultimate List Post Template',
      description: 'Perfect for creating engaging "Top 10", "Best of", or numbered list articles that drive traffic',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 1243,
      rating: 4.8,
      features: ['SEO optimized', 'Engaging intro formula', 'CTA placements', 'Internal linking structure']
    },
    {
      title: 'How-To Guide Template',
      description: 'Step-by-step tutorial format that positions you as an expert and builds authority',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 987,
      rating: 4.7,
      features: ['Clear step progression', 'Screenshot placeholders', 'Troubleshooting section', 'FAQ included']
    },
    {
      title: 'Product Review Template',
      description: 'Comprehensive review format with pros/cons that converts readers into buyers',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 1456,
      rating: 4.9,
      features: ['Comparison tables', 'Rating system', 'Affiliate link integration', 'Verdict section']
    },
    {
      title: 'Case Study Template',
      description: 'Tell compelling success stories that demonstrate real results and build trust',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 654,
      rating: 4.8,
      features: ['Before/after structure', 'Results visualization', 'Quote placeholders', 'Data presentation']
    },
    {
      title: 'Ultimate Guide Template',
      description: 'Long-form pillar content that establishes authority and ranks for competitive keywords',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 892,
      rating: 4.6,
      features: ['Table of contents', 'Chapter structure', 'Summary sections', '3000+ word framework']
    },
    {
      title: 'Comparison Post Template',
      description: 'Side-by-side comparison format perfect for "X vs Y" style content',
      format: ['DOC', 'PDF', 'HTML'],
      downloads: 743,
      rating: 4.7,
      features: ['Feature comparison', 'Pricing tables', 'Winner selection', 'Use case scenarios']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog Post Templates | PLR Organizer Pro</title>
        <meta name="description" content="Download professional blog post templates. List posts, how-to guides, product reviews, case studies and more. SEO-optimized and ready to customize." />
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
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Blog Templates</h1>
                <p className="text-muted-foreground">SEO-optimized layouts for various blog post types</p>
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

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Customize Blog Templates</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <h3 className="font-semibold mb-1">Choose Your Topic</h3>
                      <p className="text-muted-foreground">Select a template that matches your content goal.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <h3 className="font-semibold mb-1">Replace Placeholder Content</h3>
                      <p className="text-muted-foreground">Fill in your unique information and expertise.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <h3 className="font-semibold mb-1">Optimize for SEO</h3>
                      <p className="text-muted-foreground">Use our SEO Analyzer tool to ensure ranking.</p>
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

export default BlogTemplates;
