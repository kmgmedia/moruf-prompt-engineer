export const Footer = () => {
  return (
    <footer className="mt-10 px-4 py-8 border-t border-border sm:mt-14 lg:mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Moruf Adebola. All rights reserved.
          </p>
          <p>AI Automation Engineer & Full-Stack Developer</p>
        </div>
      </div>
    </footer>
  );
};
