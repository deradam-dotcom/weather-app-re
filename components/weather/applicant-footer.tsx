type ApplicantFooterProps = {
  name: string;
};

export const ApplicantFooter = ({ name }: ApplicantFooterProps) => (
  <footer className="mt-10 text-left text-sm text-fg-muted">{name}</footer>
);
