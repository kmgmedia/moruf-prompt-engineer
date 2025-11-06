export const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Moruf Adebola. All rights reserved.
          </p>
          <p>
            Full-Stack Software Engineer & Prompt Engineer
          </p>
        </div>
      </div>
    </footer>
  );
};
