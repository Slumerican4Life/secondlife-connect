
import React from 'react';
import { Link } from 'react-router-dom';
import { contentSections, getFeaturedContentSections, ContentSection } from '@/lib/content-sections';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentExplorerProps {
  featured?: boolean;
  limit?: number;
  className?: string;
  filter?: (section: ContentSection) => boolean;
}

const ContentExplorer: React.FC<ContentExplorerProps> = ({ 
  featured = false, 
  limit,
  className,
  filter
}) => {
  let sections = featured 
    ? getFeaturedContentSections(limit || 6)
    : limit 
      ? contentSections.slice(0, limit) 
      : contentSections;
  
  // Apply filter if provided
  if (filter) {
    sections = sections.filter(filter);
  }

  const renderBadge = (section: ContentSection) => {
    if (!section.badge) return null;
    
    switch (section.badge) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'hot':
        return <Badge className="bg-red-500">Hot</Badge>;
      case 'updated':
        return <Badge variant="outline" className="border-green-500 text-green-500">Updated</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {featured ? 'Featured Content' : 'Explore Content'}
        </h2>
        {featured && (
          <Button variant="ghost" asChild>
            <Link to="/explore" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link to={section.path}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-2 rounded-full bg-muted", section.color)}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </div>
                  {renderBadge(section)}
                </div>
                <CardDescription className="mt-1">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {section.isPremium && (
                  <div className="flex items-center gap-2 text-amber-500 text-sm">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span>Premium Content</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-between">
                  <span>Explore {section.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentExplorer;
