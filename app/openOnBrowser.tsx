export default function OpenBrowser({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <a className="link" href={url} target="_blank">
      {title}
    </a>
  );
}
