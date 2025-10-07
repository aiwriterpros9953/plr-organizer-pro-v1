import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Download, Star, ArrowLeft } from 'lucide-react';

const SocialMediaTemplates = () => {
  const templates = [
    {
      title: 'Instagram Carousel Templates (10-Pack)',
      description: 'Eye-catching multi-slide templates for educational and promotional content',
      format: ['PSD', 'Canva'],
      downloads: 1678,
      rating: 4.9,
      features: ['10 unique designs', 'Editable text', 'Brand color options', '1080x1080 optimized']
    },
    {
      title: 'Facebook Post Templates',
      description: 'Engaging post designs for maximum reach and engagement',
      format: ['PSD', 'Canva', 'PNG'],
      downloads: 1432,
      rating: 4.8,
      features: ['15 templates', 'Multiple formats', 'Quote graphics', 'Promotion layouts']
    },
    {
      title: 'LinkedIn Article Templates',
      description: 'Professional article frameworks for thought leadership',
      format: ['DOC', 'HTML'],
      downloads: 892,
      rating: 4.7,
      features: ['5 article formats', 'Professional tone', 'B2B focus', 'CTA integration']
    },
    {
      title: 'Twitter/X Thread Templates',
      description: 'High-engagement thread structures that drive conversations',
      format: ['DOC', 'TXT'],
      downloads: 1234,
      rating: 4.8,
      features: ['10 thread formats', 'Hook formulas', 'Thread organization', 'Engagement tactics']
    },
    {
      title: 'Pinterest Pin Templates',
      description: 'Vertical pin designs optimized for Pinterest discovery',
      format: ['PSD', 'Canva'],
      downloads: 987,
      rating: 4.6,
      features: ['1000x1500 format', '20 designs', 'SEO-friendly', 'Link-optimized']
    },
    {
      title: 'Instagram Story Templates',
      description: '24-hour story templates for daily engagement',
      format: ['PSD', 'Canva'],
      downloads: 2134,
      rating: 4.9,
      features: ['30 story templates', 'Interactive elements', 'Brand-ready', 'Swipe-up ready']
    },
    {
      title: 'YouTube Community Post Templates',
      description: 'Engaging community posts to keep your audience active',
      format: ['DOC', 'TXT'],
      downloads: 543,
      rating: 4.5,
      features: ['Poll templates', 'Quiz formats', 'Update posts', 'Engagement hooks']
    },
    {
      title: 'TikTok Script Templates',
      description: 'Viral-ready video scripts and hook formulas',
      format: ['DOC', 'TXT'],
      downloads: 1567,
      rating: 4.8,
      features: ['15 script formats', 'Hook library', 'Trending sounds guide', 'CTA templates']
    },
    {
      title: 'Social Media Caption Bank',
      description: '100+ ready-to-use captions for various industries and occasions',
      format: ['DOC', 'Excel'],
      downloads: 2345,
      rating: 4.9,
      features: ['100+ captions', 'Hashtag sets', 'Emoji suggestions', 'Industry-specific']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Social Media Templates | PLR Organizer Pro</title>
        <meta name="description" content="Download professional social media templates. Instagram, Facebook, LinkedIn, TikTok, Pinterest and more. Boost engagement instantly." />
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
              <div className="w-16 h-16 bg-pink-500 rounded-lg flex items-center justify-center">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Social Media Templates</h1>
                <p className="text-muted-foreground">Content formats for maximum engagement</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2 flex-wrap">
                        {template.format.map((format) => (
                          <Badge key={format} variant="secondary">{format}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center flex-shrink-0 ml-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
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
                    <Button size="sm">
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
            <h2 className="text-3xl font-bold mb-8 text-center">Social Media Content Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Use high-contrast colors for readability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Keep text large and legible on mobile</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Maintain consistent branding across posts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Use platform-specific dimensions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Post consistently (3-5 times per week minimum)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Mix promotional and value-driven content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Engage with comments within first hour</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">Test different formats and track performance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Recommended Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Kit Tool</CardTitle>
                  <CardDescription>Apply your branding to social templates</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/brand-kit-tool">
                      Learn More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Batch Editor</CardTitle>
                  <CardDescription>Edit multiple social posts at once</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/batch-editor">
                      Learn More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Spinner</CardTitle>
                  <CardDescription>Create unique variations of captions</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/content-spinner">
                      Learn More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SocialMediaTemplates;
