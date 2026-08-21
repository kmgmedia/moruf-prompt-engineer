import { ArrowRight, FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";

interface RelatedCaseStudy {
  title: string;
  description: string;
  link: string;
}

interface RelatedCaseStudiesProps {
  items: RelatedCaseStudy[];
}

export const RelatedCaseStudies = ({ items }: RelatedCaseStudiesProps) => {
  return (
    <div className="space-y-4 pt-2">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <FolderGit2 className="w-7 h-7 text-primary" />
        Related Case Studies
      </h2>
      <p className="text-foreground/90 leading-relaxed">
        Real projects where this approach was put into practice.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link key={item.link} to={item.link}>
            <Card className="h-full p-5 bg-primary/5 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group">
              <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                {item.description}
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                Read Case Study <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
