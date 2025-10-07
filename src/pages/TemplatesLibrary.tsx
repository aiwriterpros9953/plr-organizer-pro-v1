import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Mail, Scale, Share2, Download, Star } from 'lucide-react';

const TemplateLibrary = () => {
  const templateCategories = [
    {
      id: 'blogs',
      title: 'Blog Templates',
      description: 'SEO-optimized layouts for various blog post types',
      icon: FileText,
      count: 25,
      color: 'bg-blue-500',
      link: '/templates/blogs'
    },
    {
      id: 'emails',
      title: 'Email Templates',
      description: 'High-converting email sequences and newsletters',
      icon: Mail,
      count: 30,
      color: 'bg-purple-500',
      link: '/templates/emails'
    },
    {
      id: 'legal',
      title: 'Legal Templates',
      description: 'Essential legal documents for your business',
      icon: Scale,
      count: 15,
      color: 'bg-green-500',
      link: '/templates/legal'
    },
    {
      id: 'social-media',
      title: 'Social Media Templates',
      description: 'Content formats for maximum engagement',
      icon: Share2,
      count: 40,
      color: 'bg-pink-500',
      link: '/templates/social-media'
    }
  ];

  const featuredTemplates = [
    {
      title: 'Ultimate List Post Template',
      category: 'Blog',
      description: 'Perfect for creating engaging "Top 10" or "Best of" articles',
      downloads: 1243,
      rating: 4.8
    },
    {
      title: 'Welcome Email Series',
      category: 'Email',
      description: '7-day automated sequence to onboard new subscribers',
      downloads: 892,
      rating: 4.9
    },
    {
      title: 'Privacy Policy Generator',
      category: 'Legal',
      description: 'GDPR-compliant privacy policy template',
      downloads: 2156,
      rating: 4.7
    },
    {
      title: 'Instagram Carousel Pack',
      category: 'Social Media',
      description: '10 ready-to-use carousel templates',
      downloads: 1678,
      rating: 4.9
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>PLR Template Library | Ready-to-Use Content Templates</title>
        <meta name="description" content="Browse our extensive library of PLR templates for blogs, emails, legal documents, and social media. Download and customize for your business." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                PLR Template Library
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional, ready-to-use templates for your PLR content. Download, customize, and publish in minutes.
              </p>
            </div>

            {/* Category Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {templateCategories.map((category) => (
                <Link key={category.id} to={category.link}>
                  <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Badge variant="secondary">{category.count} templates</Badge>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Templates */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Templates</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {featuredTemplates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge>{template.category}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
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

        {/* How to Use Templates */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Use These Templates</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                    1
                  </div>
                  <CardTitle>Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse templates and download in your preferred format (DOC, PDF, or HTML)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                    2
                  </div>
                  <CardTitle>Customize</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Edit the template with your content, branding, and unique perspective
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                    3
                  </div>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use the template on your website, in emails, or across social media
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Customizing Templates?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Check out our comprehensive guides on how to make the most of your PLR templates
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link to="/plr-software-guides">
                  View Guides
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tools">
                  Explore Tools
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateLibrary;
