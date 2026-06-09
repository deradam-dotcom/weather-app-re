type ApplicantFooterProps = {
  name: string;
};

export const ApplicantFooter = ({ name }: ApplicantFooterProps) => (
  <footer className="mt-10 text-center text-base text-fg-muted md:text-left">
    {name}
  </footer>
);
