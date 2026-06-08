type ApplicantFooterProps = {
  name: string;
};

export function ApplicantFooter({ name }: ApplicantFooterProps) {
  return (
    <footer className="mt-10 text-center text-sm text-fg-muted">{name}</footer>
  );
}
