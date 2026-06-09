type ApplicantFooterProps = {
  name: string;
};

export const ApplicantFooter = ({ name }: ApplicantFooterProps) => (
  <footer className="mt-10 text-center text-sm text-fg-muted">{name}</footer>
);
