type FooterProps = {
  name: string;
};

export const Footer = ({ name }: FooterProps) => (
  <footer className="mt-10 text-center text-base text-fg md:text-left">
    {name}
  </footer>
);
